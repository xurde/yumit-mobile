(function(){
    Yumit.ui.yum_form = function(){
        var win = new Window({
            id: 'defaultWindow',
            title:'Post a Yum'
        });
        var cancel_button = Titanium.UI.createButton({
            title:'Cancel',
            style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
        });
        win.setLeftNavButton(cancel_button);
        cancel_button.addEventListener('click',function(){
            win.close();
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
            text:"place name",
            width:'auto',
            top:10,
            right:spacing
        });
        winview.add(place_name);

        var dish_name = Ti.UI.createLabel({
            color:Yumit.constants.textColor,
            font: {
                fontFamily:Yumit.constants.fontFamily,
                fontSize:14,
                fontWeight:'bold'
            },
            height:'auto',
            text:"dish",
            width:'auto',
            top:25,
            right:spacing
        });
        winview.add(dish_name);

        var horizontal = function(media){
            return (media.height <  media.width);
        };


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
        
        
        facebookIcon.addEventListener('click',function(e){
            //alert("Login to Facebook first");
            if(Titanium.Facebook.loggedIn){
                alert("Posting functionality is under progress!!");
            }else{
                Titanium.Facebook.authorize();
                    
            }
        });
        
        twitterIcon.addEventListener('click',function(e){
            if (Ti.App.Properties.BH.authorized()){
                Ti.App.Properties.BH.send_tweet("status="+escape('lahore,dish'),function(e){
                    alert("Yum shared successfuly.");
                });
            } else {
                Ti.App.Properties.BH.authorize();
            }
        
        });
        
        
        

        ////////////////////////////////////////////////////////////////////////////////////////

        var description = Titanium.UI.createTextArea({
            value:'Description',
            height:60,
            width:300,
            top:120,
            font:{
                fontFamily:'courier',
                fontSize:14
            },
            color:'#888',
            textAlign:'left',
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_NEXT,
            borderWidth:2,
            borderColor:'#bbb',
            borderRadius:7,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        description.addEventListener("focus", function(){
            description.value='';
        });
        description.addEventListener('return', function() {
            scrollView.scrollTo(0,50);
            tags.focus();
        });
        winview.add(description);

        var tags = Titanium.UI.createTextField({
            hintText:'Tags',
            color:'#888',
            height:35,
            top:190,
            width:300,
            font:{
                fontFamily:'courier',
                fontSize:14
            },
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
        });
        tags.addEventListener("focus", function(){
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
            top:250,
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
            top:240,
            message:'Upload Progress:',
            font:{
                fontSize:14, 
                fontWeight:'bold'
            },
            color:Yumit.constants.textColor
        });
        winview.add(ind);

        var yumit = Titanium.UI.createButton({
            title:'Yumit!',
            color:Yumit.constants.darkRed,
            highlightedColor:'#0f0',
            width:200,
            height:40,
            top:310
        });
        winview.add(yumit);

        yumit.addEventListener('click', function (){
            ind.show();

            var xhr = Titanium.Network.createHTTPClient();
            xhr.onerror = function(e) {
                ind.hide();
                Titanium.UI.createAlertDialog({
                    title:'Well, this is awkward...',
                    message: 'We had a problem posting your image - please try again'
                }).show();
            };

            xhr.onload = function() {
                ind.hide();
                var jsonReply = JSON.parse(this.responseText);
                if (this.responseText.length > 0 && jsonReply.success === "false" ) {
                    Titanium.UI.createAlertDialog({
                        title:'Well, this is awkward...',
                        message: 'Yumit Error: '+jsonReply.error
                    }).show();
                }
                else {
                    uploadLabel.visible = true;
                    setTimeout(function(){
                        win.close();
                    }, 1000);
                //play sound with
                //var yay = Titanium.Media.createSound({url:'yay.caf'});
                //yay.play();
                }

                ind.value = 0;
            };
            xhr.onsendstream = function(e) {
                ind.value = e.progress;
            };
            var authorization = Titanium.App.Properties.getString("username");
            authorization += ':'+Titanium.App.Properties.getString("password");

            xhr.open('POST',Yumit.api_path+'/api/v0/yums.json');
            Ti.API.info('Authorization\n'+'Basic '+Ti.Utils.base64encode(authorization));
            xhr.setRequestHeader('Authorization','Basic '+Ti.Utils.base64encode(authorization));
            xhr.setRequestHeader('Content-Type','multipart/form-data');
            xhr.send({
                // place_id: _place.place_id,
                // dish_id: _dish.dish_id,
                // photo: _photo,
                text: description.value,
                tags: tags.value
            });
        //yay.play();
        });



        return win;
    };
})();