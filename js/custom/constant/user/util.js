`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author ella
 */

const {CONST: USER_CONST} = await import(`/js/custom/constant/user/constant.js${ver_string}`);
const {API: USER_API} = await import(`/js/custom/constant/user/api.js${ver_string}`);

export const UTIL = {
    CHECK_MY_LIMITED_LEVEL : function() {
        let myLimited = [];
        for (let key in USER_CONST.LEVEL.CODE) {
            if(USER_CONST.LEVEL.CODE[key] <=  GBL.ACCOUNT.INFO.level){
                myLimited.push(USER_CONST.LEVEL.CODE[key]);
            }
        }
        return myLimited;
    },
    CHECK_REQUIRE_VALUE :  function (requireValue = null , params = null ) {
        if(!requireValue || !params){
            return {"result" : false , "msg": `requireValue or params is null or undefinde`}
        }
        else{
            let resultMsg = {"result" : true};
            for(let i = 0 ; i < requireValue.length;i++){
                if(params.hasOwnProperty(requireValue[i]) === false){
                    resultMsg = {"result" : false , "msg": `${requireValue[i]} is null or undefinde`}
                }
            }
            return resultMsg
        }
    },
    /**
     * @description 유저 리스트 조회 함수
     * 조회하는 계정의 권한레벨 이하로만 조회 가능
     */
    SELECT_ACCOUNT_LIST : function (params = null) {
        const requireValue = ["requester","organizationCode","levelList"];
        let checkValue = UTIL.CHECK_REQUIRE_VALUE(requireValue , params);
        console.log(checkValue);
        if(checkValue.result === true){
            let apiResult = custom.request.api(USER_API.SELECT_ACCOUNT_LIST , params);
            return apiResult;
        }
        else{
            return checkValue;
        }
    },
    /**
     * @description 유저 상세 정보 조회 함수
     * 조회하는 계정의 권한레벨 이하로만 조회 가능
     */
    SELECT_ACCOUNT_INFO : function (params = null) {
        const requireValue = ["requester","organizationCode","id"];
        let checkValue = UTIL.CHECK_REQUIRE_VALUE(requireValue , params);
        if(checkValue.result === true){
            let apiResult = custom.request.api(USER_API.SELECT_ACCOUNT_INFO , params);
            return apiResult;
        }
        else{
            return checkValue;
        }
    },
    /**
     * @description 신규 유저 등록 함수
     * 조회하는 계정의 권한레벨 이하로만 수정 가능
     */
    CREATE_ACCOUNT : function (params = null) {
        const requireValue = ["requester","organizationCode","id","password","email","name","level"];
        console.log("CREATE_ACCOUNT" , params);
        let checkValue = UTIL.CHECK_REQUIRE_VALUE(requireValue , params);
        if(checkValue.result === true){
            let apiResult = custom.request.api(USER_API.INSERT_ACCOUNT , params);
            return apiResult;
        }
        else{
            return checkValue;
        }
    },
    /**
     * @description 유저 정보 수정 함수
     * 조회하는 계정의 권한레벨 이하로만 수정 가능
     */
    UPDATE_ACCOUNT_INFO : function (params = null) {
        const requireValue = ["requester","userCode"];
        console.log("UPDATE_ACCOUNT_INFO" , params);
        let checkValue = UTIL.CHECK_REQUIRE_VALUE(requireValue , params);
        if(checkValue.result === true){
            let apiResult = custom.request.api(USER_API.UPDATE_ACCOUNT , params);
            return apiResult;
        }
        else{
            return checkValue;
        }
    },

    /**
     * @description 유저 패스워드 정보 수정 함수
     *
     */
    UPDATE_PASSWORD : function (params = null) {
        const requireValue = ["requester","userCode","password","newPassword"];
    },
    /**
     * @description 유저 정보 삭제 함수
     * 조회하는 계정의 권한레벨 이하로만 삭제 가능
     */
    DELETE_ACCOUNT_INFO : function (params = null) {
        const requireValue = ["requester","userCode"];
        let checkValue = UTIL.CHECK_REQUIRE_VALUE(requireValue , params);
        if(checkValue.result === true){
            let apiResult = custom.request.api(USER_API.DELETE_ACCOUNT , params);
            return apiResult;
        }
        else{
            return checkValue;
        }
    },
    /**
     * @description 사용자 분류 SELECT BOX 생성
     * 조회하는 계정의 권한레벨 이하로만 조회 가능
     */
    SELECT_BOX_USER_LEVEL : function (selectBoxId = null , searchAll = false) {
        let userLevelList = UTIL.CHECK_MY_LIMITED_LEVEL();
        let selectBoxHTML = "";
        if(searchAll === true){
            selectBoxHTML +=   `<li class="option-item" data-code="all">전체 조회</li>`;
        }
        for(let i = 0 ; i < userLevelList.length;i++){
            selectBoxHTML +=   `<li class="option-item" data-code="${userLevelList[i]}">${USER_CONST.LEVEL.STRING[`${userLevelList[i]}`]}</li>`;
        }
        $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
    },
    /**
     * @description 사용자 분류 SELECT BOX 생성
     * 조회하는 계정의 권한레벨 이하로만 조회 가능
     */
    SELECT_BOX_USER_TYPE : function (selectBoxId = null , searchAll = false) {
        // let userLevelList = UTIL.CHECK_MY_LIMITED_LEVEL();
        // let selectBoxHTML = "";
        // if(searchAll === true){
        //     selectBoxHTML +=   `<li class="option-item" data-code="all">전체 조회</li>`;
        // }
        // for(let i = 0 ; i < userLevelList.length;i++){
        //     selectBoxHTML +=   `<li class="option-item" data-code="${userLevelList[i]}">${USER_CONST.LEVEL.STRING[`${userLevelList[i]}`]}</li>`;
        // }
        // $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
        let selectBoxHTML = "";
        for (let key in USER_CONST.TYPE.CODE) {
            if(USER_CONST.TYPE.CODE[key] === 0){
                if(searchAll === true){
                    selectBoxHTML +=   `<li class="option-item" data-code="${USER_CONST.TYPE.CODE[key]}">전체 조회</li>`;
                }
            }else{
                selectBoxHTML +=   `<li class="option-item" data-code="${USER_CONST.TYPE.CODE[key]}">${USER_CONST.TYPE.STRING[`${USER_CONST.TYPE.CODE[key]}`]}</li>`;
            }
        }
        $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
    },
    /**
     * @description 기관 분류 SELECT BOX 생성
     *
     */
    SELECT_BOX_ORGAN : function (selectBoxId = null , searchAll = false) {
        let selectParams = {
            "requester" : GBL.ACCOUNT.INFO.userCode,
            "organizationCode" : GBL.ACCOUNT.INFO.organizationCode,
            "pageNumber": 1,
            "count": 100
        }
        let selectBoxHTML = "";
        let selectResult = custom.request.api("/Manager/SelectOrganizationSimplePage" , selectParams);
        if(searchAll === true){
            selectBoxHTML +=   `<li class="option-item" data-code="null">전체 조회</li>`;
        }
        if(selectResult.result === true){
            for(let i = 0 ; i < selectResult.organizationSimpleList.length;i++){
                selectBoxHTML +=   `<li class="option-item" data-code="${selectResult.organizationSimpleList[i].organizationCode}">${selectResult.organizationSimpleList[i].organizationName}</li>`;
            }
            $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
        }
        else{
            $(`#${selectBoxId}`).children(".option-list").html("");
        }
    },
    /**
     * @description 계정 정보 필수 값 체크
     *
     */
    formCheck: function (id, addCheckFunc = null) {
        const typeColumnValidate = function(dataType, input_value) {
            let patternCheck = false;
            let alertMsg = null;
            if (dataType === "birthday") {
                [patternCheck, alertMsg] = etc.validate.birthday(input_value);
            }
            else if (dataType === "cellPhone") {
                [patternCheck, alertMsg] = etc.validate.cellPhone(input_value);
            }
            else if(dataType === "email") {
                [patternCheck, alertMsg] = etc.validate.email(input_value);
            }
            else if (dataType === "telPhone") {
                [patternCheck, alertMsg] = etc.validate.telPhone(input_value);
            }
            else if (dataType === "password") {
                [patternCheck, alertMsg] = etc.validate.password(input_value);
            }
            else if (dataType === "password_confirm") {
                [patternCheck, alertMsg] = etc.validate.password_confirm(input_value);
            }

            return [patternCheck, alertMsg];
        }
        const valueChange = function() {
            const self = $(this);
            const dataType = self.data("type");
            const input_value = self.val();
            let isValidate = false;
            if (input_value != "" && input_value != null) {
                isValidate = true;
            }
            if (dataType !== undefined) {
                if (isValidate === true) {
                    let patternCheck = false;
                    let alertMsg = null;
                    [patternCheck, alertMsg] = typeColumnValidate(dataType, input_value);
                    if (patternCheck === true) {
                        isValidate = false;
                        self.parent(".require-value-cont").children(".error-text").text(alertMsg);
                    }
                }
            }
            if (isValidate === true) {
                self.parent(".require-value-cont").removeClass("error");
            }
        }
        const ifCheckValueChange = function() {
            const self = $(this);
            const input_value = self.val();
            let isValidate = false;
            if (input_value === "" || input_value === null) {
                isValidate = true;
            }
            if (isValidate === true) {
                self.removeClass("is-invalid");
            }
        }
        let isValidate = true;
        const check = $(`#${id}`).find(".require-value");
        const ifCheck = $(`#${id}`).find(".ifCheck");
        check.on("keyup", valueChange);
        ifCheck.on("keyup", ifCheckValueChange);
        check.each(function(index, item) {
            const setValidate = function(obj, msg) {
                obj.parent(".require-value-cont").removeClass("error").addClass("error");
            }
            let input = $(item);
            const input_name = input.attr("name");
            let  input_value = input.val();
            if ($(`#${id}`).find('[name="' + input_name + '"]').attr('type') === "radio" || $(`#${id}`).find('[name="' + input_name + '"]').attr('type') == "checkbox") {
                input_value = null;
                if ($(`#${id}`).find('[name="' + input_name + '"]:checked').val() !== undefined) {
                    input_value = $(`#${id}`).find('[name="' + input_name + '"]:checked').val();
                }
                input =  $(`#${id}`).find('[name="' + input_name + '"]').eq(0);
            }
            if (input_value == "" || input_value == null) {
                isValidate = false;
                setValidate(input, "필수입력 항목 입니다.");
            }
            else {
                input.parent(".require-value-cont").removeClass("error");
                // input.parent().find(".invalid-feedback").remove();
                let dataType = input.data("type");
                let patternCheck = false;
                let alertMsg = null;
                if (dataType !== undefined) {
                    [patternCheck, alertMsg] = typeColumnValidate(dataType, input_value);
                    if (patternCheck === true) {
                        isValidate = false;
                        setValidate(input, alertMsg);
                    }
                }
            }
        });
        ifCheck.each(function(index, item) {
            const setValidate = function(obj, msg) {
                input.parent(".require-value-cont").removeClass("error").addClass("error");
            }
            const input = $(item);
            const input_value = input.val();
            if (input_value !== "" && input_value !== null) {
                let dataType = input.data("type");
                let patternCheck = false;
                let alertMsg = null;
                if(dataType !== undefined) {
                    [patternCheck, alertMsg] = typeColumnValidate(dataType, input_value);
                    if(patternCheck === true) {
                        isValidate = false;
                        setValidate(input, alertMsg);
                    }
                }
            }
        });
        if (addCheckFunc !== null && isValidate !== false) {
            isValidate = addCheckFunc();
        }
        return isValidate;
    },
}