#jQuery from validation using sm-validator.

##Validation Check
<li>Length (Rule name stringLength)</li>
<li>Match (Rule name match)</li>
<li>Email (Rule name email)</li>
<li>Mobile No (Rule name mobile)</li>
<li>Count (Rule name count)</li>
<li>Remote Ajax Validation (Rule name remote)</li>
<li>Not Empty Check (Rule name notEmpty)</li>
<li>Dependend Select Field Validation (Rule name itsDependable)</li>
<li>Visa card validation (Rule name visaCard)</li>
<li>Master card validation (Rule name masterCard)</li>
<li>Card date month validation like mm-yyyy(01-2018) (Rule name cardDateMonth)</li>

## Installation
Download sm-validator file and include file
```
<script type='text/javascript' src='sm-validator.js'></script>
```
##Dependencies
<li>jQuery</li>
<li>Bootstrap</li>

## Usages
```
smValidator('YourFormID', validationObject, validationType);
```
YourFormID = Your form ID
validationObject = Your Validation Rules Object like 
```
{
    fieldName: {
        validationRuleName: {
            message: 'Your validation failure message',
            extraParams:'paramsInfo'
        }
    }
}
```
validationType = Validation type 2 or 1. 1 for submit form validation, if validation failed it will not submit form. 2 for return type like if validation pass then true else false.

##Demo Usages
```
<script type="text/javascript">
    (function ($) {
        var rules = {
            username: {
                stringLength: {
                    min: 60,
                    max: 160,
                    message: "The name length must be within 60 to 160."
                }
            },
            title: {
                notEmpty: {
                    message: "The title is required"
                },
                stringLength: {
                    min: 60,
                    max: 160,
                    message: "The title length must be within 60 to 160."
                }
            },
            email: {
                notEmpty: {
                    message: "The email field is required"
                },
                email: {
                    message: "The email must be valid!",
                }
            },
            password: {
                notEmpty: {
                    message: "The password field is required"
                },
                match: {
                    message: "The password and confirm password must be match!",
                    field: 'confirm_password'
                }
            },
            mobile: {
                notEmpty: {
                    message: "The Mobile no field is required"
                },
                mobile: {
                    message: "The Mobile no must be valid!",
                }
            },
            count: {
                count: {
                    type: 'checkbox', //here 2 types available like class and checkbox
                    min: 2,
                    massageDivId: 'your Message section id',
                    message: "The count field must be greter then 2!",
                }
            },
            remoteCheck: {
                remote: {
                    url: 'Your url will be here',
                    type: 'get', //your ajax form method and success return must be 1 for true validation
                    message: "The count field must be greter then 2!",
                }
            },
            type: {
                notEmpty: {
                    message: "The package type is required"
                },
                itsDependable: {
                    rules: {
                        1: {
                            'pricing_detail_1[price_type]': {
                                'notEmpty': {
                                    message: "The package price type is required"
                                }
                            },
                        },
                        2: {
                            'pricing_detail_2[basic_pricing_title]': {
                                'notEmpty': {
                                    message: "The package basic price title is required"
                                }
                            },
                        }
                    }

                }
            }

        };

        smValidator("smValidationForm", rules, 1);
    })(jQuery);
</script>
```
