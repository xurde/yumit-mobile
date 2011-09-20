
function FlickrAPI(key, shared_secret){
   var auth_url = 'http://flickr.com/services/auth/?';
   var rest_url = 'rest/?';
   var key = key;
   var shared_secret = shared_secret;
   var xmlhttp = null;
   var permission = "write";


	var authToken = '';
	var authorized = false;
   
   //http://www.flickr.com/services/api/auth.spec.html
   this.authorize = function(callback){   		
   		getFrob(function(frob){  
   		var url = getLoginURL(permission, frob);
		
		var win = Ti.UI.createWindow({
			top: 0,
			modal: true,
			fullscreen: true
		});
		
		var webView;
		
		if (Ti.Platform.osname=='iphone') {
			webView = Ti.UI.createWebView({
				url: url,
				scalesPageToFit: true,
				touchEnabled: true,
				top:43,
				backgroundColor: '#FFF'
			});
			var toolbar = Ti.UI.createToolbar({top:0});
			var toolbarLabel = Ti.UI.createLabel({
				text:'Login with Flickr',
				font:{fontSize:16,fontWeight:'bold'},
				color:'#FFF',
				textAlign:'center'
			});
			var flexSpace = Titanium.UI.createButton({
				systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
			});
			var btnClose = Titanium.UI.createButton({
				title:'Cancel',
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
			toolbar.items = [flexSpace,flexSpace,toolbarLabel,flexSpace,btnClose];
			win.add(toolbar);

			// close login window
			btnClose.addEventListener('click',function(){
				webView.stopLoading();
				win.remove(webView);
				win.close();
			});
		} else {
			webView = Ti.UI.createWebView({
				url: url,
				scalesPageToFit: true,
				touchEnabled: true,
				top:0,
				backgroundColor: '#FFF'
			});
		}
		
		/*webView.addEventListener('load',function(e) {
			if (e.url == 'http://m.flickr.com/#/services/auth/') {
				getToken(frob, callback, win);
			}
		});*/
		
		win.addEventListener('close', function(e) {
			getToken(frob, callback, win);
		});
		
		win.add(webView);
		win.open();
   		});
	}

	function getToken(frob, callback, win){
		var http = Ti.Network.createHTTPClient();
		http.onload = function(){			
			var resp = http.responseText.substring(14, http.responseText.length - 1);
			//alert(resp);			
			var json = JSON.parse(resp);
			if (json.auth) {
				authToken = json.auth.token._content;
				authorized = true;
				callback(json);
				return;
			}
			callback(false);
		};
		
		http.onerror = function(e){
			alert(e);
		};		
		var url = 'http://flickr.com/services/rest/?method=flickr.auth.getToken&format=json&'+
			'api_key=' + key + '&frob=' + frob + '&api_sig=' + getSigToken(frob);
		http.open("GET", url, false);
		http.send();	
	}

	function getFrob(callback){
		var http = Ti.Network.createHTTPClient();
		http.onload = function(){			
			var resp = http.responseText.substring(14, http.responseText.length - 1);
			var json = JSON.parse(resp);
			var frob = json.frob._content;  
			callback(frob);
		};
		
		http.onerror = function(e){
			alert(e);
		};
		var url = 'http://flickr.com/services/rest/?method=flickr.auth.getFrob&format=json&'+
			'api_key=' + key + '&api_sig=' + getSigFrob();
		http.open("GET", url, false);
		http.send();		
	}
	
	getLoginURL = function(perms, frob){
		var url = auth_url + "api_key=" + key + "&perms=" + perms + '&frob=' + frob + "&api_sig=" + getSigAuth(perms, frob);
		return url;
  	}

	function getSigFrob(){
		var sig =  shared_secret + "api_key" + key + "formatjson" + "method" + "flickr.auth.getFrob"; 
		return hex_md5(sig);
	}

	function getSigAuth(perms, frob){
		var sig = shared_secret + "api_key" + key + "frob" + frob + "perms" + perms; 
		return hex_md5(sig);
  	}
  	
  	function getSigToken(frob){
		var sig =  shared_secret + "api_key" + key + "formatjson" + "frob" + frob + "method" + "flickr.auth.getToken"; 
		return hex_md5(sig);
	}


	this.getInfo = function(){
		
	}

   
}
