"use strict";
const promise = async () => {

    const {CONST: CONST} = await import(`/js/module/socket/constant.js${ver_string}`);
    const {FUNCTION: DEFAULT_FUNCTION} = await import(`/js/module/socket/library/default.js${ver_string}`);
    const {FUNCTION: CUSTOM_FUNCTION} = await import(`/js/module/socket/library/custom.js${ver_string}`);
    CONST.SET_FUNCTION(DEFAULT_FUNCTION, CUSTOM_FUNCTION);

    const pre = function() {
        return new Promise(function(resolve, reject) {
            let loadingEnd = function() {
                resolve(true);
            }
            let options = {
                files: [
                    `/js/module/socket/assets/js/sockjs-1.5.0.js${ver_string}`,
                    `/js/module/socket/assets/js/stomp-1.7.1.js${ver_string}`
                ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
    }

    const index = function(parameter = {}) {
        CONST.FUNCTION.UTIL.connectStreamServer(parameter);
    }

    return {
        pre: pre,
        index: index
    };
};

export { promise }