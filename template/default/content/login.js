export const login = `
<div class="pet_container login_container"> 
    <div class="login_form">
        <p><img src="/assets/images/theme/{{THEME}}/pet_app_login_bi.png" alt="mobiCAREtm plus Pet" /></p>
        <p class="login_subTit">Sign in to your  Manager account</p>
        <div class="login_input">
            <label>
                <input id="id_input" type="text" placeholder="아이디를 입력해 주세요" />
            </label>
            <label>
                <input id="password_input" type="password" placeholder="비밀번호를 입력해 주세요" />
            </label>
            <button type="button" class="login_btn" id="login_btn">Log in</button>
            <label class="custom_checkbox">
                <input id="login_userIdBtn" type="checkbox" />
                <i></i>
                <span>아이디 기억</span>
            </label>
        </div>
    </div>
</div>
`;