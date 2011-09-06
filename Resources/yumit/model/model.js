Yumit.model = {};
(function() {
  Yumit.model.request = function(/*Object*/ _params) {
    var postingUrl = _params.action +"?"+ _params.parameters;
    Ti.API.info("Posting Url : " + postingUrl);
    var xhr = Titanium.Network.createHTTPClient({
    	timeout: Yumit.constants.httpTimeout
    });
    xhr.onerror = function(e) {
      Ti.API.error('There was an error posting request: '+JSON.stringify(e));
      Yumit.ui.alert('Yumit Error', 'Error while connecting the API Server: ' + postingUrl);
      if (_params.error) {
        _params.error(e,xhr);
      }
    };

    xhr.onload = function(){
      try {
      	//alert(this.responseText);
        if(this.responseText.match(/(html|xmlns)/)){
          Yumit.ui.alert('Yumit Error', 'Error while parsing response from API Server');
          Ti.API.error('Yumit Error: '+this.responseText);
          return;
        }
        var jsonReply = JSON.parse(this.responseText);
        //alert(jsonReply);
        if (jsonReply.success === false) {
            jsonReply.noDishes = true;
        }
        
        if (jsonReply.success === "false") {
        	//alert('success - false');
        	if (jsonReply.message && jsonReply.message.match("token")) {
            	Titanium.App.Properties.removeProperty("token");
                var login_window = Yumit.ui.login();
                login_window.open();
                return;
            }
        }

        //w00t!
        if (_params.success) {
            _params.success(jsonReply,xhr);
        }
        
      } catch(exception) {
        Ti.API.error('Yumit Error: '+this.responseText);
        Ti.API.error('Exception: '+exception);
        Yumit.ui.alert('Exception',exception);
      }
    };
    xhr.open(_params.method, postingUrl);
    if (_params.token) {
    	xhr.setRequestHeader('token', _params.token);
    }

    xhr.send();
  };
})();