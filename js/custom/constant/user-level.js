export const CONST = {
    'LEVEL': {
        'CODE': {
            'PATIENT': 1,
            'NURSE': 2,
            'DOCTOR': 5,
            'MANAGER': 8,
            'ADMIN': 14,
            'SYSTEM_ADMIN': 20,
        },
        'STRING': {}
    },
    'INIT': function() {
        CONST.LEVEL.STRING[CONST.LEVEL.CODE.PATIENT] = `환자`;
        CONST.LEVEL.STRING[CONST.LEVEL.CODE.NURSE] = `간호사`;
        CONST.LEVEL.STRING[CONST.LEVEL.CODE.DOCTOR] = `의사`;
        CONST.LEVEL.STRING[CONST.LEVEL.CODE.MANAGER] = `매니저`;
        CONST.LEVEL.STRING[CONST.LEVEL.CODE.ADMIN] = `관리자`;
        CONST.LEVEL.STRING[CONST.LEVEL.CODE.SYSTEM_ADMIN] = `시스템 관리자`;
    },
    'IGNORE_ID': [`admin`],
    'LIMIT_MESSAGE': `시스템 관리자만 접속할 수 있습니다!`
}
CONST.INIT();