"use strict";
export const index = `
<div id="login_module_wrap">
    <div id="login_module_wrap_content" class="login_module_main">
        <div class="login_module_wrap_inner">
            <div class="login_module_logo">
                <a class="login_module_link">
                    <img class="img" src="/js/module/login/assets/images/default/logo.png" alt="로고">
                </a>
            </div>
            <div class="div-cont">
                <h4 class="h4">반갑습니다.</h4>
                <p class="gray-text mt-4">
                    * 이 페이지는 접근과 동시에 IP주소가 자동저장됩니다.<br>
                    관계자 이외에 접근시도는 해킹시도로 의심, 추적되어 불이익을 당할수도 있습니다.
                </p>
            </div>
            <form id="dataForm" autocomplete="off" class="login_module_login">
                <div class="cm-input-cont">
                    <input type="text"  id="id_input" name="id_input" class="check cm-input-text" placeholder="아이디를 입력해주세요." autocomplete="off">
                    <p class="error-text">아이디를 입력해 주세요.</p>
                </div>
                <div class="cm-input-cont">
                    <input type="password" id="password_input" name="password_input"  class="cm-input-text check" placeholder="비밀번호를 입력해주세요." autocomplete="off">
                    <p class="error-text">비밀번호를 입력해 주세요.</p>
                </div>
                <div class="login_module_check2">
                    <div class="cm-checkbox-box type02">
                        <input class="input login_module_green_custom" type="checkbox" id="login_userId">
                        <label class="span" for="login_userId">아이디 기억</label>
                    </div>
                    {{#if FUNCTION_ENVIRONMENT.useAutoLogin}}
                    <div class="cm-checkbox-box type02 login_module_input_wrap">
                        <input class="input login_module_green_custom" type="checkbox" id="login_auto">
                        <label class="span" for="login_auto">자동 로그인</label></label>-->
                    </div>
                    {{else}}
                    <div class="login_module_input_wrap"></div>
                    {{/if}}
                </div>
                
                <button type="button" id="login_btn" class="cm-btn cm-btn-full-default cm-btn-auto-large">로그인</button>
            </form>

        </div>
    </div>

    <!--푸터-->
    <footer id="login_module_footer">
        <div class="login_module_company_info">
            <p class="login_module_copyright">COPYRIGHT 2018 © Seers Technology. ALL RIGHTS RESERVED.</p>
        </div>
    </footer>

</div>
`;