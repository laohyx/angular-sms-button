"use strict";
angular.module('angular-sms-button', [])

.directive('smsButton', ['SmsButton', function(SmsButton) {
    return {
        link: function(scope, elem, attr, ngModel) {
            var smsButton = scope.$eval(attr.smsButtonModel);

            // TODO: check instanceof
            // if (!(smsButton instanceof SmsButton)) {
            //     alert("$scope." + attr.smsButtonModel + "must be an instance of SmsButton! And please set sms-button-model attribute.");
            // }

            var recover = function() {
                smsButton.isRunning = false;
                clearInterval(smsButton.timer);
                elem.text(smsButton.initText);
                elem.removeAttr("disabled");
                smsButton.onStop && smsButton.onStop();
            };
            var countDown = function() {
                var _ = function() {
                    smsButton.isRunning = true;
                    smsButton.seconds -= 1;
                    if (smsButton.seconds == 0) {
                        recover();
                    } else {
                        elem.attr("disabled", "disabled");
                        elem.text(smsButton.waitTextFormatter(smsButton.seconds));
                    }
                };
                if (!scope.$$phase) {
                    scope.$apply(_);
                } else {
                    _();
                }
            };
            smsButton.isRunning = false;
            elem.text(smsButton.initText);
            smsButton.start = function() {
                // to change the appearance at once, run countDown() one more time
                smsButton.seconds = smsButton.waitSeconds + 1;
                countDown();
                smsButton.timer = setInterval(countDown, 1000);
            };
            smsButton.stop = recover;
        }
    };
}])

/**
 * SmsButtonConfigProvider for configuration
 */
.provider('SmsButtonConfig', function() {
    var config = {};
    config.initText = 'Send';
    config.waitSeconds = 30;
    config.waitTextFormatter = function(seconds) {
        return "Resend (" + String(seconds) + ")";
    };

    config.$get = function() {
        return config;
    };
    return config;
})

/**
 * Button class
 */
.factory('SmsButton', ['SmsButtonConfig', function(SmsButtonConfig) {
    function SmsButton(config) {
        for (var attrname in SmsButtonConfig) {
            this[attrname] = SmsButtonConfig[attrname];
        }
        for (attrname in config) {
            this[attrname] = config[attrname];
        }
    }

    return SmsButton;
}]);
