function getDataFromServer() {
  console.log("Getting data from server");
  
  $.ajax({
    type: "POST",
    url: "/api/getData"
  }).done(function( data ) {
      console.log( "Received server response: " + data.number );
      $('#serverData').html(data.number);
      // Call the startPostingData method again in 1sec.
      setTimeout(function() {
        getDataFromServer();
      }, 1000);

    }).fail(function(msg){
      console.log("Ajax fail: " + JSON.stringify(msg));
    });
}