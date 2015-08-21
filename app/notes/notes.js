'use strict';

var nevernoteBasePath = 'http://nevernote-1150.herokuapp.com/api/v1/';
var apiKey = '$2a$10$J4Ms85pRsVHTh3I.tconeuC5F6.15z/Rvt62hYf4E70WbBkKeHnb2';

var noteApp = angular.module('notely.notes',['ngRoute']);

noteApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html'
    // controller: 'NotesController'  don't need this one since I am doing it in index.html file also..
  });
}]);

noteApp.controller('NotesController', ['$scope', 'NotesBackend' ,function($scope, NotesBackend){
  var self = this;
  $scope.note = {};
  $scope.notes = [];

  NotesBackend.fetchNotes(function(notesData) {
    $scope.notes = notesData;
  });

  self.assignNotes = function(notes,note) {
     $scope.notes = notes;  //affects sidebar
     $scope.note = JSON.parse(JSON.stringify(note));   //affects form
   };

  self.findNoteById = function(noteId) {
    for( var i = 0; i < $scope.notes.length; i++) {
      if ($scope.notes[i].id === noteId) {
        return $scope.notes[i];
      }
    }
  };


  self.cloneNote = function(note) {
    return JSON.parse(JSON.stringify(note));
  };

    $scope.buttonText = function() {
      if($scope.note.id) {
        return "Update Note";
      }
      else {
        return "Create Note";
      }
    };

    $scope.commit = function() {
      if ($scope.note.id) {
          NotesBackend.putNote($scope.note, self.assignNotes);
      }
      else {
        NotesBackend.postNote($scope.note, self.assignNotes);
      }
    };

    $scope.deleteNote = function() {
      NotesBackend.deleteNote($scope.note, function(notes, note) {
          self.assignNotes(notes, note);
          $scope.clearNote();

      });
    };

    $scope.clearNote = function() {    //on scope and not self cause it is bound to html
      $scope.note = {};
      $scope.$broadcast('noteCleared');
    };


    $scope.hasNotes = function() {
      return $scope.notes.length > 0;
    };

    $scope.loadNote = function(note) {
      $scope.note = self.cloneNote(note);  //was going to use getNoteById function but isn't needed because we know note when we call function
      $scope.$broadcast('noteLoaded');
    };


}]);
