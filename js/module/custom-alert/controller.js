"use strict";

const promise = async () => {

    const {CONST: CONST} = await import(`/js/module/custom-alert/constant.js${ver_string}${String.generateRandom(6)}`);
    const html = await import(`/js/module/custom-alert/template/${CONST.DESIGN.THEME}/design.js${ver_string}`);
    let modalId = "modal";
    let callback = null;
    let dataId = null;
    let modalObj = null;

    const index = function(initParameter = null) {
        let modalEventCallback = null;
        let modalTitle = null;
        let modalClass = null;
        if(initParameter == null) {
            return null;
        }
        if(initParameter.hasOwnProperty("msg") === false || initParameter.hasOwnProperty("id") === false) {
            return null;
        }
        if(initParameter.hasOwnProperty("modalEventCallback") === true && initParameter.modalEventCallback !== null) {
            modalEventCallback = initParameter.modalEventCallback;
        }
        if(initParameter.hasOwnProperty("title") === true && initParameter.title !== null) {
            modalTitle = initParameter.title;
        }
        if(initParameter.hasOwnProperty("class") === true && initParameter.class !== null) {
            modalClass = initParameter.class;
        }
        modalId = initParameter.id;
        let button = {
            cancel: {
                isUse: true,
                buttonObj: CONST.DESIGN.BUTTON.CANCEL,
                callback: [
                    {
                        name: modal.globalClose,
                        params: [modalId]
                    }
                ]
            },
            ok: {
                isUse: true,
                buttonObj: CONST.DESIGN.BUTTON.OK,
                callback: [
                    {
                        name: modal.globalClose,
                        params: [modalId]
                    }
                ]
            },
            del: {
                isUse: true,
                buttonObj: CONST.DESIGN.BUTTON.DEL,
                callback: [
                    {
                        name: modal.globalClose,
                        params: [modalId]
                    }
                ]
            }
        }
        let isBackgroundClickForClose = false;
        if(initParameter.hasOwnProperty("button") === true) {
            $.extend(true, button, initParameter.button);
            // callback은 배열이라서 잘 안되는 듯. 직접 수동으로.
            if (initParameter.button.hasOwnProperty(`ok`) === true && initParameter.button.ok.hasOwnProperty(`callback`) === true) {
                button.ok.callback = initParameter.button.ok.callback;
            }
            if (initParameter.button.hasOwnProperty(`cancel`) === true && initParameter.button.cancel.hasOwnProperty(`callback`) === true) {
                button.ok.cancel = initParameter.button.cancel.callback;
            }
            if (initParameter.button.hasOwnProperty(`del`) === true && initParameter.button.del.hasOwnProperty(`callback`) === true) {
                button.del.callback = initParameter.button.del.callback;
            }
        }
        if(initParameter.hasOwnProperty("isBackgroundClickForClose") === true) {
            isBackgroundClickForClose = initParameter.isBackgroundClickForClose;
        }
        let templateValue = {
            id: initParameter.id,
            msg: initParameter.msg,
            button: button,
            isBackgroundClickForClose: isBackgroundClickForClose,
            title: modalTitle,
            class: modalClass,
            modalEventCallback: modalEventCallback
        }
        modalObj = new modal(templateValue);
        modalObj.open(html.modal, templateValue);

        // 레이어팝업 위에 작은 alert 창이 떴을시 구분을 주기 위해 background 변경
        if($(".layer_popup_container").hasClass("onModal")){
            let onModalId = $(`.layer_popup_container.onModal`).prop('id');
            $(`#${onModalId}_background`).css('opacity', 1);
        }
    }

    return {
        index: index
    };
};

export { promise }