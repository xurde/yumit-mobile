

function FoursquareAPI(params) {
	var clientId = params.clientId;
	var redirectUri = params.redirectUri;
	
	var authorized = false;
	var accessToken = '';
	
	function createAuthenticationUrl(clientId, redirectUri, action) {
		var action = action || '/authenticate';
		var authenticationUrl = "https://foursquare.com/oauth2" + action;
		return String.format(
			"%s?client_id=%s&response_type=token&redirect_uri=%s&display=touch",
			authenticationUrl,
			clientId,
			redirectUri 
		);
	};
	
	function authenticate(params) {
		var action = params.action;
		var callback = params.callback;
		
	    var url = createAuthenticationUrl(clientId, redirectUri, params.action);
	    
	    var win = Ti.UI.createWindow({
	        top: 0,
			modal: true,
			fullscreen: true
	    });
	    
	    var webView;
	    
	    if (Ti.Platform.osname=='iphone') {
	    	webView  = Ti.UI.createWebView({
	    	    url: url,
				scalesPageToFit: true,
				touchEnabled: true,
				top:43,
				backgroundColor: '#FFF'
	        });
	        
	        var toolbar = Ti.UI.createToolbar({top:0});
			var toolbarLabel = Ti.UI.createLabel({
				text:'Login with Foursquare',
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
			btnClose.addEventListener('click',function() {
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
		
		webView.addEventListener('load',function(e) {
			var fragment = "#access_token=";
			var url = e.url;
			Ti.API.info('[Foursquare] ' + e.url);
			var index = url.indexOf(fragment);
			if (index != -1) {
				authorized = true;
			    accessToken = url.substring(index + fragment.length);
			    if (callback && typeof(callback) == 'function') {
			        callback({
			    	    accessToken: accessToken,
			        });
			    }
			    
			    webView.stopLoading();
				win.remove(webView);
				win.close();
			}
		});
		
		win.add(webView);
		win.open();
	};
	
	function authorize(params) {
		authenticate({
			action: '/authorize',
			callback: params.callback
		});
	};
	
	this.authenticate = authenticate;
	this.authorize = authorize;
	
	this.authorized = function() { return authorized };
};

