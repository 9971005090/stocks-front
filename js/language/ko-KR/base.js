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
    'MESSAGE': {
        'LOGIN': {
            'AFTER': `{{name}} 환영합니니다.`,
        },
        'CONFIRM': {
            'DELETE': `삭제를 하면 복구가 불가능합니다.<Br />정말 삭제하시겠습니까?`
        },
        'SUCCESS': {
            'DELETE': `정상적으로 삭제됐습니다.`,
            'PROCESS': `정상적으로 {{PROCESS}} 됐습니다.`
        },
        'FAIL': {
            'DELETE': `삭제에 실패했습니다. 잠시 후 다시 시도하세요.`,
            'PROCESS': `{{PROCESS}}에 실패했습니다. 잠시 후 다시 시도해주세요.`
        },
        'SEARCH': {
            'INCORRECT_DURATION': `검색 기간이 올바르지 않습니다! 정확히 입력하세요!`,
        },
        'SELECT': {},
        'PAGING_SORT_METHOD': `페이지에 표시되는 내용의 갯수`,
        'NO_DATA': `조회된 데이터가 없습니다`,
        'LOADING_DATA': `데이터 조회 중입니다.`,
        'INVALID_REQUEST': `잘못된 요청입니다. 잠시 후 창이 종료됩니다.`,
        'ERROR': {
            'UNKNOWN_ERROR_RESTART': '알 수 없는 오류가 발생하였습니다. 잠시후 재시작 됩니다.',
        },
    },
    'BUTTON': {
        'DELETE': `네. 삭제합니다.`,
        'DELETE2': `삭제`,
        'CANCEL': `취소`,
        'CANCEL2': `취소`,
        'CANCEL3': `아니요`,
        'EDIT': `EDIT`,
        'EDIT2': `Edit`,
        'OK': `확인`,
        'OK2': `네`,
        'LOG_OUT': `로그아웃`,
        'SEARCH': `검색`,
        'SEARCH2': `조회`,
    },
    'WORD': {
        'NO': `번호`,
        'NAME': `이름`,
        'AGE': `나이`,
        'TIME': `시간`,
        'SELECT': `선택`,
        'SELECT_ALL': '전체 선택',
        'PAGING_SORT_METHOD_10': `10개씩 표시`,
        'PAGING_SORT_METHOD_15': `15개씩 표시`,
        'PAGING_SORT_METHOD_25': `25개씩 표시`,
        'ALL': `전체`,
        'NO_DATA': `정보 없음`,
        'TIMES': '회',
        'SELECT_PERIOD': `조회기간 선택`,
        'SEARCH_PERIOD': `조회기간`, // base 에 복사
        'TOTAL_PERIOD': `전체기간`, // base 에 복사
        'PROCESS': {
            'ADD1': `등록`,
            'ADD2': `등록`,
            'UPDATE1': `수정`,
            'UPDATE2': `수정`,
            'DELETE1': `삭제`,
            'DELETE2': `삭제`,
        },
        'CALENDAR': {
            'ARRAY_DAYS': ['일', '월', '화', '수', '목', '금', '토'],
            'ARRAY_MONTHS': ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            'YEAR': `년`,
            'MONTH': `월`,
            'DAY': `일`,
        }
    },
    'GENDER': {
        'TITLE': `성별`,
        'MALE': `남`,
        'FEMALE': `여`,
    }
}