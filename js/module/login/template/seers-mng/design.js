"use strict";
export const index = `
<div id="login_module_wrap">
    <div id="login_module_wrap_content" class="login_module_main" style="min-height: calc(100vh - 17px);">
        <div class="login_module_wrap_inner">

            <div class="login_module_logo" style="width: {{LOGO.WIDTH}}">
                <a class="login_module_link">
                    {{#customIf LOGO.TYPE '===' 'image'}}
                    <img src="/js/module/login/assets/images/default/logo.png" alt="로고">
                    {{/customIf}}
                    {{#customIf LOGO.TYPE '===' 'text'}}
                    <div style="font-size:40px; font-weight: bold;">{{LOGO.TEXT}}</div>
                    {{/customIf}}
                </a>
            </div>
            
            <!-- 추가된 태그 -->
            <div class="text-cont">
                <h4>반갑습니다.</h4>
                <p class="gray-text mt-4">
                    * 이 페이지는 접근과 동시에 IP주소가 자동저장됩니다.<br>
                    관계자 이외에 접근시도는 해킹 시도로 의심, 추적되어 불이익을 당할 수도 있습니다.
                </p>
            </div>
            <!-- 추가된 태그 -->
            
            <form id="dataForm" autocomplete="off" class="login_module_login mt-20">
                <div class="cm-input-cont">
                    <input type="text"  id="id_input" name="id_input" class="check cm-input-text" placeholder="아이디를 입력해 주세요." autocomplete="off">
                    <p class="error-text">아이디를 입력해 주세요.</p>
                </div>
                <div class="cm-input-cont mt-12">
                    <input type="password" id="password_input" name="password_input"  class="cm-input-text check" placeholder="비밀번호를 입력해 주세요." autocomplete="off">
                    <p class="error-text">비밀번호를 입력해 주세요.</p>
                </div>
                <div class="login_module_check2">
                    <div class="cm-checkbox-box type02 mt-12">
                        <input class="input login_module_green_custom" type="checkbox" name="login_userId" id="login_userId">
                        <label class="span" for="login_userId">아이디 기억</label>
                    </div>
                    {{#if FUNCTION_ENVIRONMENT.useAutoLogin}}
                    <div class="login_module_input_wrap">
                        <input type="checkbox" id="login_auto" class="login_module_green_custom">
                        <label for="login_auto"></label>
                        <label for="login_auto" style="font-size: 12px;">자동 로그인</label>
                    </div>
                    {{else}}
                    <div class="login_module_input_wrap"></div>
                    {{/if}}
                </div>
                
                <button type="button" id="login_btn" class="cm-btn cm-btn-full-default cm-btn-auto-large mt-24">로그인</button>
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