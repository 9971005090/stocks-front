"use strict";
const {CONST: CONST} = await import(`/js/module/socket/constant.js${ver_string}`);
export const FUNCTION = {
    UTIL: {
        getApiServerList: function() {
            let objList = null;
            let passingParams = {
                organizationCode: GBL.ACCOUNT.INFO.organizationCode,
                requester: GBL.ACCOUNT.INFO.userCode
            }
            let response = custom.request.api(CONST.API.URL.SERVER.STREAM_LIST, passingParams);
            if(response.result == true) {
                objList = response.apiServerInfoList;
            }
            return objList;
        },
        connectStreamServer: function(parameter = null) {
            let objList = null;
            if(parameter !== null) {
                if(parameter.hasOwnProperty("objList") === true) {
                    objList = parameter.objList;
                }
            }
            if(objList === null) {
                objList = FUNCTION.UTIL.getApiServerList();
            }

            if(objList !== null) {
                CUSTOM.MODULE['socket'].STOMP.CLIENT = [];
                for(let i = 0; i < objList.length; i++) {
                    let selectServer = objList[i];
                    if(selectServer.serverType != CONST.STOMP.SERVER_TYPE.CODE.GATEWAY && (selectServer.unused === 0 || selectServer.unused === false)) {
                        let clientKeyName = "etc";
                        if(typeof CONST.STOMP.SERVER_TYPE.TITLE[selectServer.serverType] != "undefined") {
                            clientKeyName = CONST.STOMP.SERVER_TYPE.TITLE[selectServer.serverType];
                        }
                        clientKeyName = `${clientKeyName}_${("0" + String(selectServer.apiServerId)).substr(-2)}`;
                        let connType = CONST.STOMP.CONNECT_TYPE.CODE.WEB;
                        if(selectServer.serverType == CONST.STOMP.SERVER_TYPE.CODE.EVENT) {
                            connType = CONST.STOMP.CONNECT_TYPE.CODE.EVENT;
                        }
                        let passingParameter = {
                            'SX-Auth-Token': GBL.ACCOUNT.TOKEN,
                            deviceKind: custom.request.getDeviceKindCode(),
                            connType: connType,
                            apiRoute: selectServer.apiRoute,
                            requester: GBL.ACCOUNT.INFO.userCode
                        }
                        let streamming = new SockJS(`${selectServer.baseUrl}/ws?SX-API-Route=${selectServer.apiRoute}&clientKeyName=${clientKeyName}&connType=${connType}`);
                        console.log(`${selectServer.baseUrl}/ws?SX-API-Route=${selectServer.apiRoute}&clientKeyName=${clientKeyName}&connType=${connType} >> sessionid::::::::::::`, streamming._generateSessionId());
                        CUSTOM.MODULE['socket'].STOMP.CLIENT[clientKeyName] = Stomp.over(streamming);
                        CUSTOM.MODULE['socket'].STOMP.CLIENT[clientKeyName].debug = null;
                        CUSTOM.MODULE['socket'].STOMP.CLIENT[clientKeyName].connect(passingParameter, FUNCTION.CALLBACK.stompOnConnected, FUNCTION.CALLBACK.stompOnError);
                        // CUSTOM.MODULE['socket'].STOMP.CLIENT[clientKeyName].heartbeat.outgoing = 1000 * 10; // default 1000 * 10
                    }
                }
            }
        },
    },


    CALLBACK: {
        stompOnConnected: function(response) {
            let tempParameter = String.getUrlParam(this.ws.url);
            if(typeof tempParameter['clientKeyName'] != "undefined" && typeof tempParameter['connType'] != "undefined") {
                // 2021-10-07 생체 신호 구독은 2가지로 구분함
                // 1. 기존 구조는 BioSignalData
                // 2. 마지막 값 구조는 BioSignalSimpleData
                let type = CONST.STOMP.SERVER_TYPE.STR.DATA.toLowerCase(); // "data"
                // 2021-07-07 event server 삭제, data 서버에서 모두 사용
                // data 구독은 측정을 볼때 처리하고, event 는 로그인 시 바로 구독 처리
                if(tempParameter['connType'] == CONST.STOMP.CONNECT_TYPE.CODE.WEB) {
                    CUSTOM.MODULE['socket'].STOMP.CLIENT_KEY['DATA'] = tempParameter['clientKeyName'];

                    type = CONST.STOMP.SERVER_TYPE.STR.EVENT.toLowerCase(); // "event";
                    CUSTOM.MODULE['socket'].STOMP.CLIENT_KEY['EVENT'] = tempParameter['clientKeyName'];
                    FUNCTION.CALLBACK.stompForSubscribe(type);
                }

                FUNCTION.POST.stompOnConnected();
            }
        },
        stompOnError: function(error) {
            console.log("error::::::::::::", error);
        },
        stompForSubscribe: function(type, measurementCode = null) {
            let processConnectSubscribe = function() {
                let keyname = null;
                if(type === CONST.STOMP.SERVER_TYPE.STR.EVENT.toLowerCase()) {
                    keyname = CUSTOM.MODULE['socket'].STOMP.CLIENT_KEY['EVENT'];
                }
                else {
                    keyname = CUSTOM.MODULE['socket'].STOMP.CLIENT_KEY['DATA'];
                }

                if(keyname !== null) {
                    let url = `/topic/public/${type}`;
                    if(measurementCode != null) {
                        url = `/topic/public/${type}/${measurementCode}`;
                    }
                    if(measurementCode != null) {
                        if(type === CONST.STOMP.DATA_TYPE.NORMAL) {
                            CUSTOM.MODULE['socket'].STOMP.SUBSCRIBE[measurementCode] = CUSTOM.MODULE['socket'].STOMP.CLIENT[keyname].subscribe(url, FUNCTION.CALLBACK.stompOnMessageReceived);
                        }
                        else {
                            CUSTOM.MODULE['socket'].STOMP.SUBSCRIBE[measurementCode] = CUSTOM.MODULE['socket'].STOMP.CLIENT[keyname].subscribe(url, FUNCTION.CALLBACK.stompOnMessageReceivedForSimple);
                        }
                    }
                    else {
                        CUSTOM.MODULE['socket'].STOMP.SUBSCRIBE[CONST.STOMP.SERVER_TYPE.STR.EVENT.toLowerCase()] = CUSTOM.MODULE['socket'].STOMP.CLIENT[keyname].subscribe(url, FUNCTION.CALLBACK.stompOnMessageReceived);
                    }
                }
                else {
                    setTimeout(function() {processConnectSubscribe()}, 100);
                }
            }
            setTimeout(function() {processConnectSubscribe()}, 100);
        },
        stompOnMessageReceivedForSimple: function(response) {
            let getDeviceObject = function(type, meaurementCode) {
                return [$(`#${CUSTOM.DEVICE.DATA.TYPE.STR[type]}_title_${meaurementCode}`), $(`#${CUSTOM.DEVICE.DATA.TYPE.STR[type]}_value_${meaurementCode}`)];
            }
            let isDisconnect = function(status) {
                return (status === CUSTOM.DEVICE.STATUS.CODE.RECODING_START || status === CUSTOM.DEVICE.STATUS.CODE.BLE_CONNECTED || status === CUSTOM.DEVICE.STATUS.CODE.LEAD_ON);
            }

            let obj = null;
            let objTitle = null;
            let message = JSON.parse(response.body);
            if(message.hasOwnProperty("measurementCode") === true) {
                if(message.measurementCode !== null) {
                    if(message.deviceStatusInfo !== null) {
                        console.log("message.deviceStatusInfo::::::::::::", message.deviceStatusInfo);
                        if(message.deviceStatusInfo.status === CUSTOM.DEVICE.STATUS.CODE.LEAD_OFF || message.deviceStatusInfo.status === CUSTOM.DEVICE.STATUS.CODE.BLE_DISCONNECTED) {
                            if(CUSTOM.DEVICE.TYPE.CODE.ECG === message.deviceType) {
                                Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_hr"});
                            }
                            else if(CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE === message.deviceType) {
                                Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_temp"});
                            }
                            else if(CUSTOM.DEVICE.TYPE.CODE.SPO2 === message.deviceType) {
                                Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_spo2"});
                            }
                        }
                        else {
                            if(CUSTOM.DEVICE.TYPE.CODE.ECG === message.deviceType) {
                                Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_hr"});
                            }
                            else if(CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE === message.deviceType) {
                                Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_temp"});
                            }
                            else if(CUSTOM.DEVICE.TYPE.CODE.SPO2 === message.deviceType) {
                                Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_spo2"});
                            }
                        }
                    }
                    // let checkNum = 0;
                    // setInterval(function() {
                    //     if(message.measurementCode === "SEERS_2205161649_91P6") { // SEERS_2205231730_75LA(빨강), SEERS_2205162006_8SPN(노랑), SEERS_2205161649_91P6,
                    //         checkNum++;
                    //         Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_hr"});
                    //         Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_ews"});
                    //         Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_resp"});
                    //         Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_temp"});
                    //         if(checkNum % 4 === 0) {
                    //             Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_hr"});
                    //         }
                    //         if(checkNum % 4 === 1) {
                    //             Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_ews"});
                    //         }
                    //         if(checkNum % 4 === 2) {
                    //             Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_resp"});
                    //         }
                    //         if(checkNum % 4 === 3) {
                    //             Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_temp"});
                    //         }
                    //     }
                    // }, 2000)
                    // bioSignalSimpleData 값이 있으면 마지막 데이타
                    if(message.hasOwnProperty("bioSignalSimpleData") === true) {
                        if(message.bioSignalSimpleData !== null) {
                            // 부정맥 발생
                            // if(message.measurementCode === "SEERS_2205131616_2D5A") {
                            //     console.log("message.bioSignalSimpleData:::::::::", message.bioSignalSimpleData);
                            //     console.log("message.bioSignalSimpleData.arrhythmiaCount:::::::::", message.bioSignalSimpleData.arrhythmiaCount);
                            // }
                            if(message.bioSignalSimpleData.arrhythmiaCount > 0) {
                                Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "red"});
                            }
                            [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA.TYPE.CODE.HEART, message.measurementCode);
                            if(obj.text() === "") {
                                obj.text("-");
                                obj.removeClass("disconnect");
                            }
                            if(message.bioSignalSimpleData.hr > 0) {
                                objTitle.removeClass("disconnect");
                                obj.removeClass("disconnect");
                                obj.text(message.bioSignalSimpleData.hr);
                            }

                            [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA.TYPE.CODE.EWS, message.measurementCode);
                            if(obj.text() === "") {
                                obj.text("-");
                                obj.removeClass("disconnect");
                            }
                            if(message.bioSignalSimpleData.ews > -2) {
                                objTitle.removeClass("disconnect");
                                obj.removeClass("disconnect");
                                obj.text(message.bioSignalSimpleData.ews);
                            }

                            [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA.TYPE.CODE.ACT, message.measurementCode);
                            if(obj.text() === "") {
                                obj.text("-");
                                obj.removeClass("disconnect");
                            }
                            if(message.bioSignalSimpleData.activity > 0) {
                                objTitle.removeClass("disconnect");
                                obj.removeClass("disconnect");
                                obj.text(message.bioSignalSimpleData.activity);
                            }

                            [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA.TYPE.CODE.TEMPERATURE, message.measurementCode);
                            if(obj.text() === "") {
                                obj.text("-");
                                obj.removeClass("disconnect");
                            }
                            if(message.bioSignalSimpleData.temp > 0) {
                                objTitle.removeClass("disconnect");
                                obj.removeClass("disconnect");
                                obj.text(message.bioSignalSimpleData.temp.toFixed(1));
                            }

                            [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA.TYPE.CODE.RESP, message.measurementCode);
                            if(obj.text() === "") {
                                obj.text("-");
                                obj.removeClass("disconnect");
                            }
                            if(message.bioSignalSimpleData.resp > 0) {
                                objTitle.removeClass("disconnect");
                                obj.removeClass("disconnect");
                                obj.text(message.bioSignalSimpleData.resp);
                            }
                            let tempData = Array.deepCopy(message.bioSignalSimpleData);
                            tempData.measurementCode = message.measurementCode;
                            Seers.Loader.moduleLoad("emergency", "warning", {type: "simple", data: tempData});
                        }
                    }

                    // deviceStatusInfo 값이 있으면 장비 상태
                    if(message.hasOwnProperty("deviceStatusInfo") === true) {
                        if(message.deviceStatusInfo !== null) {
                            // 아래 제외는 모두 끊어진 상태
                            // DEVICE_STATUS - RECODING_START/ BLE_CONNECTED/ LEAD_ON

                            // 심전도 관련(hr, ews, activity)
                            if(message.deviceStatusInfo.deviceType === CUSTOM.DEVICE.DATA.TYPE.CODE.ECG) {
                                if(isDisconnect(message.deviceStatusInfo.deviceStatusInfoId) === false && message.deviceStatusInfo.deviceStatusInfoId !== DEVICE_STATUS.NONE) {
                                    [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA.TYPE.CODE.HEART, message.measurementCode);
                                    objTitle.addClass("disconnect");
                                    obj.addClass("disconnect");

                                    [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA.TYPE.CODE.EWS, message.measurementCode);
                                    objTitle.addClass("disconnect");
                                    obj.addClass("disconnect");

                                    [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA.TYPE.CODE.ACT, message.measurementCode);
                                    objTitle.addClass("disconnect");
                                    obj.addClass("disconnect");
                                }
                                else {
                                    [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA_TYPE.HEART, message.measurementCode);
                                    objTitle.removeClass("disconnect");
                                    obj.removeClass("disconnect");

                                    [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA_TYPE.EWS, message.measurementCode);
                                    objTitle.removeClass("disconnect");
                                    obj.removeClass("disconnect");

                                    [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA_TYPE.ACT, message.measurementCode);
                                    objTitle.removeClass("disconnect");
                                    obj.removeClass("disconnect");
                                }
                            }

                            // 체온
                            else if(message.deviceStatusInfo.deviceType === CUSTOM.DEVICE.DATA.TYPE.CODE.TEMPERATURE) {
                                if(isDisconnect(message.deviceStatusInfo.deviceStatusInfoId) === false) {
                                    [objTitle, obj] = getDeviceObject(CUSTOM.DEVICE.DATA.TYPE.CODE.TEMPERATURE, message.measurementCode);
                                    objTitle.addClass("disconnect");
                                    obj.addClass("disconnect");
                                }
                            }
                        }
                    }
                }
            }

        },
        stompOnMessageReceived(response) {
            Seers.Loader.moduleLoad("streamLastUpdateTimeView", "index", {});
            let message = JSON.parse(response.body);

            // 이벤트 관련 처리
            if(message.hasOwnProperty("eventType") === true) {
                if(message.eventType == CONST.STOMP.EVENT_TYPE.CODE.MEASUREMENT) {
                    Seers.Loader.moduleLoad("patient_change", "index", message[CONST.STOMP.EVENT_TYPE.OBJ_NAME[CONST.STOMP.EVENT_TYPE.CODE.MEASUREMENT]]);
                }
                else if(message.eventType == CONST.STOMP.EVENT_TYPE.CODE.WARD) {
                    if(url.getNowController() == "patient" && url.getNowAction() != "view") {
                        GBL.MODULE.IS_LOADING['ward_list'] = Seers.Loader.moduleLoad("ward_list", "index", {wardList: message[CONST.STOMP.EVENT_TYPE.OBJ_NAME[CONST.STOMP.EVENT_TYPE.CODE.WARD]]});
                    }
                }
            }

            // 데이타 관련 처리
            // 기존에는 streamPacket 상위 키 하위값에 정보가 있었는데, 이제는 해당 키값이 없어짐(2021.05.24 확인)
            // else if(message.hasOwnProperty("streamPacket") === true) {
            else {
                let date = new Date();
                let chartId = null;
                // let streamPacket = message;
                // console.log("IPMAPI.message::::::::::", message);
                // console.log("streamPacket.ecgDataList.length::::::::::", streamPacket.ecgDataList.length);
                // console.log("streamPacket.ecgDataList::::::::::", streamPacket.ecgDataList);
                // console.log("streamPacket::::::::::", streamPacket);
                // console.log("stompOnMessageReceived.now::::::::::::", date.toString('yyyy-MM-dd HH:mm:ss'));
                if(message != null) {
                    // ecg 데이타 유효성 검사하여 유효성이 안될경우 null 처리 하기
                    if(message.bioSignalData !== null) {
                        // 부정맥 발생
                        if(message.bioSignalData.arrhythmiaCount > 0) {
                            // console.log("streamPacket.bioSignalData.arrhythmiaCount::::::::::", streamPacket.bioSignalData.arrhythmiaCount);
                            // 현재 대응중이라면, 해당 값을 받아서 전달
                            Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "red", redProcess: $(`#div${message.measurementCode}`).find(`.patient_info`).attr("data-emergency-redProcess")});
                        }
                        let tempData = {
                            ews: message.bioSignalData.ewsDataList !== null ? message.bioSignalData.ewsDataList[0].value : -9,
                            resp: message.bioSignalData.respDataList !== null ? message.bioSignalData.respDataList[0].value : -9,
                            temp: message.bioSignalData.tempDataList !== null ? message.bioSignalData.tempDataList[0].value : -9,
                            spo2: message.bioSignalData.spO2DataList !== null ? message.bioSignalData.spO2DataList[0].value : -9,
                            hr: message.bioSignalData.heartRateDataList !== null ? message.bioSignalData.heartRateDataList[0].value : -9,
                            measurementCode: message.measurementCode
                        }
                        if(tempData.ews !== -9 || tempData.resp !== -9 || tempData.temp !== -9 || tempData.spo2 !== -9 || tempData.hr !== -9) {
                            Seers.Loader.moduleLoad("emergency", "warning", {type: "default", data: tempData});
                        }
                        tempData = null;

                        if(message.bioSignalData.hasOwnProperty("ecgDataList") !== "undefined") {
                            message.bioSignalData.ecgDataList = SOCKET_D3.CHART.isValidEcgData(message.bioSignalData.ecgDataList);
                            if(message.bioSignalData.ecgDataList !== null) {
                                if(SOCKET_D3.CHART.isValidTermEcgData(message.bioSignalData.ecgDataList) === false) {
                                    //     SOCKET_D3.CHART.setEcgChartDataInit(message.measurementCode);
                                    //     // // 그래프 영역 날리고
                                    //     // $(`#ECG_chart_${message.measurementCode}`).html("");
                                    //     // 데이타 초기화
                                    //     if(GBL.ACCOUNT.INFO.id.indexOf("zaid") !== -1) {
                                            let tempEcgData = Array.deepCopy(message.bioSignalData.ecgDataList);
                                            console.log("======isValidTermEcgData====");
                                            console.log("measurementCode:::::::::", message.measurementCode);
                                            console.log("ecgDataList.length:::::::::", tempEcgData.length);
                                            console.log("ecg.0, ecg.last:::::::::", tempEcgData[0].seconds, tempEcgData[tempEcgData.length - 1].seconds);
                                    // }
                                    //     custom.etc.workerChart.run(CUSTOM.CHART.WORKER, function() {},{processType: "unitInit", type: "ECG", measurementCode: message.measurementCode}
                                    //     );
                                    //     return;
                                }
                            }
                        }
                        if(message.bioSignalData.hasOwnProperty("ewsDataList") !== "undefined") {
                            message.bioSignalData.ewsDataList = SOCKET_D3.CHART.isValidEwsData(message.bioSignalData.ewsDataList);
                        }
                    }

                    // if(CUSTOM.CHART.CONFIG.LOG.codes.indexOf(message.measurementCode) !== -1 && (location.hostname === "localhost" || GBL.ACCOUNT.INFO.isZaid === true) && CUSTOM.CHART.CONFIG.IGNORE.codes.indexOf(streamPacket.message) === -1) {
                    //     console.log("message.measurementCode:::::::::::", message.measurementCode)
                    //     // console.log("message.ecgDataList::::::::::", Array.deepCopy(message.bioSignalData.ecgDataList));
                    //     // console.log("message.heartRateDataList::::::::::", Array.deepCopy(message.bioSignalData.heartRateDataList));
                    //     // console.log("message.tempDataList::::::::::", Array.deepCopy(message.bioSignalData.tempDataList));
                    //     // console.log("message.respDataList::::::::::", Array.deepCopy(message.bioSignalData.respDataList));
                    //     // console.log("message.ewsDataList::::::::::", Array.deepCopy(message.bioSignalData.ewsDataList));
                    // }

                    // if(SOCKET_D3.CHART.isIgnore(streamPacket.measurementCode) === false) {
                    if(CUSTOM.CHART.CONFIG.IGNORE.codes.indexOf(message.measurementCode) === -1) {

                        // 생체 데이타
                        if(message.bioSignalData !== null) {
                            // if(message.deviceType == CUSTOM.DEVICE.TYPE.CODE.ECG) {
                            //     if(message.bioSignalData.ecgDataList != null && CUSTOM.CHART.CONFIG.ECG.use === true) {
                            //         chartId = SOCKET_D3.CHART.getChartId("ECG", message.measurementCode);
                            //         if(CUSTOM.CHART.LOG.IS_USE === true) {
                            //             console.log("now::::", date.toString('yyyy-MM-dd HH:mm:ss'));
                            //             console.log("message.ecgDataList::::::::::", Array.deepCopy(message.bioSignalData.ecgDataList));
                            //         }
                            //     }
                            //     if(message.bioSignalData.activityLevelDataList != null && CUSTOM.CHART.CONFIG.ACT.use === true) {
                            //         chartId = SOCKET_D3.CHART.getChartId("ACT", message.measurementCode);
                            //         if(CUSTOM.CHART.LOG.IS_USE === true) {
                            //             console.log("now::::", date.toString('yyyy-MM-dd HH:mm:ss'));
                            //             console.log("message.activityLevelDataList::::::::::", Array.deepCopy(message.bioSignalData.activityLevelDataList));
                            //         }
                            //     }
                            //     if(message.bioSignalData.ewsDataList != null && CUSTOM.CHART.CONFIG.EWS.use === true) {
                            //         chartId = SOCKET_D3.CHART.getChartId("EWS", message.measurementCode);
                            //         if(CUSTOM.CHART.LOG.IS_USE === true) {
                            //             console.log("now::::", date.toString('yyyy-MM-dd HH:mm:ss'));
                            //             console.log("message.ewsDataList::::::::::", Array.deepCopy(message.bioSignalData.ewsDataList));
                            //         }
                            //     }
                            //     if(message.bioSignalData.heartRateDataList != null && CUSTOM.CHART.CONFIG.HEART.use === true) {
                            //         chartId = SOCKET_D3.CHART.getChartId("HEART", message.measurementCode);
                            //         if(CUSTOM.CHART.LOG.IS_USE === true) {
                            //             console.log("now::::", date.toString('yyyy-MM-dd HH:mm:ss'));
                            //             console.log("message.heartRateDataList::::::::::", Array.deepCopy(message.bioSignalData.heartRateDataList));
                            //         }
                            //     }
                            // }
                            // if(message.deviceType == CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE) {
                            //     chartId = SOCKET_D3.CHART.getChartId("TEMP", message.measurementCode);
                            //     if(message.bioSignalData.tempDataList != null && CUSTOM.CHART.CONFIG.TEMP.use === true) {
                            //         if(CUSTOM.CHART.LOG.IS_USE === true) {
                            //             console.log("now::::", date.toString('yyyy-MM-dd HH:mm:ss'));
                            //             console.log("message.tempDataList::::::::::", Array.deepCopy(message.bioSignalData.tempDataList));
                            //         }
                            //     }
                            // }
                            // if(message.deviceType == CUSTOM.DEVICE.TYPE.CODE.SPO2) {
                            //     chartId = SOCKET_D3.CHART.getChartId("SPO2", message.measurementCode);
                            //     if(message.bioSignalData.spO2DataList != null && CUSTOM.CHART.CONFIG.SPO2.use === true) {
                            //         if(CUSTOM.CHART.LOG.IS_USE === true) {
                            //             console.log("now::::", date.toString('yyyy-MM-dd HH:mm:ss'));
                            //             console.log("message.spO2DataList::::::::::", Array.deepCopy(message.bioSignalData.spO2DataList));
                            //         }
                            //     }
                            // }

                            SOCKET_D3.CHART.setDataInit(message.measurementCode);

                            // 수신 주기보다 지연되서 데이타를 순신할 경우 해당 시간이 null인데, 수신된 값으로 업데이트 후 그래프 다시 그리기
                            if(message.deviceType == CUSTOM.DEVICE.TYPE.CODE.ECG || message.deviceType == CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE) {
                                if(message.deviceType == CUSTOM.DEVICE.TYPE.CODE.ECG) {
                                    CUSTOM.MODULE['socket'].RECEIVE.COUNT.ECG[message.measurementCode]++;
                                }
                                if(message.deviceType == CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE) {
                                    CUSTOM.MODULE['socket'].RECEIVE.COUNT.TEMPERATURE[message.measurementCode]++;
                                }
                            }

                            for (let key in CUSTOM.CHART.CONFIG) {
                                if(message.deviceType == CUSTOM.CHART.CONFIG[key]['deviceType'] && CUSTOM.CHART.CONFIG[key]['use'] === true && CUSTOM.CHART.CONFIG.IGNORE.codes.indexOf(message.measurementCode) === -1) {
                                    // let streamPacketList = streamPacket.bioSignalData[CUSTOM.CHART.CONFIG[key]['receiveVariable']];
                                    if(message.bioSignalData[CUSTOM.CHART.CONFIG[key]['receiveVariable']] != null) {
                                        // ECG, TEMP connect 처리
                                        if(message.deviceType == CUSTOM.DEVICE.TYPE.CODE.ECG || message.deviceType == CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE || streamPacket.deviceType == CUSTOM.DEVICE.TYPE.CODE.SPO2) {
                                            // SOCKET_D3.DEVICE.showConnect(CUSTOM.DEVICE.TYPE.STR[streamPacket.deviceType], streamPacket.measurementCode);
                                            SOCKET_D3.CHART.setReceiveChartData(key, message);
                                        }
                                    }
                                }
                            }
                        }

                        // 장치 상태
                        // let checkNum = 0;
                        // setInterval(function() {
                        //     if(message.measurementCode === "SEERS_2205162006_8SPN") { // SEERS_2205231730_75LA(빨강), SEERS_2205162006_8SPN(노랑), SEERS_2205161649_91P6, SEERS_2205161646_0I1P
                        //         checkNum++;
                        //         Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_hr"});
                        //         Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_ews"});
                        //         Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_resp"});
                        //         Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_temp"});
                        //         if(checkNum % 4 === 0) {
                        //             Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_hr"});
                        //         }
                        //         if(checkNum % 4 === 1) {
                        //             Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_ews"});
                        //         }
                        //         if(checkNum % 4 === 2) {
                        //             Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_resp"});
                        //         }
                        //         if(checkNum % 4 === 3) {
                        //             Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_temp"});
                        //         }
                        //     }
                        // }, 2000)

                        if(message.deviceStatusInfo !== null) {
                            // console.log("streamPacket.deviceStatusInfo:::::::::::::", streamPacket.deviceStatusInfo);
                            // console.log("streamPacket.deviceType:::::::::::::", streamPacket.deviceType);
                            if(message.deviceStatusInfo.status === CUSTOM.DEVICE.STATUS.CODE.LEAD_OFF || message.deviceStatusInfo.status === CUSTOM.DEVICE.STATUS.CODE.BLE_DISCONNECTED) {
                                if(CUSTOM.DEVICE.TYPE.CODE.ECG === message.deviceType) {
                                    Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_hr"});
                                }
                                else if(CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE === message.deviceType) {
                                    Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_temp"});
                                }
                                else if(CUSTOM.DEVICE.TYPE.CODE.SPO2 === message.deviceType) {
                                    Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_spo2"});
                                }
                            }
                            else {
                                if(CUSTOM.DEVICE.TYPE.CODE.ECG === message.deviceType) {
                                    Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_hr"});
                                }
                                else if(CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE === message.deviceType) {
                                    Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_temp"});
                                }
                                else if(CUSTOM.DEVICE.TYPE.CODE.SPO2 === message.deviceType) {
                                    Seers.Loader.moduleLoad("emergency", "index", {measurementCode: message.measurementCode, type: "blue_off_spo2"});
                                }
                            }
                            // let passingParams = {deviceType: "ECG", measurementCode: "zaid_002", status: 2, battery: null}
                            // Seers.Loader.moduleLoad("device_info", "index", passingParams);

                            ////////////////////////////////////////////////////////////////////////////////////////////////////////
                            // 아직 처리 못함
                            // if(message.deviceType == CUSTOM.DEVICE.TYPE.CODE.DEVICE_STATUS) {
                            //     if(message.deviceStatusInfo != null) {
                            //         let passingParams = {
                            //             deviceType: CUSTOM.DEVICE.TYPE.STR.ECG,
                            //             measurementCode: message.measurementCode,
                            //             status: message.deviceStatusInfo.status,
                            //             battery: null
                            //         }
                            //         if(message.deviceStatusInfo.deviceType == CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE) {
                            //             passingParams.deviceType = CUSTOM.DEVICE.TYPE.STR.TEMPERATURE
                            //         }
                            //         MODULE_IS_LOADING["device_info"] = Seers.Loader.moduleLoad("device_info", "index", passingParams);
                            //     }
                            //
                            //     // 배터리
                            //     if(message.deviceType == CUSTOM.DEVICE.TYPE.CODE.ECG || message.deviceType == CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE && (CUSTOM.CHART.CONFIG.IGNORE.codes.indexOf(message.measurementCode) === -1)) {
                            //         let passingParams = {
                            //             deviceType: CUSTOM.DEVICE.TYPE.STR.ECG,
                            //             measurementCode: message.measurementCode,
                            //             status: null,
                            //             battery: streamPacket.batteryValue
                            //         }
                            //         if(message.deviceType == CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE) {
                            //             passingParams.deviceType = CUSTOM.DEVICE.TYPE.STR.TEMPERATURE
                            //         }
                            //         MODULE_IS_LOADING["device_info"] = Seers.Loader.moduleLoad("device_info", "index", passingParams);
                            //     }
                            // }
                            ////////////////////////////////////////////////////////////////////////////////////////////////////////
                        }
                    }
                }
                date = null;
                chartId = null;
            }
            message = null;
            response = null;
        }
    },

    POST: {
        stompOnConnected: function() {
            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        },
        stompOnMessageReceived: function() {
            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        },
        stompOnMessageReceivedForSimple: function() {
            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
    }
}