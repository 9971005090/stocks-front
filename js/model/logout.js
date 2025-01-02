export const successLogout = function(response, obj) {

    GBL.ACCOUNT.SET(null);
    process.afterLogout();
    process.reset();
    Seers.Loader.goMove("seers", "login");

}