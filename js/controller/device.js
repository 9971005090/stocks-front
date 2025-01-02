"use strict";

const promise = async () => {
    const preAction = function() {
        Handlebars.registerHelper('_t', function(object, key) {
            const _p = GBL.CONSTANTS.get(`PARSING_ORGANIZATIONS`);
            if(key === "organizationCode"){
                return _p[object[key]];
            }
            if(key === "parsingDeviceUseStatus"){
                if (object['deviceUseStatus'] === 0){
                    object[key] = 'X';
                }
                else if (object['deviceUseStatus'] === 1){
                    object[key] = 'O';
                }
            }
            if(key === "deviceType"){
                if (object[key] === 1){
                    object[key] = 'ECG';
                }
                else if (object[key] === 2){
                    object[key] = 'TEMP';
                }
                else if (object[key] === 3){
                    object[key] = 'SpO2';
                }
                else if (object[key] === 6){
                    object[key] = 'BP';
                }
                else if (object[key] === 8){
                    object[key] = 'Tag';
                }
            }
            if(key === "totalUseTime"){
                if(object[key] === 0) {
                    return "-";
                }
                return Date.elapsedTimeForDurationSeconds("D_H_M", object[key] * 60);
            }
            return object[key];
        });
    }

    const index = async function() {
        let parameter = {
            "pageName" : "device",
        }
        await Seers.Loader.moduleLoad("crud", "index", parameter);
    };

    const add = function(){
        let parameter = {
            "pageName" : "device",
        }
        Seers.Loader.moduleLoad("crud", "add", parameter);
    }

    const dynamic = function(){
        let parameter = {
            "pageName" : "device",
        }
        Seers.Loader.moduleLoad("crud", "dynamic", parameter);
    }

    return {
        preAction: preAction,
        index: index,
        add: add,
        dynamic: dynamic,
    };
};

export { promise }