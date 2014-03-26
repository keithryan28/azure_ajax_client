// This is a global variable that indicates whether I am posting data
// to the server or not
var postingOn=false;

/*
 *  The function below gets called when the button in index.jade
 *  gets clicked.
 */
function startPostingData() {
  postingOn=true;
  $('#postingStatus').toggleClass('on off');
  postData();
}

function postData() {
  $.ajax({
    type: "POST",
    url: "/api/saveData",
    data: { owner: "John", number: Math.floor(Math.random()*11) }
  }).done(function( msg ) {
      console.log( "Received server response: " + msg.status );

      // Call the startPostingData method again in 1sec.
      setTimeout(function() {
        if (postingOn) {
          postData();
        }
      }, 1000);

    }).fail(function(msg){
      console.log("Ajax fail: " + JSON.stringify(msg));
      postingOn = false;
    });
}

function stopPostingData() {
  $('#postingStatus').toggleClass('on off');
  postingOn=false;
}