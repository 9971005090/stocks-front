"use strict";

const promise = async () => {

    const {CONST: CONST} = await import(`/js/module/toast-message/constant.js${ver_string}`);
    const html = await import(`/js/module/toast-message/template/${CONST.DESIGN.THEME}/design.js${ver_string}`);
    const pre = function() {
        return new Promise(function(resolve, reject) {
            let loadingEnd = function() {
                resolve(true);
            }
            let options = {
                files: [
                    `/js/module/toast-message/lib/src/jquery.toast.css`,
                    `/js/module/toast-message/lib/custom.css`,
                    `/js/module/toast-message/lib/src/jquery.toast.js`
                ],
                // files: [
                //     `/js/module/toast-message/lib/jquery.toast.min.css`,
                //     `/js/module/toast-message/lib/jquery.toast.min.js`
                // ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
    }
    const index = function(initParameter = null) {
        if(initParameter == null) {
            return null;
        }
        if(initParameter.hasOwnProperty("text") === false) {
            return null;
        }

       /* $.toast({
            text: "Don't forget to star the repository if you like it.", // Text that is to be shown in the toast
            heading: 'Note', // Optional heading to be shown on the toast
            icon: 'warning', // Type of toast icon
            showHideTransition: 'fade', // fade, slide or plain
            allowToastClose: true, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
            stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'bottom-left', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
            textAlign: 'left',  // Text alignment i.e. left, right or center
            loader: true,  // Whether to show loader or not. True by default
            loaderBg: '#9EC600',  // Background color of the toast loader
            beforeShow: function () {}, // will be triggered before the toast is shown
            afterShown: function () {}, // will be triggered after the toat has been shown
            beforeHide: function () {}, // will be triggered before the toast gets hidden
            afterHidden: function () {}  // will be triggered after the toast has been hidden
        });*/
        $.toast({
            text: initParameter.text ?? "", // Text that is to be shown in the toast
            heading: initParameter.heading ?? false,
            icon: initParameter.icon ?? false,
            showHideTransition: initParameter.showHideTransition ?? "fade",
            allowToastClose: initParameter.allowToastClose ?? true,
            hideAfter: initParameter.hideAfter ?? 3000,
            stack: initParameter.stack ?? 20,
            position: initParameter.position ?? "bottom-center",
            textAlign: initParameter.textAlign ?? "left",
            loader: initParameter.loader ?? false,
            loaderBg: initParameter.loaderBg ?? '#9EC600',
            bgColor : initParameter.bgColor ?? false,
            bg : initParameter.bg ?? false,
            beforeShow: function () {}, // will be triggered before the toast is shown
            afterShown: function () {}, // will be triggered after the toat has been shown
            beforeHide: function () {}, // will be triggered before the toast gets hidden
            afterHidden: function () {}  // will be triggered after the toast has been hidden
           });
    }

    return {
        index: index,
        pre: pre
    };
};

export { promise }