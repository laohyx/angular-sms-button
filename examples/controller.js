'use strict';

angular
    .module('app', ['angular-sms-button'])
    .controller('AppController', ['$scope', 'SmsButton' ,function($scope, SmsButton) {
        // Button 1
        $scope.button1 = new SmsButton({
            initText: "Click to send",
            waitSeconds: 3,
            waitTextFormatter: function (seconds) {
                return "Wait "+seconds+" seconds to resend";
            },
            onStop: function () {
                alert("stopped!");
            }
        });
        $scope.sendMsg = function () {
            $scope.button1.start();
        };


        // Button 2
        $scope.button2 = new SmsButton({
            onStop: function () {
                alert("button 2 stopped!");
            }
        });

        // Button 3
        $scope.button3 = new SmsButton();
    }]);
