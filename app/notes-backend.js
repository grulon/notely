'use strict';

app.service('NotesBackend',['$http',function NotesBackend($http) {
  var self = this;
  var notes = [];

  self.getNotes = function() {
    return notes;
  };

  self.fetchNotes = function(callback) {
    //Get the notes from the api
    $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)
      .success(function(notesData) {
        notes = notesData;
        callback(notes);
      });
  };

  self.postNote = function(noteData, callback) {
    //Post a new note to the API
    $http.post(nevernoteBasePath + 'notes', {
      api_key: apiKey,
      note: noteData
    }).success(function(newNoteData) {
       notes.unshift(newNoteData.note);  //puts item on beginning of array... push puts it on end $scope.notes is an array
       callback(notes);
    });
  };

    self.putNote = function(noteData, callback) {
      //Post a new note to the API
      $http.put(nevernoteBasePath + 'notes/' + noteData.id, {
        api_key: apiKey,
        note: noteData
      }).success(function(updatedNoteData) {
          // replace note in array
          self.replaceNote(updatedNoteData.note,callback);
         callback(notes);
      });
    };

    self.replaceNote = function(updatedNoteData, callback){
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === updatedNoteData.id) {
          notes[i] = updatedNoteData;
          callback(notes);
          return updatedNoteData;
        }
      }
    };



}]);
