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
    ON_CLICK: function(selectBoxClass = `.cm-select-cont`, selectOptionListClass = `.option-list`, selectOptionItemClass = `.option-item`, labelClass = `.label`, selectedClass = `selected`, optionItemClickCallback = null, addParam = null) {
        CUSTOM.EVENT.HTML.push(selectBoxClass);
        $(selectBoxClass).off("click").on('click', function(e) {
            etc.stopBubbling(e);
            $(this).toggleClass(selectedClass);
            $(this).children(selectOptionListClass).css("top",-3);
            $(this).children(selectOptionListClass).width($(this).width());
            $(this).children(selectOptionListClass).toggle();
            if ($(this).find(".option-item").length > 0){
                for (let i = 0; i < $(this).find(".option-item").length; i++) {
                    if ($(this).find(".option-item").eq(i).text() === $(this).find(".label").text()){
                        $(this).find(".option-item").eq(i).addClass("selected")
                    }
                }
            }
        });
        EVENT._RUN_ON_CLICK_FOR_OPTION_ITEM(selectBoxClass, selectOptionListClass, selectOptionItemClass, labelClass, selectedClass, optionItemClickCallback, addParam);
    },
    ON_CLICK_FOR_OPTION_ITEM: function(selectBoxClass = `.cm-select-cont`, selectOptionListClass = `.option-list`, selectOptionItemClass = `.option-item`, labelClass = `.label`, selectedClass = `selected`, optionItemClickCallback = null) {
        EVENT._RUN_ON_CLICK_FOR_OPTION_ITEM(selectBoxClass, selectOptionListClass, selectOptionItemClass, labelClass, selectedClass, optionItemClickCallback);
    },
    _RUN_ON_CLICK_FOR_OPTION_ITEM: function(selectBoxClass, selectOptionListClass, selectOptionItemClass, labelClass, selectedClass, optionItemClickCallback, addParam) {
        CUSTOM.EVENT.HTML.push(selectOptionItemClass);
        $(selectOptionItemClass).off("click").on('click', function(e) {
            etc.stopBubbling(e);
            $(selectOptionItemClass).removeClass("selected");
            $(this).parent().parent(selectBoxClass).removeClass(selectedClass);
            $(this).parent(selectOptionListClass).toggle();
            $(this).parent().parent(selectBoxClass).find(labelClass).text($(this).text());
            $(this).addClass("selected")
            if (optionItemClickCallback !== null) {
                optionItemClickCallback($(this), addParam);
            }
        });
    }
}
export const UTIL = {
    MAKE: function (data = {
        type: `all`,
        datas: null,
        all: null,
        default: null,
        attr: {
            name: 'select-box',
            'add-class': []
        },
        replace: false,
        addParam: null,
    }, selector = {
        'parent': `.select-box-for-parent`,
        'box': `.select-box`,
        'option-list': `.option-list`,
        'option-item': `.option-item`,
        'label': `.label`,
        'selected-class': `selected`,
        'box-id': 'select-box'
    }, size = {
        'width': `width: 216px;`,
        'height': `height: 32px`,
        'margin-left': `margin-left: 20px;`,
    }, callback = null) {
        UTIL._MAKE_PROCESS(data, selector, size);
        EVENT.ON_CLICK(selector.box, `${selector.box} ${selector['option-list']}`, `${selector.box} ${selector['option-item']}`, selector.label, selector['selected-class'], callback, data.addParam, function(selectedObj) {
            return true;
        });
    },
    OPTION_MAKE: function(data = {
        type: `all`,
        datas: null,
        all: null,
        default: null,
    }, selector = {
        'parent': `.select-box-for-parent`,
        'box': `.select-box`,
        'option-list': `.option-list`,
        'option-item': `.option-item`,
        'label': `.label`,
        'selected-class': `selected`,
        'box-id': 'select-box'
    }, callback = null) {
        UTIL.__MAKE_SUB_PROCESS(data, selector);
        EVENT.ON_CLICK_FOR_OPTION_ITEM(selector.box, `${selector.box} ${selector['option-list']}`, `${selector.box} ${selector['option-item']}`, selector.label, selector['selected-class'], callback, function(selectedObj) {
            return true;
        });
    },
    _MAKE_PROCESS: function (data, selector, size) {
        if(data.replace){
            $(`${selector.parent} ${selector['option-list']}`).html(``);
        }
        else{
            $(selector.parent).append(etc.setHtmlParsing(null, UTIL._GET_HTML_FOR_PARENT, {selector: selector, size: size, data: data}, false));
        }
        UTIL.__MAKE_SUB_PROCESS(data,selector);
    },

    __MAKE_SUB_PROCESS: function(data, selector) {
        if (data.all !== null) {
            $(`${selector.parent} ${selector['option-list']}`).append(etc.setHtmlParsing(null, UTIL._GET_HTML_FOR_OPTION_UNIT, {selector: selector, data: {code: data.all.code, title: data.all.title, type: data.type}}, false));
            $(`#${selector['box-id']}`).find(`.select-item`).val(data.all.code);
            if (data.all.isUse === false) {
                $(`#${selector['box-id']}`).find(`.select-item`).attr(`data-not-parsing-value`, data.all.code);
            }
            $(`#${selector['box-id']}`).find(`.label`).text(data.all.title);
        }
        if (data.datas !== null) {
            for (let i = 0; i < data.datas.length; i++) {
                $(`${selector.parent} ${selector['option-list']}`).append(etc.setHtmlParsing(null, UTIL._GET_HTML_FOR_OPTION_UNIT, {selector: selector, data: {code: data.datas[i].code, title: data.datas[i].title, type: data.type}}, false));
                if(data.default !== null && (data.datas[i].code === data.default.code)){
                    $(`${selector.parent} ${selector['option-list']}`).addClass("selected");
                    $(`#${selector['box-id']}`).find(`.select-item`).val(data.default.code);
                    $(`#${selector['box-id']}`).find(`.label`).text(data.default.title);
                }
            }
        }
    },

    _GET_HTML_FOR_PARENT: `
        <style>
            {{selector.box}} {
                {{size.width}}
                {{size.height}}
            }
        </style>
        <div class="{{selectorToDomParsing selector.box}} cm-select-box" id="{{selector.box-id}}" style="">
            <input type="hidden" class="select-item{{#each data.attr.add-class}} {{this}}{{/each}}" name="{{data.attr.name}}" data-not-parsing-value="" style="">
            <button type="button" class="{{selectorToDomParsing selector.label}} label" style=""></button>
            <ul class="{{selectorToDomParsing selector.option-list}} option-list" style=""></ul>
        </div>    
    `,
    _GET_HTML_FOR_OPTION_UNIT: `
        <li class="{{selectorToDomParsing selector.option-item}} option-item" data-type="{{data.type}}" data-code="{{data.code}}" style="">{{data.title}}</li>
    `
    ,
}