"use strict";
/**
 * @file 모니터링 > 검토 메뉴에서 사용되는 챠트 초기화 정보 정의 파일
 * @version 0.0.1
 * @description 트렌드 챠트 생성에 관련된 초기화 정보/ 유틸 함수 정의 하는 파일
 * @author zaid
 */

/**
 * @constant
 * @typedef {object} CONST
 * @property {object} design 공통으로 처리되는 디자인 정의
 * @property {object} controller 각 메뉴(controller)에 해당 되는 내용 정의
 * @description 모니터링 > 검토 메뉴에서 사용되는 트렌드 챠트 생성과 관련 정보 정의를 한다.
 */
export const CONST = {
    'ko': 'ko-KR',
    'ko-KR': 'ko-KR',
    'en': 'en-US',
    'en-US': 'en-US',
    getKey: function (lang) {
        const _e = GBL.CONSTANTS.get(`GLOBAL.FUNCTION_ENVIRONMENT`);
        if (_e.MULTI_LANGUAGE === false) {
            return _e.KOREA_LANGUAGE_KEY;
        }
        else {
            if (CONST.hasOwnProperty(lang) === true) {
                return CONST[lang];
            }
            return _e.DEFAULT_LANGUAGE_KEY;
        }
    }
}