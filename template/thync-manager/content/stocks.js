"use strict";
export const index = `
    <div class="common-cont">
        <div class="cm-table-wrap board-view">
            <div class="cm-table-cont">
                <div class="cm-colgroup">
                    <div style="width:11%"></div>
                    <div style="width:3%"></div>
                    <div style="width:4%"></div>
                    <div style="width:5%"></div>
                    <div style="width:5%"></div>
                    <div style="width:3%"></div>
                    <div style="width:5%"></div>
                    <div style="width:5%"></div>
                    <div style="width:5%"></div>
                    <div style="width:5%"></div>
                    <div style="width:5%"></div>
                    <div style="width:5%"></div>
                    <div style="width:10%"></div>
                    <div style="width:auto"></div>
                    <div style="width:4%"></div>
                </div>
                <div class="cm-thead">
                    <div class="cm-tr">
                        <div class="cm-th">이름</div>
                        <div class="cm-th">코드</div>
                        <div class="cm-th">구분</div>
                        <div class="cm-th">추천일</div>
                        <div class="cm-th">추천가</div>
                        <div class="cm-th">순위</div>
                        <div class="cm-th">52주 저가</div>
                        <div class="cm-th">52주 고가</div>
                        <div class="cm-th">최초 구매일</div>
                        <div class="cm-th">평단가</div>
                        <div class="cm-th">현재가</div>
                        <div class="cm-th">직전일 종가</div>
                        <div class="cm-th">그래프</div>
                        <div class="cm-th">비고</div>
                        <div class="cm-th">관리</div>
                    </div>
                </div>
                <div class="cm-tbody" id="contents-by-data-table"></div>
            </div>
        </div>
        <div class="pagination" id="pagination"></div>
    </div>
`;
//f3e8e8, e0e0f3
export const dataTable = `
    {{#each datas}}
        <div class="cm-tr" data-stock-firebase-id="{{fb_id}}" data-stock-code="{{code}}" data-stock-name="{{name}}"  style="{{setBackgroundForRise this}}">
            <div class="cm-td text-start">
                <span class="pc-d-none">이름</span>
                {{name}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">코드</span>
                {{code}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">구분</span>
                {{market}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">추천일</span>
                {{iso8601ToDateString recommendation_date 'yyyy-MM-dd'}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">추천가</span>
                {{setCommaForString recommendation_price}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">순위</span>
                {{rank}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">52주 저가</span>
                {{setCommaForString low_52_week_price}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">52주 고가</span>
                {{setCommaForString high_52_week_price}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">최초 구매일</span>
                <div class="cm-input-cont">
                    <input type="text" class="cm-input-text buy_date" value="{{iso8601ToDateString buy_date 'yyyy-MM-dd'}}">
                </div>
                <div class="btn-wrap">
                    <button type="button" class="cm-btn cm-btn-small btn-black btn-detail-view button-update" style="width: 90%; margin-top: 5px;" data-type="buy_date">저장</button>
                </div>
            </div>
            <div class="cm-td">
                <span class="pc-d-none">평단가</span>
                <div class="cm-input-cont">
                    <input type="text" class="cm-input-text" value="{{setCommaForString average_price}}">
                </div>
                <div class="btn-wrap">
                    <button type="button" class="cm-btn cm-btn-small btn-black btn-detail-view button-update" style="width: 90%; margin-top: 5px;" data-type="average_price">저장</button>
                </div>
            </div>
            <div class="cm-td">
                <span class="pc-d-none">현재가</span>
                {{setCommaForString trade_price}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">직전일 종가</span>
                {{setCommaForString back_closing_price}}
            </div>
            <div class="cm-td chart-detail">
                <span class="pc-d-none">그래프</span>
                <div class="stock-chart-container">
                    <div class="chart-content">
                        <span>조회날</span>
                        <img src="{{chart.day}}">
                    </div>
                    <div class="chart-content">
                        <span>1개월</span>
                        <img src="{{chart.month}}">
                    </div>
                    <div class="chart-content">
                        <span>3개월</span>
                        <img src="{{chart.month3}}">
                    </div>
                    <div class="chart-content">
                        <span>1년</span>
                        <img src="{{chart.year}}">
                    </div>
                    <div class="chart-content">
                        <span>3년</span>
                        <img src="{{chart.year3}}">
                    </div>
                </div>
            </div>
            <div class="cm-td">
                <span class="pc-d-none">비고</span>
                {{company_info}}
            </div>
            <div class="cm-td">
                <div class="btn-wrap" style="flex-direction: column;">
                    <button type="button" class="cm-btn cm-btn-small cm-btn-n-default btn-delete button-delete">삭제</button>
                    <button type="button" class="cm-btn cm-btn-small btn-black btn-detail-view button-trend-view">트렌드</button>
                </div>
            </div>
        </div>
    {{/each}}
`;

export const view = `
    <style>
    .cont .cm-select-box {
        display: block !important;
    }
    </style>
    <div class="common-cont">
        <div class="sub-cont-top">
            <h4 class="sub-cont-title">{{title}}</h4>
        </div>
        <form id="form-data" class="form-data-table">
            <div class="search-form">
                <div class="tit require-validation">기관</div>
                <div class="cont">
                    <div class="select-box-parent-for-organization"></div>
<!--                    <div class="cm-select-box organization-select-box" id="searchOrganSelectBox">-->
<!--                        <input type="hidden" class="selectItem" name="organizationCode" id="organizationCode">-->
<!--                        <button type="button" class="label font-size-14 font-weight-500">기관선택</button>-->
<!--                        <ul class="option-list" id="contentsForSelectWardOption" style="">-->
<!--                        </ul>-->
<!--                    </div>-->
                </div>
                <div class="tit require-validation">시리얼넘버</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" placeholder="시리얼넘버" name="serialNumber" />
                        <p class="error-text">시리얼넘버를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">macAddress</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" name="macAddress" placeholder="macAddress" />
                        <p class="error-text">macAddress를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">Firmware Version</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" name="fwVersion" placeholder="펌웨어 버전" />
                        <p class="error-text">펌웨어 버전을 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit">설치 장소(층)</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text" name="floor" placeholder="ex) 13병동 1301호 앞" autocomplete="off" />
                        <p class="error-text">설치 장소를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit">설치 장소(X)</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text" placeholder="X 좌표" name="axisX" autocomplete="off" />
                        <p class="error-text">X 좌표를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit">설치 장소(Y)</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text" placeholder="Y 좌표" name="axisY" autocomplete="off" />
                        <p class="error-text">Y 좌표를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit">비고</div>
                <div class="cont">
                    <div class="cm-textarea-cont" style="display: inline-block;">
                        <textarea name="etc" class="cm-textarea" placeholder="게이트웨이 설졍"></textarea>
                    </div>
                </div>
            </div>
            <div class="btm-btn-wrap d-flex">
                <button type="button" class="cm-btn cm-btn-full-default cm-btn-middle btn-confirm button-submit">등록</button>
                <button type="button" class="cm-btn cm-btn-middle btn-go-list">목록</button>
            </div>
        </form>
    </div>
`;

export const modalForChartOriginal = `
<section class="custom-layer-modal" id="{{id}}">
    <header class="custom-layer-modal-header">
        <h4 class="h4"><span class="icon"></span>Chart Original</h4>
    </header>
    <article class="custom-layer-modal-section">
        <div class="chart-container">
            <div class="stock-chart-container">
                <div class="chart-content">
                    <span>1개월</span>
                    <img src="{{chart.month}}">
                </div>    
                <div class="chart-content">
                    <span>3개월</span>
                    <img src="{{chart.month3}}">
                </div>
            </div>
            <div class="stock-chart-container">
                <div class="chart-content">
                    <span>1년</span>
                    <img src="{{chart.year}}">
                </div>
                <div class="chart-content">
                    <span>3년</span>
                    <img src="{{chart.year3}}">
                </div>          
            </div>
        </div>
        <button class="confirm-btn">확인</button>
    </article>
</section>
`;

export const modalForGoogleTrend = `
<section class="custom-layer-modal google-trend-view" id="{{id}}" style="width: 500px;">
    <header class="custom-layer-modal-header">
        <h4 class="h4"><span class="icon"></span>Google Trend - {{keyword}}</h4>
    </header>
    <article class="custom-layer-modal-section">
        <div class="cm-table-wrap board-view " >
            <div class="cm-table-cont" style="margin-top: 40px;">
                <div class="cm-colgroup">
                    <div style="width:70%"></div>
                    <div style="width:30%"></div>
                </div>
                <div class="cm-thead">
                    <div class="cm-tr">
                        <div class="cm-th">날짜</div>
                        <div class="cm-th">횟수</div>
                    </div>
                </div>
                <div class="cm-tbody">
                    {{#each datas}}
                    <div class="cm-tr">
                        <div class="cm-td">
                            <span class="pc-d-none">날짜</span>
                            {{iso8601ToDateString date 'yyyy-MM-dd'}}
                        </div>
                        <div class="cm-td">
                            <span class="pc-d-none">횟수</span>
                            {{setCommaForString interest}}
                        </div>
                    </div>
                    {{/each}}
                </div>
            </div>
        </div>
        <button class="confirm-btn">확인</button>
    </article>
</section>
`;