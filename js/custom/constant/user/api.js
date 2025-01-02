"use strict";
/**
 * @file 사용자관리 메뉴에서 사용되는 유저 정보 API 주소 저장 파일
 * @version 0.0.1
 * @description 트렌드 챠트 생성에 관련된 초기화 정보/ 유틸 함수 정의 하는 파일
 * @author zaid
 */

/**
 * @constant
 * @typedef {object} DATA_INIT
 * @property {object} design 공통으로 처리되는 디자인 정의
 * @property {object} controller 각 메뉴(controller)에 해당 되는 내용 정의
 * @description 모니터링 > 검토 메뉴에서 사용되는 트렌드 챠트 생성과 관련 정보 정의를 한다.
 */
export const API = {
    'SELECT_ACCOUNT_INFO': `/Account/SelectAccountSimple`,
    'SELECT_ACCOUNT_LIST': `/Account/SelectAccountSimpleList`,
    'SELECT_ORGANIZATION_PAGE': `/Manager/SelectOrganizationSimplePage`,
    'INSERT_ACCOUNT':`/Account/CreateAccount`,
    'UPDATE_ACCOUNT':`/Account/UpdateAccount`,
    'DELETE_ACCOUNT':`/Account/DeleteAccount`
}