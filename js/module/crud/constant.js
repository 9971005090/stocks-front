"use strict";
export const CONST = {
    VERSION: "0.1.0",
    DESIGN: {
        THEME: "default",
        DIV_NAME: ".common-cont",
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
    INIT: function() {
        CONST.DESIGN.THEME = "thync-manager";
    },
    POST_PROCESS: {
        index: function() {
        }
    }
}
CONST.INIT();