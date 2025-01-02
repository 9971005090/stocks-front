"use strict";

const promise = async () => {
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/tab-menu.js${ver_string}`);
    const {EVENT: SELECT_BOX_EVENT} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);

    const responsive = function(){
        if(!$(".cm-tab-menu").hasClass("scroll-bar")){
            if($("#app").hasClass("tablet") || $("#app").hasClass("mobile") || $("#app").hasClass("mobile-small")){
                $(".cm-tab-menu").addClass("cm-select-box");
                $(".cm-tab-menu .tab-lists").addClass("option-list");
                $(".cm-tab-menu .cm-tab-list").addClass("option-item");
                $(".tab-lists.option-list").hide();
                $(".cm-tab-menu.cm-select-box").removeClass("selected");
                $(".btn-tab-select.label").text($(".cm-tab-list.option-item.selected").text());

                CUSTOM.EVENT.HTML.push(".cm-select-box.cm-tab-menu");
                $(".cm-select-box.cm-tab-menu").off("click").on('click', function(e){
                    etc.stopBubbling(e);
                    $(this).toggleClass("selected");
                    $(this).children(".tab-lists.option-list").css("top",-3);
                    $(this).children(".tab-lists.option-list").width($(this).width());
                    $(this).children(".tab-lists.option-list").toggle();
                });
                CUSTOM.EVENT.HTML.push(".cm-tab-list.option-item");
                $(".cm-tab-list.option-item").off("click").on('click', function(e){
                    etc.stopBubbling(e);
                    $(".cm-tab-list.option-item").removeClass("selected");
                    $(this).addClass("selected");
                    $(this).parents(".selected").removeClass("selected");
                    $(this).parent(".tab-lists.option-list").toggle();
                    $(this).parent().parent(".cm-tab-menu.cm-select-box").find(".btn-tab-select.label").text($(this).text());

                    if (selectBoxCallback !== null) {
                        selectBoxCallback($(this));
                    }
                });
            }

            if($("#app").hasClass("pc")){
                $(".cm-tab-menu").removeClass("cm-select-box");
                $(".cm-tab-menu .tab-lists").removeClass("option-list");
                $(".cm-tab-menu .cm-tab-list").removeClass("option-item");
                $(".tab-lists").show().removeAttr("style");

                CUSTOM.EVENT.HTML.push(".cm-tab-list");
                $('.cm-tab-list').off("click").on('click', function(e){
                    etc.stopBubbling(e);
                    let tabMenu = `#${$(this).data("code")}`;
                    $(".cm-tab-list, .cm-tab-cont").removeClass("selected");
                    $(this).addClass("selected");
                    $(tabMenu).addClass("selected");

                    if (selectBoxCallback !== null) {
                        selectBoxCallback($(this));
                    }
                });
            }
        }
    }

    const selectBoxCallback = function (choiceBox) {
        let selectObj = $(choiceBox).parents(".cm-tab-menu");
        selectObj.children(".check").val($(choiceBox).data("code"));
        $(".cm-tab-cont").removeClass("selected");
        $(`#${$(choiceBox).data("code")}`).addClass("selected");
    }
    const setAddEvent = function(){
        CUSTOM.EVENT.HTML.push(".cm-tab-list");
        $(".cm-tab-menu .check").val($(".cm-tab-list.selected").data("code"));
        $('.cm-tab-list').off("click").on('click', function(e){
            etc.stopBubbling(e);
            let tabMenu = `#${$(this).data("code")}`;
            $(".cm-tab-list, .cm-tab-cont").removeClass("selected");
            $(this).addClass("selected");
            $(tabMenu).addClass("selected");

            if (selectBoxCallback !== null) {
                selectBoxCallback($(this));
            }
        });

        if(!$(".cm-tab-menu").hasClass("scroll-bar")) {
            if ($("#app").hasClass("tablet") || $("#app").hasClass("mobile") || $("#app").hasClass("mobile-small")) {
                $(".cm-tab-menu").addClass("cm-select-box");
                $(".cm-tab-menu .tab-lists").addClass("option-list");
                $(".cm-tab-menu .cm-tab-list").addClass("option-item");
                $(".tab-lists.option-list").hide();
                $(".btn-tab-select.label").text($(".cm-tab-list.option-item.selected").text());
                $(".cm-tab-menu .check").val($(".cm-tab-list.selected.option-item").data("code"));

                CUSTOM.EVENT.HTML.push(".cm-select-box.cm-tab-menu");
                $(".cm-select-box.cm-tab-menu").off("click").on('click', function (e) {
                    etc.stopBubbling(e);
                    $(this).toggleClass("selected");
                    $(this).children(".tab-lists.option-list").css("top", -3);
                    $(this).children(".tab-lists.option-list").width($(this).width());
                    $(this).children(".tab-lists.option-list").toggle();
                });
                CUSTOM.EVENT.HTML.push(".cm-tab-list.option-item");
                $(".cm-tab-list").off("click").on('click', function (e) {
                    etc.stopBubbling(e);
                    $(".cm-tab-list.option-item").removeClass("selected");
                    $(this).addClass("selected");
                    $(this).parents(".cm-tab-menu.cm-select-box").removeClass("selected");
                    $(this).parent(".tab-lists.option-list").toggle();
                    $(this).parent().parent(".cm-tab-menu.cm-select-box").find(".btn-tab-select.label").text($(this).text());

                    if (selectBoxCallback !== null) {
                        selectBoxCallback($(this));
                    }
                });
            }

            if ($("#app").hasClass("pc")) {
                $(".cm-tab-menu").removeClass("cm-select-box, selected");
                $(".cm-tab-menu .tab-lists").removeClass("option-list");
                $(".cm-tab-menu .cm-tab-list").removeClass("option-item");
                $(".tab-lists.option-list").show();
            }
        }
    }

    $(window).resize(function(){
        responsive();
    })

    const index = function() {
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.html);
        setAddEvent();
    };

    return {
        index: index,
    };
};

export { promise }
