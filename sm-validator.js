/**
 * Form validation rules
 * @author Engr. Mizanur Rahman Khan <engr.mrksohag@gmail.com>
 * @version 1.0.0
 */
if ("undefined" == typeof jQuery) {
    throw new Error("SM Validation JavaScript needs jQuery JS file.");
}
var smValidator;

function ValidateEmail(mail) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(mail)) {
        return (false)
    }
    return (true)
}

function phonenumber(inputtxt) {
    var text = inputtxt.replace("-", "");
    var mob = /^[0-9]{11}$/;
    if (mob.test(text)) {
        return true;
    } else {
        return false;
    }
}

function show_error(selector, errorStr) {
    selector.parent('div').addClass("has-error");
    if (selector.siblings('.help-block').length > 0) {
        // console.log("\n in error errorStr "+errorStr);
        selector.siblings('.help-block').html(errorStr);
    } else {
        // console.log("\n else errorStr "+errorStr);
        selector.after('<i class="help-block">' + errorStr + "</i>");
    }
}

function remove_error(selector) {
    selector.parent('div').removeClass("has-error");
    if (selector.siblings('.help-block').length > 0) {
        selector.siblings('.help-block').remove();
    }
}


(function ($) {
    smValidator = function (id, obj, type) {
        // console.log("id " + id);
        // console.log(obj);

        function check_fields(id, obj) {
            var error = 0;
            // console.log("id " + id);
            console.log(obj);
            $('#' + id).find('[type="submit"]').attr('disabled', true);
            // $('#' + id).find('.form-group').removeClass("has-error");
            if (jQuery.type(obj) == 'object') {
                for (item in obj) {
                    var obj1 = obj[item];
                    var errorStr = "";
                    var selector = $('#' + id).find('[name="' + item + '"]');
                    console.log("item " + item);
                    var loop = 0;
                    if (jQuery.type(obj1) == 'object') {
                        for (item2 in obj1) {
                            //														console.log("item2 "+item2);
                            var obj2 = obj1[item2];

                            if (jQuery.type(obj2) == 'object') {
                                if (selector.length > 0 || item2 == 'count') {
                                    if (item2 != 'count') {
                                        var val = selector.val();
                                        var length = val.length;
                                    }

                                    //									console.log(item+" "+item2+' val '+val +' length '+length);
                                    if (loop > 0 && errorStr != '') {
                                        errorStr += ".\n<br>";
                                    }
                                    loop++;
                                    if (item2 == 'stringLength') {
                                        if (val < obj2.min || val > obj2.max) {
                                            error++;
                                            errorStr += obj2.message;
                                        }

                                    } else if (item2 == 'match') {
                                        if ($('#' + id).find('[name="' + obj2.field + '"]').val() != val) {
                                            error++;
                                            errorStr += obj2.message;
                                        }
                                    } else if (item2 == 'email') {
                                        if (obj1['notEmpty'] !== undefined) {
                                            if (!ValidateEmail(val)) {
                                                error++;
                                                errorStr += obj2.message;
                                            }
                                        } else {
                                            if (length > 0) {
                                                if (!ValidateEmail(val)) {
                                                    error++;
                                                    errorStr += obj2.message;
                                                }
                                            }
                                        }
                                    } else if (item2 == 'mobile') {
                                        if (obj1['notEmpty'] !== undefined) {
                                            if (!phonenumber(val)) {
                                                error++;
                                                errorStr += obj2.message;
                                            }
                                        } else {
                                            if (length > 0) {
                                                if (!phonenumber(val)) {
                                                    error++;
                                                    errorStr += obj2.message;
                                                }
                                            }
                                        }
                                    } else if (item2 == 'count') {
                                        var count = 0;
                                        if (obj2.type == 'checkbox') {
                                            $('.' + obj2.countClass).each(function () {
                                                if ($(this).is(":checked")) {
                                                    count++;
                                                }
                                            });
                                        } else if (obj2.type == 'class') {
                                            $(obj2.selector).each(function () {
                                                count++;
                                            });
                                        }
                                        //										console.log("count "+count+" min "+obj2.min);
                                        if (count < obj2.min) {
                                            error++;
                                            if ($('#' + obj2.massageDivId + '_warning').length > 0) {
                                                $('#' + obj2.massageDivId + '_warning')
                                                    .html('<i class="help-block">' + obj2.message + "</i>");
                                            } else {
                                                $('#' + obj2.massageDivId)
                                                    .after('<div id="' + obj2.massageDivId + '_warning" class="has-error"><i class="help-block">' + obj2.message + "</i></div>")
                                            }
                                        } else {
                                            $('#' + obj2.massageDivId + '_warning').remove();
                                        }
                                    } else if (item2 == 'remote') {
                                        var data = item + "=" + val;
                                        $.ajax({
                                            url: obj2.url,
                                            type: obj2.type,
                                            async: false,
                                            data: data,
                                            success: function (response) {
                                                if (parseInt(response) == 1) {
                                                    error++;
                                                    errorStr += obj2.message;
                                                }
                                            },
                                            error: function (error) {
                                                error++;
                                                errorStr += obj2.message;
                                            }
                                        });
                                    } else if (item2 == 'notEmpty') {
                                        if (length < 1) {
                                            error++;
                                            errorStr += obj2.message;
                                        }
                                    } else if (item2 == 'itsDependable') {
                                        if (length > 0 && obj2.rules[val]) {
                                            var rules = obj2.rules[val];
                                            error += check_fields(id, rules);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (errorStr != '') {
                        show_error(selector, errorStr);
                    } else {
                        remove_error(selector);
                    }
                }
            }
            return error;
        }

        //type validation only
        if (type == 2) {
            var error = check_fields(id, obj);
            $('#' + id).find('[type="submit"]').attr('disabled', false);
            if (error > 0) {
                return false;
            } else {
                return true;
            }
        } else {
            $('#' + id).on('submit', function (e) {
                var error = check_fields(id, obj);
                console.log("error before " + error);
                if (error > 0) {
                    $('#' + id).find('[type="submit"]').attr('disabled', false);
                    e.preventDefault();
                }
            });
        }
    }
})(jQuery);