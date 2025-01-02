export const html = `
<style>
.common-cont{ display:flex; flex-direction:column; gap:20px; padding:30px 0; }
.common-cont > div{ padding: 0 30px; }
.b-example-divider { width: 100%; height: 2.5rem; background-color: rgba(0, 0, 0, .1); border: solid rgba(0, 0, 0, .15); border-width: 1px 0; box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, .1), inset 0 0.125em 0.5em rgba(0, 0, 0, .15); }
</style>
<div class="common-cont">
    <div class="cm-tab-wrap">
        <div class="cm-tab-menu"> 
            <!-- 스크롤 탭 -->
            <!-- <div class="cm-tab-menu scroll-bar"> --> 
            <input type="hidden" class="check">
            <button type="button" class="btn-tab-select label">tab selectbox</button>
            <ul class="tab-lists">
                <li class="cm-tab-list selected" data-code="menu01">탭 메뉴 01</li>
                <li class="cm-tab-list" data-code="menu02">탭 메뉴 02</li>
                <li class="cm-tab-list" data-code="menu03">탭 메뉴 03</li>
                <li class="cm-tab-list" data-code="menu04">탭 메뉴 04</li>
            </ul>
        </div>
        <div class="cm-tab-contents">
            <div class="cm-tab-cont selected" id="menu01">메뉴 01</div>
            <div class="cm-tab-cont" id="menu02">메뉴 02</div>
            <div class="cm-tab-cont" id="menu03">메뉴 03</div>
            <div class="cm-tab-cont" id="menu04">메뉴 04</div>
        </div>
    </div>
</div>
`;