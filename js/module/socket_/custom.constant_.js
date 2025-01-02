///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 해당 모듈은 씨어스의 실시간 d3 chart 처리를 위한 소켓 모듈이다.
// 실시간 d3 chart 처리를 위해 소켓 모듈과 아래 내용과 함께 사용해야 구현이 가능하다.
// 아래 내용을 /js/custom/constant.js에 복사해 사용한다.
// 함께 사용할 내용
// /js/util/d3
// /js/util/socketD3
// /js/custom/constant.js에 아래 전역 변수를 추가해야한다.
// 남은 작업
// - 불필요한 변수 사용 부분 정리
// - html상에서 모듈 태그 부분을 넣어두면, 내부적으로 소켓통신을 연결해서 최종적으로 챠트까지 자동으로 나오게 처리 필요
//   ==> 완전 모듈화
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CUSTOM.DEVICE = {
    TYPE: {
        CODE: {
            ECG: 1,
            TEMPERATURE: 2,
            SPO2: 3,
            HEARTRATE: 4,
            TAG: 8,
            DEVICE_STATUS: 9
        },
        STR: {
            ECG: "ECG",
            TEMPERATURE: "TEMPERATURE",
            TEMP: "TEMP",
            TAG: "TAG",
            SPO2: "SPO2"
        },
        PREFIX_ADDRESS: {
            ECG: "08:D5:C0:5",
            TEMPERATURE: "08:D5:C0:6",
            SPO2: "08:D5:C0:4", // 00:1C:05:FF:3A:CC, 08:D5:C0:00:74:A9
            TAG: "08:D5:C0:1"
        },
        TITLE: {}
    },
    RETURN: {
        STATUS: {
            CODE: {
                NORMAL: 0,
                RETURN: 1
            }
        }
    },
    STATUS: {
        CODE: {
            NONE: 0,
            RECODING_START: 1,
            BLE_CONNECTED: 2,
            LEAD_ON: 3,
            LEAD_OFF: 4,
            BLE_DISCONNECTED: 5,
            RECORDING_STOP: 6,
            RECORDING_FORCE_STOP: 7,
            DEFAULT: 99
        },
        STR: {
            0: "NONE",
            1: "Recording Start",
            2: "Connect",//"BLE Connected",
            3: "LEAD ON",
            4: "LEAD OFF",
            5: "Disconnect",//"BLE Disconnected",
            6: "Recording Stop",
            7: "Recording Force Stop",
            99: "-"
        }
    },
    DATA: {
        TYPE: {
            CODE: {
                ACT: 1,
                HEART: 2,
                EWS: 16,
                TEMPERATURE: 32,
                SPO2: 48,
                RESP: 99
            },
            STR: []
        }
    },
}
Object.keys(CUSTOM.DEVICE.DATA.TYPE.CODE).forEach(function(v){
    let value = v;
    if(v == "TEMPERATURE") {
        value = "TEMP"
    }
    CUSTOM.DEVICE.DATA.TYPE.STR[CUSTOM.DEVICE.DATA.TYPE.CODE[v]] = value;
});
CUSTOM.DEVICE.TYPE.TITLE[CUSTOM.DEVICE.TYPE.CODE.ECG] = "심전도패치";
CUSTOM.DEVICE.TYPE.TITLE[CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE] = "체온패치";
CUSTOM.DEVICE.TYPE.TITLE[CUSTOM.DEVICE.TYPE.CODE.SPO2] = "산소포화도";
CUSTOM.DEVICE.TYPE.TITLE[CUSTOM.DEVICE.TYPE.CODE.TAG] = "기타기기";
// CUSTOM.MEASUREMENT = {
//     STATUS: {
//         CODE: {
//             NONE: 0,
//             WAITING: 1,
//             RECODING_START: 2,
//             RECODING_END: 3,
//             COMPLETED: 8
//         },
//         TITLE: {}
//     },
//     STATUS_TITLE: {},
//     RESPONSE: null,
//     SET_INIT: function() {
//         CUSTOM.MEASUREMENT.RESPONSE = null;
//     },
//     ROOM_NUMBER: "101"
// };
// CUSTOM.MEASUREMENT.STATUS.TITLE[CUSTOM.MEASUREMENT.STATUS.CODE.WAITING] = "대기";
// CUSTOM.MEASUREMENT.STATUS.TITLE[CUSTOM.MEASUREMENT.STATUS.CODE.RECODING_START] = "측정중";
// CUSTOM.MEASUREMENT.STATUS.TITLE[CUSTOM.MEASUREMENT.STATUS.CODE.RECODING_END] = "완료";
// CUSTOM.MEASUREMENT.STATUS.TITLE[CUSTOM.MEASUREMENT.STATUS.CODE.COMPLETED] = "종료";
CUSTOM.CHART = {
    CHART_DATA_CALCULATE_TYPE: "default", // default(기존방식), worker(워커에서 처리)
    // worker로 사용할때는 반드시 연산을 처리하는 워커를 custom/util.js 에 넣어서 사용해야한다.(아래 내용)
    // if(CUSTOM.CHART.CHART_DATA_CALCULATE_TYPE === "worker") {
    //     CUSTOM.CHART.WORKER = new Worker( `/js/module/windowWorker/workerChart.js${ver_string}` );
    // }
    WORKER: null,
    IS_USE: true,
    IS_DEVEL: true,
    LOG: {
        IS_USE: false
    },
    REAL_TIME: {
        IS_USE: true
    },
    STACK: {
        IS_USE: true
    },
    WARNNING: {
        INFO: {
            EWS: {
                score: 3
            },
            DEVICE_MESSAGE: "LEAD OFF, DISCONNECTED",
        }
    },
    RUN_TIME: {
        start: null,
        end: null
    },

    CONFIG: {
        ECG: {
            use: true,
            isValidTerm: 10,
            setInitChartDataFunctionName: "setInitChartDataForD3",
            getChartDataFunctionName: "getInitChartDataForD3",
            initFunctionName: "setInitChartDatas", // 원래 함수 setInitEcgDatas
            getFunctionName: "getChartDatasForReverse2", // 원래 함수 getEcgDatas,,,, getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.ECG,
            receiveVariable: "ecgDataList",
            viewInfo: {
                'list': {
                    'valueId': null,
                    'chartId': "ECG_chart_{measurementCode}"
                },
                'detail': {
                    'valueId': null,
                    'maxValueId': null,
                    'minValueId': null,
                    'chartId': "ECG_chart_view_{measurementCode}",
                },
                'chartColor': "#74DF00",
                'alarmId': null
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {}, //실제 차트에 쓰일 데이타
                chartBack: {}, //한바퀴가 돌고, 뒤에 데이타가 남아져있는 효과를 위한 이전 텀의 데이타
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 4,
                viewSecond: 10,
                listCount: 512,
                viewCount: 1280,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 16,
                baseData: {
                    use: {
                        list: false,
                        view: false
                    },
                    term: {
                        list: {
                            startDateTime: null,
                        },
                        view: {
                            startDateTime: null,
                        },
                        endDateTime: null,
                    },
                    latestCheckTerm: 3 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 1000 / 128, // 초, 데이타 사이의 간격, 1000을 더 나눠야 하는데, 계산시 처리에 문제가 있어서 그 부분은 실제 적용시 처리
                term: 50, //밀리초, setInterval에 사용
                socketReceiveTerm: 3,
                perSocketReceiveTermDataCount: 384,
                newProcessTerm: {},
                processTerm: 0.05, // 0.05
                doubleProcessTerm: 0.125, // 0.125
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                runCount: {},
                first: {},
                socketReceiveDelay: {},
                type: "timeout" // default, worker, timeout
            },
            chartMinmax: {
                minimum: 1800,
                maximum: 2600
            },
            chartRealtime: false,
            chartConnect: false,
            chartObject: {},
            cloneChartObject: {},
            correct: {
                seconds: 0.0001
            },
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#74DF00",
                sensitivity: {
                    default: { // 표준감도 범위 4mV
                        min: -1,
                        max: +3
                    }
                }
            },
            eventSaveSeconds: 10 // 초
        },

        HEART: {
            use: true,
            setInitChartDataFunctionName: "setInitChartDataForD3",
            getChartDataFunctionName: "getInitChartDataForD3",
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.ECG,
            receiveVariable: "heartRateDataList",
            viewInfo: {
                'list': {
                    'valueId': "HEART_value_{measurementCode}",
                    'chartId': null
                },
                'detail': {
                    'valueId': "hrVal_{measurementCode}",
                    'maxValueId': "hrMax_{measurementCode}",
                    'minValueId': "hrMin_{measurementCode}",
                    // 'chartId': "hrChart_{measurementCode}",
                    'chartId': null
                },
                'chartColor': "#8F70CE",
                'alarmId': "HEART_MUTE_{measurementCode}"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {},
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 60,
                viewSecond: 3600,
                listCount: 15,
                viewCount: 900,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 2,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_HEART_RATE_LIST,
                    receiveVariable: "rawDataIntList",
                    use: {
                        list: true,
                        view: true
                    },
                    term2: {
                        list: -60,
                        view: -3600
                    },
                    latestCheckTerm: 10 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 3, // 초, 데이타 사이의 간격, 1000을 더 나눠야 하는데, 계산시 처리에 문제가 있어서 그 부분은 실제 적용시 처리
                term: 3000, //밀리초, setInterval에 사용
                socketReceiveTerm: 4,
                perSocketReceiveTermDataCount: 1,
                newProcessTerm: {},
                processTerm: 3,
                doubleProcessTerm: 6,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                runCount: {},
                first: {},
                socketReceiveDelay: {},
                type: "default" // default, worker, timeout
            },
            chartMinmax: {
                minimum: 0,
                maximum: 250
            },
            chartRealtime: false,
            chartConnect: false,
            chartObject: {},
            correct: {
                seconds: 0.0001
            },
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#EED011"
            }
        },

        ACT: {
            use: false,
            setInitChartDataFunctionName: "setInitChartDataForD3",
            getChartDataFunctionName: "getInitChartDataForD3",
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.ECG,
            receiveVariable: "activityLevelDataList",
            viewInfo: {
                'list': {
                    'valueId': "ACT_value_{measurementCode}",
                    'chartId': "ACT_chart_{measurementCode}"
                },
                'detail': {
                    'valueId': "actVal_{measurementCode}",
                    'maxValueId': "actMax_{measurementCode}",
                    'minValueId': "actMin_{measurementCode}",
                    'chartId': "actChart_{measurementCode}",
                },
                'chartColor': "#5882FA",
                'alarmId': null
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {},
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 30,
                viewSecond: 3600,
                listCount: 20,
                viewCount: 1200,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 1,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_ACTIVITY_LEVEL_LIST,
                    receiveVariable: "rawDataIntList",
                    use: {
                        list: true,
                        view: true
                    },
                    term2: {
                        list: -60,
                        view: -3600
                    },
                    latestCheckTerm: 6 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 3, // 초, 데이타 사이의 간격, 1000을 더 나눠야 하는데, 계산시 처리에 문제가 있어서 그 부분은 실제 적용시 처리
                term: 3000, //밀리초, setInterval에 사용
                socketReceiveTerm: 3,
                perSocketReceiveTermDataCount: 1,
                newProcessTerm: {},
                processTerm: 3,
                doubleProcessTerm: 6,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                runCount: {},
                first: {},
                socketReceiveDelay: {},
                type: "default" // default, worker, timeout
            },
            chartMinmax: {
                minimum: 0,
                maximum: 11
            },
            chartRealtime: false,
            chartConnect: true,
            chartObject: {},
            correct: {
                seconds: 0.0001
            },
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#5882FA"
            }
        },

        EWS: {
            use: true,
            setInitChartDataFunctionName: "setInitChartDataForD3",
            getChartDataFunctionName: "getInitChartDataForD3",
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.ECG,
            receiveVariable: "ewsDataList",
            viewInfo: {
                'list': {
                    'valueId': "EWS_value_{measurementCode}",
                    // 'chartId': "EWS_chart_{measurementCode}"
                    'chartId': null
                },
                'detail': {
                    'valueId': "ewsVal_{measurementCode}",
                    'maxValueId': "ewsMax_{measurementCode}",
                    'minValueId': "ewsMin_{measurementCode}",
                    // 'chartId': "ewsChart_{measurementCode}",
                    'chartId': null
                },
                'chartColor': "#A4A4A4",
                'alarmId': "EWS_MUTE_{measurementCode}"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {},
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 30,
                viewSecond: 3600,
                listCount: 20,
                viewCount: 1200,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 1,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_EWS_LIST,
                    receiveVariable: "ewsSimpleList",
                    use: {
                        list: true,
                        view: true
                    },
                    term2: {
                        list: -60,
                        view: -3600
                    },
                    latestCheckTerm: 6 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 3, // 초, 데이타 사이의 간격
                term: 3000, //밀리초, setInterval에 사용
                socketReceiveTerm: 3, // 웹 소켓 수신 간격
                perSocketReceiveTermDataCount: 1, // 웹 소켓 수신시 데이타 개수
                processCount: 1, //interval 간격에 처리되는 데이터 수
                newProcessTerm: {},
                processTerm: 3,
                doubleProcessTerm: 6,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                runCount: {},
                first: {},
                socketReceiveDelay: {},
                type: "default" // default, worker, timeout
            },
            chartMinmax: {
                minimum: -1,
                maximum: 4
            },
            chartRealtime: false,
            chartConnect: true,
            chartObject: {},
            correct: {
                seconds: 0.0001
            },
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#FFFFFF"
            }
        },

        TEMP: {
            use: true,
            setInitChartDataFunctionName: "setInitChartDataForD3",
            getChartDataFunctionName: "getInitChartDataForD3",
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.TEMPERATURE,
            receiveVariable: "tempDataList",
            viewInfo: {
                'list': {
                    'valueId': "TEMP_value_{measurementCode}",
                    // 'chartId': "TEMP_chart_{measurementCode}"
                    'chartId': null
                },
                'detail': {
                    'valueId': "tempVal_{measurementCode}",
                    'maxValueId': "tempMax_{measurementCode}",
                    'minValueId': "tempMin_{measurementCode}",
                    // 'chartId': "tempChart_{measurementCode}",
                    'chartId': null,
                },
                'chartColor': "#EED011",
                'alarmId': "TEMP_MUTE_{measurementCode}"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {},
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 600,
                viewSecond: 3600,
                listCount: 10,
                viewCount: 60,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 0,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_TEMPERATURE_LIST,
                    receiveVariable: "rawDataDecimalList",
                    use: {
                        list: true,
                        view: true
                    },
                    term2: {
                        list: -600,
                        view: -3600
                    },
                    latestCheckTerm: 120 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 60, // 초, 데이타 사이의 간격
                term: 60000, //밀리초, setInterval에 사용
                socketReceiveTerm: 60, // 웹 소켓 수신 간격
                perSocketReceiveTermDataCount: 1, // 웹 소켓 수신시 데이타 개수
                processCount: 1, //interval 간격에 처리되는 데이터 수
                newProcessTerm: {},
                processTerm: 60,
                doubleProcessTerm: 120,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                runCount: {},
                first: {},
                socketReceiveDelay: {},
                type: "default" // default, worker, timeout
            },
            chartMinmax: {
                minimum: 25,
                maximum: 42
            },
            chartRealtime: false,
            chartConnect: true,
            chartObject: {},
            correct: {
                seconds: 0.0001
            },
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#5882FA"
            }
        },

        SPO2: {
            use: true,
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.SPO2,
            receiveVariable: "spO2DataList", // ppgDataList (그래프용)
            viewInfo: {
                'list': {
                    'valueId': "SPO2_value_{measurementCode}",
                    // 'chartId': "SPO2_chart_{measurementCode}"
                    'chartId': null
                },
                'detail': {
                    'valueId': "spo2Val_{measurementCode}",
                    'maxValueId': "spo2Max_{measurementCode}",
                    'minValueId': "spo2Min_{measurementCode}",
                    // 'chartId': "spo2Chart_{measurementCode}",
                    'chartId': null
                },
                'chartColor': "#dd44a5",
                'alarmId': "SPO2_MUTE_{measurementCode}"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {}, //한바퀴가 돌고, 뒤에 데이타가 남아져있는 효과를 위한 이전 텀의 데이타
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 30,
                viewSecond: 3600,
                listCount: 20,
                viewCount: 1200,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 1,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_SPO2_LIST,
                    receiveVariable: "rawDataIntList",
                    use: {
                        list: false,
                        view: false
                    },
                    term2: {
                        list: -60,
                        view: -3600
                    },
                    latestCheckTerm: 3 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 3, // 초, 데이타 사이의 간격
                term: 3000, //밀리초, setInterval에 사용
                socketReceiveTerm: 3, // 웹 소켓 수신 간격
                perSocketReceiveTermDataCount: 1, // 웹 소켓 수신시 데이타 개수
                processCount: 1, //interval 간격에 처리되는 데이터 수
                newProcessTerm: {},
                processTerm: 3,
                doubleProcessTerm: 6,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                runCount: {},
                first: {},
                socketReceiveDelay: {},
                type: "default" // default, worker, timeout
            },
            chartMinmax: {
                minimum: 80,
                maximum: 105
            },
            correct: {
                seconds: 0.0001
            },
            chartRealtime: false,
            chartConnect: true,
            chartObject: {}
        },

        RESP: {
            use: true,
            initFunctionName: "setInitChartDatas",
            getFunctionName: "getChartDatasForReverse2", // getChartDatas or getChartDatasForReverse
            deviceType: CUSTOM.DEVICE.TYPE.CODE.ECG,
            receiveVariable: "respDataList",
            viewInfo: {
                'list': {
                    'valueId': "RESP_value_{measurementCode}",
                    // 'chartId': "RESP_chart_{measurementCode}"
                    'chartId': null
                },
                'detail': {
                    'valueId': "respVal_{measurementCode}",
                    'maxValueId': "respMax_{measurementCode}",
                    'minValueId': "respMin_{measurementCode}",
                    // 'chartId': "respChart_{measurementCode}",
                    'chartId': null
                },
                'chartColor': "#e83305",
                'alarmId': "RESP_MUTE_{measurementCode}"
            },
            data: {
                receiveDevel: {},
                receiveOrigin: {},
                chart: {},
                chartBack: {}, //한바퀴가 돌고, 뒤에 데이타가 남아져있는 효과를 위한 이전 텀의 데이타
                chartStack: {}, //인터벌을 똘때마다 현재 데이타를 쌓은 임시 데이타
                listSecond: 30,
                viewSecond: 3600,
                listCount: 20,
                viewCount: 1200,
                breakValue: null,
                breakValueBackDataUse: false, // 누락된 데이탁 있을 경우 바로 전 데이타의 값으로 처리 여부
                reverseCount: {},
                edgeEffectCount: 1,
                baseData: {
                    apiUrl: GBL.API.URL.MEASUREMENT.SELECT_RESP_LIST,
                    receiveVariable: "rawDataIntList",
                    use: {
                        list: false,
                        view: false
                    },
                    term2: {
                        list: -60,
                        view: -3600
                    },
                    latestCheckTerm: 3 //초
                }
            },
            minmax: {
                min: 0,
                max: 0
            },
            // second 로 그래프를 처리할때 변수
            interval: {
                dataTerm: 3, // 초, 데이타 사이의 간격
                term: 3000, //밀리초, setInterval에 사용
                socketReceiveTerm: 3, // 웹 소켓 수신 간격
                perSocketReceiveTermDataCount: 1, // 웹 소켓 수신시 데이타 개수
                processCount: 1, //interval 간격에 처리되는 데이터 수
                newProcessTerm: {},
                processTerm: 3,
                doubleProcessTerm: 6,
                correct: {
                    normal: 0.66,
                    min: 0.33,
                    max: 0.34
                },
                proceedTime: {},
                obj: {},
                runCount: {},
                first: {},
                socketReceiveDelay: {},
                type: "default" // default, worker, timeout
            },
            chartMinmax: {
                minimum: 10,
                maximum: 40
            },
            correct: {
                seconds: 0.0001
            },
            chartRealtime: false,
            chartConnect: true,
            chartObject: {},
            chartOption: {
                fill: "none",
                stroke_width: 1,
                stroke_color: "#58fac7"
            }
        },
        DEVICE_STATUS: {
            use: false,
            initFunctionName: null,
            getFunctionName: null,
            deviceType: CUSTOM.DEVICE.TYPE.CODE.DEVICE_STATUS
        },
        HEARTRATE: {
            use: false,
            initFunctionName: null,
            getFunctionName: null,
            deviceType: CUSTOM.DEVICE.TYPE.CODE.HEARTRATE
        },
        IGNORE: {
            use: false,
            // codes: "c004,c003,c002,c001,b013,b011,b010,b009,b008,b007,b006,b005,b004,b003,b002,b001"
            // codes: "c002,c001,b013,b011,b010,b009,b008,b007,b006,b005,b004,b003,b002,b001"
            codes: [
                // "SEERS_2112150016_J581",
                // "SEERS_2112151858_SMD5",
                // "SEERS_2112151814_8A3W",
                // "SEERS_2112151819_A787",
                // "SEERS_2112151817_AWV7",
                // "SEERS_2112151902_WQTV",
                // "SEERS_2112161014_3LFS",
                // "SEERS_2112151815_3677",
                // "SEERS_2112161025_A773",
                // "SEERS_2112151816_8646",
                // "SEERS_2112151859_13RW",
                // "SEERS_2112151818_72EQ",
            ]
            // codes: []
        },
        LOG: {
            codes: [
                // "SEERS_2112150016_BEV1"
            ] // "SEERS_2112151500_F5T4"
        }
    }
}
CUSTOM.MODULE['socket'] = {
    RECEIVE: {
        COUNT: {
            ECG: {},
            TEMPERATURE: {}
        }
    },
    STOMP: {
        CLIENT: null,
        CLIENT_KEY: {
            DATA: null,
            EVENT: null
        },
        SUBSCRIBE: {},
        MULTI_SUBSCRIBE: {
            NORMAL: {},
            SIMPLE: {}
        }
    }
}