"use strict";
export const CONST = {
    VERSION: "0.1.1",
    DESIGN: {
        THEME: "default"
    },
    PAGING: {
        DATA: {
            PAGE: {
                PER_COUNT: GBL.PAGING.DATA.PAGE.PER_COUNT,
                PER_PAGE: GBL.PAGING.DATA.PAGE.PER_PAGE
            }
        }
    },
    ADD_EVENT: function(params = null) { // 혹시 몰라 추가
        // 디자인에 따라 event 처리가 달라지는 부분을 추가. 아래 영역에 코드 작성
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        let pageObj = $(`.${params.prefix}.page-item`);
        pageObj.off("click").click(function (e) {
            e.preventDefault();

            const item = $(this);
            const id = item.find("button").attr("aria-label");
            let selectedPage = Number(item.children("span").text());
            if(id !== undefined) {
                selectedPage = id;
            }
            if(id === "Prev") {
                if(params.currentPage === 1) {
                    return;
                }
            }
            if(id === "Next") {
                if(params.currentPage === params.totalPage) {
                    return;
                }
            }
            if(typeof selectedPage !== "string") {
                if(selectedPage === params.currentPage) {
                    return;
                }
            }
            params.move(selectedPage);
        });
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    },


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 사이트별 모듈에서 상이하게 처리해야 할 부분은 init 에 추가를 하던가? 아니면 새로운 함수를 추가하여 활용한다.
    // INIT : config 값 변경시 사용
    // POST_PROCESS: 해당 모듈의 액션 처리 후 진행해야 할 부분이 있다면 추가
    // 예시 - init)
    // // 버전은 기본 버전 뒤에 .0부터 올린다.
    // CONST.VERSION = `${CONST.VERSION}.0`;
    // CONST.ADD_EVENT = function(params = null) { }; // 이벤트의 내용이 변경시 추가
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    INIT: function() {
        // 아래 영역에 코드 작성
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    },
    POST_PROCESS: {
        index: function(param = null) {
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