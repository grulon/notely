'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('notely', [
  'ngRoute',
  //'notely.login',
  'notely.notes',
  'notely.version'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/notes'});
}]);

app.directive('focusOn', function() {       //refs focus-on in html
  return function(scope, el, attr){            //el is element on page with focus-on on it.
    scope.$on(attr.focusOn, function(ev) {
      el[0].focus(); //.select();
    });
  };
});
