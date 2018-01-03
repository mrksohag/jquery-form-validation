function ValidateEmail(e){var a=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;return a.test(e)?!0:!1}function datemonthValiate(e){var a=/^[0-9]{2}\/[0-9]{4}$/;return a.test(e)?!0:!1}function visaCard(e){var a=e.replace(/-/g,"");a=a.replace(/ /g,"");var t=/^[4]{1}[0-9]{15}$/;return t.test(a)?!0:!1}function masterCard(e){var a=e.replace(/-/g,"");a=a.replace(/ /g,"");var t=/^[5]{1}[0-9]{15}$/,i=/^[2]{1}[0-9]{15}$/;return t.test(a)||i.test(a)?!0:!1}function phonenumber(e){var a=e.replaceAll("-","");a=a.replaceAll(" ","");var t=/^[0-9]{11}$/;return t.test(a)?!0:!1}function showError(e,a){e.parent("div").addClass("has-error"),e.siblings(".help-block").length>0?e.siblings(".help-block").html(a):e.after('<i class="help-block">'+a+"</i>")}function removeError(e){e.parent("div").removeClass("has-error"),e.siblings(".help-block").length>0&&e.siblings(".help-block").remove()}if("undefined"==typeof jQuery)throw new Error("SM Validation JavaScript needs jQuery JS file.");var smValidator;!function(e){smValidator=function(a,t,i){function r(a,t){var i=0;if(e("#"+a).find('[type="submit"]').attr("disabled",!0),"object"==jQuery.type(t))for(item in t){var s=t[item],n="",l=e("#"+a).find('[name="'+item+'"]'),m=0;if("object"==jQuery.type(s))for(item2 in s){var o=s[item2];if("object"==jQuery.type(o)&&(l.length>0||"count"==item2)){if("count"!=item2)var c=l.val(),u=c.length;if(m>0&&""!=n&&(n+=".\n<br>"),m++,"stringLength"==item2)(c<o.min||c>o.max)&&(i++,n+=o.message);else if("match"==item2)e("#"+a).find('[name="'+o.field+'"]').val()!=c&&(i++,n+=o.message);else if("email"==item2)void 0!==s.notEmpty?ValidateEmail(c)||(i++,n+=o.message):u>0&&(ValidateEmail(c)||(i++,n+=o.message));else if("mobile"==item2)void 0!==s.notEmpty?phonenumber(c)||(i++,n+=o.message):u>0&&(phonenumber(c)||(i++,n+=o.message));else if("count"==item2){var d=0;"checkbox"==o.type?e("."+o.countClass).each(function(){e(this).is(":checked")&&d++}):"class"==o.type&&e(o.selector).each(function(){d++}),d<o.min?(i++,e("#"+o.massageDivId+"_warning").length>0?e("#"+o.massageDivId+"_warning").html('<i class="help-block">'+o.message+"</i>"):e("#"+o.massageDivId).after('<div id="'+o.massageDivId+'_warning" class="has-error"><i class="help-block">'+o.message+"</i></div>")):e("#"+o.massageDivId+"_warning").remove()}else if("remote"==item2){var f=item+"="+c;e.ajax({url:o.url,type:o.type,async:!1,data:f,success:function(e){1==parseInt(e)&&(i++,n+=o.message)},error:function(e){e++,n+=o.message}})}else if("notEmpty"==item2)1>u&&(i++,n+=o.message);else if("itsDependable"==item2){if(u>0&&o.rules[c]){var v=o.rules[c];i+=r(a,v)}}else"visaCard"==item2?visaCard(c)||(i++,n+=o.message):"masterCard"==item2?masterCard(c)||(i++,n+=o.message):"cardDateMonth"==item2&&(datemonthValiate(c)||(i++,n+=o.message))}}""!=n?showError(l,n):removeError(l)}return i}if(2==i){var s=r(a,t);return e("#"+a).find('[type="submit"]').attr("disabled",!1),s>0?!1:!0}e("#"+a).on("submit",function(i){var s=r(a,t);s>0&&(e("#"+a).find('[type="submit"]').attr("disabled",!1),i.preventDefault())})}}(jQuery),String.prototype.replaceAll=function(e,a){var t=this;return t.replace(new RegExp(e,"g"),a)};