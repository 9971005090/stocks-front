"use strict";
export const index = `
    <style>
    .cont .cm-select-box {
        display: block !important;
    }
    </style>
    <div class="common-cont">
        <div class="sub-cont-top">
            <h4 class="sub-cont-title">Search</h4>
<!--            <div>-->
<!--                <button type="button" class="cm-btn cm-btn-middle btn-black btn-add">등록</button>-->
<!--                <button type="button" class="cm-btn cm-btn-middle cm-btn-n-default btn-all-delete">선택 비활성화</button>-->
<!--            </div>-->
        </div>
        <form class="form-common-search">
            <div class="search-form">
                <div class="tit">기관</div>
                <div class="cont">
                    <div class="select-box-parent-for-organization"></div>
                </div>
                <div class="tit">검색기간</div>
<!--                <div class="cont">-->
<!--                    <div class="search-date-cont">-->
<!--                        <span class="icon"></span>-->
<!--                        <input type="text" class="search-data-input use-option" id="start-date-time" name="startDateTime" readonly="">-->
<!--                    </div>-->
<!--                    ~-->
<!--                    <div class="search-date-cont">-->
<!--                        <span class="icon"></span>-->
<!--                        <input type="text" class="search-data-input use-option" id="end-date-time" name="endDateTime" readonly="">-->
<!--                    </div>-->
<!--                    <div class="cm-device-search">-->
<!--                        <button type="button" class="device-search-btn form-common-search-button">-->
<!--                            <span class="img"></span>-->
<!--                        </button>-->
<!--                    </div>-->
<!--                </div>-->
                    <div class="cont">
                        <div class="search-date-for-start-parent"></div>
                        ~
                        <div class="search-date-for-end-parent"></div>
                        
                        <div class="cm-device-search">
                            <button type="button" class="device-search-btn form-common-search-button">
                                <span class="img"></span>
                            </button>
                        </div>
                    </div>
            </div>
        </form>
        <div class="cm-table-wrap board-view">
            <div class="cm-table-cont">
                <div class="cm-colgroup">
                    <div style="width:28%"></div>
                    <div style="width:18%"></div>
                    <div style="width:18%"></div>
                    <div style="width:18%"></div>
                    <div style="width:18%"></div>
                </div>
                <div class="cm-thead">
                    <div class="cm-tr">
                        <div class="cm-th">기관</div>
                        <div class="cm-th">총개수</div>
                        <div class="cm-th">검색기간 이전수</div>
                        <div class="cm-th">검색기간수</div>
                        <div class="cm-th">검색기간 다음수</div>
                    </div>
                </div>
                <div class="cm-tbody" id="contents-by-data-table"></div>
            </div>
        </div>
        <div class="pagination" id="pagination"></div>
    </div>
`;
export const dataTable = `
    {{#each datas}}
        <div class="cm-tr">
            <div class="cm-td">
               {{organizationName}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">총개수</span>
                {{numberToCurrency orgTotalCount}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">이전수</span>
                {{numberToCurrency beforePeriodCount}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">검색기간수</span>
                {{numberToCurrency orgPeriodCount}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">다음수</span>
                {{numberToCurrency afterPeriodCount}}
            </div>
        </div>
    {{/each}}
`;

export const day = `
    <style>
    .cont .cm-select-box {
        display: block !important;
    }
    </style>
    <div class="common-cont">
        <div class="sub-cont-top">
            <h4 class="sub-cont-title">Search</h4>
<!--            <div>-->
<!--                <button type="button" class="cm-btn cm-btn-middle btn-black btn-add">등록</button>-->
<!--                <button type="button" class="cm-btn cm-btn-middle cm-btn-n-default btn-all-delete">선택 비활성화</button>-->
<!--            </div>-->
        </div>
        <form class="form-common-search">
            <div class="search-form">
                <div class="tit">기관</div>
                <div class="cont">
                    <div class="select-box-parent-for-organization"></div>
                </div>
                <div class="tit">검색기간</div>
<!--                <div class="cont">-->
<!--                    <div class="search-date-cont">-->
<!--                        <span class="icon"></span>-->
<!--                        <input type="text" class="search-data-input use-option" id="start-date-time" name="startDateTime" readonly="">-->
<!--                    </div>-->
<!--                    ~-->
<!--                    <div class="search-date-cont">-->
<!--                        <span class="icon"></span>-->
<!--                        <input type="text" class="search-data-input use-option" id="end-date-time" name="endDateTime" readonly="">-->
<!--                    </div>-->
<!--                    <div class="cm-device-search">-->
<!--                        <button type="button" class="device-search-btn form-common-search-button">-->
<!--                            <span class="img"></span>-->
<!--                        </button>-->
<!--                    </div>-->
<!--                </div>-->
                    <div class="cont">
                        <div class="search-date-for-start-parent"></div>
                        ~
                        <div class="search-date-for-end-parent"></div>
                        
                        <div class="cm-device-search">
                            <button type="button" class="device-search-btn form-common-search-button">
                                <span class="img"></span>
                            </button>
                        </div>
                    </div>
            </div>
        </form>
        <div class="cm-table-wrap chart-view" id="chart-view" style="height: 234px; min-height: 234px; border: 1px solid var(--light-gray-100); margin-bottom: 16px; display: flex; justify-content: center; align-items: center">
            챠트 생성중..
        </div>
        <div class="cm-table-wrap board-view" style="min-height: 100px;">
            <div class="cm-table-cont">
                <div class="cm-colgroup">
                    <div style="width:60%"></div>
                    <div style="width:40%"></div>
                </div>
                <div class="cm-thead">
                    <div class="cm-tr">
                        <div class="cm-th">날짜</div>
                        <div class="cm-th">개수</div>
                    </div>
                </div>
                <div class="cm-tbody" id="contents-by-data-table"></div>
            </div>
        </div>
        <div class="pagination" id="pagination"></div>
    </div>
`;
export const dataTableForDay = `
    {{#each datas}}
        <div class="cm-tr">
            <div class="cm-td">
                <span class="pc-d-none">날짜</span>
                {{date}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">개수</span>
                {{numberToCurrency dayCount}}
            </div>
        </div>
    {{/each}}
`;