"use strict";

export const successLogin = function(response, obj) {
    let isChecked = $("input:checkbox[id='login_userId']").is(":checked");
    let isLoginAutoChecked = $("input:checkbox[id='login_auto']").is(":checked");
    let id_val = $("#id_input").val();
    $('#container').html("");
    GBL.ACCOUNT.SET(response);

    if (isChecked === true) {
        CookieHelper.set("seers_id", id_val, GBL.ACCOUNT.CHECK.COOKIE.TERM.REMEMBER_ID);
    }
    else {
        CookieHelper.remove("seers_id");
    }

    if (isLoginAutoChecked === true) {
        CookieHelper.set("seers_auto_login", response.accessToken, GBL.ACCOUNT.CHECK.COOKIE.TERM.AUTO_LOGIN);
    }
    else {
        CookieHelper.remove("seers_auto_login");
    }

    GBL.ACCOUNT.CHECK.RUN();

    let afterPassingParameter = {
        loginResponse: response,
        designParameter: {
            isChecked: isChecked,
            isLoginAutoChecked: isLoginAutoChecked
        }
    }
    process.afterLogin(afterPassingParameter);

    etc.move(GBL.ACCOUNT.AFTER_LOGIN_URL);
}