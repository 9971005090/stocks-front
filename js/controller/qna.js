"use strict";

const promise = async () => {
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/qna.js${ver_string}`);

    const {EVENT: SELECT_BOX_EVENT} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);

    const setAddEvent = function(){
        const selectBoxCallback = function (choiceBox) {
            let selectObj = $(choiceBox).parents(".cm-select-box");
            selectObj.children(".check").val($(choiceBox).data("code"));
        }
        SELECT_BOX_EVENT.ON_CLICK(`.cm-select-box`, `.option-list`, `.option-item`, `.label`, `selected`, selectBoxCallback);

        // 페이징 처리 파라미터 셋팅 및 호출
        let pagingParameter = {
            divName: ".pagination",
            totalData: 10,
            callbackRun: false,
            dataPerPage: 10
        }
        pagingParameter.currentPage = 1;
        pagingParameter.pageCount = 10;

        Seers.Loader.moduleLoad("paging", "index", pagingParameter);

        $('.modal-btn').off("click").on('click', function(e){
            etc.stopBubbling(e);
            let modalObj = null;
            let templateValue = {
                "id": "common-modal",
                "isBackgroundClickForClose" : false,
            }
            modalObj = new modal(templateValue);
            modalObj.open(html.modalHtml, templateValue);
            $('.btn-modal-confirm, .btn-close').off("click").on('click', function(e){
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
