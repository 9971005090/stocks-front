"use strict";

const promise = async () => {
    const preAction = function() {
        Handlebars.registerHelper('_t', function(object, key) {
            if(key === 'syncHis'){
                return object[key] == 0 ? "미연동" : "연동";
            }
            else if(key === 'deviceManagerType'){
                return object[key] == 0 ? "SEERS 관리" : "병원 관리";
            }
            return object[key];
        });
    }

    const index = async function() {
        let parameter = {
            "pageName" : "organ",
        }
        await Seers.Loader.moduleLoad("crud", "index", parameter);
    };

    const add = function(){
        let parameter = {
            "pageName" : "organ",
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