function thwepofViewPassword(elm){thwepof_public.thwepofviewpassword(elm)}function thwepof_init(){thwepof_public.initialize_thwepof()}var thwepof_public=function($,window,document){"use strict";function initialize_thwepof(){setup_date_picker($(".thwepo-extra-options"),"thwepof-date-picker",thwepof_public_var)}function setup_date_picker(form,class_selector,data){$("."+class_selector).each(function(){var readonly=$(this).data("readonly");readonly="yes"===readonly;var yearRange=$(this).data("year-range");yearRange=""==yearRange?"-100:+10":yearRange,$(this).datepicker({showButtonPanel:!0,changeMonth:!0,changeYear:!0,yearRange:yearRange}),$(this).prop("readonly",readonly)})}function check_oceanwp_quickview_opened(){$("#owp-qv-wrap").hasClass("is-visible")?initialize_thwepof():setTimeout(function(){check_oceanwp_quickview_opened()},1e3)}function apply_input_masking(elm){var data=$(elm).data("mask-pattern"),alias_items=["datetime","numeric","cssunit","url","IP","email","mac","vin"];-1!==$.inArray(data,alias_items)?$(elm).inputmask({alias:data}):$(elm).inputmask({mask:data})}function thwepofviewpassword(elm){var icon=$(elm),parent_elm=icon.closest(".thwepof-password-field"),input=parent_elm.find("input");icon.hasClass("dashicons-visibility")?(input.attr("type","text"),icon.addClass("dashicons-hidden").removeClass("dashicons-visibility")):icon.hasClass("dashicons-hidden")&&(input.attr("type","password"),icon.addClass("dashicons-visibility").removeClass("dashicons-hidden"))}function display_range_value(elm){var range_input=$(elm),range_val=range_input.val(),width=range_input.width(),min_attr=range_input.attr("min"),max_attr=range_input.attr("max");const min=min_attr||0,max=max_attr||100,position=Number(100*(range_val-min)/(max-min));var display_div=range_input.siblings(".thwepof-range-val");display_div.html(range_val);var left_position,display_div_width=display_div.innerWidth(),slider_position=width*position/100;left_position=width-slider_position<display_div_width/2?"calc(100% - "+display_div_width+"px)":slider_position<display_div_width/2?"0px":"calc("+position+"% - "+display_div_width/2+"px)",display_div.css("left",left_position)}initialize_thwepof(),"flatsome"==thwepof_public_var.is_quick_view?$(document).on("mfpOpen",function(){initialize_thwepof(),$.magnificPopup.instance._onFocusIn=function(e){return!!$(e.target).hasClass("ui-datepicker-month")||(!!$(e.target).hasClass("ui-datepicker-year")||void $.magnificPopup.proto._onFocusIn.call(this,e))}}):"yith"==thwepof_public_var.is_quick_view?$(document).on("qv_loader_stop",function(){initialize_thwepof()}):"astra"==thwepof_public_var.is_quick_view?$(document).on("ast_quick_view_loader_stop",function(){initialize_thwepof()}):"oceanwp"==thwepof_public_var.is_quick_view&&$(document).on("click",".owp-quick-view",function(e){check_oceanwp_quickview_opened()}),$(".thwepof-mask-input").each(function(){apply_input_masking(this)});var wepo_range_input=$('input[type="range"].thwepof-input-field');return wepo_range_input.each(function(){display_range_value(this)}),wepo_range_input.on("change",function(){display_range_value(this)}),{initialize_thwepof:initialize_thwepof,thwepofviewpassword:thwepofviewpassword}}(window.jQuery,window,document);