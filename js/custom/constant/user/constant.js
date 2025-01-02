export const CONST = {
    'LEVEL': {
        'CODE': {
            'PATIENT': 1,
            'NURSE': 2,
            'DOCTOR': 5,
            'MANAGER': 8,
            'ADMIN': 14
        },
        'STRING': {}
    },
    'TYPE' :{
        'CODE': {
            'DEFAULT': 0,
            'NURSE': 1,
            'DOCTOR': 2,
            'SCREENING': 3,
            'PARAMEDIC': 5,
            'LAMP_MANAGER': 7,
            'BS_PARAMEDIC': 10,
            'BS_NURSE': 12,
            'BS_MANAGER': 14,
        },
        'STRING': {}
    } ,
    'INIT': function() {
        CONST.LEVEL.STRING[CONST.LEVEL.CODE.PATIENT] = `환자`;
        CONST.LEVEL.STRING[CONST.LEVEL.CODE.NURSE] = `간호사`;
        CONST.LEVEL.STRING[CONST.LEVEL.CODE.DOCTOR] = `의사`;
        CONST.LEVEL.STRING[CONST.LEVEL.CODE.MANAGER] = `매니저`;
        CONST.LEVEL.STRING[CONST.LEVEL.CODE.ADMIN] = `관리자`;

        CONST.TYPE.STRING[CONST.TYPE.CODE.DEFAULT] = `전체조회`;
        CONST.TYPE.STRING[CONST.TYPE.CODE.NURSE] = `간호사`;
        CONST.TYPE.STRING[CONST.TYPE.CODE.DOCTOR] = `의사`;
        CONST.TYPE.STRING[CONST.TYPE.CODE.SCREENING] = `선별진료소 부스`;
        CONST.TYPE.STRING[CONST.TYPE.CODE.PARAMEDIC] = `응급대원`;
        CONST.TYPE.STRING[CONST.TYPE.CODE.LAMP_MANAGER] = `램프관리 계정`;
        CONST.TYPE.STRING[CONST.TYPE.CODE.BS_PARAMEDIC] = `브레인세이버 응급대원`;
        CONST.TYPE.STRING[CONST.TYPE.CODE.BS_NURSE] = `브레인세이버 의사`;
        CONST.TYPE.STRING[CONST.TYPE.CODE.BS_MANAGER] = `브레인세이버 매니저`;

        Handlebars.registerHelper('levelName', function(level) {
            return CONST.LEVEL.STRING[level];
        })
        Handlebars.registerHelper('accountTypeName', function(accountType) {
            if(accountType === 0){
                return `분류 없음`
            }
            else{
                return CONST.TYPE.STRING[accountType];
            }

        })
    }
}
CONST.INIT();