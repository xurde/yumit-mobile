(function(){
  Yumit.model.User = {

    //return success or error if login
    login: function(/*Object*/ _args) {

      var xhr = Titanium.Network.createHTTPClient({
      	timeout: Yumit.constants.httpTimeout
      });
      xhr.onerror = function(e) {
        Titanium.UI.createAlertDialog({
          title:'Error...',
          message: 'We had a problem communicating with yumit.com'
        }).show();
      };

      xhr.onload = function() {
        var jsonReply = JSON.parse(this.responseText);
        if (this.responseText.length > 0 && jsonReply.success === "false" ) {
          _args.error();
        } else {
          _args.success(jsonReply.token);
        }
      };
      Ti.API.info("posting url : "+ Yumit.api_path+'/api/v0/authenticates.json');
      xhr.open('POST',Yumit.api_path+'/api/v0/authenticates.json');
      xhr.send({
        login: _args.username,
        password: _args.password
      });
    }

  };
})();
