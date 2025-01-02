"use strict";
/**
 * @file 전체 메뉴에서 사용되는 셀렉트 박스 이벤트 정의 파일
 * @version 0.0.1
 * @description 전체 메뉴에서 사용되는 셀렉트 박스 이벤트 정의 파일
 * @author zaid
 */
export const EVENT = {
    /**
     * custom selectbox 액션 이벤츠 처리 함수
     * @description 클릭 처리후 라벨에 표시까지 처리, 선택된 아이템을 콜백함수로 전달
     *              이후 처리부분은 각 컨트롤러에서 처리
     * @returns {void}
     */
    SET_UNIT_INIT: function(calendarImgSelector, dateInputSelector) {
        CUSTOM.EVENT.HTML.push(calendarImgSelector);
        $(calendarImgSelector).off("click").on(`click`, function(e) {
            etc.stopBubbling(e);
            $(dateInputSelector).timepicker('show');
        });
    },
    SET_INIT: function() {
        CUSTOM.EVENT.HTML.push(".search-date-cont.start-calendar");
        $('.search-date-cont.start-calendar').off("click").on(`click`, function(e) {
            etc.stopBubbling(e);
            $('#form-common-search-start-date').timepicker('show');
        });
        CUSTOM.EVENT.HTML.push(".search-date-cont.end-calendar");
        $('.search-date-cont.end-calendar').off("click").on(`click`, function(e) {
            etc.stopBubbling(e);
            $('#form-common-search-end-date').timepicker('show');
        });
        CUSTOM.EVENT.HTML.push(".button-search-term");
        $('.button-search-term').off("click").on(`click`, function(e) {
            etc.stopBubbling(e);
            UTIL.TERM_BUTTON_INIT();
            $(this).addClass(`selected`);
            const choiceTerm = Number($(this).attr(`data-term`));
            $(`#form-common-search-term`).val(choiceTerm);
            if (choiceTerm > 0) {
                let nowDate = new Date();
                let startDate = new Date().add({days: choiceTerm * -1});
                $('#form-common-search-start-date').val(startDate.toString('yyyy-MM-dd'));
                $('#form-common-search-end-date').val(nowDate.toString('yyyy-MM-dd'));
            }
            else {
                $('#form-common-search-start-date').val(``);
                $('#form-common-search-end-date').val(``);
            }
        });
    }
}


export const UTIL = {
    GET_SELECTOR: function() {
        return {
            'PARENT': {
                'CLASS': `jquery-datetime-date-for-parent`,
                'SIZE': {
                    'HEIGHT': 'auto',
                    'WIDTH': 'auto'
                }
            },
            'DATE': {
                'CLASS': [`jquery-datetime-date-for-input`], // 첫번째가 해당 input 을 찾는 selector로 사용됨
                'ID': 'jquery-datetime-date-for-input',
                'NAME': 'jquery-datetime-date-for-input',
                'SIZE': {
                    'HEIGHT': '30px',
                    'WIDTH': '132px'
                },
                'ATTR': [],
            },
            'CALENDAR_ICON': {
                'CLASS': `jquery-datetime-calendar-icon`,
            }
        }
    },
    GET_INIT_ADD_OPTIONS: function(selector) {
        return {
            'MAX_DATE': {
                'USE': false,
                'VALUE': null
            },
            'DATE_PICKER': {
                'DATE_FORMAT': `yy-mm-dd`,
            },
            'TIME_PICKER': {
                'USE': false,
                'TIME_FORMAT': `HH:mm:ss`
            },
            'SHOW_TIME_PICKER': false,
            'INIT_DATE': {
                'USE': false,
                'VALUE': null
            },
            'CALLBACK': {
                '_DATE_SELECTED': function(choice, inst) {
                    console.log("choice:::", choice);
                    console.log("inst:::", inst);
                    console.log("this:::", this);
                }
            },
            'CALENDAR_ICON': {
                'USE': true,
                'POSITION': `left`, // left, right (방식은 flex, gap: 8px)
                'HTML': `
                    <span class="${selector.CALENDAR_ICON.CLASS}"></span>
                `
            },
            'STYLE': `
                <style>
                .${selector.PARENT.CLASS} {
                    display: flex;
                    align-items: center;
                    background: var(--white);
                    border: 1px solid #e5e5e5;
                    border-radius: 4px;
                    cursor: pointer;
                    padding: 0 10px;
                    transition: all 0.2s ease-out;
                    gap: 8px;
                    width: ${selector.PARENT.SIZE.WIDTH};
                    height: ${selector.PARENT.SIZE.HEIGHT};
                }
                .${selector.PARENT.CLASS} .${selector.DATE.CLASS[0]} {
                    width: ${selector.DATE.SIZE.WIDTH};
                    height: ${selector.DATE.SIZE.HEIGHT};
                    flex: auto;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .${selector.CALENDAR_ICON.CLASS} {
                    display: block;
                    width: 16px;
                    height: 16px;
                    mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgOVY4SDNWOUg1WiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNNSAxMFYxMUgzVjEwSDVaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik05IDhIN1Y5SDlWOFoiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZD0iTTcgMTBIOVYxMUg3VjEwWiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNMTMgOVY4SDExVjlIMTNaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik0xMyAxMFYxMUgxMVYxMEgxM1oiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjUgMEMzLjIyMzg2IDAgMyAwLjIyMzg1OCAzIDAuNVYySDJDMC44OTU0MzEgMiAwIDIuODk1NDMgMCA0VjE0QzAgMTUuMTA0NiAwLjg5NTQzMSAxNiAyIDE2SDE0QzE1LjEwNDYgMTYgMTYgMTUuMTA0NiAxNiAxNFY0QzE2IDIuODk1NDMgMTUuMTA0NiAyIDE0IDJIMTNWMC41QzEzIDAuMjIzODU4IDEyLjc3NjEgMCAxMi41IDBDMTIuMjIzOSAwIDEyIDAuMjIzODU4IDEyIDAuNVYySDRWMC41QzQgMC4yMjM4NTggMy43NzYxNCAwIDMuNSAwWk0xNSA1VjRDMTUgMy40NDc3MiAxNC41NTIzIDMgMTQgM0gyQzEuNDQ3NzIgMyAxIDMuNDQ3NzIgMSA0VjVIMTVaTTEgNlYxNEMxIDE0LjU1MjMgMS40NDc3MiAxNSAyIDE1SDE0QzE0LjU1MjMgMTUgMTUgMTQuNTUyMyAxNSAxNFY2SDFaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik01IDEyVjEzSDNWMTJINVoiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZD0iTTcgMTJIOVYxM0g3VjEyWiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNMTMgMTJWMTNIMTFWMTJIMTNaIiBmaWxsPSIjMDA0NDg4Ii8+Cjwvc3ZnPgo=');
                    mask-repeat: no-repeat;
                    mask-position: center;
                    mask-size: cover;
                    -webkit-mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgOVY4SDNWOUg1WiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNNSAxMFYxMUgzVjEwSDVaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik05IDhIN1Y5SDlWOFoiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZD0iTTcgMTBIOVYxMUg3VjEwWiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNMTMgOVY4SDExVjlIMTNaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik0xMyAxMFYxMUgxMVYxMEgxM1oiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjUgMEMzLjIyMzg2IDAgMyAwLjIyMzg1OCAzIDAuNVYySDJDMC44OTU0MzEgMiAwIDIuODk1NDMgMCA0VjE0QzAgMTUuMTA0NiAwLjg5NTQzMSAxNiAyIDE2SDE0QzE1LjEwNDYgMTYgMTYgMTUuMTA0NiAxNiAxNFY0QzE2IDIuODk1NDMgMTUuMTA0NiAyIDE0IDJIMTNWMC41QzEzIDAuMjIzODU4IDEyLjc3NjEgMCAxMi41IDBDMTIuMjIzOSAwIDEyIDAuMjIzODU4IDEyIDAuNVYySDRWMC41QzQgMC4yMjM4NTggMy43NzYxNCAwIDMuNSAwWk0xNSA1VjRDMTUgMy40NDc3MiAxNC41NTIzIDMgMTQgM0gyQzEuNDQ3NzIgMyAxIDMuNDQ3NzIgMSA0VjVIMTVaTTEgNlYxNEMxIDE0LjU1MjMgMS40NDc3MiAxNSAyIDE1SDE0QzE0LjU1MjMgMTUgMTUgMTQuNTUyMyAxNSAxNFY2SDFaIiBmaWxsPSIjMDA0NDg4Ii8+CjxwYXRoIGQ9Ik01IDEyVjEzSDNWMTJINVoiIGZpbGw9IiMwMDQ0ODgiLz4KPHBhdGggZD0iTTcgMTJIOVYxM0g3VjEyWiIgZmlsbD0iIzAwNDQ4OCIvPgo8cGF0aCBkPSJNMTMgMTJWMTNIMTFWMTJIMTNaIiBmaWxsPSIjMDA0NDg4Ii8+Cjwvc3ZnPgo=');
                    -webkit-mask-repeat: no-repeat;
                    -webkit-mask-position: center;
                    -webkit-mask-size: cover;
                    background: #001122;
                }                
                </style>            
            `
        };
    },
    GET_OPTIONS: function(add) {
        let nowDate = new Date();
        let minDate = `1900-01-01`;
        let maxDate = nowDate.toString(`yyyy-MM-dd`);
        if (add.MAX_DATE.USE === true && add.MAX_DATE.VALUE !== null) {
            nowDate = new Date(`${add.MAX_DATE.VALUE} 23:59:59`);
            maxDate = add.MAX_DATE.VALUE;
        }
        const pickerOptions = {
            controlType: 'select',
            dateFormat: add.DATE_PICKER.DATE_FORMAT,
            changeYear: true,
            yearRange: `1900:${nowDate.getFullYear()}`,
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNames: ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            yearSuffix: `년`,
            showButtonPanel: false,
            minDate: minDate,
            onSelect: add.CALLBACK._DATE_SELECTED,
            showTimepicker: add.TIME_PICKER.USE
        }
        if (add.MAX_DATE.USE === true) {
            pickerOptions.maxDate = maxDate;
        }
        if (add.TIME_PICKER.USE === true && add.TIME_PICKER.TIME_FORMAT !== null) {
            pickerOptions.timeFormat = add.TIME_PICKER.TIME_FORMAT;
        }
        return pickerOptions;
    },
    SET_CALENDAR_ICON: function(selector, add) {
        if (add.CALENDAR_ICON.USE === true) {
            let _setPosition = `append`;
            if (add.CALENDAR_ICON.POSITION === `left`) {
                _setPosition = `prepend`;
            }
            $(`.${selector.PARENT.CLASS}`)[_setPosition](add.CALENDAR_ICON.HTML);
        }
    },
    SET_CALENDAR_TEXT: function(selector, add) {
        $(`.${selector.PARENT.CLASS}`).append(`
            ${add.STYLE}
            <input type="text" class="" id="${selector.DATE.ID}" name="${selector.DATE.NAME}" readonly="">
        `);
        $(`#${selector.DATE.ID}`).addClass(selector.DATE.CLASS.join(` `));
    },
    SET_UNIT_INIT: function(paramSelector = {}, paramAdd = {}) {
        let selector = UTIL.GET_SELECTOR();
        $.extend(true, selector, paramSelector);
        let add = UTIL.GET_INIT_ADD_OPTIONS(selector);
        $.extend(true, add, paramAdd);
        const nowDate = new Date();
        const pickerOptions = UTIL.GET_OPTIONS(add);
        UTIL.SET_CALENDAR_TEXT(selector, add);
        if (add.CALENDAR_ICON.USE === true) {
            UTIL.SET_CALENDAR_ICON(selector, add);
        }
        $(`.${selector.DATE.CLASS}`).datetimepicker(pickerOptions);
        if (add.INIT_DATE.USE === true) {
            let _f = nowDate.toString('yyyy-MM-dd');
            if (add.INIT_DATE.USE !== null) {
                _f = add.INIT_DATE.VALUE;
            }
            $(`.${selector.DATE.CLASS}`).val(_f);
        }
        if (add.CALENDAR_ICON.USE === true) {
            $(`.${selector.CALENDAR_ICON.CLASS}`).off(`click`).on(`click`, function(e) {
                etc.stopBubbling(e);
                $(`.${selector.DATE.CLASS}`).timepicker('show');
            });
        }
    },
    SET_INIT: function(term = 30, showTimepicker = false, firstValue = null) { // day
        let endDate = new Date();
        let startDate = new Date().add({days: term * -1});
        if (firstValue !== null) {
            startDate = new Date(firstValue.startDateTime);
            endDate = new Date(firstValue.endDateTime);
        }
        const _dateSelected = function(choice) {
            UTIL.TERM_BUTTON_INIT();
            $(`#form-common-search-start-date`).val(choice.substr(0, 10));
        }
        const _dateSelectedEnd = function(choice) {
            UTIL.TERM_BUTTON_INIT();
            $(`#form-common-search-end-date`).val(choice.substr(0, 10));
        }
        let maxDate = endDate.toString(`yyyy-MM-dd`);
        let minDate = `1900-01-01`;
        let pickerOptions = {
            controlType: 'select',
            dateFormat: 'yy-mm-dd', // 일 표시 형식
            changeYear: true,
            yearRange: `1900:${endDate.getFullYear()}`,
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNames: ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            yearSuffix: `년`,
            showButtonPanel: false,
            minDate: minDate,
            maxDate: maxDate,
            onSelect: _dateSelected,
            showTimepicker: showTimepicker
        }
        let endPickerOptions = {
            controlType: 'select',
            dateFormat: 'yy-mm-dd', // 일 표시 형식
            changeYear: true,
            yearRange: `1900:${endDate.getFullYear()}`,
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNames: ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            yearSuffix: `년`,
            showButtonPanel: false,
            minDate: minDate,
            maxDate: maxDate,
            onSelect: _dateSelectedEnd,
            showTimepicker: showTimepicker
        }
        $(`#form-common-search-start-date`).datetimepicker(pickerOptions);
        $(`#form-common-search-end-date`).datetimepicker(endPickerOptions);
        $(`#form-common-search-start-date`).val(startDate.toString('yyyy-MM-dd'));
        $(`#form-common-search-end-date`).val(endDate.toString('yyyy-MM-dd'));
    },
    VALIDATE_DATE: function() {
        const _s = new Date(`${$(`#form-common-search-start-date`).val()} 00:00:00`);
        const _e = new Date(`${$(`#form-common-search-end-date`).val()} 23:59:59`);
        if (_s > _e) {
            return false;
        }
        return true;
    },
    TERM_BUTTON_INIT: function() {
        $('.button-search-term').removeClass(`selected`);
    }
}