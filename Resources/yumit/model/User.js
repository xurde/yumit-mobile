(function(){
  Yumit.model.User = {

    //return success or error if login
    login: function(/*Object*/ _args) {

      var xhr = Titanium.Network.createHTTPClient();
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
          _args.success();
        }
      };

      xhr.open('POST','http://yumit20.yumit.com/api/v0/authenticates.json');
      xhr.send({
        login: _args.username,
        password: _args.password
      });
    }

  };
})();
