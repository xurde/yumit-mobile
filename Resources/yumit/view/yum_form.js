(function(){
  var win = Titanium.UI.currentWindow;
  var Place = win.Place;
  var Dish  = win.Dish;
  var Yumit = win.Yumit;

  var scrollView = Ti.UI.createScrollView({ 
      backgroundColor:Yumit.styles.darkRed,
      contentWidth:'auto', 
      contentHeight:'auto', 
      top:0, 
      showVerticalScrollIndicator:true, 
      showHorizontalScrollIndicator:false, 
      verticalBounce:true
  });
  
  var winview = Ti.UI.createView({
    top:0, 
    // backgroundColor:'#FFFFFF',
    contentWidth:320,
    contentHeight:480
  });


  scrollView.add(winview);

  var spacing = 6,
      imgDimensions = 45,
      nameHeight = 18,
      metaHeight = 14;

  var place_name = Ti.UI.createLabel({
  	color:Yumit.styles.grayTextColor,
  	font: {
  		fontFamily:Yumit.styles.fontFamily,
  		fontSize:14,
  		fontWeight:'bold'
  	},
  	height:'auto',
  	text:Place.place_name,
  	width:'auto',
  	top:10,
  	right:spacing
  });
  winview.add(place_name);
  
  var dish_name = Ti.UI.createLabel({
  	color:Yumit.styles.grayTextColor,
  	font: {
  		fontFamily:Yumit.styles.fontFamily,
  		fontSize:14,
  		fontWeight:'bold'
  	},
  	height:'auto',
  	text:Dish.dish_name,
  	width:'auto',
  	top:25,
  	right:spacing
  });
  winview.add(dish_name);
  
  var horizontal = function(media){
    return (media.height <  media.width);
  };
  
  var avatar = Ti.UI.createImageView({
  	top:40,
  	left:50,
  	height:horizontal(win.media) ? 80 : 120,
  	width:horizontal(win.media) ? 120 : 80,
  	borderRadius:5,
  	image: win.media
  });
  winview.add(avatar);
  
////////////////////////////////////////////////////////////////////////////////////////
 


  var description = Titanium.UI.createTextArea({
  	value:'Description',
  	height:100,
  	width:300,
  	top:170,
  	font:{fontFamily:'courier',fontSize:14},
  	color:'#888',
  	textAlign:'left',
  	//appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
  	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
  	//returnKeyType:Titanium.UI.RETURNKEY_DONE,
    borderWidth:2,
    borderColor:'#bbb',
    borderRadius:7,
  	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
  	//suppressReturn:false

  });
  winview.add(description);
  description.addEventListener("focus", function(){ description.value='';});
  description.addEventListener('blur', function() {
      winview.animate({bottom: 0, duration:500});
  });
  
  var tags = Titanium.UI.createTextField({
    value:'Tags',
  	color:'#888',
  	height:35,
  	top:280,
  	width:300,
  	font:{fontFamily:'courier',fontSize:14},
  	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
  });
  winview.add(tags);
  tags.addEventListener("focus", function(){ tags.value='';});
  tags.addEventListener('blur', function() {
      winview.animate({bottom: 0, duration:500});
  });
 
  win.add(scrollView);

})();