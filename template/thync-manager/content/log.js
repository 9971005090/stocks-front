"use strict";
export const index = `
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
                        {{#each CONSTANTS.EXCEPTION_TYPE}}
                            <div class="radio-btn-cont">
                                <input type="radio" id="error-type-{{@key}}" name="error-type" class="radio-input" value="{{@key}}" {{#customIf @index '===' 0}}checked{{/customIf}}>
                                <label for="error-type-{{@key}}" class="span">{{this}}</label>
                            </div>
                        {{/each}}
                    </div>
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
                    <div style="width:8%"></div>
                    <div style="width:13%"></div>
                    <div style="width:6%"></div>
                    <div style="width:12%"></div>
                    <div style="width:60%"></div>
                </div>
                <div class="cm-thead">
                    <div class="cm-tr">
                        <div class="cm-th">dateTime</div>
                        <div class="cm-th">method</div>
                        <div class="cm-th">logLevel</div>
                        <div class="cm-th">errorCode<Br/>errorCodeDescription<Br/>errorCodeDescriptionKor</div>
                        <div class="cm-th">errorMsg</div>
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
               {{dateTime}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">method</span>
                {{method}}
                </div>
            <div class="cm-td">
                <span class="pc-d-none">logLevel</span>
                {{logLevel}}
            </div>
            <div class="cm-td">
                <span class="pc-d-none">errorInfo</span>
                {{errorCode}}<Br>
                {{errorCodeDescription}}<Br>
                {{errorCodeDescriptionKor}}
            </div>
            <div class="cm-td" style="text-align: left;">
                <span class="pc-d-none">errorMsg</span>
                {{errorMsg}}
            </div>
        </div>
    {{/each}}
`;