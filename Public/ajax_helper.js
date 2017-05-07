    //
    // The main Ajax Function
    //
var ajaxFunction = function(url, datatype, responseFormatter) {
    	var ajaxRequest = {

	    // The URL for the request
	    url: url,
	 
	    // The data to send (will be converted to a query string)
	    data: JSON.stringify("some json data"),
	 
	    // Whether this is a POST or GET request
	    type: "POST",
	 
	    // The type of data we expect back
	    dataType : datatype || 'text',
	    
	    contentType: 'application/json'
	}
    
//    console.log(ajaxRequest);
    	
	$.ajax(ajaxRequest)
	  // Code to run if the request succeeds (is done);
	  // The response is passed to the function
	  .done(function( response ) {
		  responseFormatter(response);
	  })
	  // Code to run if the request fails; the raw request and
	  // status codes are passed to the function
	  .fail(function( xhr, status, errorThrown ) {
	    console.log( "Sorry, there was a problem!" );
	    console.log( "Error: " + errorThrown );
	    console.log( "Status: " + status );
	    console.dir( xhr );
	  })
	  // Code to run regardless of success or failure;
	  .always(function( xhr, status ) {
		  console.log( "The request is complete!" );
	  });
   };
