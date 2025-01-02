"use strict";

/**
 * @file crud 모듈의 기본 design 파일
 * @author Ella
 * @description crud 모듈의 index, add, update 의 design 파일
 */

export const index = `
    <div class="common-cont">
        <div class="sub-cont-top">
            <h4 class="sub-cont-title">Search</h4>
            <div class="display-flex">
                {{#each _b}}
                <button type="button" class="cm-btn cm-btn-middle {{ADD_CLASS}}">{{NAME}}</button>
                {{/each}}
            </div>
        </div>
        <form class="form-common-search">
            <div class="search-form">
                {{#each _s}}
                    {{#if VIEW.IS_INDEX}}
                        {{#customIf VALUE.TYPE '==' 'select-box'}}
                        <div class="tit">{{VIEW.TITLE}}</div>
                        <div class="cont">
                            <div class="cm-select-box-custom {{VALUE.CUSTOM_ADD_CLASS}}"></div>
                            {{#if VALUE.SEARCH_BTN}}
                            <div class="cm-device-search">
                                <button type="button" class="device-search-btn form-common-search-button">
                                    <span class="img"></span>
                                </button>
                            </div>
                            {{/if}}
                        </div>
                        {{/customIf}}
                        {{#customIf VALUE.TYPE '==' 'radio-box'}}
                        <div class="tit">{{VIEW.TITLE}}</div>
                        <div class="cont">
                            <div class="radio-box">
                            {{#each VALUE.RADIO_CONT}}
                                <div class="radio-btn-cont">
                                    <input type="radio" id="{{../VALUE.COLUMN}}{{VALUE}}" name="{{../VALUE.COLUMN}}" class="radio-input {{../VALUE.CUSTOM_ADD_CLASS}}" value="{{VALUE}}" {{#customIf @index '===' 0}}checked{{/customIf}}>
                                    <label for="{{.  ./VALUE.COLUMN}}{{VALUE}}" class="span">{{TITLE}}</label>
                                </div>
                            {{/each}}
                            </div>
                            {{#if VALUE.SEARCH_BTN}}
                            <div class="cm-device-search">
                                <button type="button" class="device-search-btn form-common-search-button">
                                    <span class="img"></span>
                                </button>
                            </div>
                            {{/if}}
                        </div>
                        {{/customIf}}
                        {{#customIf VALUE.TYPE '==' 'search'}}
                        <div class="tit">{{VIEW.TITLE}}</div>
                        <div class="cont">
                            <div class="cm-device-search">
                                <span class="span d-none">검색</span>
                                <div class="default-background common-search-input">
                                    <img class="search-icon d-none" src="/assets/images/theme/{{../moduleTheme}}/icon/search.png" />
                                    <input type="text" class="font-size-14 font-weight-500 search-input-enter form-common-search-keyword use-option" name="search" placeholder="{{VALUE.PLACEHOLDER}}">
                                </div>
                                {{#if VALUE.SEARCH_BTN}}
                                <button type="button" class="device-search-btn form-common-search-button">
                                    <span class="img"></span>
                                </button>
                                {{/if}}
                            </div>
                        </div>
                        {{/customIf}}
                        {{#customIf VALUE.TYPE '==' 'text'}}
                        <div class="tit">{{VIEW.TITLE}}</div>
                        <div class="cont">
                            <div class="cm-input-cont">
                                <input type="text" class="cm-input-text" placeholder="{{VALUE.PLACEHOLDER}}" name="{{VALUE.NAME}}" />
                            </div>
                        </div>
                        {{/customIf}}
                    {{/if}}
                {{/each}}
            </div>
        </form>
        <div class="cm-table-wrap board-view">
            <div class="cm-table-cont">
                <div class="cm-colgroup">
                    {{#each _c}}
                    <div style="width:{{STYLE.WIDTH}}"></div>
                    {{/each}}>
                </div>
                <div class="cm-thead">
                    <div class="cm-tr">
                        {{#each _c}}
                            {{#customIf TYPE '==' 'check-box'}}
                            <div class="cm-th">
                                <div class="cm-checkbox-box type02 pd-4">
                                    <input class="input" type="checkbox" value="" id="listAllCheck">
                                </div>
                            </div>
                            {{else}}
                            <div class="cm-th">{{TITLE}}</div>
                            {{/customIf}}
                        {{/each}}
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
        <div class="cm-tr" 
        {{#each ../_c.DATA_PARSE}}
            data-{{TYPE}}="{{_t ../this DATA_PARSING}}" 
        {{/each}}
        >
        {{#each ../_c.COLUMN}}
            {{#customIf TYPE '==' 'check-box'}}
                <div class="cm-td {{ADD_CLASS}}">
                    <div class="cm-checkbox-box type02 pd-4">
                        <input class="input" type="checkbox" value="" id="checkbox_{{_t ../this DATA_ID}}">
                    </div>
                </div>
            {{/customIf}}
            {{#customIf TYPE '==' 'number'}}
                <div class="cm-td td-num {{ADD_CLASS}}">{{_t ../this DATA_ID}}</div>
            {{/customIf}}
            {{#customIf TYPE '==' 'text'}}
            <div class="cm-td {{ADD_CLASS}}">
                <span class="pc-d-none">{{TITLE}}</span>
                {{_t ../this DATA_PARSING}}
            </div>
            {{/customIf}}
            {{#customIf TYPE '==' 'buttons'}}
            <div class="cm-td {{ADD_CLASS}}">
                <div class="btn-wrap">
                    <button type="button" class="cm-btn cm-btn-small btn-black btn-detail-view button-update">수정</button>
                    <button type="button" class="cm-btn cm-btn-small cm-btn-n-default btn-delete">삭제</button>
                </div>
            </div>
            {{/customIf}}
        {{/each}}
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
                {{#each _c}}
                    {{#if VIEW.IS_ADD}}
                        {{#customIf VALUE.TYPE '==' 'select-box'}}
                            <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                            <div class="cont">
                                <div class="cm-select-box-custom {{VALUE.CUSTOM_ADD_CLASS}}"></div>
                            </div>
                        {{/customIf}}
                        {{#customIf VALUE.TYPE '==' 'text'}}
                            <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                            <div class="cont">
                                <div class="cm-input-cont">
                                    <input type="text" class="cm-input-text {{#if VIEW.ACTIVE}}check active-check{{/if}}" placeholder="{{VALUE.PLACEHOLDER}}" name="{{VALUE.NAME}}"
                                        {{#if VALUE.IS_CHECK}}
                                            {{#each VALUE.LIMIT}}
                                                min="{{../VALUE.LIMIT.MIN}}"
                                                max="{{../VALUE.LIMIT.MAX}}"
                                                maxlength="{{../VALUE.LIMIT.MAXLENGTH}}"
                                                minlength="{{../VALUE.LIMIT.MINLENGTH}}"
                                            {{/each}}
                                        {{/if}}
                                    />
                                </div>
                            </div>
                        {{/customIf}}
                        {{#customIf VALUE.TYPE '==' 'password'}}
                            <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                            <div class="cont">
                                <div class="cm-input-cont">
                                    <input type="password" class="cm-input-text {{#if VIEW.ACTIVE}}check active-check{{/if}}" autocomplete="new-password" placeholder="{{VALUE.PLACEHOLDER}}" name="{{VALUE.NAME}}"
                                        {{#if VALUE.IS_CHECK}}
                                            {{#each VALUE.LIMIT}}
                                                min="{{../VALUE.LIMIT.MIN}}"
                                                max="{{../VALUE.LIMIT.MAX}}"
                                                maxlength="{{../VALUE.LIMIT.MAXLENGTH}}"
                                                minlength="{{../VALUE.LIMIT.MINLENGTH}}"
                                            {{/each}}
                                        {{/if}}
                                    />
                                </div>
                            </div>
                        {{/customIf}}
                        {{#customIf VALUE.TYPE '==' 'textarea'}}
                            <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                            <div class="cont">
                                <div class="cm-textarea-cont" style="display: inline-block;">
                                    <textarea name="{{VALUE.NAME}}" class="cm-textarea {{#if VIEW.ACTIVE}}check active-check{{/if}}" placeholder="{{VALUE.PLACEHOLDER}}"></textarea>
                                </div>
                            </div>
                        {{/customIf}}
                        {{#customIf VALUE.TYPE '==' 'radio-box'}}
                            <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                            <div class="cont">
                                <div class="radio-box">
                                    {{#each VALUE.RADIO_CONT}}
                                        <div class="radio-btn-cont">
                                            <input type="radio" id="{{../VALUE.COLUMN}}{{VALUE}}" name="{{../VALUE.COLUMN}}" class="radio-input {{../VALUE.CUSTOM_ADD_CLASS}}" value="{{VALUE}}" {{#customIf @index '===' 0}}checked{{/customIf}}>
                                            <label for="{{../VALUE.COLUMN}}{{VALUE}}" class="span">{{TITLE}}</label>
                                        </div>
                                    {{/each}}
                                </div>
                            </div>
                        {{/customIf}}
                        {{#customIf VALUE.TYPE '===' 'calendar'}}
                            <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                            <div class="cont">
                                 <div class="search-date-cont {{VALUE.NAME}}">
                                    <span class="icon"></span>
                                    <input type="text" class="search-data-input" id="{{VALUE.NAME}}" name={{VALUE.NAME}} readonly />
                                </div>
                            </div>
                        {{/customIf}}
                    {{/if}}
                {{/each}}
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
            {{#each _c}}
                {{#if VIEW.IS_UPDATE}}
                    {{#customIf VALUE.TYPE '==' 'radio-box'}}
                        <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                        <div class="cont">
                            <div class="radio-box">
                                {{#each VALUE.RADIO_CONT}}
                                    <div class="radio-btn-cont">
                                        <input type="radio" id="{{../VALUE.COLUMN}}{{VALUE}}" name="{{../VALUE.COLUMN}}" class="radio-input" value="{{VALUE}}" {{#customIfChange ../../datas ../VALUE.COLUMN '===' VALUE}}checked{{/customIfChange}} {{#if ../VALUE.IS_DISABLED}}disabled{{/if}} />
                                        <label for="{{../VALUE.COLUMN}}{{VALUE}}" class="span">{{TITLE}}</label>
                                    </div>
                                {{/each}}   
                            </div>
                        </div>
                    {{/customIf}}
                    {{#customIf VALUE.TYPE '==' 'text'}}
                        <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                        <div class="cont">
                            <div class="cm-input-cont">
                                <input type="text" class="cm-input-text {{#if VIEW.ACTIVE}}check active-check{{/if}}" value="{{_d ../datas VALUE.COLUMN}}" name="{{VALUE.NAME}}" autocomplete="off" {{#if VALUE.IS_DISABLED}}disabled{{/if}} placeholder="{{VALUE.PLACEHOLDER}}" 
                                {{#if VALUE.IS_CHECK}}
                                    {{#each VALUE.LIMIT}}
                                        min="{{../VALUE.LIMIT.MIN}}"
                                        max="{{../VALUE.LIMIT.MAX}}"
                                        minlength="{{../VALUE.LIMIT.MINLENGTH}}"
                                        maxlength="{{../VALUE.LIMIT.MAXLENGTH}}"
                                    {{/each}}
                                {{/if}}
                                />
                                <p class="error-text">유효성 검사 에러 메세지 입니다.</p>
                            </div>
                        </div>
                    {{/customIf}}
                    {{#customIf VALUE.TYPE '==' 'password'}}
                        <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                        <div class="cont">
                            <div class="cm-input-cont">
                                <input type="password" class="cm-input-text {{#if VIEW.ACTIVE}}check active-check{{/if}}" autocomplete="new-password" placeholder="{{VALUE.PLACEHOLDER}}" name="{{VALUE.NAME}}"
                                    {{#if VALUE.IS_CHECK}}
                                        {{#each VALUE.LIMIT}}
                                            min="{{../VALUE.LIMIT.MIN}}"
                                            max="{{../VALUE.LIMIT.MAX}}"
                                            minlength="{{../VALUE.LIMIT.MINLENGTH}}"
                                            maxlength="{{../VALUE.LIMIT.MAXLENGTH}}"
                                        {{/each}}
                                    {{/if}}
                                />
                            </div>
                        </div>
                    {{/customIf}}
                    {{#customIf VALUE.TYPE '==' 'textarea'}}
                        <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                        <div class="cont">
                            <div class="cm-textarea-cont" style="display: inline-block;">
                                <textarea name="{{VALUE.NAME}}" class="cm-textarea {{#if VIEW.ACTIVE}}check active-check{{/if}}" placeholder="{{VALUE.PLACEHOLDER}}" 
                                 {{#if VALUE.IS_CHECK}}
                                    {{#each VALUE.LIMIT}}
                                        min="{{../VALUE.LIMIT.MIN}}"
                                        max="{{../VALUE.LIMIT.MAX}}"
                                        minlength="{{../VALUE.LIMIT.MINLENGTH}}"
                                        maxlength="{{../VALUE.LIMIT.MAXLENGTH}}"
                                    {{/each}}
                                {{/if}}
                                >{{_d ../datas VALUE.COLUMN}}</textarea>
                            </div>
                        </div>
                    {{/customIf}}
                    {{#customIf VALUE.TYPE '==' 'select-box'}}
                        {{#if VALUE.IS_DISABLED}}
                            <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                            <div class="cont">
                                <div class="cm-input-cont">
                                    <input type="text" class="cm-input-text {{#if VIEW.ACTIVE}}check active-check{{/if}}" 
                                    {{#if VALUE.OTHER_NAME_CHECK}}
                                    value="{{_d ../datas VALUE.OTHER_NAME}}" 
                                    name="{{VALUE.OTHER_NAME}}" 
                                    id="{{VALUE.OTHER_NAME}}" 
                                    {{else}}
                                    value="{{_d ../datas VALUE.COLUMN}}" 
                                    name="{{VALUE.NAME}}" 
                                    id="{{VALUE.COLUMN}}" 
                                    {{/if}}
                                    autocomplete="off" {{#if VALUE.IS_DISABLED}}disabled{{/if}} />
                                    <p class="error-text">유효성 검사 에러 메세지 입니다.</p>
                                </div>
                            </div>
                        {{else}}
                            <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                            <div class="cont">
                                <div class="cm-select-box-custom {{VALUE.CUSTOM_ADD_CLASS}}"></div>
                            </div>
                        {{/if}}
                    {{/customIf}}
                    {{#customIf VALUE.TYPE '===' 'calendar'}}
                        <div class="tit {{#if VIEW.ACTIVE}}require-validation{{/if}}">{{VIEW.TITLE}}</div>
                        <div class="cont">
                             <div class="search-date-cont {{VALUE.NAME}}" >
                                
                                <span class="icon"></span>
                                <input type="text" class="search-data-input" id="{{VALUE.NAME}}" name={{VALUE.NAME}} value="{{_d ../datas VALUE.NAME}}" readonly />
                            </div>
                        </div>
                        {{/customIf}}
                {{/if}}
            {{/each}}
            </div>
            <div class="btm-btn-wrap d-flex">
                <button type="button" class="cm-btn cm-btn-full-default cm-btn-middle btn-confirm">수정</button>
                <button type="button" class="cm-btn cm-btn-middle btn-go-list">목록</button>
            </div>
        </form>
    </div>
`;