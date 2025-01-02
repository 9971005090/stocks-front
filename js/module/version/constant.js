"use strict";
export const CONST = {
    VERSION: "0.1.0",
    DESIGN: {
        THEME: "default",
        VIEW_COLUMN: {
            COPYRIGHT: true,
            VERSION: true
        },
        DIV_NAME: ".login_container",
        DIV_CLEAR: false
    },
    DATA: {
        version: "-",
        copyright: "-"
    },


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 사이트별 모듈에서 상이하게 처리해야 할 부분은 init 에 추가를 하던가? 아니면 새로운 함수를 추가하여 활용한다.
    // INIT : config 값 변경시 사용
    // POST_PROCESS: 해당 모듈의 액션 처리 후 진행해야 할 부분이 있다면 추가
    // 예시 - init)
    // // 버전은 기본 버전 뒤에 .0부터 올린다.
    // CONST.VERSION = `${CONST.VERSION}.0`;
    // CONST.DESIGN.VIEW_COLUMN.COPYRIGHT = false;
    // CONST.DESIGN.DIV_NAME = ".login_container";
    // CONST.DATA.version = "default.0.1.0-202110111120";
    // CONST.DATA.copyright = "COPYRIGHT 2018 © Seers Technology. ALL RIGHTS RESERVED.";
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    INIT: function() {
        // 아래 영역에 코드 작성
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // CONST.DESIGN.THEME = GBL.DESIGN.THEME;
        CONST.DESIGN.THEME = "default";
        CONST.DESIGN.DIV_CLEAR = true;
        CONST.DATA.version = `1.0.0`;
        CONST.DATA.copyright = `Copyright 2023 ⓒ Seers Technology. All RIGHT RESERVED`;
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