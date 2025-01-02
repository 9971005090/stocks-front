"use strict";
const {CONST: LANGUAGE} = await import(`/js/language/${GBL.CONSTANTS.get(`APP.LOCALE`)}/base.js${ver_string}`);
export const CONST = {
    VERSION: "0.1.0",
    DESIGN: {
        THEME: "default",
        BUTTON: {
            OK: `<button type="button" class="custom-button custom-button-info customAlertButtonForOk">${LANGUAGE.MESSAGE.BUTTON.OK}</button>`,
            DEL: `<button type="button" class="custom-button custom-button-danger customAlertButtonForDelete">${LANGUAGE.MESSAGE.BUTTON.DELETE}</button>`,
            CANCEL: `<button type="button" class="custom-button custom-button-secondary customAlertButtonForCancel">${LANGUAGE.MESSAGE.BUTTON.CANCEL}</button>`
        }
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 사이트별 모듈에서 상이하게 처리해야 할 부분은 init 에 추가를 하던가? 아니면 새로운 함수를 추가하여 활용한다.
    // INIT : config 값 변경시 사용
    // POST_PROCESS: 해당 모듈의 액션 처리 후 진행해야 할 부분이 있다면 추가, controller에 index이외의 action이 있다면 추가 가능
    // 예시 - init)
    // // 버전은 기본 버전 뒤에 .0부터 올린다.
    // CONST.VERSION = `${CONST.VERSION}.0`;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    INIT: function() {
        // 아래 영역에 코드 작성
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 버전은 기본 버전 뒤에 .0부터 올린다.
        CONST.VERSION = `${CONST.VERSION}.0`;
        CONST.DESIGN.THEME = "brain-saver";

        // 테마를 변경 후 버튼 디자인이 바뀌게 되면 수정
        // if(CONST.DESIGN.THEME !== "default") {
        //     CONST.DESIGN.BUTTON = {
        //         OK: `<button type="submit" class="button_ok customAlertButtonForOk" style="width: 128px;">확인</button>`,
        //         DEL: `<button type="button" class="button_delete customAlertButtonForDelete" style="width: 128px;">네. 삭제합니다</button>`,
        //         CANCEL: `<button type="button" class="button_cancel customAlertButtonForCancel">아니요</button>`
        //     }
        // }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    },
    POST_PROCESS: {
        index: function() {
            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        }

        // controller에 index이외의 action이 있다면 직접 추가
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
CONST.INIT();