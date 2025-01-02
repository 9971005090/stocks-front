"use strict";

const promise = async () => {
    const preAction = function() {
        Handlebars.registerHelper('_t', function(object, key) {
            return object[key];
        });
    }

    const index = async function() {
        let parameter = {
            "pageName" : "log",
        }
        await Seers.Loader.moduleLoad("crud", "index", parameter);

        // console.log(LOG_CONST.EXCEPTION_TYPE.TITLE);
        // const _e = Array.deepCopy(LOG_CONST.EXCEPTION_TYPE.TITLE);
        // const sortedKeys = Object.keys(_e).sort().reverse();
        // console.log(sortedKeys);
        // let sortedObj = {};
        // sortedKeys.forEach(key => {
        //     sortedObj[key] = _e[key];
        // });
        // const _c = {
        //     EXCEPTION_TYPE: sortedObj,
        // };
        // console.log(sortedObj);
        // GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        // $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
        // etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.index);
        // // selectBoxSyncHis(`searchSyncHisSelectBox`, true);
        // // selectBoxDeviceManager(`searchDeviceManagerSelectBox`, true);
        // setAddEvent();
        // setTimeout(function() {
        //     _search(`first`);
        // }, 200);
    };

    return {
        preAction: preAction,
        index: index
    };
};

export { promise }