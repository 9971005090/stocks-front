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
            'DELETE': `If you delete it, it cannot be recovered.<Br />Are you realy want to delete it?`
        },
        'SUCCESS': {
            'DELETE': `Deleted successfully.`,
            'PROCESS': `Successfully {{PROCESS}}.`
        },
        'FAIL': {
            'DELETE': `Deletion failed. Try again in a moment.`,
            'PROCESS': `Failed to {{PROCESS}}. Please try again later.`
        },
        'SEARCH': {
            'INCORRECT_DURATION': `Search period is incorrect. Please check again.`,
        },
        'SELECT': {},
        'PAGING_SORT_METHOD': `Number of List`,
        'NO_DATA': `No data`,
        'LOADING_DATA': `Loading data`,
        'INVALID_REQUEST': `Invalid request. The window will be closed soon.`,
        'ERROR': {
            'UNKNOWN_ERROR_RESTART': 'An unknown error has occurred. Restarting shortly.'
        },
    },
    'BUTTON': {
        'DELETE': `Yes, I will delete it.`,
        'DELETE2': `Delete`,
        'CANCEL': `CANCEL`,
        'CANCEL2': `Cancel`,
        'CANCEL3': `Cancel`,
        'EDIT': `EDIT`,
        'EDIT2': `Edit`,
        'OK': `OK`,
        'OK2': `Yes`,
        'LOG_OUT': `Log out`,
        'SEARCH': `Search`,
        'SEARCH2': `Search`,
    },
    'WORD': {
        'NO': `No.`,
        'NAME': `Name`,
        'AGE': `Age`,
        'TIME': `Time`,
        'SELECT': `Select`,
        'SELECT_ALL': 'Select all',
        'PAGING_SORT_METHOD_10': `10`,
        'PAGING_SORT_METHOD_15': `15`,
        'PAGING_SORT_METHOD_25': `25`,
        'ALL': `All`,
        'NO_DATA': `No data`,
        'TIMES': 'Times',
        'SELECT_PERIOD': `Select period`,
        'SEARCH_PERIOD': `Period`,
        'TOTAL_PERIOD': `Total period`,
        'PROCESS': {
            'ADD1': `registered`,
            'ADD2': `register`,
            'UPDATE1': `updated`,
            'UPDATE2': `update`,
            'DELETE1': `deleted`,
            'DELETE2': `delete`,
        },
        'CALENDAR': {
            'ARRAY_DAYS': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            'ARRAY_MONTHS': ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
            'YEAR': ``,
            'MONTH': `Month`,
            'DAY': `Day`,
        }
    },
    'GENDER': {
        'TITLE': `Gender`,
        'MALE': `Male`,
        'FEMALE': `Female`,
    },
    'FAIL': {
        'DELETE': `Deletion failed. Try again in a moment.`
    }
}