const {CONST: CONST} = await import(`/js/module/popup/constant.js${ver_string}`);
export const closed = function(code = null, today = false) {
    let key = `${code}_popup`;
    if(today === true) {
        CookieHelper.set(key, "popup", CONST.DATA[code].fireDay);
    }
    $(`#${key}`).remove();
}


export const isVisible = function(key, value) {
    // 사용여부
    if(value.use === false) {
        return false;
    }

    // 노출기간
    if(value.now < value.begin || value.now > value.end) {
        return false;
    }

    // 노출페이지
    if(value.viewPage != null) {
        let check = false;
        for(let i = 0; i < value.viewPage.length; i++) {
            if(value.viewPage[i] == document.location.pathname) {
                check = true;
            }
        }
        if(check === false) {
            return false;
        }
    }

    let id = `${key}_popup`;
    if(CookieHelper.get(id) != null && CookieHelper.get(id) != undefined) {
        return false;
    }
    return true;
}