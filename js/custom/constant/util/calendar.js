
const _language = GBL.CONSTANTS.get(`LANGUAGE`);
export const UTIL = {
    '_CALENDAR_DATE_SELECTED': function(choice, obj) {
        $(`#${obj.id}`).val(choice.substr(0, 10));
    },
    '_GET_CALENDAR_PICKER_OPTIONS': function(yearRange) {
        return {
            controlType: 'select',
            dateFormat: 'yy-mm-dd', // 일 표시 형식
            yearRange: `2023:${yearRange}`,
            dayNamesMin: _language.BASE.WORD.CALENDAR.ARRAY_DAYS,
            monthNamesShort: _language.BASE.WORD.CALENDAR.ARRAY_MONTHS,
            monthNames: _language.BASE.WORD.CALENDAR.ARRAY_MONTHS,
            yearSuffix: _language.BASE.WORD.CALENDAR.YEAR,
            showButtonPanel: false,
            onSelect: UTIL._CALENDAR_DATE_SELECTED,
            showTimepicker: false
        }
    },
}

export const EVENT = {
    'INDEX': function () {
        let nowDate = new Date();
        $(`.buy_date`).datetimepicker(UTIL._GET_CALENDAR_PICKER_OPTIONS(nowDate.getFullYear()));
    },
}