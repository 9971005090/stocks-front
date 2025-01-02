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
            <div class="display-flex">
                <button type="button" class="cm-btn cm-btn-middle btn-black btn-add">등록</button>
                <button type="button" class="cm-btn cm-btn-middle btn-black btn-add-for-bulk">대량 등록</button>
                <button type="button" class="cm-btn cm-btn-middle btn-black btn-move-for-choice">선택 이동</button>
                <button type="button" class="cm-btn cm-btn-middle cm-btn-n-default btn-all-delete" style="display: none">선택 삭제</button>
            </div>
        </div>
        <form class="form-common-search">
            <div class="search-form">
                <div class="tit">기관/ 병동</div>
                <div class="cont">
                    <div class="select-box-parent-for-organization"></div>
                    <div class="select-box-parent-for-ward"></div>
<!--                    <div class="cm-select-box organization" id="organSelectBox">-->
<!--                        <input type="hidden" class="select-item use-option" name="targetOrganizationCode" id="" value="" data-not-parsing-value="" />-->
<!--                        <button type="button" class="label font-size-14 font-weight-500"></button>-->
<!--                        <ul class="option-list" id="contentsForSelectOrganOption" style=""></ul>-->
<!--                    </div>-->
<!--                    <div class="cm-select-box ward" id="wardSelectBox">-->
<!--                        <input type="hidden" class="select-item use-option" name="wardCode" id="" value="" data-not-parsing-value="" />-->
<!--                        <button type="button" class="label font-size-14 font-weight-500"></button>-->
<!--                        <ul class="option-list" id="contentsForSelectWardOption" style=""></ul>-->
<!--                    </div>-->
                </div>
                <div class="tit">종류</div>
                <div class="cont">
                    <div class="radio-box">
                        {{#each CONSTANTS.TYPE}} 
                            <div class="radio-btn-cont">
                                <input type="radio" id="device-type{{@key}}" name="deviceType" class="radio-input use-option" value="{{@key}}" {{#customIf @index '===' 0}}checked{{/customIf}}>
                                <label for="device-type{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="tit">사용</div>
                <div class="cont">
                    <div class="radio-box">
                        {{#each CONSTANTS.USE}} 
                            <div class="radio-btn-cont">
                                <input type="radio" id="use{{this.key}}" name="deviceUseStatus" class="radio-input use-option" value="{{this.key}}" {{#customIf @index '===' 0}}checked{{/customIf}} data-not-parsing-value="-1">
                                <label for="use{{this.key}}" class="span">{{this.value}}</label>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="tit">검색어</div>
                <div class="cont">
                    <div class="cm-device-search">
                        <span class="span d-none">검색</span>
                        <div class="default-background common-search-input">
                            <img class="search-icon d-none" src="/assets/images/theme/{{THEME}}/icon/search.png" />
                            <input type="text" class="font-size-14 font-weight-500 search-input-enter form-common-search-keyword use-option" name="search" placeholder="검색어를 입력해 주세요.">
                        </div>  
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
                    <div style="width:5%"></div>
                    <div style="width:5%"></div>
                    <div style="width:11%"></div>
                    <div style="width:9%"></div>
                    <div style="width:9%"></div>
                    <div style="width:12%"></div>
                    <div style="width:23%"></div>
                    <div style="width:14%"></div>
                    <div style="width:12%"></div>
                </div>
                <div class="cm-thead">
                    <div class="cm-tr">
                        <div class="cm-th">
                            <div class="cm-checkbox-box type02 pd-4">
                                <input class="input" type="checkbox" value="" id="listAllCheck">
                            </div>
                        </div>
                        <div class="cm-th">사용</div>
                        <div class="cm-th">기관</div>
                        <div class="cm-th">종류</div>
                        <div class="cm-th">시리얼번호</div>
                        <div class="cm-th">맥어드레스</div>
                        <div class="cm-th">전체사용시간/ 전체사용횟수</div>
                        <div class="cm-th">등록시간</div>
                        <div class="cm-th">관리</div>
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
        <div class="cm-tr" data-serial-number="{{serialNumber}}">
            <div class="cm-td">
                {{#customIf deviceUseStatus '===' 0}}
                <div class="cm-checkbox-box type02 pd-4">
                    <input class="input" type="checkbox" value="" id="checkbox_{{serialNumber}}">
                </div>
                {{/customIf}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">사용</span>
                {{#customIf deviceUseStatus '===' 1}}O{{else}}X{{/customIf}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">기관</span>
                {{parsingOrganization}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">종류</span>
                {{parsingType}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">시리얼번호</span>
                {{serialNumber}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">맥어드레스</span>
                {{macAddress}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">전체사용시간/ 전체사용횟수</span>
                {{parsingForTotalUseTime totalUseTime 'D_M_H'}}/ {{totalUseCount}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">등록시간</span>
                {{dateTime}}
            </div>
            <div class="cm-td">
                <div class="btn-wrap" style="min-height: 32px;">
<!--                    <button type="button" class="cm-btn cm-btn-small btn-black btn-detail-view button-update">수정</button>-->
                    <button type="button" class="cm-btn cm-btn-small cm-btn-n-default btn-delete" style="{{#customIf deviceUseStatus '!==' 0}}display: none{{/customIf}}">삭제</button>
                </div>
            </div>
        </div>
    {{/each}}
`;

export const add = `
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
<!--                    <div class="cm-select-box organization" id="organSelectBox">-->
<!--                        <input type="hidden" class="select-item check active-check" name="deviceOrganizationCode" id="" value="" data-not-parsing-value="" />-->
<!--                        <button type="button" class="label font-size-14 font-weight-500"></button>-->
<!--                        <ul class="option-list" id="contentsForSelectOrganOption" style=""></ul>-->
<!--                    </div>-->
                </div>
                <div class="tit require-validation">병동</div>
                <div class="cont">
                    <div class="select-box-parent-for-ward"></div>
<!--                    <div class="cm-select-box ward" id="wardSelectBox">-->
<!--                        <input type="hidden" class="select-item check active-check" name="wardCode" id="" value="" data-not-parsing-value="" />-->
<!--                        <button type="button" class="label font-size-14 font-weight-500"></button>-->
<!--                        <ul class="option-list" id="contentsForSelectWardOption" style=""></ul>-->
<!--                    </div>-->
                </div>
<!--                <div class="tit require-validation">종류</div>-->
<!--                <div class="cont">-->
<!--                    <div class="radio-box">-->
<!--                        {{#each CONSTANTS.TYPE}} -->
<!--                            <div class="radio-btn-cont">-->
<!--                                <input type="radio" id="type{{@key}}" name="device-type" class="radio-input" value="{{@key}}" {{#customIf @index '===' 0}}checked{{/customIf}}>-->
<!--                                <label for="type{{@key}}" class="span">{{this}}</label>-->
<!--                            </div>-->
<!--                        {{/each}}-->
<!--                    </div>-->
<!--                </div>-->
                <div class="tit require-validation">시리얼번호</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" placeholder="의료기기 고유 시리얼번호" name="serialNumber" maxlength="7" />
                    </div>
                </div>
                <div class="tit">닉네임</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text" placeholder="의료기기 고유 닉네임" name="deviceCode" maxlength="25" />
                    </div>
                </div>
                <div class="tit">비고</div>
                <div class="cont">
                    <div class="cm-textarea-cont" style="display: inline-block;">
                        <textarea name="etc" class="cm-textarea" placeholder="의료기기 기타 정보"></textarea>
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
export const addForBulk = `
    <style>
    .cont .cm-select-box {
        display: block !important;
    }
    .device-bulk-info-list {
        display: flex;
        align-items: center;
        width: 105px;
        height: 32px;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
    }
    .device-bulk-info-list .device-bulk-del-btn {
        background: #FFFFFF;
        /*border: 1px solid #DD1111;*/
        /*border-radius: 4px;*/
        padding: 5px;
        cursor: pointer;
    }
    .device-bulk-info-list .device-bulk-del-btn .img {
        display: block;
        background: #DD1111;
        width: 12px;
        height: 12px;
        mask-image: url(/assets/images/theme/thync-manager/icon/delete.svg);
        mask-repeat: no-repeat;
        mask-position: center;
        mask-size: cover;
        -webkit-mask-image: url(/assets/images/theme/thync-manager/icon/delete.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
        -webkit-mask-size: cover;
    }
    .device-bulk-info-list .device-bulk-serial-number {
        padding-left: 16px;
        font-weight: 400;
        font-size: 14px;
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
<!--                    <div class="cm-select-box organization" id="organSelectBox">-->
<!--                        <input type="hidden" class="select-item check active-check" name="targetOrganizationCode" id="" value="" data-not-parsing-value="" />-->
<!--                        <button type="button" class="label font-size-14 font-weight-500"></button>-->
<!--                        <ul class="option-list" id="contentsForSelectOrganOption" style=""></ul>-->
<!--                    </div>-->
                </div>
                <div class="tit require-validation">병동</div>
                <div class="cont">
                    <div class="select-box-parent-for-ward"></div>
<!--                    <div class="cm-select-box ward" id="wardSelectBox">-->
<!--                        <input type="hidden" class="select-item check active-check" name="wardCode" id="" value="" data-not-parsing-value="" />-->
<!--                        <button type="button" class="label font-size-14 font-weight-500"></button>-->
<!--                        <ul class="option-list" id="contentsForSelectWardOption" style=""></ul>-->
<!--                    </div>-->
                </div>
                <div class="tit require-validation">시리얼번호</div>
                <div class="cont">
                    <div class="cm-device-search" style="width: auto">
                        <div class="cm-input-cont" style="width: auto">
                            <input type="text" class="cm-input-text device-bulk-serial-number-text" placeholder="의료기기 고유 시리얼번호" name="serialNumber" maxlength="7" />
                        </div>
                        <button type="button" class="device-search-btn device-bulk-serial-number-add-button">
                            <span style="color: white; font-size: 11px">추가</span>
                        </button>
                        <button type="button" class="device-search-btn device-bulk-excel-add-button" style=" width: 50px;">
                            <span style="color: white; font-size: 11px;">엑셀파일</span>
                        </button>
                        <div style="font-size: 11px;">(첫번째 시트의 A칼럼의 각 행에 하나씩 등록하고자 하는 시리얼번호 입력)</div>
                        <input type="file" id="excel-file-upload" style="display: none">
                    </div>
                    <div class="cm-textarea-cont device-bulk-info-parent" style="display: flex; flex-wrap: wrap; gap: 5px;"></div>
                </div>
                
            </div>
            <div class="btm-btn-wrap d-flex">
                <button type="button" class="cm-btn cm-btn-full-default cm-btn-middle btn-confirm button-submit">등록</button>
                <button type="button" class="cm-btn cm-btn-middle btn-go-list">목록</button>
            </div>
        </form>
    </div>
`;
export const addForBulkUnit = `
    <div class="device-bulk-info-list" data-serial-number="{{serialNumber}}" data-device-type="{{deviceType}}" data-mac-address="{{macAddress}}" data-device-code="">
        <span class="device-bulk-serial-number">{{serialNumber}}</span>
        <div class="device-bulk-del-btn"><span class="img"></span></div>
    </div>
`;




export const update = `
    <div class="common-cont">
        <div class="sub-cont-top">
            <h4 class="sub-cont-title">{{title}}</h4>
        </div>
        <form id="form-data" class="form-data-table">
            <div class="search-form">
                <div class="tit require-validation">기관</div>
                <div class="cont">
                    <div class="cm-select-box organization" id="organSelectBox">
                        <input type="hidden" class="select-item check active-check" name="deviceOrganizationCode" id="" value="" data-not-parsing-value="" />
                        <button type="button" class="label font-size-14 font-weight-500"></button>
                        <ul class="option-list" id="contentsForSelectOrganOption" style=""></ul>
                    </div>
                </div>
                <div class="tit require-validation">병동</div>
                <div class="cont">
                    <div class="cm-select-box ward" id="wardSelectBox">
                        <input type="hidden" class="select-item check active-check" name="wardCode" id="" value="" data-not-parsing-value="" />
                        <button type="button" class="label font-size-14 font-weight-500"></button>
                        <ul class="option-list" id="contentsForSelectWardOption" style=""></ul>
                    </div>
                </div>
                <div class="tit require-validation">시리얼번호</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" placeholder="의료기기 고유 시리얼번호" name="serialNumber" maxlength="7" />
                    </div>
                </div>
                <div class="tit">닉네임</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text" placeholder="의료기기 고유 닉네임" name="deviceCode" maxlength="25" />
                    </div>
                </div>
                <div class="tit">비고</div>
                <div class="cont">
                    <div class="cm-textarea-cont" style="display: inline-block;">
                        <textarea name="etc" class="cm-textarea" placeholder="의료기기 기타 정보"></textarea>
                    </div>
                </div>
            </div>
            <div class="btm-btn-wrap d-flex">
                <button type="button" class="cm-btn cm-btn-full-default cm-btn-middle btn-confirm">수정</button>
                <button type="button" class="cm-btn cm-btn-middle btn-go-list">목록</button>
            </div>
        </form>
    </div>
`;


export const moveForSelectBox = `
    <div style="display: flex; gap: 5px;">
        <div class="select-box-parent-for-organization-on-move"></div>
        <div class="select-box-parent-for-ward-on-move"></div>
<!--        <div class="cm-select-box move move-for-organization" id="move-for-organ-select-box">-->
<!--            <input type="hidden" class="select-item use-option" id="" value="" data-not-parsing-value="" />-->
<!--            <button type="button" class="label font-size-14 font-weight-500"></button>-->
<!--            <ul class="option-list" id="contentsForSelectOrganOption" style=""></ul>-->
<!--        </div>-->
<!--        <div class="cm-select-box move move-for-ward" id="move-for-ward-select-box">-->
<!--            <input type="hidden" class="select-item use-option" id="" value="" data-not-parsing-value="" />-->
<!--            <button type="button" class="label font-size-14 font-weight-500"></button>-->
<!--            <ul class="option-list" id="contentsForSelectWardOption" style=""></ul>-->
<!--        </div>-->
    </div>
`;