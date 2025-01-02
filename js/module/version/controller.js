"use strict";

const promise = async () => {

    const {CONST: CONST} = await import(`/js/module/version/constant.js${ver_string}`);
    const html = await import(`/js/module/version/template/${CONST.DESIGN.THEME}/design.js${ver_string}`);

    const index = function() {
        let template = Handlebars.compile(html.content);
        if (CONST.DESIGN.DIV_CLEAR === true) {
            $(`${CONST.DESIGN.DIV_NAME}`).html(``);
        }
        $(`${CONST.DESIGN.DIV_NAME}`).append(template());
        viewAppVer();
    }

    let viewAppVer = function() {
        if(CONST.DESIGN.VIEW_COLUMN.VERSION === true) {
            $(".version").text(CONST.DATA.version);
        }
        if(CONST.DESIGN.VIEW_COLUMN.COPYRIGHT === true) {
            $(".copyright").text(CONST.DATA.copyright);
        }
    }

    return {
        index: index
    };
};

export { promise }