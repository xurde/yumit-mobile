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
      	//alert(this.responseText);
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
    },
    
    register: function(_args) {
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
                _args.error(jsonReply.error);
            } else {
                _args.success(jsonReply.token);
            }
        };
        Ti.API.info("posting url : "+ Yumit.api_path+'/api/v0/user/create.json');
        xhr.open('POST',Yumit.api_path+'/api/v0/user/create.json');
        xhr.send({
            login: _args.userName,
            password: _args.password,
            password_confirmation: _args.confirmPassword,
            email: _args.email
        });
    },
    
    update: function(_args, _data) {
    	var xhr = Titanium.Network.createHTTPClient({
      	    timeout: Yumit.constants.httpTimeout
        });
        
        xhr.onerror = function(e) {
            Titanium.UI.createAlertDialog({
                title:'Error...',
                message: 'We had a problem communicating with yumit.com'
            }).show();
            if (_args.onfinish) _args.onfinish();
        };
        
        xhr.onload = function() {
        	//alert(this.responseText);
        	if(this.responseText.match(/(html|xmlns)/)){
                Yumit.ui.alert('Yumit Error', 'Error while parsing response from Server');
                Ti.API.error('Yumit Error: '+this.responseText);
                return;
            }
            var jsonReply = JSON.parse(this.responseText);
            if (this.responseText.length > 0 && jsonReply.success === "false" ) {
                _args.error(jsonReply.error);
            } else {
                _args.success();
            }
            if (_args.onfinish) _args.onfinish();
        };
        
        var token = Titanium.App.Properties.getString('token');
        Ti.API.info("posting url : "+ Yumit.api_path+'/api/v0/user/update.json');
        xhr.open('POST', Yumit.api_path+'/api/v0/user/update.json');
        xhr.setRequestHeader('token', token);
        xhr.setRequestHeader('Content-Type', 'application/json');
        //xhr.setRequestHeader('Content-Type','multipart/form-data');
        xhr.send(JSON.stringify(_data));
    },
    
    fetchInfo: function(_args) {
    	Ti.API.info('fetchInfo User');
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
        	//alert(this.responseText);
        	if(this.responseText.match(/(html|xmlns)/)){
                Yumit.ui.alert('Yumit Error', 'Error while parsing response from Server');
                Ti.API.error('Yumit Error: '+this.responseText);
                return;
            }
            var jsonReply = JSON.parse(this.responseText);
            if (this.responseText.length > 0 && jsonReply.success === "false" ) {
            	if (_args.onfinish) _args.onfinish();
                _args.error(jsonReply.error);
            } else {
            	if (_args.onfinish) _args.onfinish();
                _args.success(jsonReply.user);
            }
        };
        
        var token = Titanium.App.Properties.getString('token');
        Ti.API.info("posting url : "+ Yumit.api_path+'/api/v0/user/fetch.json');
        xhr.open('GET', Yumit.api_path+'/api/v0/user/fetch.json');
        xhr.setRequestHeader('token', token);
        xhr.send();
    },
    
    updateAvatar: function(_args, _avatar) {
        Ti.API.info('updateAvatar User');
        var xhr = Titanium.Network.createHTTPClient({
      	    timeout: Yumit.constants.httpTimeout
        });
        xhr.onerror = function(e) {
            Titanium.UI.createAlertDialog({
                title:'Error...',
                message: 'We had a problem communicating with yumit.com'
            }).show();
            if (_args.onfinish) _args.onfinish();
        };
        
        xhr.onload = function() {
        	//alert(this.responseText);
        	if(this.responseText.match(/(html|xmlns)/)){
                Yumit.ui.alert('Yumit Error', 'Error while parsing response from Server');
                Ti.API.error('Yumit Error: '+this.responseText);
                return;
            }
            var jsonReply = JSON.parse(this.responseText);
            if (this.responseText.length > 0 && jsonReply.success === "false" ) {
                _args.error(jsonReply.error);
            } else {
                _args.success();
            }
            if (_args.onfinish) _args.onfinish();
        };
        
        var token = Titanium.App.Properties.getString('token');
        Ti.API.info("posting url : "+ Yumit.api_path+'/api/v0/user/update_avatar.json');
        xhr.open('POST', Yumit.api_path+'/api/v0/user/update_avatar.json');
        xhr.setRequestHeader('token', token);
        xhr.setRequestHeader('Content-Type','multipart/form-data');
        xhr.send({avatar: _avatar});
    }

  };
})();