'use strict';

var loginModule = angular.module('notely.login', ['ngRoute']);

loginModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html'
  });
}]);

loginModule.controller('LoginController', ['$scope', 'NotesBackend',
function($scope, NotesBackend) {
  $scope.user = {};

  $scope.submit = function() {
      console.log('Submitted Login Form');
  };


}]);
