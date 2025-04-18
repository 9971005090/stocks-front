export const paging = `
                                <!-- pageing -->
                                <input type="hidden" id="{{prefix}}_currentPage" value="{{currentPage}}">
                                <input type="hidden" id="{{prefix}}_dataPerPage" value="{{dataPerPage}}">
                                <input type="hidden" id="{{prefix}}_pageCount" value="{{pageCount}}">
                                
                                {{#if pagingExist}}
                                    
<!--                                    {{#if paging.prev}}-->
<!--                                    <li class="{{prefix}} page-item">-->
<!--                                        <button type="button" class="page-link" aria-label="Prev" style="cursor: pointer"><i class="fa fa-fast-forward" style="transform: rotate(180deg);"></i></button>-->
<!--                                    </li>-->
<!--                                    {{else}}-->
<!--                                    <li class="{{prefix}} page-item disabled">-->
<!--                                        <button type="button" class="page-link" aria-label="Prev"><i class="fa fa-fast-forward" style="transform: rotate(180deg);"></i></button>-->
<!--                                    </li>-->
<!--                                    {{/if}}-->
                                    
                                    {{#if paging.first}}
                                    <li class="{{prefix}} page-item">
                                        <button type="button" class="page-link prev-next-button" aria-label="First" style="cursor: pointer"><i class="fa fa-forward" style="transform: rotate(180deg);"></i></button>
                                    </li>
                                    {{else}}
                                    <li class="{{prefix}} page-item disabled">
                                        <button type="button" class="page-link prev-next-button" aria-label="First"><i class="fa fa-forward" style="transform: rotate(180deg);"></i></button>
                                    </li>
                                    {{/if}}
                                    {{#if paging.prev}}
                                    <li class="{{prefix}} page-item">
                                        <button type="button" class="page-link prev-next-button" aria-label="Prev" style="cursor: pointer"><i class="fa fa-play" style="transform: rotate(180deg);"></i></button>
                                    </li>
                                    {{else}}
                                    <li class="{{prefix}} page-item disabled">
                                        <button type="button" class="page-link prev-next-button" aria-label="Prev"><i class="fa fa-play" style="transform: rotate(180deg);"></i></button>
                                    </li>
                                    {{/if}}    
                                
                                
                                {{#each paging.datas}}
                                    {{#if active}}
                                    <li class="{{../prefix}} page-item active" aria-current="page"><span class="page-link number-button">{{number}}</span></li>
                                    {{else}}
                                    <li class="{{../prefix}} page-item" aria-current="page" style="cursor: pointer"><span class="page-link number-button">{{number}}</span></li>
                                    {{/if}}
                                {{/each}}
                                
                                
                                    {{#if paging.next}}
                                    <li class="{{prefix}} page-item">
                                        <button type="button" class="page-link prev-next-button" aria-label="Next" style="cursor: pointer"><i class="fa fa-play"></i></button>
                                    </li>
                                    {{else}}
                                    <li class="{{prefix}} page-item disabled">
                                        <button type="button" class="page-link prev-next-button" aria-label="Next" style="cursor: pointer"><i class="fa fa-play"></i></button>
                                    </li>
                                    {{/if}}
                                    {{#if paging.last}}
                                    <li class="{{prefix}} page-item">
                                        <button type="button" class="page-link prev-next-button" aria-label="Last" style="cursor: pointer"><i class="fa fa-forward"></i></button>
                                    </li>
                                    {{else}}
                                    <li class="{{prefix}} page-item disabled">
                                        <button type="button" class="page-link prev-next-button" aria-label="Last"><i class="fa fa-forward"></i></button>
                                    </li>
                                    {{/if}}
                                    
                                    
<!--                                    {{#if paging.next}}-->
<!--                                    <li class="{{prefix}} page-item" style="cursor: pointer">-->
<!--                                        <button type="button" class="page-link" aria-label="Next" style="cursor: pointer"><i class="fa fa-fast-forward"></i></button>-->
<!--                                    </li>-->
<!--                                    {{else}}-->
<!--                                    <li class="{{prefix}} page-item disabled">-->
<!--                                        <button type="button" class="page-link" aria-label="Next" style="cursor: pointer"><i class="fa fa-fast-forward"></i></button>-->
<!--                                    </li>-->
<!--                                    {{/if}}-->
                                
                                {{/if}}
                                <!-- //pageing -->
`;


export const paging_sub = `
                                <!-- pageing -->
                                <input type="hidden" id="{{prefix}}_currentPage" value="{{currentPage}}">
                                <input type="hidden" id="{{prefix}}_dataPerPage" value="{{dataPerPage}}">
                                <input type="hidden" id="{{prefix}}_pageCount" value="{{pageCount}}">
                                
                                {{#if pagingExist}}
                                    {{#if paging.first}}
                                    <li class="{{prefix}} page-item" style="margin: 0 2px 0 2px"><a style="cursor: pointer" aria-label="First" class="prev-next-button">&lt;&lt;</a></li>
                                    {{else}}
                                    <li class="{{prefix}} page-item disabled" style="margin: 0 2px 0 2px"><a aria-label="First" class="prev-next-button">&lt;&lt;</a></li>
                                    {{/if}}
                                    
                                    {{#if paging.prev}}
                                    <li class="{{prefix}} page-item" style="margin: 0 2px 0 2px"><a style="cursor: pointer" aria-label="Prev" class="prev-next-button">&lt;</a></li>
                                    {{else}}
                                    <li class="{{prefix}} page-item disabled" style="margin: 0 2px 0 2px"><a aria-label="Prev" class="prev-next-button">&lt;</a></li>
                                    {{/if}}
                                
                                {{#each paging.datas}}
                                    {{#if active}}
                                    <li class="{{../prefix}} page-item active" style="margin: 0 2px 0 2px"><a class="number-button">{{number}}</a></li>
                                    {{else}}
                                    <li class="{{../prefix}} page-item" style="margin: 0 2px 0 2px"><a style="cursor: pointer" class="number-button">{{number}}</a></li>
                                    {{/if}}
                                {{/each}}
                                
                                    {{#if paging.next}}
                                    <li class="{{prefix}} page-item" style="margin: 0 2px 0 2px"><a aria-label="Next" style="cursor: pointer" class="prev-next-button">&gt;</a></li>
                                    {{else}}
                                    <li class="{{prefix}} page-item disabled" style="margin: 0 2px 0 2px"><a aria-label="Next" class="prev-next-button">&gt;</a></li>
                                    {{/if}}
                                    
                                    {{#if paging.last}}
                                    <li class="{{prefix}} page-item" style="margin: 0 2px 0 2px"><a aria-label="Last" style="cursor: pointer" class="prev-next-button">&gt;&gt;</a></li>
                                    {{else}}
                                    <li class="{{prefix}} page-item disabled" style="margin: 0 2px 0 2px"><a aria-label="Last" class="prev-next-button">&gt;&gt;</a></li>
                                    {{/if}}
                                    
                                {{/if}}
                                <!-- //pageing -->
`;