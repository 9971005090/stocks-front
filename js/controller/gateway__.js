"use strict";

const promise = async () => {
    const preAction = function() {
        Handlebars.registerHelper('_t', function(object, key) {
            const _p = GBL.CONSTANTS.get(`PARSING_ORGANIZATIONS`);
            if(key === "organizationCode"){
                return _p[object[key]];
            }
            else
            if(key === "connStatus"){
                return object[key] == 1 ? "미연결" : "연결";
            }
            return object[key];
        });
    }

    const index = async function() {
        let parameter = {
            "pageName" : "gateway",
        }
        await Seers.Loader.moduleLoad("crud", "index", parameter);
    };

    const add = function(){
        let parameter = {
            "pageName" : "gateway",
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