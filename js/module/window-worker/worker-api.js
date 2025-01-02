"use strict";
importScripts("/js/util/util.js");
let ver_string = null;
const RUN_PROCESS = {
    // RUN_TREND_CHART_ON_MONITORING_VITAL: async function(result) {
    //     const {API: BIO_SIGNAL_API} = await import(`/js/custom/constant/data-init/api/bio-signal.js${ver_string}`);
    //     result.api = BIO_SIGNAL_API;
    //     result.PROCESS_TYPE = `RUN_TREND_CHART_ON_MONITORING_VITAL`;
    //     postMessage(result);
    // },
    // RUN_TREND_CHART_ON_MONITORING_VITAL_POPUP: async function(result) {
    //     const {API: BIO_SIGNAL_API} = await import(`/js/custom/constant/data-init/api/bio-signal.js${ver_string}`);
    //     result.api = BIO_SIGNAL_API;
    //     result.PROCESS_TYPE = `RUN_TREND_CHART_ON_MONITORING_VITAL_POPUP`;
    //     postMessage(result);
    // },
    // RUN_TREND_CHART_ON_MONITORING_REVIEW: async function(result) {
    //     result.PROCESS_TYPE = `RUN_TREND_CHART_ON_MONITORING_REVIEW`;
    //     postMessage(result);
    // },
    // ASYNC_GET_ARRHYTHMIA_DATA: async function(result) {
    //     // console.log("worker - result::::::", result);
    //     result.PROCESS_TYPE = `ASYNC_GET_ARRHYTHMIA_DATA`;
    //     postMessage(result);
    // },
    // RECODING_GET_DATA: async function(result) {
    //     const {PARSING: PARSING} = await import(`/js/module/window-worker/monitoring/recording.js${ver_string}`);
    //     result.PROCESS_TYPE = `RECODING_GET_DATA`;
    //     postMessage(PARSING.LIST(result));
    // },
    // RUN_TREND_CHART_ON_REPORT: async function(result) {
    //     const {PARSING: PARSING} = await import(`/js/module/window-worker/monitoring/report-for-trend.js${ver_string}`);
    //     result.PROCESS_TYPE = `RUN_TREND_CHART_ON_REPORT`;
    //     postMessage(PARSING.LIST(result));
    // },
}


/**
 * worker 사용시 메인스레드에서 보낸 데이타를 수신하는 함수
 * @param {MessageEvent} e 메인스레드에서 보낸 정보
 * @returns {void}
 */
self.onmessage = function( e ) {
    console.log("e:::", e);
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'SX-Auth-Token': e.data.info.token,
            'SX-Client-IP': null
        },
        body: JSON.stringify(e.data.parameter),
    }
    fetch(e.data.info.apiUrl, options)
        .then(
            async (response) => {
                // console.log("onSuccess", onSuccess);
                // console.log("response:", response);
                if (e.data.hasOwnProperty(`ver_string`) === true && e.data.hasOwnProperty(`PROCESS_TYPE`) === true) {
                    ver_string = e.data.ver_string;
                    const result = e.data.receiveParams;
                    result.response = await response.json();
                    if (e.data.parameter.hasOwnProperty(`pageNumber`) === true) {
                        result.response.passingParameter = {
                            pageNumber: e.data.parameter.pageNumber,
                            count: e.data.parameter.count
                        };
                    }
                    if (e.data.hasOwnProperty(`add`) === true) {
                        result.response.add = e.data.add;
                    }
                    RUN_PROCESS[e.data.PROCESS_TYPE](result);
                }
            }
        )
        .catch(
            (error) => {
                console.log("error:", error);
                postMessage(error);
            }
        );
};