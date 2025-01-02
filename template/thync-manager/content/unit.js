export const searching = `
<tr>
    <td colspan="{{colspan}}" style="height: 100px; vertical-align: middle; text-align: center; border-bottom: 1px solid #d9dee3;">데이터 조회 중입니다.</td>
</tr>                           
`;
export const notFound = `
<tr>
    <td colspan="{{colspan}}" style="height: 100px; vertical-align: middle; text-align: center; border-bottom: 1px solid #d9dee3;">조회된 데이터가 없습니다.</td>
</tr>
`;
export const fail = `
<tr>
    <td colspan="{{colspan}}" style="height: 100px; vertical-align: middle; text-align: center; border-bottom: 1px solid #d9dee3;">알 수 없는 에러가 발생했습니다. 관리자에게 문의하세요.</td>
</tr>
`;
// export const not_found =`<li class="list-detail display-flex" style="justify-content:center;"><b class="b">조회된 내역이 없습니다.</b></li>`;
export const loading = `
            <style>
            .rotate-img {animation: rotate_image 2s linear infinite;transform-origin: 50% 50%;}

            @keyframes rotate_image{
                100% {
                    transform: rotate(360deg);
                }
            }
            </style>
            <div style="z-index: 99999999; position: fixed; top: 0; left: 0; width: 100%; height: 100vh;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 640px; height: 640px; box-sizing: border-box; padding: 0px; margin: 0px;">
                    <img src="/assets/images/progress-blue.png" class="rotate-img" style="width: 500px; margin-top: 100px;">    
                </div>                
            </div>  
`;