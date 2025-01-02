export const error = `
<style>
#error_module_wrap {
    height: 100%;
}
#error_module_wrap_content {
    display: flex;
}

.error_module_main .error_module_wrap_inner {
    width: 900px;
    margin: 0 auto;
    padding: 240px 0;
    display: initial;
}

.error_module_main .error_module_logo {
    width: 138px;
    height: 96px;
    padding: 0;
    margin: 0 auto 50px;
}

.error_module_main .error_module_logo .error_module_link {
    width: 100%;
    height: 100%;
}

.error_module_logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.error_module_input_container, error_module_company_info {
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
}


.error_module_main button {
    width: 176px;
    height: 48px;
    margin: 64px auto 0;
    border-radius: 4px;
    background: #898787;
    color: #fff;
    display: block;
    font-size: 16px;
}


#error_module_footer {
    width: 360px;
    margin: 0 auto;
}

#error_module_footer .error_module_copyright {
    font-size: 12px;
    color: #000;
}

.content_parent::-webkit-scrollbar{
    height: 12px;
}
.content_parent::-webkit-scrollbar-thumb { 
    border-radius: 5px;
    background: #c7c9c9; 
} 
</style>
<div id="error_module_wrap">
    <div id="error_module_wrap_content" class="error_module_main" style="min-height: calc(100vh - 17px);">
        <div class="error_module_wrap_inner" style="padding: 214px 0">

<!--            <div class="error_module_logo">-->
<!--                <a class="error_module_link">-->
<!--                    <img src="/js/module/login/assets/images/console/logo.png" alt="로고">-->
<!--                </a>-->
<!--            </div>-->
            
            <h1 id="title">페이지를 찾을 수 없습니다.</h1>
            <div class="content_parent" style="width: 900px; border: 1px solid #cccccc; overflow-x: auto; white-space: nowrap; ">
                <p id="content" style="width: 100%;"></p>
            </div>
            
            <div style="display: flex">
                <button type="button" id="goToLogin">로그인 페이지로</button>
                <button type="button" id="goToMain">홈으로</button>
            </div>

        </div>
    </div>
</div>
`;