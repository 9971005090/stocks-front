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
            <div>
                <button type="button" class="cm-btn cm-btn-middle btn-black btn-add">등록</button>
            </div>
        </div>
        <form class="form-common-search">
            <div class="search-form">
                <div class="tit">기관</div>
                <div class="cont">
                    <div class="select-box-parent-for-organization"></div>
<!--                    <div class="cm-select-box organization-select-box" id="searchOrganSelectBox">-->
<!--                        <input type="hidden" class="selectItem" name="" id="" value="all" />-->
<!--                        <button type="button" class="label font-size-14 font-weight-500">기관선택</button>-->
<!--                        <ul class="option-list" id="contentsForSelectWardOption" style="">-->
<!--                        </ul>-->
<!--                    </div>-->
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
                    <div style="width:15%"></div>
                    <div style="width:10%"></div>
                    <div style="width:8%"></div>
                    <div style="width:5%"></div>
                    <div style="width:10%"></div>
                    <div style="width:32%"></div>
                    <div style="width:10%"></div>
                </div>
                <div class="cm-thead">
                    <div class="cm-tr">
                        <div class="cm-th">기관</div>
                        <div class="cm-th">버전</div>
                        <div class="cm-th">크기</div>
                        <div class="cm-th">레벨</div>
                        <div class="cm-th">등록시간</div>
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

export const dataTable = `
    {{#each datas}}
        <div class="cm-tr" data-fw-version="{{fwVersion}}" data-organization-code="{{organizationCode}}">
            <div class="cm-td">
                <span class="pc-d-none">기관</span>
                {{parsingOrganization}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">버전</span>
                {{fwVersion}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">크기</span>
                {{KbToMb fileSize}} Mb
            </div>
            <div class="cm-td">
                <span class="pc-d-none">레벨</span>
                {{parsingLevel}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">등록시간</span>
                {{dateTime}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">비고</span>
                {{etc}}
            </div>
            <div class="cm-td">
                <div class="btn-wrap">
                    <button type="button" class="cm-btn cm-btn-small cm-btn-n-default btn-delete">삭제</button>
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
<!--                    <div class="cm-select-box organization-select-box" id="searchOrganSelectBox">-->
<!--                        <input type="hidden" class="selectItem check" name="organizationCode" id="organizationCode">-->
<!--                        <button type="button" class="label font-size-14 font-weight-500">기관선택</button>-->
<!--                        <ul class="option-list" id="contentsForSelectWardOption" style="">-->
<!--                        </ul>-->
<!--                    </div>-->
                </div>
                <div class="tit require-validation">버전</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" placeholder="버전" name="fwVersion" />
                        <p class="error-text">버전을 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">레벨</div>
                <div class="cont">
                    <div class="radio-box" data-original="{{level}}">
                        {{#each CONSTANTS.LEVEL_TYPE}} 
                            <div class="radio-btn-cont">
                                <input type="radio" id="level{{@key}}" name="level" class="radio-input" value="{{@key}}" {{#customIf @index '===' 0}}checked{{/customIf}}>
                                <label for="level{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="tit require-validation">파일</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="file" class="cm-input-text check active-check" placeholder="파일" name="file" id="firmware_file" />
                        <p class="error-text">파일을 선택해주세요.</p>
                    </div>
                </div>
                <div class="tit">비고</div>
                <div class="cont">
                    <div class="cm-textarea-cont" style="display: inline-block;">
                        <textarea name="etc" class="cm-textarea" placeholder="비고"></textarea>
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