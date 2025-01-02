"use strict";

const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
const {UTIL: WARD_UTIL} = await import(`/js/custom/constant/ward/util.js${ver_string}`);
const {CONST: ORGAN_CONST} = await import(`/js/custom/constant/organ/constant.js${ver_string}`);

export const EVENT = {
    SELECT_BOX_SYNC_HIS: function(selectBoxId = null, searchAll = false){
        let selectBoxHTML = "";
        if(searchAll === true){
            selectBoxHTML += `<li class="option-item" data-type="syncHis" data-code="all">전체</li>`;
        }
        for (let key in ORGAN_CONST.SYNC_HIS.CODE) {
            selectBoxHTML += `<li class="option-item" data-type="syncHis" data-code="${ORGAN_CONST.SYNC_HIS.CODE[key]}">${ORGAN_CONST.SYNC_HIS.TITLE[`${ORGAN_CONST.SYNC_HIS.CODE[key]}`]}</li>`;
        }
        $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
    },
    SELECT_BOX_DEVICE_MANAGER: function(selectBoxId = null,  searchAll = false){
        let selectBoxHTML = "";
        if(searchAll === true){
            selectBoxHTML += `<li class="option-item" data-type="device" data-code="all">전체</li>`;
        }
        for (let key in ORGAN_CONST.DEVICE_MANAGER_TYPE.CODE) {
            selectBoxHTML += `<li class="option-item" data-type="device" data-code="${ORGAN_CONST.DEVICE_MANAGER_TYPE.CODE[key]}">${ORGAN_CONST.DEVICE_MANAGER_TYPE.TITLE[`${ORGAN_CONST.DEVICE_MANAGER_TYPE.CODE[key]}`]}</li>`;
        }
        $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
    },
    SELECT_BOX_ORGAN: function(selectBoxId = null, searchAll = false, _t=null){
        _t = ORGAN_UTIL.LIST();
        let selectBoxHTML = "";
        if (_t.result === true) {
            if(searchAll === true){
                selectBoxHTML +=   `<li class="option-item" data-type="organ" data-code="all">전체</li>`;
            }
            for (let i = 0; i < _t.organizationList.length; i++) {
                selectBoxHTML += `<li class="option-item" data-code="${_t.organizationList[i].organizationCode}">${_t.organizationList[i].organizationName}</li>`;
            }
            $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
        } else {
            $(`#${selectBoxId}`).children(".option-list").html("");
        }
    },
    SELECT_BOX_WARD: function(selectBoxId = null,  searchAll = false, callbackFunction = null){
        let _t;
        if($("#organizationCode").val()){
            _t = WARD_UTIL.LIST(false, false, `list`, true,true, {'organizationCode': $("#organizationCode").val()});
        }
        let selectBoxHTML = "";
        if(!$("#organizationCode").is(':disabled')){
            if (_t !== null && _t !== undefined) {
                if (Object.keys(_t).length > 0) {
                    $(`#${selectBoxId}`).find(".label").text("소속병동");
                    $(`#${selectBoxId}`).find(".check").val("");
                    for (let i = 0; i < Object.keys(_t).length; i++) {
                        selectBoxHTML += `<li class="option-item" data-type="ward" data-code="${Object.values(_t)[i].wardCode}">${Object.values(_t)[i].ward}</li>`;
                    }
                    $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
                    $(".ward-select-box .option-item").off("click").on('click', function(e){
                        etc.stopBubbling(e);
                        $(".ward-select-box .option-item").removeClass("selected");
                        $(this).parent().parent(".ward-select-box").removeClass("selected").children(".selectItem").val($(this).data("code"));
                        $(this).parent(".option-list").toggle();
                        $(this).parent().parent(".ward-select-box").find(".label").text($(this).text());
                        $(this).addClass("selected");
                        if(callbackFunction !== null){
                            callbackFunction($(this));
                        }
                    });
                }
            }
            else{
                $(`#${selectBoxId}`).children(".option-list").html("");
                $(`#${selectBoxId}`).find(".label").text("소속병동");
                $(`#${selectBoxId}`).find(".check").val("");
            }
        }
        else {
            if (_t !== null && _t !== undefined) {
                if (Object.keys(_t).length > 0) {
                    for (let i = 0; i < Object.keys(_t).length; i++) {
                        selectBoxHTML += `<li class="option-item" data-type="ward" data-code="${Object.values(_t)[i].wardCode}">${Object.values(_t)[i].ward}</li>`;
                    }
                    $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
                }
            }
            else{
                $(`#${selectBoxId}`).children(".option-list").html("");
            }
        }
    }
}