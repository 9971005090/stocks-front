"use strict";

const promise = async () => {

    const {CONST: CONST} = await import(`/js/module/alert/constant.js${ver_string}`);
    const html = await import(`/js/module/alert/template/${CONST.DESIGN.THEME}/design.js${ver_string}`);
    let modalId = "modal";
    let callback = null;
    let dataId = null;
    let modalObj = null;

    const index = function(initParameter = null) {
        if(initParameter == null) {
            return null;
        }
        if(initParameter.hasOwnProperty("msg") === false || initParameter.hasOwnProperty("id") === false) {
            return null;
        }

        modalId = initParameter.id;
        let templateValue = {
            id: initParameter.id,
            msg: initParameter.msg
        }
        modalObj = new modal(templateValue);
        modalObj.open(html.modal, templateValue);
    }

    return {
        index: index
    };
};

export { promise }