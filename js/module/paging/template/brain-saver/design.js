export const paging = `
                                <!-- pageing -->
                                <input type="hidden" id="{{prefix}}_currentPage" value="{{currentPage}}">
                                <input type="hidden" id="{{prefix}}_dataPerPage" value="{{dataPerPage}}">
                                <input type="hidden" id="{{prefix}}_pageCount" value="{{pageCount}}">
                                
                                {{#if pagingExist}}
                                    {{#if paging.first}}
                                    <li class="{{prefix}} page-item paging-btn paging-btn-double">
                                        <button type="button" class="btn btn-page btn-page-first" aria-label="First" style="cursor: pointer"><<</button>
                                    </li>
                                    {{else}}
                                    <li class="{{prefix}} page-item paging-btn paging-btn-double disabled">
                                        <button type="button" class="btn btn-page btn-page-first" aria-label="First"></button>
                                    </li>
                                    {{/if}}
                                    {{#if paging.prev}}
                                    <li class="{{prefix}} page-item paging-btn">
                                        <button type="button" class="btn btn-page btn-page-prev" aria-label="Prev" style="cursor: pointer"><</button>
                                    </li>
                                    {{else}}
                                    <li class="{{prefix}} page-item paging-btn disabled">
                                        <button type="button" class="btn btn-page btn-page-prev" aria-label="Prev"><i class="fa fa-play" style="transform: rotate(180deg);"></i></button>
                                    </li>
                                    {{/if}}    
                                
                                
                                {{#each paging.datas}}
                                    {{#if active}}
                                    <li class="{{../prefix}} page-item paging-btn selected" aria-current="page"><span class="btn btn-number">{{number}}</span></li>
                                    {{else}}
                                    <li class="{{../prefix}} page-item paging-btn" aria-current="page" style="cursor: pointer"><span class="btn btn-number">{{number}}</span></li>
                                    {{/if}}
                                {{/each}}
                                
                                
                                    {{#if paging.next}}
                                    <li class="{{prefix}} page-item paging-btn mr-4 ml-12">
                                        <button type="button" class="btn btn-page btn-page-next" aria-label="Next" style="cursor: pointer">></button>
                                    </li>
                                    {{else}}
                                    <li class="{{prefix}} page-item paging-btn mr-4 ml-12 disabled">
                                        <button type="button" class="btn btn-page btn-page-next" aria-label="Next" style="cursor: pointer">></button>
                                    </li>
                                    {{/if}}
                                    {{#if paging.last}}
                                    <li class="{{prefix}} page-item paging-btn paging-btn-double">
                                        <button type="button" class="btn btn-page btn-page-last" aria-label="Last" style="cursor: pointer">>></button>
                                    </li>
                                    {{else}}
                                    <li class="{{prefix}} page-item paging-btn paging-btn-double disabled">
                                        <button type="button" class="btn btn-page btn-page-last" aria-label="Last" style="cursor: pointer">>></button>
                                    </li>
                                    {{/if}}
                                {{/if}}
`;


export const paging_sub = `
                                <!-- pageing -->
                                <input type="hidden" id="{{prefix}}_currentPage" value="{{currentPage}}">
                                <input type="hidden" id="{{prefix}}_dataPerPage" value="{{dataPerPage}}">
                                <input type="hidden" id="{{prefix}}_pageCount" value="{{pageCount}}">
                                
                                {{#if pagingExist}}
                                    {{#if paging.first}}
                                    <li class="{{prefix}} page-item paging-btn" style="margin: 0 2px 0 2px"><a style="cursor: pointer" aria-label="First" class="prev-next-button">&lt;&lt;</a></li>
                                    {{else}}
                                    <li class="{{prefix}} page-item paging-btn disabled" style="margin: 0 2px 0 2px"><a aria-label="First" class="prev-next-button">&lt;&lt;</a></li>
                                    {{/if}}
                                    
                                    {{#if paging.prev}}
                                    <li class="{{prefix}} page-item paging-btn" style="margin: 0 2px 0 2px"><a style="cursor: pointer" aria-label="Prev" class="prev-next-button">&lt;</a></li>
                                    {{else}}
                                    <li class="{{prefix}} page-item paging-btn disabled" style="margin: 0 2px 0 2px"><a aria-label="Prev" class="prev-next-button">&lt;</a></li>
                                    {{/if}}
                                
                                {{#each paging.datas}}
                                    {{#if active}}
                                    <li class="{{../prefix}} page-item paging-btn active" style="margin: 0 2px 0 2px"><a class="number-button">{{number}}</a></li>
                                    {{else}}
                                    <li class="{{../prefix}} page-item paging-btn" style="margin: 0 2px 0 2px"><a style="cursor: pointer" class="number-button">{{number}}</a></li>
                                    {{/if}}
                                {{/each}}
                                
                                    {{#if paging.next}}
                                    <li class="{{prefix}} page-item paging-btn" style="margin: 0 2px 0 2px"><a aria-label="Next" style="cursor: pointer" class="prev-next-button">&gt;</a></li>
                                    {{else}}
                                    <li class="{{prefix}} page-item paging-btn disabled" style="margin: 0 2px 0 2px"><a aria-label="Next" class="prev-next-button">&gt;</a></li>
                                    {{/if}}
                                    
                                    {{#if paging.last}}
                                    <li class="{{prefix}} page-item paging-btn" style="margin: 0 2px 0 2px"><a aria-label="Last" style="cursor: pointer" class="prev-next-button">&gt;&gt;</a></li>
                                    {{else}}
                                    <li class="{{prefix}} page-item paging-btn disabled" style="margin: 0 2px 0 2px"><a aria-label="Last" class="prev-next-button">&gt;&gt;</a></li>
                                    {{/if}}
                                    
                                {{/if}}
                                <!-- //pageing -->
`;