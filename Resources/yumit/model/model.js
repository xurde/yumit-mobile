Yumit.model = {};
(function() {
  Yumit.model.request = function(/*Object*/ _params) {
    var postingUrl = _params.action +"?"+ _params.parameters;
    Ti.API.info("Posting Url : " + postingUrl);
    var xhr = Titanium.Network.createHTTPClient();
    xhr.onerror = function(e) {
      Ti.API.error('There was an error posting request: '+JSON.stringify(e));
      Yumit.ui.alert('Yumit Error', 'Error while connecting the API Server: ' + postingUrl);
      if (_params.error) {
        _params.error(e,xhr);
      }
    };

    xhr.onload = function(){
      try {
        if(this.responseText.match(/html xmlns/)){
          Yumit.ui.alert('Yumit Error', 'Error while parsing response from API Server');
          Ti.API.error('Yumit Error: '+this.responseText);
          return;
        }
        var jsonReply = JSON.parse(this.responseText);

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
    if (_params.username) {
      xhr.setRequestHeader('Authorization','Basic '+Ti.Utils.base64encode(_params.username+':'+_params.password));
    }

    xhr.send();
  };
})();