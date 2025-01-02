"use strict";

window.addEventListener('popstate', function () {
    Seers.Loader.controllerLoad();
});


Seers.Loader = {
    _controllerLoad: async function(controller, action, id, parameters = null, layoutReload = false) {
        // 페이지 새로고침의 경우 세팅이 안되니, 쿠키 확인 후 세팅
        GBL.ACCOUNT.REFRESH_SET();

        // 매니저 사이트 추가로 인한 추가 처리, 권한 확인 / 아래 영역에 코드 작성
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        if(GBL.ACCOUNT.IS_AUTH() === true && (GBL.WINDOW_HISTORY_STATE.GET_NOW_CONTROLLER(0, true) !== `logout` && GBL.WINDOW_HISTORY_STATE.GET_NOW_CONTROLLER(0, true) !== `login`)) {
            let _r = await custom.etc.checkPostAuth(GBL.ACCOUNT.INFO.level, {isUse: true, msg: null});
            if (_r === `AUTH_FAIL`) {
                setTimeout(function() {
                    etc.move("/logout");
                }, 800);
                return false;
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        async function controllerLoad(controller, action) {
            showSiteLoadingLog(`loader > controllerLoad`, `#1ed7f8`, `#d9e6f1`);
            let controllerObj = await import(`/js/controller/${controller}.js${ver_string}`);
            let obj = await controllerObj.promise();

            $('body').scrollTop();
            if(typeof obj[action] == "undefined") {
                GBL.DESIGN.LAYOUT.CLEAR();
                await controllerLoad("error", "viewForNonAction");
            }
            else {
                url.setWindowHistoryStateUrl();
                GBL.CONTROLLER[controller] = obj;
                GBL.SITE_MENU.CHOICE_CONTROLLER = controller;
                GBL.DESIGN.SELECT_MENU(controller);

                // 인증이 필요한 action 인지 확인
                if(GBL.ACCOUNT.IS_RUN_ACTION(controller, action, obj.ignoreAuthAction) === true) {
                    const responsePre = await process.pre();
                    if (responsePre !== `OK`) { // OK, CONTROLLER_PRE_PROCESS_FAIL
                        return responsePre;
                    }
                    if(typeof GBL.CONTROLLER.IS_PRE_LOADING[controller] == "undefined") {
                        if(obj.hasOwnProperty("pre") === true) {
                            GBL.CONTROLLER.IS_PRE_LOADING[controller] = await obj.pre();
                        }
                        else {
                            obj.pre = function() {
                                return new Promise(function (resolve, reject) {
                                    resolve(true);
                                })
                            }
                            GBL.CONTROLLER.IS_PRE_LOADING[controller] = await obj.pre();
                        }
                    }
                    let passingParameters = parameters;
                    if(passingParameters === null) {
                        passingParameters = history.state;
                    }
                    if(obj.hasOwnProperty("preAction") === true) {
                        if(id !== null) {
                            await obj.preAction(id, passingParameters);
                        }
                        else {
                            await obj.preAction(passingParameters);
                        }
                    }
                    else {
                        obj.preAction = function() {
                            return new Promise(function (resolve, reject) {
                                resolve(true);
                            })
                        }
                    }
                    if(id !== null) {
                        await obj[action](id, passingParameters);
                    }
                    else {
                        await obj[action](passingParameters);
                    }
                    const responsePost = await process.post();
                    if (responsePre !== `OK`) { // OK, CONTROLLER_POST_PROCESS_FAIL
                        return responsePre;
                    }
                    // 실제 의도와 좀 다르게 움직여서 일단 사용 안함
                    // etc.hrefToSeersLink();

                    // let log = `
                    //     =============== controllerLoad log ===============
                    //     state:::::::::::::, ${JSON.stringify(passingParameters)}
                    //     document.location.pathname:::::::::::::, ${document.location.pathname}
                    //     =================================================
                    // `;
                    // console.log(log);
                    showSiteLoadingLog(`CONTROLLER ${controller} is LOAD OK`, `#216a02`, `#e0eeda`);
                    return `OK`;
                }
                else {
                    // 인증이 필요함 에로 표시
                }
            }
            // try {
            //     let controllerObj = await import(`/js/controller/${controller}.js${ver_string}`);
            //     let obj = await controllerObj.promise();
            //
            //     $('body').scrollTop();
            //     if(typeof obj[action] == "undefined") {
            //         GBL.DESIGN.LAYOUT.CLEAR();
            //         controllerLoad("error", "viewForNonAction");
            //     }
            //     else {
            //         url.setWindowHistoryStateUrl();
            //         GBL.CONTROLLER[controller] = obj;
            //         GBL.SITE_MENU.CHOICE_CONTROLLER = controller;
            //         GBL.DESIGN.SELECT_MENU(controller);
            //
            //         // 인증이 필요한 action 인지 확인
            //         if(GBL.ACCOUNT.IS_RUN_ACTION(controller, action, obj.ignoreAuthAction) === true) {
            //             process.pre();
            //
            //             if(typeof GBL.CONTROLLER.IS_PRE_LOADING[controller] == "undefined") {
            //                 if(obj.hasOwnProperty("pre") === true) {
            //                     GBL.CONTROLLER.IS_PRE_LOADING[controller] = await obj.pre();
            //                 }
            //                 else {
            //                     obj.pre = function() {
            //                         return new Promise(function (resolve, reject) {
            //                             resolve(true);
            //                         })
            //                     }
            //                     GBL.CONTROLLER.IS_PRE_LOADING[controller] = await obj.pre();
            //                 }
            //             }
            //             let passingParameters = parameters;
            //             if(passingParameters === null) {
            //                 passingParameters = history.state;
            //             }
            //             if(id !== null) {
            //                 obj[action](id, passingParameters);
            //             }
            //             else {
            //                 obj[action](passingParameters);
            //             }
            //             process.post();
            //             // 실제 의도와 좀 다르게 움직여서 일단 사용 안함
            //             // etc.hrefToSeersLink();
            //
            //             let log = `
            //                 =============== controllerLoad log ===============
            //                 state:::::::::::::, ${JSON.stringify(passingParameters)}
            //                 document.location.pathname:::::::::::::, ${document.location.pathname}
            //                 =================================================
            //             `;
            //             console.log(log);
            //             console.log(`CONTROLLER ${controller} is LOAD OK`);
            //             return true;
            //
            //         }
            //         else {
            //             // 인증이 필요함 에로 표시
            //         }
            //     }
            // }
            // catch (error) {
            //     if(error.message.indexOf("module:") !== -1) {
            //         location.href = `/error.html?type=loading&src=${error.message.split("module:")[1]}`;
            //         return;
            //     }
            //     GBL.DESIGN.LAYOUT.CLEAR();
            //     // 에러가 발생햇는데, 기본 로딩중에 에러가 있다면 무한루프가 돌아서 최조일때만 되게 처리
            //     if(sessionStorage.getItem("error") === null) {
            //         // console.log("error.message:::::", error.message);
            //         // console.log("error.name:::::", error.name);
            //         // console.log("error.stack:::::", error.stack);
            //         // console.log("error.toString:::::", error.toString);
            //         sessionStorage.setItem("error", error.stack);
            //         process.error();
            //     }
            // }
        }

        // 컨트롤러 실행 전 실행 되는 함수는 반드시 실행되고, 컨트롤러가 실행되게 처리한다.
        const responsePreForOutOfControllerScope = await process.preForOutOfControllerScope(null, parameters);
        if (responsePreForOutOfControllerScope !== `OK`) {
            return `OUT_OF_CONTROLLER_PRE_PROCESS_FAIL`;
        }
        // 레이아웃이 필요한 경우 레이아웃 모듈을 먼저 로딩한다.
        // example 브랜치에 있어야 할 것 같은데, 일단은 master에 추가해서 좀 지켜보자.
        let useLayoutLoading = false;
        if(GBL.DESIGN.LAYOUT.IS_USE(controller) === true) {
            useLayoutLoading = true;
        }
        showSiteLoadingLog(`${controller} 컨트롤러 레이아웃 사용여부 - ${useLayoutLoading}`);
        if(useLayoutLoading === true || layoutReload === true) {
            // if(typeof GBL.MODULE.IS_LOADING['layout'] === "undefined") { // 이 값을 사용하지 않은 이유는 로그아웃 등으로 인한 레이아웃 제거등으로 인한 판단을 좀더 편하게 하기 위해
            if (layoutReload === true) {
                GBL.DESIGN.LAYOUT.CLEAR();
            }
            if(GBL.DESIGN.LAYOUT.EXIST === false) {
                // sync 처리가 필요할 경우는 await 처리
                GBL.MODULE.IS_LOADING['layout'] = await Seers.Loader.moduleLoad("layout", "index");
            }
            else {
                // 이벤트 등록등 필요한 부분이 있을 경우가 있어 실행한다.
                GBL.MODULE['layout'].setPostProcess();
            }
        }
        else {
            GBL.DESIGN.LAYOUT.CLEAR();
        }
        const responseControllerLoad = await controllerLoad(controller, action);
        if (responseControllerLoad !== `OK`) {
            return responseControllerLoad;
        }
        return await process.postForOutOfControllerScope();



        // process.preForOutOfControllerScope().then(
        //     async function () {
        //         // 레이아웃이 필요한 경우 레이아웃 모듈을 먼저 로딩한다.
        //         // example 브랜치에 있어야 할 것 같은데, 일단은 master에 추가해서 좀 지켜보자.
        //         let useLayoutLoading = false;
        //         if(GBL.DESIGN.LAYOUT.IS_USE(controller) === true) {
        //             useLayoutLoading = true;
        //         }
        //         if(useLayoutLoading === true) {
        //             // if(typeof GBL.MODULE.IS_LOADING['layout'] === "undefined") { // 이 값을 사용하지 않은 이유는 로그아웃 등으로 인한 레이아웃 제거등으로 인한 판단을 좀더 편하게 하기 위해
        //             if(GBL.DESIGN.LAYOUT.EXIST === false) {
        //                 // sync 처리가 필요할 경우는 await 처리
        //                 GBL.MODULE.IS_LOADING['layout'] = await Seers.Loader.moduleLoad("layout", "index");
        //             }
        //             else {
        //                 // 이벤트 등록등 필요한 부분이 있을 경우가 있어 실행한다.
        //                 GBL.MODULE['layout'].setPostProcess();
        //             }
        //         }
        //         else {
        //             GBL.DESIGN.LAYOUT.CLEAR();
        //         }
        //         await controllerLoad(controller, action).then(function() {process.postForOutOfControllerScope()})
        //     }
        // );
    },

    directControllerLoad: async function(controller, action, parameters = null) {
        showSiteLoadingLog(`loader > direct controllerLoad parent`, `#1ed7f8`, `#d9e6f1`);
        return await Seers.Loader._controllerLoad(controller, action, null, parameters);
    },

    directControllerLoadForNonePre: async function(controller, action, parameters = null) {
        showSiteLoadingLog(`loader > direct none pre controllerLoad parent`, `#1ed7f8`, `#d9e6f1`);
        let controllerObj = await import(`/js/controller/${controller}.js${ver_string}`);
        let obj = await controllerObj.promise();
        await obj[action](parameters);
    },

    controllerLoad: async function (layoutReload = false) {
        showSiteLoadingLog(`loader > controllerLoad parent`, `#1ed7f8`, `#d9e6f1`);
        let state = history.state;
        let controller = GBL.DESIGN.DEFAULT_CONTROLLER;
        let action = `index`;
        let id = null;
        let parameters = null;
        if (document.location.pathname.replace(GBL.MANAGER_PREFIX, ``) !== `/` && document.location.pathname.replace(GBL.MANAGER_PREFIX, ``) !== `/index.html`) {
            let path = document.location.pathname;
            let search = document.location.search;
            let tempPath = path.replace(GBL.MANAGER_PREFIX, ``).split(`/`);
            controller = tempPath[1];
            if (typeof tempPath[2] != `undefined` && String.isNullOrWhitespace(tempPath[2]) === false ) {
                action = tempPath[2];
            }
            if (typeof tempPath[3] != `undefined`) {
                if(tempPath[3] !== ``) {
                    id = tempPath[3];
                }
            }
            if (search !== ``) {
                parameters = String.getUrlParam(search);
            }
        }
        else {
            showSiteLoadingLog(`루트 접속에 따른 ${GBL.DESIGN.DEFAULT_CONTROLLER}/${GBL.DESIGN.DEFAULT_ACTION} 로 이동`);
            etc.move(`${GBL.DESIGN.DEFAULT_CONTROLLER}/${GBL.DESIGN.DEFAULT_ACTION}`);
            return;
        }
        return await Seers.Loader._controllerLoad(controller, action, id, parameters, layoutReload);
    },

    moduleLoad: async function (module = "alert", action = "index", parameter = null) {
        // 페이지 새로고침의 경우 세팅이 안되니, 쿠키 확인 후 세팅
        GBL.ACCOUNT.REFRESH_SET();
        async function moduleLoad(module, action, parameter) {

            let moduleObj = await import(`/js/module/${module}/controller.js${ver_string}`);
            let obj = await moduleObj.promise();

            if (typeof obj[action] == "undefined") {
                Seers.Loader.directControllerLoad("error", "viewForNonModuleAction");
            }
            else {
                if (typeof GBL.MODULE.IS_PRE_LOADING[module] == "undefined") {
                    if (obj.hasOwnProperty("pre") === true) {
                        GBL.MODULE.IS_PRE_LOADING[module] = await obj.pre();
                    }
                    else {
                        obj.pre = function () {
                            return new Promise(function (resolve, reject) {
                                resolve(true);
                            })
                        }
                        GBL.MODULE.IS_PRE_LOADING[module] = await obj.pre();
                    }
                }

                GBL.MODULE[module] = obj;
                await obj[action](parameter);
                // 실제 의도와 좀 다르게 움직여서 일단 사용 안함
                // etc.hrefToSeersLink();

                // module 은 로딩이 빈번하게 이루어져 콘솔 삭제
                // showSiteLoadingLog(`MODULE ${module} is LOAD OK`, `#b85702`, `#eae1d9`);
                return true;
            }
            // try {
            //     let moduleObj = await import(`/js/module/${module}/controller.js${ver_string}`);
            //     let obj = await moduleObj.promise();
            //
            //     if (typeof obj[action] == "undefined") {
            //         Seers.Loader.directControllerLoad("error", "viewForNonModuleAction");
            //     }
            //     else {
            //         if (typeof GBL.MODULE.IS_PRE_LOADING[module] == "undefined") {
            //             if (obj.hasOwnProperty("pre") === true) {
            //                 GBL.MODULE.IS_PRE_LOADING[module] = await obj.pre();
            //             }
            //             else {
            //                 obj.pre = function () {
            //                     return new Promise(function (resolve, reject) {
            //                         resolve(true);
            //                     })
            //                 }
            //                 GBL.MODULE.IS_PRE_LOADING[module] = await obj.pre();
            //             }
            //         }
            //
            //         GBL.MODULE[module] = obj;
            //         obj[action](parameter);
            //         // 실제 의도와 좀 다르게 움직여서 일단 사용 안함
            //         // etc.hrefToSeersLink();
            //
            //         // module 은 로딩이 빈번하게 이루어져 콘솔 삭제
            //         showSiteLoadingLog(`MODULE ${module} is LOAD OK`, `#b85702`, `#eae1d9`);
            //         return true;
            //     }
            // } catch (error) {
            //     if(error.message.indexOf("module:") !== -1) {
            //         location.href = `/error.html?type=loading&src=${error.message.split("module:")[1]}`;
            //         return;
            //     }
            //     GBL.DESIGN.LAYOUT.CLEAR();
            //     // 에러가 발생햇는데, 기본 로딩중에 에러가 있다면 무한루프가 돌아서 최조일때만 되게 처리
            //     if(sessionStorage.getItem("error") === null) {
            //         console.log("error.message:::::", error.message);
            //         console.log("error.name:::::", error.name);
            //         console.log("error.stack:::::", error.stack);
            //         console.log("error.toString:::::", error.toString);
            //         sessionStorage.setItem("error", error.stack);
            //         process.error();
            //     }
            // }
        }

        return moduleLoad(module, action, parameter).then(response => {return response;});
    },


    goMove: async function(title = "seers", ctl = "login", action = null, id = null, parameter = null, fullUrl = null, layoutReload = false) {
        let link = "";
        link += "/" + ctl;
        if(action != null) {
            link += "/" + action;
        }
        if(id != null) {
            link += "/" + id;
        }
        if(fullUrl !== null) {
            link = fullUrl;
        }
        link = `${GBL.MANAGER_PREFIX}${link[0] === '/' ? link : '/' + link}`;
        history.pushState(parameter, title, link);
        // history.pushState(parameter, title, "?controller=" + ctl + "&action=" + action);
        return await Seers.Loader.controllerLoad(layoutReload);
    }
}