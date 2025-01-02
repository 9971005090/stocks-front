"use strict";

const promise = async () => {

    const {CONST: CONST} = await import(`/js/module/paging/constant.js${ver_string}`);
    const html = await import(`/js/module/paging/template/${CONST.DESIGN.THEME}/design.js${ver_string}`);
    const ignoreAuthAction = ["index"];
    let dataPerPage = CONST.PAGING.DATA.PAGE.PER_COUNT;
    let currentPage = 1;
    let pageCount = CONST.PAGING.DATA.PAGE.PER_PAGE;
    let totalPage = 0
    let callback = null;
    let prefix = "default";
    let baseParameter = null;

    const pre = function() {
        return new Promise(function(resolve, reject) {

            let loadingEnd = function() {
                // 아래 영역에 코드 작성
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                resolve(true);
            }
            let options = {
                files: [
                    // 아래 영역에 코드 작성(필요한 js, css 로딩)
                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                    `/js/module/paging/assets/css/${CONST.DESIGN.THEME}/default.css${ver_string}`
                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
    }

    const index = function(parameter = null) {
        let parsingValue = {
            prefix: prefix,
            dataPerPage: dataPerPage,
            currentPage: currentPage,
            pageCount: pageCount,
            pagingExist: false,
            divName: "#pagination",
            paging: {
                datas: [],
                prev: false,
                next: false
            }
        };
        if(parameter == null) {
            etc.setHtmlParsing($(parsingValue.divName), html.paging, parsingValue);
            return
        }
        if(parameter.hasOwnProperty("callback") === true) {
            callback = parameter.callback;
        }
        if(parameter.hasOwnProperty("totalData") === false) {
            etc.setHtmlParsing($(parsingValue.divName), html.paging, parsingValue);
            // callback();
            $(parsingValue.divName).html('');
            return;
        }
        if(parameter.totalData == 0 || parameter.totalData == null) {
            etc.setHtmlParsing($(parsingValue.divName), html.paging, parsingValue);
            // callback();
            $(parsingValue.divName).html('');
            return;
        }

        if(parameter.hasOwnProperty("baseParameter") === true) {
            baseParameter = parameter.baseParameter;
        }
        if(parameter.hasOwnProperty("prefix") === true) {
            prefix = parameter.prefix;
            parsingValue.prefix = parameter.prefix;
        }
        if(parameter.hasOwnProperty("currentPage") === true) {
            if(parameter.currentPage > 0) {
                currentPage = parameter.currentPage;
                parsingValue.currentPage = currentPage;
            }
        }
        if(parameter.hasOwnProperty("dataPerPage") === true) {
            if(parameter.dataPerPage > 0) {
                dataPerPage = parameter.dataPerPage;
                parsingValue.dataPerPage = dataPerPage;
            }
        }
        if(parameter.hasOwnProperty("pageCount") === true) {
            if(parameter.pageCount > 0) {
                pageCount = parameter.pageCount;
                parsingValue.pageCount = pageCount;
            }
        }
        if(parameter.hasOwnProperty("divName") === true) {
            parsingValue.divName = parameter.divName;
        }

        totalPage = Math.ceil(parameter.totalData / dataPerPage);

        if(currentPage > 1) {
            parsingValue.paging.prev = true;
            parsingValue.paging.first = true;
        }
        if(currentPage < totalPage) {
            parsingValue.paging.next = true;
            parsingValue.paging.last = true;
        }

        let first = 1;
        if(totalPage > pageCount && currentPage > (pageCount / 2) + 1)
        {
            first = currentPage - (pageCount / 2);
            if(currentPage + ((pageCount / 2) - 1) > totalPage)
            {
                first = totalPage - (pageCount - 1);
            }
        }
        let last = totalPage <= pageCount ? totalPage : pageCount;
        if(totalPage > pageCount && currentPage > ((pageCount / 2) + 1))
        {
            last = currentPage + ((pageCount / 2) - 1);
            if(currentPage + ((pageCount / 2) - 1) > totalPage)
            {
                last = totalPage;
            }
        }
        for(let i = first; i <= last; i++) {
            let active = false;
            if(i == currentPage) {
                active = true
            }
            parsingValue.paging.datas.push({number: i, active: active});
        }

        $($(parsingValue.divName)).html("");
        parsingValue.pagingExist = true;
        let designName = html.paging;
        if(parameter.hasOwnProperty("designName") === true) {
            designName = html[parameter.designName]
        }
        etc.setHtmlParsing($(parsingValue.divName), designName, parsingValue);
        addEvent();
        if(parameter.callbackRun === true) {
            callback();
        }
    }

    const addEvent = function() {
        let passingParameter = {
            currentPage: currentPage,
            totalPage: totalPage,
            prefix: prefix,
            move: move,
            type: null // 나중에 디자인별 구분이 필요할지 몰라
        };
        CONST.ADD_EVENT(passingParameter);
    }

    const move = function(page) {
        let selectPage = page
        if(selectPage == 'First') {
            selectPage = 1;
        }
        if(selectPage == 'Prev') {
            selectPage = currentPage - 1;
        }
        if(selectPage == 'Next') {
            selectPage = currentPage + 1;
        }
        if(selectPage == 'Last') {
            selectPage = totalPage;
        }
        currentPage = selectPage;
        $(`#${prefix}_currentPage`).val(currentPage);
        if (Array.isArray(baseParameter) === false){
            baseParameter = [baseParameter];
        }
        callback(...baseParameter);
    }

    return {
        ignoreAuthAction: ignoreAuthAction,
        pre: pre,
        index: index,
        move: move
    };
};

export { promise }
