export const popup = `
<div class="popup" id="{{code}}_popup" style="left: {{left}}; top: {{top}};">
    <div class="popup-header">
        {{title}}
    </div>
    <div class="popup-body">
        {{{message}}}
    </div>
    <div class="popup-footer">
        {{#if useTodayClose}}
        <p class="popup-pull-left">
            <a onclick="GBL.MODULE.popup.closed('{{code}}', true);" style="cursor:pointer">{{fireDay}}일 안보기</a>
        </p>
        {{/if}}
        <p class="popup-pull-right">
            <a onclick="GBL.MODULE.popup.closed('{{code}}');" style="cursor:pointer">창닫기</a>
        </p>
    </div>
</div>
`;