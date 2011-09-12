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

        var place_name = Ti.UI.createLabel({
            color:Yumit.constants.textColor,
            font: {
                fontFamily:Yumit.constants.fontFamily,
                fontSize:14,
                fontWeight:'bold'
            },
            height:'auto',
            text:_place.name,
            width:'auto',
            top:15,
            left: 110
            //right:spacing
        });
        winview.add(place_name);

        var dish_name = Ti.UI.createLabel({
            //color:Yumit.constants.darkRed,
            color:Yumit.constants.textColor,
            font: {
                fontFamily:Yumit.constants.fontFamily,
                fontSize:14,
                fontWeight:'bold'
            },
            height:'auto',
            text:_dish.name,
            width:'auto',
            top:35,
            //right:spacing
            left: 110
        });
        winview.add(dish_name);

        var horizontal = function(media){
            return (media.height <  media.width);
        };
        
        function cropImage(photo) {
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
        var twitterIcon = Ti.UI.createImageView({
            top:245,
            left:115,
            height:imgDimensions,
            width:imgDimensions,
            image:'images/twitter.png'
        }),
        facebookIcon = Ti.UI.createImageView({
            top:245,
            left:60,
            height:imgDimensions,
            width:imgDimensions,
            image:'images/facebook.png'
        }),
        foursquareIcon = Ti.UI.createImageView({
            top:245,
            left:225,
            height:imgDimensions,
            width:imgDimensions,
            image:'images/foursquare.png'
        }),
        flickerIcon = Ti.UI.createImageView({
            top:245,
            left:170,
            height:imgDimensions,
            width:imgDimensions,
            image:'images/flickr.png'
        });
 // =============== Facebook section ===============
        facebookIcon.addEventListener('click',function(e){
            var notified = false;
            Titanium.Facebook.addEventListener('login', function(e) {
            	if (!notified) {
            		notified = true;
        	        if (e.success) {
        	    	    alert('Authirization succeed');
        	        } else {
        	    	    alert("Authorization failed");//: " + e.error);
        	        }
        	    }
            });
            
            if (Titanium.Facebook.loggedIn) {                
                alert('You are already logged in');
            } else {
                Titanium.Facebook.authorize();   
            }
        });
// ================================================

        twitterIcon.addEventListener('click',function(e){
        	/*var makeTweet = function(){
        		var message = description.value + ' (' + _dish.name + ' in ' + _place.name + ')';        		
        		Ti.App.Properties.BH.tweet(message, function(e){
                    alert("success: " + e);
                });
        	}*/
        	
            if (Ti.App.Properties.BH.authorized()){
            	//makeTweet();
            } else {
                Ti.App.Properties.BH.authorize(function(e){                	
                	if(e != false){
                		alert('Twitter autorization is ok');
                		//makeTweet();
                	} else {
                		alert("Authorization failed: " + e.error);
                	}   
                });                
            }
        });
        
        foursquareIcon.addEventListener('click',function(e){
        	alert('logout');
        	// Titanium.Facebook.addEventListener('logout', function(e) {
        	    // if (e.success) {
        	    	// alert("FB logout secceed");
        	    // } else {
        	    	// alert("FB logout error");
        	    // }
        	// });
            Titanium.Facebook.logout();
        });
        

        ////////////////////////////////////////////////////////////////////////////////////////

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

        var yumit = new Button({//Titanium.UI.createButton({
        	id: 'defaultYumitButton',
            title:'Yumit!',
            //color:Yumit.constants.darkRed,
            //highlightedColor:'#0f0',
            //width:200,
            //height:40,
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
        //yay.play();
        });



        return win;
    };
})();