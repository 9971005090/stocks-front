"use strict";

const promise = async () => {
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/buttons.js${ver_string}`);



    const setAddEvent = function(){
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
