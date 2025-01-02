"use strict";

const promise = async () => {
    const preAction = function() {
        Handlebars.registerHelper('_t', function(object, key) {
            if(key === "connStatus"){
                return object[key] == 1 ? "미연결" : "연결";
            }
            return object[key];
        });
    }

    const index = async function() {
        let parameter = {
            "pageName" : "crud_base",
        }
        await Seers.Loader.moduleLoad("crud", "index", parameter);
    };

    const add = function(){
        let parameter = {
            "pageName" : "crud_base",
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