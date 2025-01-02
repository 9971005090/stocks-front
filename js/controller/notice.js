"use strict";

const promise = async () => {
    const preAction = function() {
        Handlebars.registerHelper('_t', function(object, key) {
            if(key === "noticeLevel"){
                if (object[key] === 0){
                    object[key] = '전체 공지';
                }
                else if(object[key] === 1){
                    object[key] = '기관 공지';
                }
            }
            return object[key];
        });
    }

    const index = async function() {
        let parameter = {
            "pageName" : "notice",
        }
        await Seers.Loader.moduleLoad("crud", "index", parameter);
    };

    const add = function(){
        let parameter = {
            "pageName" : "notice",
        }
        Seers.Loader.moduleLoad("crud", "add", parameter);
    }

    const update = function(params = null){
        Seers.Loader.moduleLoad("crud", "update", params);
    }

    return {
        preAction: preAction,
        index: index,
        add: add,
        update: update,
    };
};

export { promise }