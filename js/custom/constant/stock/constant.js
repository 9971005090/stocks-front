"use strict";
export const CONST = {
    API: {
        URL: {
            'SELECT': "/fb_stocks",
            'TREND': "/fb_trend/{{stock_name}}/{{term}}",
            'DELETE': "/fb_stocks/delete",
            'UPDATE': "/fb_stocks/update",
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
}