"use strict";
export const CONST = {
    VERSION: "0.1.0",
    DESIGN: {
        THEME: "default",
        VIEW_COLUMN: {
            COPYRIGHT: true,
            VERSION: true
        },
        DIV_NAME: GBL.DESIGN.MAIN_DIV_NAME
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 사이트별 모듈에서 상이하게 처리해야 할 부분은 init 에 추가를 하던가? 아니면 새로운 함수를 추가하여 활용한다.
    // INIT : config 값 변경시 사용
    // POST_PROCESS: 해당 모듈의 액션 처리 후 진행해야 할 부분이 있다면 추가
    // 예시 - init)
    // // 버전은 기본 버전 뒤에 .0부터 올린다.
    // CONST.VERSION = `${CONST.VERSION}.0`;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    INIT: function() {
        // 아래 영역에 코드 작성
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 버전은 기본 버전 뒤에 .0부터 올린다.
        CONST.VERSION = `${CONST.VERSION}.0`;
        CONST.DESIGN.THEME = GBL.DESIGN.THEME;
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    },
    EVENT : {
        // 아래 영역에 코드 작성
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        SET_GO_TO_PAGE_TOP: function() {
            CUSTOM.EVENT.HTML.push(".cm-btn-top");
            $(".cm-btn-top").off("click").on("click", function(e) {
                etc.stopBubbling(e)
                $("html").animate({
                    scrollTop: "0"
                }, 680);
            });
            $(document).scroll(function() {
                if ($(this).scrollTop() > 50 ) {
                    $(".cm-btn-top").animate({
                        opacity: 1
                    }, 10);
                }
                else {
                    $(".cm-btn-top").animate({
                        opacity: 0
                    }, 10);
                }
            });
        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    },
    PRE_PROCESS: {
        index: async function(param = null) {
            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
    },
    POST_PROCESS: {
        index: async function(param = null) {
            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 전체 페이지 영역을 클릭하면 닫혀야(안보여야) 하는 div 를 모두 닫는다.
            CUSTOM.EVENT.HTML.push("#wrap");
            $('#wrap').off("click").on("click", function (e) {
                // etc.stopBubbling(e);
                etc.commonDivHide();
                custom.etc.commonDivHide();
            });

            // 반응형 함수 실행, 화면 크기 변경시 반응형 함수 실행되게.
            custom.etc.responsive();
            $(window).resize(function(e){
                etc.stopBubbling(e);
                custom.etc.responsive();
            })

            // 페이지 상단 이동 버튼
            CONST.EVENT.SET_GO_TO_PAGE_TOP();

            $('.page-title').text(new Date().toString(`yyyy년 MM월 dd일`));
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        },

        // controller에 index이외의 action이 있다면 직접 추가, 또는 추가 함수가 있다면 직접 추가
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
CONST.INIT();