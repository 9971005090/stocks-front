"use strict";

const promise = async () => {

    // const model = await import(`/js/model/error.js${ver_string}`);
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/error.js${ver_string}`);
    const ignoreAuthAction = ["viewForNonPage", "viewForErrorPage", "viewForNonController", "viewForNonAction", "viewForNonModule", "viewForNonModuleAction"];

    const _setLayout = function() {
        console.log("_setLayout");
        etc.setHtmlParsing($(`${GBL.DESIGN.MAIN_DIV_NAME}`), html.error, {});
        Seers.Loader.moduleLoad("version", "index");
    };

    const _postAction = function() {
        sessionStorage.removeItem("error");
        CUSTOM.EVENT.HTML.push("#goToLogin");
        $('#goToLogin').off("click").on('click', function(e){
            etc.stopBubbling(e)
            etc.move("/login");
        });

        CUSTOM.EVENT.HTML.push("#goToMain");
        $('#goToMain').off("click").on('click', function(e){
            etc.stopBubbling(e)
            etc.move("/");
        });
    }

    const viewErrorContent = function() {
        let _getTabSpace = function() {
            let result = "";
            for(let i = 0; i < 4; i++) {
                result += "&nbsp;";
            }
            return result;
        }
        if(debug.bool === true) {
            let error = sessionStorage.getItem("error");
            if(error.indexOf(" at ") !== -1) {
                let temp = error.split(" at ");
                error = `<br/>${_getTabSpace()}${temp[0].trim()}<br />`;
                for(let i = 1; i < temp.length; i++) {
                    error += `${_getTabSpace()}${_getTabSpace()} at ${temp[i].trim()}<Br />`;
                }
                error += `<br />`;
            }
            $("#content").html(`
                ${error}
            `);
        }
    }

    const viewForNonPage = function() {
        _setLayout();
        viewErrorContent();
        _postAction();
    }

    const viewForErrorPage = function() {
        console.log("viewForErrorPage");
        _setLayout();
        $("#title").text("처리 중 오류가 발생했습니다.");
        viewErrorContent();
        _postAction();
    }

    const viewForNonAction = function() {
        _setLayout();
        $("#title").text("잘못된 요청입니다.");
        _postAction();
    }

    const viewForNonController = function() {
        _setLayout();
        $("#title").text("컨트롤러를 찾을 수 없습니다.");
        viewErrorContent();
        _postAction();
    }

    const viewForNonModule = function() {
        _setLayout();
        $("#title").text("모듈을 찾을 수 없습니다.");
        viewErrorContent();
        _postAction();
    }

    const viewForNonModuleAction = function() {
        _setLayout();
        $("#title").text("잘못된 모듈 요청입니다.");
        _postAction();
    }

    return {
        ignoreAuthAction: ignoreAuthAction,
        viewForNonPage: viewForNonPage,
        viewForErrorPage: viewForErrorPage,
        viewForNonController: viewForNonController,
        viewForNonAction: viewForNonAction,
        viewForNonModule: viewForNonModule,
        viewForNonModuleAction: viewForNonModuleAction
    };
};

export { promise }