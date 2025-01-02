"use strict";

const promise = async () => {

    const model = await import(`/js/model/logout.js${ver_string}`);
    const ignoreAuthAction = ["index"];

    const index = function(act = null) {
        custom.request.api(GBL.API.URL.ACCOUNT.LOGOUT, {}, model.successLogout);
    }

    return {
        ignoreAuthAction: ignoreAuthAction,
        index: index
    };
};

export { promise }