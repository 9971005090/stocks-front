"use strict";

const promise = async () => {
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/modal.js${ver_string}`);
    const setAddEvent = function(){
        $('.modal-btn').off("click").on('click', function(e){
            etc.stopBubbling(e);
            let modalObj = null;
            let templateValue = {
                "id": "common-modal",
                "isBackgroundClickForClose" : false,
            }
            modalObj = new modal(templateValue);
            modalObj.open(html.modalHtml, templateValue);
            $('.btn-modal-confirm').off("click").on('click', function(e){
                e.preventDefault();
                modalObj.close();
            });
        });
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
