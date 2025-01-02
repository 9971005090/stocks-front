"use strict";

const promise = async () => {
    const preAction = function() {
        Handlebars.registerHelper('_t', function(object, key) {
            const _p = GBL.CONSTANTS.get(`PARSING_ORGANIZATIONS`);
            if(key === "organizationCode"){
                return _p[object[key]];
            }
            if(key === "level"){
                if (object[key] === 1){
                    object[key] = '환자';
                }
                else if(object[key] === 2){
                    object[key] = '간호사';
                }
                else if(object[key] === 5){
                    object[key] = '의사';
                }
                else if(object[key] === 8){
                    object[key] = '매니저';
                }
                else if(object[key] === 14){
                    object[key] = '관리자';
                }
                else{
                    object[key] = '사이트매니저';
                }
            }
            return object[key];
        });
    }

    const index = async function() {
        let parameter = {
            "pageName" : "account",
        }
        await Seers.Loader.moduleLoad("crud", "index", parameter);
    };

    const add = function(){
        let parameter = {
            "pageName" : "account",
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