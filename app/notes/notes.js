'use strict';

var nevernoteBasePath = 'http://nevernote-1150.herokuapp.com/api/v1/';
var apiKey = '$2a$10$J4Ms85pRsVHTh3I.tconeuC5F6.15z/Rvt62hYf4E70WbBkKeHnb2';

angular.module('notely.notes',['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html',
    controller: 'NotesController'
  });
}])

.controller('NotesController', ['$scope', '$http' ,function($scope, $http){
  $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)
    .success(function(notesData) {
      $scope.notes = notesData;
    });
}]);
