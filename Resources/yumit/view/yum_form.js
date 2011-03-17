(function(){
  Yumit.ui.yum_form = function(_place, _dish, _photo){
    var win = new Window({
      id: 'defaultWindow',
      title:'Post a Yum'
    });

    var scrollView = Ti.UI.createScrollView({
        backgroundColor:'#eedddd',
        contentWidth:'auto',
        contentHeight:'auto',
        top:0,
        width:320,
        height:480,
        showVerticalScrollIndicator:true,
        showHorizontalScrollIndicator:false,
        verticalBounce:true
    });

    var winview = Ti.UI.createView({
      top:0,
      contentWidth:320,
      contentHeight:480
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
      text:_place.place_name,
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
      text:_dish.dish_name,
      width:'auto',
      top:25,
      right:spacing
    });
    winview.add(dish_name);

    var horizontal = function(media){
      return (media.height <  media.width);
    };

    var avatar = Ti.UI.createImageView({
      top:7,
      left:7,
      height:horizontal(_photo) ? 105 : 140,
      width:horizontal(_photo) ? 140 : 105,
      borderRadius:5,
      image: _photo
    });
    winview.add(avatar);

  ////////////////////////////////////////////////////////////////////////////////////////

    var description = Titanium.UI.createTextArea({
      value:'Description',
      height:60,
      width:300,
      top:120,
      font:{fontFamily:'courier',fontSize:14},
      color:'#888',
      textAlign:'left',
      //appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
      keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
      returnKeyType:Titanium.UI.RETURNKEY_NEXT,
      borderWidth:2,
      borderColor:'#bbb',
      borderRadius:7,
      borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
      //suppressReturn:false

    });
    description.addEventListener("focus", function(){ description.value='';});
    description.addEventListener('return', function() {
        tags.focus();
    });
    winview.add(description);

    var tags = Titanium.UI.createTextField({
      hintText:'Tags',
      color:'#888',
      height:35,
      top:190,
      width:300,
      font:{fontFamily:'courier',fontSize:14},
      borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
      returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
    });
    tags.addEventListener('return', function() {
        scrollView.scrollTo(0,0);
    });
    winview.add(tags);

    /////////////////////////////////////////////////////////////////////////////BOTON
    var ind = Titanium.UI.createProgressBar({
      width:200,
      height:50,
      min:0,
      max:1,
      value:0,
      style:Titanium.UI.iPhone.ProgressBarStyle.BAR,
      top:240,
      message:'Upload Progress:',
      font:{fontSize:12, fontWeight:'bold'},
      color:Yumit.constants.textColor
    });
    winview.add(ind);
  //  ind.show();

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
        var doc = this.responseXML.documentElement;
        if (doc.getElementsByTagName("err") != null && doc.getElementsByTagName("err").length > 0) {
          Titanium.UI.createAlertDialog({
            title:'Well, this is awkward...',
            message: 'TwitPic error: '+doc.getElementsByTagName("err").item(0).getAttribute("msg")
          }).show();
        }
        else {
          resultLabel.text = 'Upload Complete!';
          //play sound with
          //var yay = Titanium.Media.createSound({url:'yay.caf'});
          //yay.play();
        }

        ind.value = 0;
      };
      xhr.onsendstream = function(e) {
        ind.value = e.progress;
      };
      var a_username = "pablete"; //Titanium.App.Properties.getString("username"),
      var a_password = "pablete"; //Titanium.App.Properties.getString("password"),
      xhr.open('POST','http://dev.yumit.com/api/v0/yums.json');
      Ti.API.info('Authorization\n'+'Basic '+Ti.Utils.base64encode(a_username+':'+a_password));
      xhr.setRequestHeader('Authorization','Basic '+Ti.Utils.base64encode(a_username+':'+a_password));
      xhr.setRequestHeader('Content-Type','multipart/form-data');
      xhr.send({
        place_id: _place.place_id,
        dish_id: _dish.dish_id,
        photo: _photo,
        text: description.value,
        tags: tags.value
      });
      //yay.play();
    });

    win.add(scrollView);

    return win;
  };
})();