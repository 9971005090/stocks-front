"use strict";
export const CONST = {
    API: {
        URL: {
            'SELECT': "/Manager/SelectMeasurementOrgPeriodCount",
            'SELECT_FOR_DAY': "/Manager/SelectMeasurementOrgDayCount",
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
    SEARCH_TYPE: {
        IS_COUNT_ZERO_USE: {
            IS_TRUE: 0, // 기간 검색중 0인건들 포함,
            IS_FALSE: 1 // 기간 검색중 0인건들 비포함(1건 이상),
        }
    },
    INIT: function() {

    },
}
CONST.INIT();