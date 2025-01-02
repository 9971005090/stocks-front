"use strict";

const promise = async () => {

    const {CONST: CONST} = await import(`/js/module/popup/constant.js${ver_string}`);
    const model = await import(`/js/module/popup/model.js${ver_string}`);
    const html = await import(`/js/module/popup/template/${CONST.DESIGN.THEME}/design.js${ver_string}`);

    const pre = function() {
        return new Promise(function(resolve, reject) {
            let loadingEnd = function() {
                resolve(true);
            }
            let options = {
                files: [
                    `/js/module/popup/assets/css/${CONST.DESIGN.THEME}/style.css${ver_string}`
                ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
    }


    const index = function() {
        Object.entries(CONST.DATA).forEach(entry => {
            const [key, value] = entry;
            if(model.isVisible(key, value) === true) {
                etc.setHtmlParsing($(GBL.DESIGN.MAIN_DIV_NAME), html.popup, value);
            }
        });
    }

    const closed = function(code, today = false) {
        model.closed(code, today);
    }

    return {
        pre: pre,
        index: index,
        closed: closed
    };
};

export { promise }