export const index = `
<style>
.toast-message{
    padding: 8px 32px;
    background: {{backgroundColor}};
    position: absolute;
    border-radius : 4px;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
.toast-message .span{
    font-size font-weight: 500;
    font-size: 16px;
    line-height: 32px;
    color : white;
}
@-webkit-keyframes fadein {
  from { opacity: 0;} 
  to { opacity: 1;}
}

@keyframes fadein {
  from { opacity: 0;}
  to { opacity: 1;}
}

@-webkit-keyframes fadeout {
  from { opacity: 1;} 
  to { opacity: 0;}
}

@keyframes fadeout {
  from { opacity: 1;}
  to { opacity: 0;}
}
</style>
    <div class="toast-message {{backgroundColor}} {{position}}" id="{{id}}" style="">
        <span class="span">{{{msg}}}</span>        
    </div>
`;