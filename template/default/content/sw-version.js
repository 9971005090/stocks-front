"use strict";
export const index = `
    <div class="common-cont">
        <div class="sub-cont-top">
            <h4 class="sub-cont-title">설치된 버전</h4>
            <div>
                <button type="button" class="cm-btn cm-btn-middle btn-black btn-add">등록</button>
                <button type="button" class="cm-btn cm-btn-middle btn-black btn-apply">선택 적용</button>
                <button type="button" class="cm-btn cm-btn-middle cm-btn-n-default btn-all-delete">선택 삭제</button>
            </div>
        </div>
            <div class="installed_software">
                <div class="cm-table-wrap board-view">
                    <div class="cm-table-cont">
                        <div class="cm-colgroup">
                            <div style="width:30%"></div>
                            <div style="width:40%"></div>
                            <div style="width:30%"></div>
                        </div>
                        <div class="cm-thead">
                            <div class="cm-tr">
                                <div class="cm-th">소프트웨어 종류</div>
                                <div class="cm-th">버전</div>
                                <div class="cm-th">날짜</div>
                            </div>
                        </div>
                        <div class="cm-tbody" id="contents-by-installed-data-table"></div>
                    </div>
                </div>
            </div>
        <form class="form-common-search">
            <div class="search-form">
                <div class="tit">기관</div>
                <div class="cont">
                    <div class="cm-select-box-custom select-box-parent-for-organization"></div>
                </div>
                <div class="tit">소프트웨어</div>
                <div class="cont">
                    <div class="cm-select-box-custom select-box-parent-for-software"></div>
                </div>
            </div>
        </form>
        <div class="cm-table-wrap board-view" style="min-height:300px;">
            <div class="cm-table-cont">
                <div class="cm-colgroup">
                    <div style="width:5%"></div>
                    <div style="width:10%"></div>
                    <div style="width:10%"></div>
                    <div style="width:10%"></div>
                    <div style="width:10%"></div>
                    <div style="width:45%"></div>
                    <div style="width:15%"></div>
                </div>
                <div class="cm-thead">
                    <div class="cm-tr">
                        <div class="cm-th">
                            <div class="cm-checkbox-box type02 pd-4">
                                <input class="input" type="checkbox" value="" id="listAllCheck">
                            </div>
                        </div>
                        <div class="cm-th">기관</div>
                        <div class="cm-th">소프트웨어</div>
                        <div class="cm-th">버전</div>
                        <div class="cm-th">날짜</div>
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

export const indexDataTable = `
    {{#each datas}}
    <div class="cm-tr">
        <div class="cm-td">
            <span class="pc-d-none">{{parsingSwType swType}}</span>
            {{parsingSwType swType}}
        </div>
        <div class="cm-td">
            <span class="pc-d-none">{{parsingVersion swVersion}}</span>
            {{parsingVersion swVersion}}
        </div>
        <div class="cm-td">
            <span class="pc-d-none">{{updateTime}}</span>
            {{updateTime}}
        </div>
    </div>
    {{/each}}
`;
export const dataTable = `
    {{#each datas}}
        <div class="cm-tr" data-sw-organ="{{organizationCode}}" data-sw-id="{{swVersionId}}" data-sw-type="{{swType}}" data-sw-version="{{swVersion}}" data-sw-activeStatus="{{activeStatus}}" {{#customIf activeStatus "===" 1}}style="background:#f3f7fe;"{{/customIf}}>
            <div class="cm-td">
                <div class="cm-checkbox-box type02 pd-4">
                    <input class="input" type="checkbox" value="" id="checkbox_{{id}}">
                </div>
            </div>
            <div class="cm-td">
                <span class="pc-d-none">기관</span>
                {{parsingOrganization}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">소프트웨어</span>
                {{parsingSwType swType}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">버전</span>
                {{parsingVersion swVersion}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">날짜</span>
                {{updateTime}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">비고</span>
                {{etc}}
            </div>
            <div class="cm-td">
                <div class="btn-wrap">
                    {{#customIf activeStatus "===" 1}}
                    <button type="button" class="cm-btn cm-btn-small btn-black button-sw-active no-active">미적용</button>
                    {{else}}
                    <button type="button" class="cm-btn cm-btn-small btn-black button-sw-active">적용</button>
                    {{/customIf}}
                    <button type="button" class="cm-btn cm-btn-small btn-black btn-detail-view button-update">수정</button>
                    {{#customIf activeStatus "===" 0}}
                    <button type="button" class="cm-btn cm-btn-small cm-btn-n-default btn-delete">삭제</button>
                    {{/customIf}}
                </div>
            </div>
        </div>
    {{/each}}
`;

export const add = `
    <div class="common-cont">
        <div class="sub-cont-top">
            <h4 class="sub-cont-title">{{title}}</h4>
        </div>
        <form id="form-data" class="form-data-table">
            <div class="search-form">
                <div class="tit require-validation">기관</div>
                <div class="cont">
                    <div class="cm-select-box-custom select-box-parent-for-organization"></div>
                </div>
                <div class="tit require-validation">소프트웨어 타입</div>
                <div class="cont">
                    <div class="cm-select-box-custom select-box-parent-for-software"></div>
                </div>
                <div class="tit require-validation">버전</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" placeholder="버전" name="swVersion" />
                        <p class="error-text">버전을 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit">적용</div>
                <div class="cont">
                    <div class="radio-box" data-original="{{isUse}}">
                        {{#each CONSTANTS.IS_USE}} 
                            <div class="radio-btn-cont">
                                <input type="radio" id="isUse{{@key}}" name="isUse" class="radio-input" value="{{@key}}" {{#customIf @index '===' 0}}checked{{/customIf}}>
                                <label for="isUse{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="tit">파일</div>
                <div class="cont">
                    <!--<div class="radio-box" data-original="{{isUse}}">
                        {{#each CONSTANTS.IS_USE}} 
                            <div class="radio-btn-cont">
                                <input type="radio" id="isUse{{@key}}" name="isUse" class="radio-input" value="{{@key}}" {{#customIf @index '===' 0}}checked{{/customIf}}>
                                <label for="isUse{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>-->
                    <div class="cm-input-cont display-flex" style="gap:8px;">
                        <input class="upload-name" type="text" placeholder="첨부파일" readonly="">
                        <input type="file" name="file" class="cm-input-text" id="firmware_file">
                        <label for="firmware_file" class="cm-btn cm-btn-small cm-btn-default">파일찾기</label>
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

export const update = `
    <div class="common-cont">
        <div class="sub-cont-top">
            <h4 class="sub-cont-title">{{title}}</h4>
        </div>
        <form id="form-data" class="form-data-table">
            <div class="search-form">
                <div class="tit require-validation">기관</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text" value="{{datas.organizationCode}}" name="organizationCode" id="organizationCode" autocomplete="off" disabled />
                    </div>
                </div>
                <div class="tit require-validation">소프트웨어 타입</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text" value="{{parsingSwType datas.swType}}" name="swType" id="swType" autocomplete="off" disabled />
                    </div>
                </div>         
                <div class="tit require-validation">버전</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text" value="{{datas.swVersion}}" name="swVersion" id="swVersion" autocomplete="off" disabled />
                    </div>
                </div>
                <div class="tit">적용</div>
                <div class="cont">
                    <div class="radio-box">
                        {{#each CONSTANTS.IS_USE}} 
                            <div class="radio-btn-cont">
                                <input type="radio" id="isUse{{@key}}" name="isUse" class="radio-input" value="{{@key}}" {{#customIf ../datas.activeStatus '==' @key}}checked{{/customIf}}>
                                <label for="isUse{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="tit">파일</div>
                <div class="cont">
                    <div class="cm-input-cont display-flex" style="gap:8px;">
                        <input class="upload-name" type="text" placeholder="첨부파일" readonly="" value="{{parsingFileName datas.fileKey}}">
                        <input type="file" name="file" class="cm-input-text" id="firmware_file">
                        <label for="firmware_file" class="cm-btn cm-btn-small cm-btn-default">파일찾기</label>
                        {{#customIf datas.fileSize "!==" 0}}
                        <div class="btm-btn-wrap pt-0">
                            <button type="button" class="cm-btn cm-btn-small btn-download">다운로드</button>
                        </div>
                        {{/customIf}}
                    </div>
                </div>
                <div class="tit">비고</div>
                <div class="cont">
                    <div class="cm-textarea-cont" style="display: inline-block;">
                        <textarea name="etc" class="cm-textarea" placeholder="비고">{{datas.etc}}</textarea>
                    </div>
                </div>
            </div>
            <div class="btm-btn-wrap d-flex">
                <button type="button" class="cm-btn cm-btn-full-default cm-btn-middle btn-confirm button-submit">수정</button>
                <button type="button" class="cm-btn cm-btn-middle btn-go-list">목록</button>
            </div>
        </form>
    </div>
`;