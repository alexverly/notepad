$(document).ready(function () {

    var noteList = function() {

      var $notepad          = $(' .notepad' ),
          $noteList         = $(' .notepad__list' ),
          $noteListItem     = $( '.notepad__list-item' ),
          $noteForm         = $( '.notepad__form' ),
          $noteFormInput    = $( '.notepad__form-input' ),
          $clearList        = $( '.notepad__clear' ),
          clearListDisplay  = 'notepad__clear--display',
          noteCount         = 0;

      function displayNotes() {
        for (noteCount = 0; noteCount < localStorage.length; noteCount++) {
          var noteID        = 'task-' + noteCount;

          $noteList.append("<li class='notepad__list-item' id='" + noteID + "'>" + localStorage.getItem(noteID) + "</li>");

          $clearList.addClass( clearListDisplay );
        }
      }

      function storeNote() {
        if ( $noteFormInput.val() !== '' ) {
            var noteID      = 'task-' + noteCount,
                task        = $( '#' + noteID ),
                taskMessage = $noteFormInput.val();

            localStorage.setItem( noteID, taskMessage );

            $noteList.append( "<li class='notepad__list-item' id='" + noteID + "'>" + taskMessage + "</li>" );

            if ( !$clearList.hasClass( clearListDisplay ) ) {
              $clearList.addClass( clearListDisplay );
            }

            $noteFormInput.val('');
            noteCount++;
        }
      }

      function clearNotes() {

          $noteList.empty();
          $clearList.removeClass( clearListDisplay );

          localStorage.clear();
          noteCount = 0;
      }

      function bindEvents() {

        displayNotes();

        $noteForm.on( 'submit', function () {
            storeNote();
            return false;
        });

        $clearList.on( 'click', function () {
          clearNotes();
        });
      }

      bindEvents();
    };

    noteList();
});
