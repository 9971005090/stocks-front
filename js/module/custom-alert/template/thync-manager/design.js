export const modal = `
<style>
.custom-button {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}



.custom-button-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}

.custom-button-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}

.custom-button-success {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
}

.custom-button-info {
    color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
}

.custom-button-warning {
    color: #212529;
    background-color: #ffc107;
    border-color: #ffc107;
}

.custom-button-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}

.custom-button-light {
    color: #212529;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
}
.custom-button-dark {
    color: #fff;
    background-color: #343a40;
    border-color: #343a40;
}

.custom-button-outline-primary {
    color: #007bff;
    border-color: #007bff;
}

.custom-button-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
}


.custom-button-outline-success {
    color: #28a745;
    border-color: #28a745;
}

.custom-button-outline-info {
    color: #17a2b8;
    border-color: #17a2b8;
}

.custom-button-outline-warning {
    color: #ffc107;
    border-color: #ffc107;
}

.custom-button-outline-danger {
    color: #dc3545;
    border-color: #dc3545;
}

.custom-button-outline-light {
    color: #f8f9fa;
    border-color: #f8f9fa;
}


.custom-button-outline-dark {
    color: #343a40;
    border-color: #343a40;
}


.custom-button-link {
    font-weight: 400;
    color: #007bff;
    text-decoration: none;
}



.fl-l{ float: left; }
.fl-r{ float: right; }


/* layer_popup */
.layer_popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
}
.layer_popup_container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 600px;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 30px 0 20px;
}
.layer_popup_container .layer_popup_header {
  padding: 20px 20px 14px 20px;
}
.layer_popup_container .layer_popup_header .close {
  position: absolute;
  top: 25px;
  right: 20px;
}
.layer_popup_container .layer_popup_header .layer_popup_modal_title {
  padding-bottom: 15px;
  border-bottom: 1px solid #007A94;
}
.layer_popup_container .layer_popup_header .layer_popup_modal_title h2 {
  color: #007A94;
}

.layer_popup_container .layer_popup_body {
  padding: 20px 20px 30px 20px;
}

.customAlertText{
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    color: #004488;
}

.layer_popup_container .layer_popup_footer {
    margin-top: 10px; 
    margin-bottom: 20px; 
    text-align: center;
}
</style>
                <div class="layer_popup_container" id="{{id}}" style="width:480px;height: auto;">
                    <div class="layer_popup_body" style="text-align: center;">
                        {{{msg}}}
                    </div>
                    <div class="layer_popup_footer">
                        {{#if button.cancel.isUse}}
                            {{{button.cancel.buttonObj}}}
                        {{/if}}
                        {{#if button.ok.isUse}}
                            {{{button.ok.buttonObj}}}
                        {{/if}}
                        {{#if button.del.isUse}}
                            {{{button.del.buttonObj}}}
                        {{/if}}
                    </div>
                </div>
`;