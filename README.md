# angular-sms-button
An angular directive which automatically disables a button and counts down. Used for buttons sending SMS codes.

# Installation
Using bower:
```bash
bower install --save angular-sms-button
```
Or just download the source code and reference `angular-sms-button.min.js`.

# Usage

1. Add dependency to your app.

  ```javascript
  angular
      .module('myApp', ['angular-sms-button', ...])
  
  ```

2. Use it as a HTML tag

  In HTML file:
  ```html
  <button sms-button sms-button-model="button1" ng-click="button1.start()"></button>
  ```
  In your controller:
  ```javascript
  .controller('myController', ['$scope', 'SmsButton' ,function($scope, SmsButton) {
      $scope.button1 = new SmsButton();
      ...
  ```

3. More configuraion

  You can configure the button with construtor parameters.
  ```javascript
  // in controller
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
  ```
  Or just using providers
  ```javascript
   .config(['SmsButtonConfigProvider', function(SmsButtonConfigProvider) {
       SmsButtonConfigProvider.initText = 'Click to send';
       SmsButtonConfigProvider.waitSeconds = 3;
       SmsButtonConfigProvider.waitTextFormatter = function(seconds) {
          return "Wait "+seconds+" seconds to resend";
       };
   }])
  ```
  
# More details
See examples here.
