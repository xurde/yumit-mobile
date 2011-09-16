(function(){
    Yumit.ui.yum_form = function(_closeCallBack, _place, _dish, _photo){
        var win = new Window({
            id: 'defaultWindow',
            title:'Post a Yum'
        });

        var scrollView = Ti.UI.createScrollView({
            backgroundColor:'#fff',
            contentWidth:320,
            contentHeight:480,
            top:0,
            showVerticalScrollIndicator:true,
            showHorizontalScrollIndicator:false,
            verticalBounce:true
        });
        win.add(scrollView);

        var winview = Ti.UI.createView({
            top:0
        });
        scrollView.add(winview);

        var spacing = 6,
        imgDimensions = 45,
        nameHeight = 18,
        metaHeight = 14;
        
        var placeAndDish = Ti.UI.createView({
        	top: 15,
        	left: 110,
        	height: 90,
        	width: 'auto',
        	layout: 'vertical'
        });
        
        var placeName = new Label({
            id: 'labelBold',
            height: 'auto',
            width: 'auto',
            text:_place.name,
            left: 0
        });
        
        var dishName = new Label({
        	id: 'labelBold',
            height:'auto',
            width: 'auto',
            text:_dish.name,
            left: 0
        });
        
        placeAndDish.add(placeName);
        placeAndDish.add(dishName);
        winview.add(placeAndDish);

        var horizontal = function(media){
            return (media.height <  media.width);
        };
        
        var cropImage = function(photo) {
	    	var baseSize = (horizontal(photo) ? photo.height : photo.width);
	    	var difference = Math.abs(photo.height - photo.width);
	    	var xOffset = 0;
	    	var yOffset = 0; 
	    	if (horizontal(photo)) {
	    		xOffset = difference / 2;
	    	} else {
	    		yOffset = difference / 2;
	    	}
	    	
	    	return photo.imageAsCropped({
	    		x: xOffset,
	    		y: yOffset,
	    		width: baseSize,
	    		height: baseSize 
	    	});
	    };
	    
	    var description = Titanium.UI.createTextArea({
            value:'Comment',
            height:60,
            width:300,
            top:120,
            font:{
                fontFamily:Yumit.constants.fontFamily,
                fontSize:14
            },
            color:Yumit.constants.textColor,
            textAlign:'left',
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_NEXT,
            borderWidth:2,
            borderColor:'#bbb',
            borderRadius:7,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            maximumLength: 255,
            autocorrect: false,
            firstFocus: false
        });
        
        description.addEventListener('change', function(e) {
            e.source.value = (e.value.length > description.maximumLength) 
                ? e.value.slice(0, description.maximumLength) : e.value;
        });
        description.addEventListener("focus", function(){
        	if (!description.firstFocus) {
                description.value = '';
                description.firstFocus = true;
            }
        });
        description.addEventListener('return', function() {
            scrollView.scrollTo(0,50);
            tags.focus();
        });
        winview.add(description);

        var tags = Titanium.UI.createTextField({
            value:'Tags',
            color:Yumit.constants.textColor,
            height:35,
            top:190,
            width:300,
            font:{
                fontFamily:Yumit.constants.fontFamily,
                fontSize:14
            },
            borderWidth:2,
            borderColor:'#bbb',
            borderRadius:7,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
            autocorrect: false,
            firstFocus:false
        });
        tags.addEventListener("focus", function(){
        	if (!tags.firstFocus) {
        	    tags.value = '';
        	    tags.firstFocus = true;
        	}
            scrollView.scrollTo(0,50);
        });
        tags.addEventListener('return', function() {
            scrollView.scrollTo(0,0);
        });
        
        var avatar = Ti.UI.createImageView({
            top:15,
            left:10,
            height: 90,
            width: 90,
            borderRadius:5,
            image: cropImage(_photo)
        });

        winview.add(avatar);

        var share = Ti.UI.createLabel({
            color:Yumit.constants.textColor,
            font: {
                fontFamily:Yumit.constants.fontFamily,
                fontSize:14,
                fontWeight:'bold'
            },
            height:'auto',
            text:"Share ",
            width:'auto',
            top:260,
            left:10
        });
        
        var getFacebookImage = function() {
 			return (Yumit.socialNetworks.facebookDisabled) ? 'images/facebook-deactivated-44.png' 
                 : (Yumit.socialNetworks.shareOnFacebook)  ? 'images/facebook-on-44.png'
            						                       : 'images/facebook-off-44.png';
 		};
 		var updateFacebookUserInfo = function(data) {
 			Yumit.model.User.update({
        	    success: function() {
        	        facebookIcon.image = getFacebookImage();
        	    },
        	    error: function(error) {
        	        alert('Updating user information failed ' + error);
        	        Yumit.socialNetworks.shareOnFacebook = !Yumit.socialNetworks.shareOnFacebook;
        	    }
        	}, data);
 		}
 		var getTwitterImage = function() {
 			return (Yumit.socialNetworks.twitterDisabled) ? 'images/twitter-deactivated-44.png'
 			     : (Yumit.socialNetworks.shareOnTwitter)  ? 'images/twitter-on-44.png'
 			                                              : 'images/twitter-off-44.png';
 		}
 		var updateTwitterUserInfo = function(data) {
 			Yumit.model.User.update({
 				success: function() {
 					twitterIcon.image = getTwitterImage();
 				},
 				error: function(error) {
 					alert('Updating user information failed ' + error)
 					Yumit.socialNetworks.shareOnTwitter = !Yumit.socialNetworks.shareOnTwitter;
 				}
 			}, data);
 		}
        
        var twitterIcon = Ti.UI.createImageView({
            top:245,
            left:115,
            height:imgDimensions,
            width:imgDimensions,
            image: getTwitterImage()
        }),
        facebookIcon = Ti.UI.createImageView({
            top:245,
            left:60,
            height:imgDimensions,
            width:imgDimensions,
            image: getFacebookImage()
        }),
        foursquareIcon = Ti.UI.createImageView({
            top:245,
            left:225,
            height:imgDimensions,
            width:imgDimensions,
            image:'images/foursquare-on-44.png'
        }),
        flickerIcon = Ti.UI.createImageView({
            top:245,
            left:170,
            height:imgDimensions,
            width:imgDimensions,
            image:'images/flickr-on-44.png'
        });
        
 // =============== Facebook section ===============
        facebookIcon.addEventListener('click',function(e) {
        	var notified = false;
        	Titanium.Facebook.addEventListener('login', function(e) {
        		alert('login');
        	    if (!notified) {
        	    	notified = true;
        	    	if (e.success) {
        	    		Yumit.socialNetworks.facebookDisabled = !Yumit.socialNetworks.facebookDisabled;
        	    		updateFacebookUserInfo({
        	    			user: {
        	    			    fb_offline_key: Titanium.Facebook.accessToken,
        	    			    fb_uid: e.data.id,
        	    			    fb_username: e.data.name,
        	    		        share_yums_on_facebook: Yumit.socialNetworks.shareOnFacebook
        	    		    }
        	    		});
        	    	} else if (!e.cancelled){
        	    		alert('FB authorization failed');
        	    	}
        	    }
        	});
        	
        	if (Yumit.socialNetworks.facebookDisabled) {
        	    Titanium.Facebook.authorize();
        	} else {
        	    Yumit.socialNetworks.shareOnFacebook = !Yumit.socialNetworks.shareOnFacebook;
        	    updateFacebookUserInfo({
        	    	user: {
        	            share_yums_on_facebook: Yumit.socialNetworks.shareOnFacebook
        	        }
        	    });
        	}
        });

// =============== Twitter section ================
        twitterIcon.addEventListener('click',function(e) {
        	if (Yumit.socialNetworks.twitterDisabled) {
        	    Ti.App.Properties.BH.authorize(function(e){                	
                	if (e != false) {
                		var config = Ti.App.Properties.BH.config();
                		Yumit.socialNetworks.twitterDisabled = !Yumit.socialNetworks.twitterDisabled;
        	    		updateTwitterUserInfo({
        	    			user: {
        	    			    twitter_id: config.user_id,
        	    			    twitter_username: config.screen_name,
        	    			    twitter_token: config.access_token,
        	    			    twitter_secret: config.access_token_secret,
        	    			    share_yums_on_twitter: Yumit.socialNetworks.shareOnTwitter
        	    		    }
        	    		});
                	} else {
                		alert("Authorization failed");// + e.error);
                	}   
                });
        	} else {
        		Yumit.socialNetworks.shareOnTwitter = !Yumit.socialNetworks.shareOnTwitter;
                updateTwitterUserInfo({
                	user: {
                		share_yums_on_twitter: Yumit.socialNetworks.shareOnTwitter
                	}
                });
        	}
        });
// =============== Foursquare section ================
        
        foursquareIcon.addEventListener('click', function(e){
        	alert('logout');
            Titanium.Facebook.logout();
        });

// =============== Flickr section ====================

		flickerIcon.addEventListener('click', function(e) {
			Titanium.App.Properties.BH.deauthorize(function(e) {
			    if (e != false) {
			    	alert('Deauthorized');
			    } else {
			    	alert('Deauthorization failed');
			    }
			});
		});

////////////////////////////////////////////////////////////////////////////////////////

        
        winview.add(tags);
        winview.add(share);
        winview.add(twitterIcon);
        winview.add(facebookIcon);
        winview.add(foursquareIcon);
        winview.add(flickerIcon);
        
        
/////////////////////////////////////////////////////////////////////////////BOTON
        var uploadLabel = Ti.UI.createLabel({
            text: 'Upload Complete!',
            textAlign:'center',
            font:{
                fontSize:14, 
                fontWeight:'bold'
            },
            height:'auto',
            width:'auto',
            color:'#000',
            top:300,
            visible:false
        });
        winview.add(uploadLabel);

        var ind = Titanium.UI.createProgressBar({
            width:200,
            height:50,
            min:0,
            max:1,
            value:0,
            style:Titanium.UI.iPhone.ProgressBarStyle.BAR,
            top:290,
            message:'Upload Progress:',
            font:{
                fontSize:14, 
                fontWeight:'bold'
            },
            color:Yumit.constants.textColor
        });
        winview.add(ind);

        var yumit = new Button({
        	id: 'defaultYumitButton',
            title:'Yumit!',
            top:350
        });
        winview.add(yumit);

        yumit.addEventListener('click', function (){
        	yumit.enabled = false;
            ind.show();

            var xhr = Titanium.Network.createHTTPClient({
            	timeout: Yumit.constants.httpTimeout
            });
            xhr.onerror = function(e) {
                ind.hide();
                yumit.enabled = true;
                Titanium.UI.createAlertDialog({
                    title:'Well, this is awkward...',
                    message: 'We had a problem posting your image - please try again'
                }).show();
            };

            xhr.onload = function() {
                ind.hide();
                yumit.enabled = true;
                var jsonReply = JSON.parse(this.responseText);
                if (this.responseText.length > 0 && jsonReply.success === "false" ) {
                    Titanium.UI.createAlertDialog({
                        title:'Well, this is awkward...',
                        message: 'Yumit Error: ' + jsonReply.error
                    }).show();
                }
                else {
                    uploadLabel.visible = true;
                    setTimeout(function(){
                    	tabGroup.setActiveTab({indexOrObject: 0});
                    	Titanium.App.fireEvent('Yumit:login');
                        Titanium.App.fireEvent('Yumit:yums:getYumsFriends');
                    	_closeCallBack();
                        win.close({opacity:0,duration:500});
                    }, 500);
                //play sound with
                //var yay = Titanium.Media.createSound({url:'yay.caf'});
                //yay.play();
                }

                ind.value = 0;
            };
            xhr.onsendstream = function(e) {
                ind.value = e.progress;
            };

            var authorization = Titanium.App.Properties.getString("token");

            xhr.open('POST',Yumit.api_path+'/api/v0/yums.json');
            xhr.setRequestHeader('token', authorization);
            xhr.setRequestHeader('Content-Type','multipart/form-data');
            
            var dataToSend = {
            	place_id: _place.id,
                photo: _photo,
                text: (description.firstFocus) ? description.value : '',
                tags: (tags.firstFocus) ? tags.value : ''
            };
            if (_dish.id) {
            	dataToSend.dish_id = _dish.id;
            } else {
            	dataToSend.dish_name = _dish.name;
            }
            xhr.send(dataToSend);
        });

        return win;
    };
})();