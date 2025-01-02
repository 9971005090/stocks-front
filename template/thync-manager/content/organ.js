"use strict";
export const index = `
    <div class="common-cont">
        <div class="sub-cont-top">
            <h4 class="sub-cont-title">Search</h4>
            <div>
                <button type="button" class="cm-btn cm-btn-middle btn-black btn-add">등록</button>
                <button type="button" class="cm-btn cm-btn-middle cm-btn-n-default btn-all-delete">선택 비활성화</button>
            </div>
        </div>
        <form class="form-common-search">
            <div class="search-form">
                <!--<div class="tit">HIS 연동여부</div>
                <div class="cont">
                    <div class="cm-select-box" id="searchSyncHisSelectBox">
                        <input type="hidden" class="check" name="syncHis" id="" value="all" />
                        <button type="button" class="label font-size-14 font-weight-500">HIS 연동선택</button>
                        <ul class="option-list" id="contentsForSelectHisOption" style="">
                        </ul>
                    </div>
                </div>
                <div class="tit">장치관리</div>
                <div class="cont">
                    <div class="cm-select-box" id="searchDeviceManagerSelectBox">
                        <input type="hidden" class="check" name="" id="" value="all" />
                        <button type="button" class="label font-size-14 font-weight-500">장치관리 선택</button>
                        <ul class="option-list" id="contentsForSelectDeviceOption" style="">
                        </ul>
                    </div>
                </div>-->
                <div class="tit">활성화 여부</div>
                <div class="cont">
                    <div class="radio-box">
                        {{#each CONSTANTS.EXPIRATION_TYPE}}
                            <div class="radio-btn-cont">
                                <input type="radio" id="expiration{{@key}}" name="expiration" class="radio-input" value="{{@key}}" {{#customIf @index '===' 0}}checked{{/customIf}}>
                                <label for="expiration{{@key}}" class="span">{{this}}</label>
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
                            <input type="text" class="font-size-14 font-weight-500 search-input-enter form-common-search-keyword" placeholder="기관 이름을 입력해 주세요.">
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
                    <div style="width:15%"></div>
                    <div style="width:15%"></div>
                    <div style="width:8%"></div>
                    <div style="width:8%"></div>
                    <div style="width:16%"></div>
<!--                    <div style="width:10%"></div>-->
                    <div style="width:11%"></div>
                    <div style="width:11%"></div>
                    <div style="width:11%"></div>
                </div>
                <div class="cm-thead">
                    <div class="cm-tr">
                        <div class="cm-th">
                            <div class="cm-checkbox-box type02 pd-4">
                                <input class="input" type="checkbox" value="" id="listAllCheck">
                            </div>
                        </div>
                        <div class="cm-th">코드</div>
                        <div class="cm-th">이름</div>
                        <div class="cm-th">HIS 연동여부</div>
                        <div class="cm-th">장치관리</div>
                        <div class="cm-th">담당자이메일</div>
<!--                        <div class="cm-th">기관 연락처</div>-->
                        <div class="cm-th">종료일자</div>
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
        <div class="cm-tr" data-id="{{organizationId}}" data-code="{{organizationCode}}">
            <div class="cm-td">
                <div class="cm-checkbox-box type02 pd-4">
                    <input class="input" type="checkbox" value="" id="checkbox_{{organizationId}}">
                </div>
            </div>
            <div class="cm-td">
                <span class="pc-d-none">코드</span>
                {{organizationCode}}
                </div>
            <div class="cm-td">
                <span class="pc-d-none">이름</span>
                {{organizationName}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">HIS 연동여부</span>
                {{parsingSyncHis syncHis}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">장치관리</span>
                {{parsingDeviceManagerType deviceManagerType}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">담당자이메일</span>
                {{systemManager}}
            </div>
<!--            <div class="cm-td">-->
<!--                <span class="pc-d-none">기관 연락처</span>-->
<!--                {{phoneNumber}}-->
<!--            </div>-->
            <div class="cm-td">
                <span class="pc-d-none">종료일자</span>
                {{stringToSubStr expirationDateTime 0 10}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">비고</span>
                {{etc}}
            </div>
            <div class="cm-td">
                <div class="btn-wrap">
                    <button type="button" class="cm-btn cm-btn-small btn-black btn-detail-view button-update">수정</button>
                    <button type="button" class="cm-btn cm-btn-small cm-btn-n-default btn-delete">비활성화</button>
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
                <div class="tit require-validation">코드</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" placeholder="기관 고유 코드를 입력해주세요." name="organizationCode" maxlength="25" />
                        <p class="error-text">기관 고유 코드를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">이름</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" placeholder="기관명을 입력해주세요." name="organizationName" maxlength="25" />
                        <p class="error-text">기관명을 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">HIS 연동</div>
                <div class="cont">
                    <div class="radio-box" data-syncHis="{{datas.syncHis}}">
                        {{#each CONSTANTS.SYNC_HIS}}
                            <div class="radio-btn-cont">
                                <input type="radio" id="syncHis{{@key}}" name="syncHis" class="radio-input" value="{{@key}}" {{#customIf @index '===' 0}}checked{{/customIf}}>
                                <label for="syncHis{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="tit require-validation">장치관리 구분</div>
                <div class="cont">
                    <div class="radio-box" data-level="{{datas.deviceManagerType}}">
                        {{#each CONSTANTS.DEVICE_MANAGER_TYPE}}
                            <div class="radio-btn-cont">
                                <input type="radio" id="deviceManagerType{{@key}}" name="deviceManagerType" class="radio-input" value="{{@key}}" {{#customIf @index '===' 0}}checked{{/customIf}}>
                                <label for="deviceManagerType{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="tit">담당자 이메일</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text" placeholder="시스템 담당자의 E-Mail 주소를 입력해주세요." name="systemManager" maxlength="150" />
                        <p class="error-text">시스템 담당자 이메일을 입력해주세요.</p>
                    </div>
                </div>
<!--                <div class="tit">기관 연락처</div>-->
<!--                <div class="cont">-->
<!--                    <div class="cm-input-cont">-->
<!--                        <input type="text" class="cm-input-text" placeholder="0000000000" name="phoneNumber" maxlength="16" autocomplete="off" />-->
<!--                        <p class="error-text">기관 연락처를 입력해주세요.</p>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="tit">종료일자</div>-->
<!--                <div class="cont">-->
<!--                    <div class="cm-input-cont">-->
<!--                        <input type="text" class="cm-input-text ifCheck" id="expiration-date-time" name="expirationDateTime" maxlength="16" autocomplete="off" data-type="birthday"/>-->
<!--                        <p class="error-text">종료일자를 정확히 입력해주세요.</p>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="tit">비고</div>
                <div class="cont">
                    <div class="cm-textarea-cont">
                        <textarea name="etc" class="cm-textarea" placeholder=""></textarea>
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
                <div class="tit require-validation">코드</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" value="{{datas.organizationCode}}" placeholder="기관 고유 코드를 입력해주세요." name="organizationCode" maxlength="25" disabled />
                        <p class="error-text">기관 고유 코드를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">이름</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" value="{{datas.organizationName}}" placeholder="기관명을 입력해주세요." name="organizationName" maxlength="25" />
                        <p class="error-text">기관명을 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">HIS 연동</div>
                <div class="cont">
                    <div class="radio-box" data-syncHis="{{datas.syncHis}}">
                        {{#each CONSTANTS.SYNC_HIS}}
                            <div class="radio-btn-cont">
                                <input type="radio" id="syncHis{{@key}}" name="syncHis" class="radio-input" value="{{@key}}" {{#customIf ../datas.syncHis '==' @key}}checked{{/customIf}} />
                                <label for="syncHis{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="tit require-validation">장치관리 구분</div>
                <div class="cont">
                    <div class="radio-box" data-level="{{datas.deviceManagerType}}">
                        {{#each CONSTANTS.DEVICE_MANAGER_TYPE}}
                            <div class="radio-btn-cont">
                                <input type="radio" id="deviceManagerType{{@key}}" name="deviceManagerType" class="radio-input" value="{{@key}}" {{#customIf ../datas.deviceManagerType '==' @key}}checked{{/customIf}} />
                                <label for="deviceManagerType{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="tit">담당자 이메일</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text" value="{{datas.systemManager}}" placeholder="시스템 담당자의 E-Mail 주소를 입력해주세요." name="systemManager" maxlength="150" />
                        <p class="error-text">시스템 담당자 이메일을 입력해주세요.</p>
                    </div>
                </div>
<!--                <div class="tit">기관 연락처</div>-->
<!--                <div class="cont">-->
<!--                    <div class="cm-input-cont">-->
<!--                        <input type="text" class="cm-input-text" value="{{datas.phoneNumber}}" placeholder="0000000000" name="phoneNumber" maxlength="16" autocomplete="off" />-->
<!--                        <p class="error-text">기관 연락처를 입력해주세요.</p>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="tit">종료일자</div>
                <div class="cont">
                    <div class="expiration-date-for-parent"></div>
<!--                    -->
<!--                    <div class="cm-input-cont">-->
<!--                        <input type="text" class="cm-input-text ifCheck" id="expiration-date-time" name="expirationDateTime" maxlength="16" autocomplete="off" data-type="birthday" value="{{stringToSubStr datas.expirationDateTime 0 10}}"  />-->
<!--                    </div>-->
                </div>
                <div class="tit">비고</div>
                <div class="cont">
                    <div class="cm-textarea-cont">
                        <textarea name="etc" class="cm-textarea" value="{{datas.etc}}" placeholder="">{{datas.etc}}</textarea>
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