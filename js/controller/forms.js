"use strict";

const promise = async () => {
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/forms.js${ver_string}`);
    const {EVENT: SELECT_BOX_EVENT} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);

    const setAddEvent = function(){
        const selectBoxCallback = function (choiceBox) {
            let selectObj = $(choiceBox).parents(".cm-select-box");
            selectObj.children(".check").val($(choiceBox).data("code"));
        }
        SELECT_BOX_EVENT.ON_CLICK(`.cm-select-box`, `.option-list`, `.option-item`, `.label`, `selected`, selectBoxCallback);
    }

    const index = function() {
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.html);
        setAddEvent();
    };

    return {
        index: index,
    };
};

export { promise }
