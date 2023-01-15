var defaultPosts=elementorModules.frontend.handlers.Base.extend({getSkinPrefix:()=>"vamtam_classic_",bindEvents(){var cid=this.getModelCID();elementorFrontend.addListenerOnce(cid,"resize",this.onWindowResize)},getClosureMethodsNames(){return elementorModules.frontend.handlers.Base.prototype.getClosureMethodsNames.apply(this,arguments).concat(["fitImages","onWindowResize","runMasonry"])},getDefaultSettings:()=>({classes:{fitHeight:"elementor-fit-height",hasItemRatio:"elementor-has-item-ratio"},selectors:{postsContainer:".elementor-posts-container",post:".elementor-post",postThumbnail:".elementor-post__thumbnail",postThumbnailImage:".elementor-post__thumbnail img"}}),getDefaultElements(){var selectors=this.getSettings("selectors");return{$postsContainer:this.$element.find(selectors.postsContainer),$posts:this.$element.find(selectors.post)}},fitImage($post){var settings=this.getSettings(),$imageParent=$post.find(settings.selectors.postThumbnail),$image,image=$imageParent.find("img")[0];if(image){var imageParentRatio=$imageParent.outerHeight()/$imageParent.outerWidth(),imageRatio=image.naturalHeight/image.naturalWidth;$imageParent.toggleClass(settings.classes.fitHeight,imageRatio<imageParentRatio)}},fitImages(){var $=jQuery,self=this,itemRatio=getComputedStyle(this.$element[0],":after").content,settings=this.getSettings();this.elements.$postsContainer.toggleClass(settings.classes.hasItemRatio,!!itemRatio.match(/\d/)),self.isMasonryEnabled()||(this.elements.$posts=this.elements.$postsContainer.find(settings.selectors.post),this.elements.$posts.each((function(){var $post=$(this),$image=$post.find(settings.selectors.postThumbnailImage);self.fitImage($post),$image.on("load",(function(){self.fitImage($post)}))})))},setColsCountSettings(){var currentDeviceMode=elementorFrontend.getCurrentDeviceMode(),settings=this.getElementSettings(),skinPrefix=this.getSkinPrefix(),colsCount;switch(currentDeviceMode){case"mobile":colsCount=settings[skinPrefix+"columns_mobile"];break;case"tablet":colsCount=settings[skinPrefix+"columns_tablet"];break;default:colsCount=settings[skinPrefix+"columns"]}this.setSettings("colsCount",colsCount)},isMasonryEnabled(){return!!this.getElementSettings(this.getSkinPrefix()+"masonry")},initMasonry(){imagesLoaded(this.elements.$posts,this.runMasonry)},runMasonry(){var elements=this.elements;elements.$posts.css({marginTop:"",transitionDuration:""}),this.setColsCountSettings();var colsCount=this.getSettings("colsCount"),hasMasonry=this.isMasonryEnabled()&&colsCount>=2;if(elements.$postsContainer.toggleClass("elementor-posts-masonry",hasMasonry),hasMasonry){var verticalSpaceBetween=this.getElementSettings(this.getSkinPrefix()+"row_gap.size"),masonry;""===this.getSkinPrefix()&&""===verticalSpaceBetween&&(verticalSpaceBetween=this.getElementSettings(this.getSkinPrefix()+"item_gap.size")),new elementorModules.utils.Masonry({container:elements.$postsContainer,items:elements.$posts.filter(":visible"),columnsCount:this.getSettings("colsCount"),verticalSpaceBetween:verticalSpaceBetween}).run()}else elements.$postsContainer.height("")},run(){setTimeout(this.fitImages,0),this.initMasonry()},onInit(){elementorModules.frontend.handlers.Base.prototype.onInit.apply(this,arguments),this.bindEvents(),this.run()},onWindowResize(){this.fitImages(),this.runMasonry()},onElementChange(){this.fitImages(),setTimeout(this.runMasonry)}});class VamtamLoadMore extends elementorModules.frontend.handlers.Base{getDefaultSettings(){return{selectors:{postsContainer:".elementor-posts-container",loadMoreButton:".elementor-button",loadMoreSpinnerWrapper:".e-load-more-spinner",loadMoreSpinner:".e-load-more-spinner i, .e-load-more-spinner svg",loadMoreAnchor:".e-load-more-anchor"},classes:{loadMoreSpin:"eicon-animation-spin",loadMoreIsLoading:"e-load-more-pagination-loading",loadMorePaginationEnd:"e-load-more-pagination-end",loadMoreNoSpinner:"e-load-more-no-spinner"}}}getDefaultElements(){const selectors=this.getSettings("selectors");return{postsWidgetWrapper:this.$element[0],postsContainer:this.$element[0].querySelector(selectors.postsContainer),loadMoreButton:this.$element[0].querySelector(selectors.loadMoreButton),loadMoreSpinnerWrapper:this.$element[0].querySelector(selectors.loadMoreSpinnerWrapper),loadMoreSpinner:this.$element[0].querySelector(selectors.loadMoreSpinner),loadMoreAnchor:this.$element[0].querySelector(selectors.loadMoreAnchor)}}bindEvents(){super.bindEvents(),this.elements.loadMoreButton&&this.elements.loadMoreButton.addEventListener("click",event=>{this.isLoading||(event.preventDefault(),this.handlePostsQuery())})}onInit(){super.onInit(),this.classes=this.getSettings("classes"),this.isLoading=!1;const paginationType=this.getElementSettings("pagination_type");"load_more_on_click"!==paginationType&&"load_more_infinite_scroll"!==paginationType||(this.isInfinteScroll="load_more_infinite_scroll"===paginationType,this.isSpinnerAvailable=this.getElementSettings("load_more_spinner").value,this.isSpinnerAvailable||this.elements.postsWidgetWrapper.classList.add(this.classes.loadMoreNoSpinner),this.isInfinteScroll?this.handleInfiniteScroll():this.elements.loadMoreSpinnerWrapper&&this.elements.loadMoreButton&&this.elements.loadMoreButton.insertAdjacentElement("beforeEnd",this.elements.loadMoreSpinnerWrapper),this.elementId=this.getID(),this.postId=elementorFrontendConfig.post.id,this.elements.loadMoreAnchor&&(this.currentPage=parseInt(this.elements.loadMoreAnchor.getAttribute("data-page")),this.maxPage=parseInt(this.elements.loadMoreAnchor.getAttribute("data-max-page")),this.currentPage!==this.maxPage&&this.currentPage||this.handleUiWhenNoPosts()))}handleInfiniteScroll(){this.isEdit||(this.observer=elementorModules.utils.Scroll.scrollObserver({callback:event=>{event.isInViewport&&!this.isLoading&&(this.observer.unobserve(this.elements.loadMoreAnchor),this.handlePostsQuery().then(()=>{this.currentPage!==this.maxPage&&this.observer.observe(this.elements.loadMoreAnchor)}))}}),this.observer.observe(this.elements.loadMoreAnchor))}handleUiBeforeLoading(){this.isLoading=!0,this.elements.loadMoreSpinner&&this.elements.loadMoreSpinner.classList.add(this.classes.loadMoreSpin),this.elements.postsWidgetWrapper.classList.add(this.classes.loadMoreIsLoading)}handleUiAfterLoading(){this.isLoading=!1,this.elements.loadMoreSpinner&&this.elements.loadMoreSpinner.classList.remove(this.classes.loadMoreSpin),this.isInfinteScroll&&this.elements.loadMoreSpinnerWrapper&&this.elements.loadMoreAnchor&&this.elements.loadMoreAnchor.insertAdjacentElement("afterend",this.elements.loadMoreSpinnerWrapper),this.elements.postsWidgetWrapper.classList.remove(this.classes.loadMoreIsLoading)}handleUiWhenNoPosts(){this.elements.postsWidgetWrapper.classList.add(this.classes.loadMorePaginationEnd)}handleSuccessFetch(result){this.handleUiAfterLoading();const posts=result.querySelectorAll(`[data-id="${this.elementId}"] .elementor-posts-container > article`),nextPageUrl=result.querySelector(".e-load-more-anchor").getAttribute("data-next-page"),postsHTML=[...posts].reduce((accumulator,post)=>accumulator+post.outerHTML,"");this.elements.postsContainer.insertAdjacentHTML("beforeend",postsHTML),this.elements.loadMoreAnchor.setAttribute("data-page",this.currentPage),this.elements.loadMoreAnchor.setAttribute("data-next-page",nextPageUrl),this.currentPage===this.maxPage&&this.handleUiWhenNoPosts(),setTimeout(()=>{jQuery(window).trigger("resize")},10)}handlePostsQuery(){this.handleUiBeforeLoading(),this.currentPage++;const nextPageUrl=new URL(this.elements.loadMoreAnchor.getAttribute("data-next-page"));return nextPageUrl.searchParams.set("vamtam_posts_fetch",1),fetch(nextPageUrl.toString()).then(response=>response.text()).then(html=>{const parser=new DOMParser,doc=parser.parseFromString(html,"text/html");this.handleSuccessFetch(doc)}).catch(err=>{console.warn("Something went wrong.",err)})}}jQuery(window).on("elementor/frontend/init",()=>{if(elementorFrontend.elementsHandler&&elementorFrontend.elementsHandler.attachHandler)elementorFrontend.elementsHandler.attachHandler("posts",defaultPosts,"vamtam_classic"),elementorFrontend.elementsHandler.attachHandler("posts",VamtamLoadMore,"vamtam_classic"),elementorFrontend.elementsHandler.attachHandler("archive-posts",defaultPosts,"vamtam_classic"),elementorFrontend.elementsHandler.attachHandler("archive-posts",VamtamLoadMore,"vamtam_classic");else{const addHandler=$element=>{elementorFrontend.elementsHandler.addHandler(defaultPosts,{$element:$element})};elementorFrontend.hooks.addAction("frontend/element_ready/posts.vamtam_classic",addHandler,100),elementorFrontend.hooks.addAction("frontend/element_ready/archive-posts.vamtam_classic",addHandler,100)}});