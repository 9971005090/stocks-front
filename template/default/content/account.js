"use strict";
export const index = `
    <div class="common-cont">
        <div class="sub-cont-top">
            <h4 class="sub-cont-title">Search</h4>
            <div>
                <button type="button" class="cm-btn cm-btn-middle btn-black btn-add">등록</button>
                <button type="button" class="cm-btn cm-btn-middle cm-btn-n-default btn-all-delete">선택 삭제</button>
            </div>
        </div>
        <form class="form-common-search">
            <div class="search-form">
                <div class="tit">기관</div>
                <div class="cont">
                    <div class="cm-select-box organization-select-box" id="searchOrganSelectBox">
                        <input type="hidden" class="selectItem" name="" id="" value="all" />
                        <button type="button" class="label font-size-14 font-weight-500">기관선택</button>
                        <ul class="option-list" id="contentsForSelectWardOption" style="">
                        </ul>
                    </div>
                </div>
                <div class="tit">검색어</div>
                <div class="cont">
                    <div class="cm-device-search">
                        <span class="span d-none">검색</span>
                        <div class="default-background common-search-input">
                            <img class="search-icon d-none" src="/assets/images/theme/{{THEME}}/icon/search.png" />
                            <input type="text" class="font-size-14 font-weight-500 search-input-enter form-common-search-keyword" placeholder="검색어를 입력해 주세요.">
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
                    <div style="width:20%"></div>
                    <div style="width:15%"></div>
                    <div style="width:20%"></div>
                    <div style="width:20%"></div>
                    <div style="width:10%"></div>
                    <div style="width:10%"></div>
                </div>
                <div class="cm-thead">
                    <div class="cm-tr">
                        <div class="cm-th">
                            <div class="cm-checkbox-box type02 pd-4">
                                <input class="input" type="checkbox" value="" id="listAllCheck">
                            </div>
                        </div>
                        <div class="cm-th">id</div>
                        <div class="cm-th">닉네임</div>
                        <div class="cm-th">email</div>
                        <div class="cm-th">기관</div>
                        <div class="cm-th">권한</div>
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
        <div class="cm-tr" data-id="{{id}}" data-user-code="{{userCode}}" data-code="{{organizationCode}}">
            <div class="cm-td">
                <div class="cm-checkbox-box type02 pd-4">
                    <input class="input" type="checkbox" value="" id="checkbox_{{id}}">
                </div>
            </div>
            <div class="cm-td">
                <span class="pc-d-none">id</span>
                {{id}}
                </div>
            <div class="cm-td">
                <span class="pc-d-none">닉네임</span>
                {{name}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">email</span>
                {{email}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">기관</span>
                {{parsingOrganization}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">권한</span>
                {{userLevelParsing level}}
            </div>
            <div class="cm-td">
                <div class="btn-wrap">
                    <button type="button" class="cm-btn cm-btn-small btn-black btn-detail-view button-update">수정</button>
                    <button type="button" class="cm-btn cm-btn-small cm-btn-n-default btn-delete">삭제</button>
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
                    <div class="cm-select-box organization-select-box" id="searchOrganSelectBox">
                        <input type="hidden" class="selectItem check" name="organizationCode" id="organizationCode">
                        <button type="button" class="label font-size-14 font-weight-500">기관선택</button>
                        <ul class="option-list" id="contentsForSelectWardOption" style="">
                        </ul>
                    </div>
                </div>
                <div class="tit require-validation">계정명(ID)</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" placeholder="ID는 영문자,숫자만 사용해주세요.(5자이상 15자이하)" name="accountId" maxlength="25" />
                        <p class="error-text">아이디를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">계정명(닉네임)</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" name="accountName" placeholder="닉네임을 입력해주세요." maxlength="25" />
                        <p class="error-text">닉네임을 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">이메일</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" name="accountEmail" placeholder="이메일 정보를 입력해주세요." maxlength="150" />
                        <p class="error-text">이메일을 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit">소속병동</div>
                <div class="cont"> 
                    <div class="cm-select-box ward-select-box" id="wardSelectBox">
                        <input type="hidden" name="wardCode" class="selectItem" id="wardCode">
                        <button type="button" class="label font-size-14 font-weight-500">소속병동</button>
                        <ul class="option-list" id="wardSelectBoxUl" style="">
                        </ul>
                    </div>
                </div>
                <div class="tit require-validation">계정권한</div>
                <div class="cont">
                    <div class="radio-box" data-original="{{level}}">
                        {{#each CONSTANTS.LEVEL}} 
                            <div class="radio-btn-cont">
                                <input type="radio" id="level{{@key}}" name="level" class="radio-input" value="{{@key}}" {{#customIf @index '===' @key}}checked{{/customIf}}>
                                <label for="level{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="tit require-validation">비밀번호</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="password" class="cm-input-text check active-check" placeholder="비밀번호를 입력해주세요.(알파벳,숫자 포함 8자이상)" name="password" autocomplete="new-password" maxlength="25" />
                        <p class="error-text">비밀번호를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">비밀번호 확인</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="password" class="cm-input-text check active-check" placeholder="비밀번호를 다시 한번 입력해주세요." name="passwordCheck" autocomplete="off" maxlength="25" />
                        <p class="error-text">비밀번호 확인을 입력해주세요.</p>
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
                <div class="tit">기관</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text" value="{{datas.organizationCode}}" name="organizationCode" id="organizationCode" autocomplete="off" disabled />
                        <p class="error-text">유효성 검사 에러 메세지 입니다.</p>
                    </div>
                </div>
                <div class="tit">계정명(ID)</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" value="{{datas.id}}" placeholder="ID는 영문자,숫자만 사용해주세요.(5자이상 15자이하)" name="accountId" maxlength="25" disabled />
                        <p class="error-text">아이디를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">계정명(닉네임)</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check" value="{{datas.name}}" name="accountName" placeholder="닉네임을 입력해주세요." maxlength="25" />
                        <p class="error-text">닉네임을 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit require-validation">이메일</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="text" class="cm-input-text check active-check"  value="{{datas.email}}" name="accountEmail" placeholder="이메일 정보를 입력해주세요." maxlength="150" />
                        <p class="error-text">이메일을 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit">소속병동</div>
                <div class="cont"> 
                    <div class="cm-select-box ward-select-box" id="wardSelectBox">
                        <input type="hidden" class="selectItem" name="wardCode" id="wardCode" value="{{datas.ward.wardCode}}"/>
                        {{#if datas.ward}}
                        <button type="button" class="label font-size-14 font-weight-500">{{datas.ward.ward}}</button>
                        {{else}}
                        <button type="button" class="label font-size-14 font-weight-500">소속병동</button>
                        {{/if}}
                        <ul class="option-list" id="wardSelectBoxUl" style="">
                        </ul>
                    </div>
                </div>
                <div class="tit require-validation">계정권한</div>
                <div class="cont">
                    <div class="radio-box" data-level="{{datas.level}}">
                        {{#each CONSTANTS.LEVEL}}
                            <div class="radio-btn-cont">
                                <input type="radio" id="level{{@key}}" name="level" class="radio-input" value="{{@key}}" {{#customIf ../datas.level '==' @key}}checked{{/customIf}}>
                                <label for="level{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>
                </div>
                <div class="tit">현재 비밀번호</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="password" class="cm-input-text" placeholder="현재 비밀번호를 입력해주세요." name="password" autocomplete="new-password" maxlength="25" />
                        <p class="error-text">비밀번호를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit">새로운 비밀번호</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="password" class="cm-input-text" placeholder="비밀번호를 입력해주세요.(알파벳,숫자 포함 8자이상)" name="modPassword" autocomplete="off" maxlength="25" />
                        <p class="error-text">비밀번호를 입력해주세요.</p>
                    </div>
                </div>
                <div class="tit">새로운 비밀번호 재입력</div>
                <div class="cont">
                    <div class="cm-input-cont">
                        <input type="password" class="cm-input-text" placeholder="비밀번호를 다시 한번 입력해주세요." name="passwordCheck" autocomplete="off" maxlength="25" />
                        <p class="error-text">비밀번호를 입력해주세요.</p>
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