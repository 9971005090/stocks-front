`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author zaid
 */

/**
 * @constant
 * @typedef {object} UTIL
 * @property {object} HEADER 각 메뉴의 헤더 관련 처리 정의
 * @description 각 메뉴의 헤더/레프트에서 사용되는 유틸 함수 정의
 */
export const UTIL = {
    _INIT: function(selectorName, datas) {
        if (datas.length > 0) {
            $(`#${selectorName.parent}`).html(``);
            $(`#${selectorName.parent}`).append(`<canvas id="${selectorName.child}" width="${$(`#${selectorName.parent}`).innerWidth()}" height="${$(`#${selectorName.parent}`).innerHeight()}"></canvas>`)
            const ctx = document.getElementById(selectorName.child);

            // line 챠트 하나
            // new Chart(ctx, {
            //     type: 'line',
            //     data: {
            //         labels: datas.map(obj => obj.parsingDate),
            //         datasets: [{
            //             label: '측정수',
            //             data: datas.map(obj => obj.dayCount),
            //             fill: false,
            //             borderColor: 'rgb(75, 192, 192)',
            //             tension: 0.1
            //         }]
            //     },
            //     options: {
            //         scales: {
            //             y: {
            //                 beginAtZero: true
            //             }
            //         }
            //     }
            // });
            // 바하고 라인 두개
            new Chart(ctx, {
                data: {
                    labels: datas.map(obj => obj.parsingDate),
                    datasets: [{
                        type: `line`,
                        label: '측정수',
                        data: datas.map(obj => obj.dayCount),
                        // fill: false,
                        // borderColor: 'rgb(75, 192, 192)',
                        // tension: 0.1
                    },
                    {
                        type: `bar`,
                        label: '측정수',
                        data: datas.map(obj => obj.dayCount),
                        // fill: false,
                        // borderColor: 'rgb(161,75,192)',
                        // tension: 0.1
                    }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false  // 범례 숨기기
                        }
                    }
                }
            });
        }
        else {
            $(`#${selectorName.parent}`).html(`데이타가 없습니다.`);
        }

    },
    _RUN: function(selectorName, datas) {
        UTIL._INIT(selectorName, datas);
    }
}