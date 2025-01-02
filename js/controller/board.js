"use strict";

const promise = async () => {
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/board.js${ver_string}`);

    const index = function() {
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.html);
    };

    return {
        index: index,
    };
};

export { promise }
