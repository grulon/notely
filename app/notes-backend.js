'use strict';

app.service('NotesBackend',['$http',function NotesBackend($http) {
  var self = this;
  var notes = [];
  // var apiKey = '';

  self.getNotes = function() {
    return notes;
  };

  self.fetchNotes = function(callback) {
    //Get the notes from the api
    $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)
      .success(function(notesData) {
        notes = notesData;
        callback(notes, {});  //pass empty object cause makes no sense to pass note when you are fetching note
      });
  };

  self.postNote = function(noteData, callback) {
    //Post a new note to the API
    $http.post(nevernoteBasePath + 'notes', {
      api_key: apiKey,
      note: noteData
    }).success(function(newNoteData) {
       notes.unshift(newNoteData.note);  //puts item on beginning of array... push puts it on end $scope.notes is an array
       callback(notes, newNoteData.note);
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
         //callback(notes);  we do this in replaceNote function
      });
    };

    self.deleteNote = function(noteData, callback) {
      $http.delete(nevernoteBasePath + 'notes/' + noteData.id +
        '?api_key=' + apiKey).success(function(updatedNoteData) {
          self.removeNote(noteData.id,callback);
         //callback(notes);  we do this in replaceNote function
      });
    };

    self.replaceNote = function(updatedNoteData, callback){
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === updatedNoteData.id) {
          notes[i] = updatedNoteData;
          callback(notes, updatedNoteData);
          return updatedNoteData;
        }
      }
    };
    self.removeNote = function(id, callback){
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
          notes.splice(i, 1);
          callback(notes, {});
          return {};
        }
      }
    };



}]);
