"use strict";
export const index = `
<div id="login_module_wrap">
    <div id="login_module_wrap_content" class="login_module_main" style="min-height: calc(100vh - 17px);">
        <div class="login_module_wrap_inner" style="padding: 214px 0">

            <div class="login_module_logo">
                <a class="login_module_link">
                    <img src="/js/module/login/assets/images/default/logo.png" alt="로고">
                </a>
            </div>
            
            <form id="dataForm" autocomplete="off" class="login_module_login">
                <div class="login_module_input_container">
                    <input id="id_input" name="id_input" type="text" placeholder="아이디를 입력해 주세요" class="check" />
                    <div class="invalid-feedback login_module_invalid-feedback" style="margin-left: 0px; margin-top: -20px; font-size: 10px; width: 200px;"></div>
                </div>
                <div class="login_module_input_container">
                    <input id="password_input" name="password_input" type="password" placeholder="비밀번호를 입력해 주세요" class="check" />
                    <div class="invalid-feedback login_module_invalid-feedback" style="margin-left: 0px; margin-top: -20px; font-size: 10px; width: 200px;"></div>
                </div>

                <div class="login_module_check2">
                    <div class="login_module_input_wrap">
                        <input type="checkbox" id="login_userId" class="login_module_green_custom">
                        <label for="login_userId"></label>
                        <label for="login_userId" style="font-size: 12px;">아이디 기억</label>
                    </div>
                    {{#if FUNCTION_ENVIRONMENT.useAutoLogin}}
                    <div class="login_module_input_wrap">
                        <input type="checkbox" id="login_auto" class="login_module_green_custom">
                        <label for="login_auto"></label>
                        <label for="login_auto" style="font-size: 12px;">자동 로그인</label>
                    </div>
                    {{else}}
                    <div class="login_module_input_wrap">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    {{/if}}
                </div>
                
                <button type="button" id="login_btn">로그인</button>
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