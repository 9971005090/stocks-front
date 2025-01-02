"use strict";

const promise = async () => {
    const {CONST: DEFAULT_CONST} = await import(`/js/custom/constant/default/constant.js${ver_string}`);
    const {CONST: STOCK_CONST} = await import(`/js/custom/constant/stock/constant.js${ver_string}`);
    const {UTIL: STOCK_UTIL} = await import(`/js/custom/constant/stock/util.js${ver_string}`);
    const {UTIL: CUSTOM_UTIL} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const {UTIL: CALENDAR_UTIL, EVENT: CALENDAR_EVENT} = await import(`/js/custom/constant/util/calendar.js${ver_string}`);
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/stocks.js${ver_string}`);
    const htmlForUnit = await import(`/template/${GBL.DESIGN.THEME}/content/unit.js${ver_string}`);
    const ignoreAuthAction = ["index", "view"]; // urlProcess 페이지는 인증 체크 테스트 페이지
    const _searched = {
        data: null
    }

    const pre = function() {
        return new Promise(function(resolve, reject) {

            let loadingEnd = function() {
                // 아래 영역에 코드 작성
                //////////////////////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////////
                resolve(true);
            }
            let options = {
                files: [
                    // 아래 영역에 코드 작성(필요한 js, css 로딩)
                    //////////////////////////////////////////////////////////////////////////////////////////////////
                    `/assets/css/theme/${GBL.DESIGN.THEME}/stocks/custom.css${ver_string}`,
                    `/js/util/jquery/jquery-ui.css${ver_string}`,
                    `/js/util/jquery/jquery-ui-timepicker-addon.js${ver_string}`,
                    `/assets/css/theme/${GBL.DESIGN.THEME}/jquery-ui-timepicker-addon.css${ver_string}`,
                    //////////////////////////////////////////////////////////////////////////////////////////////////
                ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
    }

    const preAction = function() {
        // const _t = ORGAN_UTIL.LIST();
        // let _p = {};
        // let _d = [];
        // for (let i = 0; i < _t.organizationList.length; i++) {
        //     _p[_t.organizationList[i].organizationCode] = _t.organizationList[i].organizationName;
        //     _d.push({
        //         code: _t.organizationList[i].organizationCode,
        //         title: _t.organizationList[i].organizationName,
        //     });
        // }
        // GBL.CONSTANTS.set(`ORGANIZATIONS`, _t, true);
        // GBL.CONSTANTS.set(`ORGANIZATION_DATAS`, _d, true);
        // GBL.CONSTANTS.set(`PARSING_ORGANIZATIONS`, _p, true);
    }
    const _search = function(type = `search`) { //first, search
        let colspan = 10;
        $(`${STOCK_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.searching);
        $("#contents-by-data-table td").attr("colspan", colspan);
        if (type === `search`) {
            custom.etc.showLoading(GBL.DESIGN.MAIN_DIV_NAME);
        }
        const currentPage = $(`#gateway_currentPage`).length > 0 ? Number($(`#gateway_currentPage`).val()) : 1;
        const params = etc.formSearchParser(`.form-common-search`);
        params.pageNumber = currentPage;
        params.count = DEFAULT_CONST.PAGING.DATA_COUNT;
        if($("#searchOrganSelectBox .selectItem").val() === "all"){
            delete params.searchOrganizationCode;
        }
        const _t = STOCK_UTIL.LIST(params);
        custom.etc.removeLoading();
        if (_t.result === true) {
            if (_t.stocks !== null && _t.stocks.length > 0) {
                // let startVirtualNumber = Number.getStartVirtualNumber(_t.totalCount, DEFAULT_CONST.PAGING.DATA_COUNT, currentPage);
                // for (let i = 0; i < _t.stocks.length; i++) {
                //     _t.stocks[i] = STOCK_UTIL.DATA_PARSING(_t.stocks[i]);
                //     _t.stocks[i].virtualNumber = startVirtualNumber - i;
                // }
                _searched.data = _t.stocks;
                $(`${STOCK_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(``);
                etc.setHtmlParsing($(`${STOCK_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`), html.dataTable, {datas: _t.stocks});
                setAddEvent(`datas`);
            }
            else {
                $(`${STOCK_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.notFound);
                $("#contents-by-data-table td").attr("colspan", colspan);
            }
        }
        else {
            $(`${STOCK_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.fail);
            $("#contents-by-data-table td").attr("colspan", colspan);
        }
        $(`#content-by-last-update`).text(new Date().toString('yyyy-MM-dd HH:mm:ss'));
    }

    const setAddEvent = function(content = `index`){
        if (content === `index`) {
        }
        else if (content === `datas`) {
            CALENDAR_EVENT.INDEX();

            CUSTOM.EVENT.HTML.push(`.button-delete`)
            $(`.button-delete`).off("click").on("click", function (e) {
                etc.stopBubbling(e);
                CUSTOM_UTIL.DELETE_ALERT(STOCK_UTIL.DELETE, $(this).parents('.cm-tr').attr('data-stock-firebase-id'), _search);
            });

            CUSTOM.EVENT.HTML.push(`.button-update`)
            $(`.button-update`).off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let update = {
                    firebaseId: $(this).parents('.cm-tr').attr('data-stock-firebase-id'),
                    column: null,
                    value: null
                }
                let _v = $(this).parents('.cm-td').find(`.cm-input-text`).val().trim();
                if (_v === "") {
                    custom.etc.customToastForColor(`수정하려는 값을 정확히 입력하세요`, `bgRed`);
                    return;
                }
                if ($(this).attr(`data-type`) === `average_price`) {
                    update.column = `average_price`;
                    update.value = Number(_v.replaceAll(",", ""));
                    if (isNaN(update.value) === true) {
                        custom.etc.customToastForColor(`수정하려는 값을 정확히 입력하세요`, `bgRed`);
                        return;
                    }
                }
                else {
                    update.column = `buy_date`;
                    update.value = new Date(_v);
                    if (isNaN(update.value) === true) {
                        custom.etc.customToastForColor(`수정하려는 값을 정확히 입력하세요`, `bgRed`);
                        return;
                    }
                }
                const _r = STOCK_UTIL.UPDATE(update);
                if (_r.result === true) {
                    _search();
                    custom.etc.customToastForColor(`정상적으로 수정됐습니다.`);
                }
                else {
                    custom.etc.customToastForColor(`수정에 실패했습니다. 잠시 후 다시 시도하세요`, `bgRed`);
                }
            });

            CUSTOM.EVENT.HTML.push(`.chart-detail`)
            $(`.chart-detail`).off("click").on("click", function (e) {
                etc.stopBubbling(e);
                const selectedCode = $(this).parents('.cm-tr').attr('data-stock-code');
                const templateValue = {
                    id: `chart-detail`,
                    chart: null
                }
                let modalObj = null;
                for (let _d of _searched.data) {
                    if (_d.code === selectedCode) {
                        templateValue.chart = _d.chart;
                        break;
                    }
                }
                modalObj = new modal(templateValue);
                modalObj.open(html.modalForChartOriginal, templateValue);

                CUSTOM.EVENT.HTML.push(`.confirm-btn`);
                $(`.confirm-btn`).off(`click`).on(`click`, function(e){
                    etc.stopBubbling(e);
                    modalObj.close();
                })
            });

            CUSTOM.EVENT.HTML.push(`.button-trend-view`)
            $(`.button-trend-view`).off("click").on("click", function (e) {
                etc.stopBubbling(e);
                const selectedName = $(this).parents('.cm-tr').attr('data-stock-name');
                const _t = STOCK_UTIL.TREND(selectedName);

                if (_t.result === true) {
                    const templateValue = {
                        id: `trend-detail`,
                        keyword: selectedName,
                        datas: _t.trend
                    }
                    let modalObj = new modal(templateValue);
                    modalObj.open(html.modalForGoogleTrend, templateValue);

                    CUSTOM.EVENT.HTML.push(`.confirm-btn`);
                    $(`.confirm-btn`).off(`click`).on(`click`, function(e){
                        etc.stopBubbling(e);
                        modalObj.close();
                    })
                }
                else {
                    custom.etc.customToastForColor(`조회에 실패했습니다. 잠시 후 다시 시도하세요`, `bgRed`);
                }
            });


        }
        // CUSTOM_UTIL.MOVE_LIST("gateway");
    }

    const index = function() {
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.index);
        // selectBoxOrgan(`searchOrganSelectBox`, true);

        setAddEvent();
        _search(`first`);
        // setTimeout(function() {
        //     GBL.CONSTANTS.set(`REFRESH`, new Refresh({
        //         '#type': `timeout`, // timeout, interval
        //         '#mode': `real`, // real, test
        //         '#testTerm': 2 * 1000, // 10초
        //         '#callback': {
        //             func: _search,
        //             params: []
        //         }
        //     }), true);
        //     _search(`first`);
        // }, 200);
    };

    const add = function(){
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.add, {title: `등록`});
        // selectBoxOrgan(`searchOrganSelectBox`);
        SELECT_BOX_UTIL.MAKE({
            type: `organ`,
            datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
            all: {code: `all`, title: `기관선택`, isUse: false},
            default: null,
            attr: {
                name: `organizationCode`,
                'add-class': ['check', 'active-check']
            }
        }, {
            'parent': `.select-box-parent-for-organization`,
            'box': `.select-box-for-organization`,
            'option-list': `.select-box-option-list-for-organization`,
            'option-item': `.select-box-option-item-for-organization`,
            'label': `.select-box-label-for-organization`,
            'selected-class': `selected`,
            'box-id': 'select-box-for-organization'
        }, {
            'width': `width: 216px;`,
            'height': `height: 32px;`,
            'margin-left': `margin-left: 0px;`,
        }, selectBoxCallback2);
        setAddEvent("add");
        custom.etc.removeLoading();
    }

    const update = function(params = null){
        const _t = STOCK_UTIL.SELECT(params.code);
        if (_t.result === true) {
            $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
            etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.update, {title: `수정`, datas: _t.gatewayInfo});
            custom.etc.removeLoading();
            setAddEvent(`update`);
        }
        else {
            custom.etc.customToastForColor(`네트웍 오류입니다. 잠시 후 다시 시도하세요..`, `bgRed`);
            etc.moveBack(1, `/gateway/index`);
        }
    }

    return {
        pre: pre,
        preAction: preAction,
        index: index,
        add: add,
        update: update,
    };
};

export { promise }