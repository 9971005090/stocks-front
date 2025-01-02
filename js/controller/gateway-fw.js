"use strict";
const promise = async () => {
    const preAction = function() {
        Handlebars.registerHelper('_t', function(object, key) {
            const _p = GBL.CONSTANTS.get(`PARSING_ORGANIZATIONS`);
            if(key === "organizationCode"){
                return _p[object[key]];
            }
            else if(key === "targetOrganizationCode"){
                return object['organizationCode']
            }
            else if(key === "level"){
                if (object[key] === 1){
                    object[key] = 'Normal';
                }
                else if (object[key] === 2){
                    object[key] = 'High';
                }
                else if (object[key] === 3){
                    object[key] = 'Instant';
                }
            }
            else if(key === "fileSize"){
                let bytes;
                let strings;
                if(object[key] > 1024 * 1024){
                    bytes = object[key] / (1024*1024);
                    strings = 'MB';
                }
                else{
                    bytes = object[key] / 1024;
                    strings = 'KB';
                }
                // 소수점 첫 번째 자리까지 표시
                let roundedFormat = bytes.toFixed(1);
                // 천 단위로 콤마 추가
                const formattedBytes = Number(roundedFormat).toLocaleString();
                return formattedBytes + `${strings}`
            }
            return object[key];
        });
    }

    const pre = function() {
        return new Promise(function(resolve, reject) {

            let loadingEnd = function() {
                // 아래 영역에 코드 작성
                //////////////////////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////////
                resolve(true);
            }
            let options = {
                files: [
                    // 아래 영역에 코드 작성(필요한 js, css 로딩)
                    //////////////////////////////////////////////////////////////////////////////////////////////////
                    `/js/util/crypto/asmcrypto-0.22.0.min.js${ver_string}`
                    //////////////////////////////////////////////////////////////////////////////////////////////////
                ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
    }
    const index = async function() {
        let parameter = {
            "pageName" : "gateway-fw",
        }
        await Seers.Loader.moduleLoad("crud", "index", parameter);
    };
    const add = function() {
        let parameter = {
            "pageName" : "gateway-fw",
        }
        Seers.Loader.moduleLoad("crud", "add", parameter);
    };

    return {
        preAction: preAction,
        pre: pre,
        index: index,
        add: add
    };
};

export { promise }