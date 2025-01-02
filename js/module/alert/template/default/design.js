export const modal = `
                <div class="layer_popup_container" id="{{id}}" style="width:450px;">
                    <div class="layer_popup_header">
                        <h5 class="layer_popup_modal_title fl-l">확인</h5>
                        <button type="button" class="close fl-r" onclick="modal.globalClose('{{id}}');"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="layer_popup_body">
                        {{msg}}
                    </div>
                    <div class="layer_popup_footer fl-r">
                        <button type="button" class="btn btn-secondary waves-effect waves-themed" onclick="modal.globalClose('{{id}}');">닫기</button>
                    </div>
                </div>
`;