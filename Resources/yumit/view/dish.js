(function(){
  var win = Titanium.UI.currentWindow;
  var Place = win.Place;
  var Dish = win.Dish;
  var Yumit = win.Yumit;

  var winview = Ti.UI.createView({top:0, backgroundColor:'#dddddd'});

  var spacing = 6,
      imgDimensions = 45,
      nameHeight = 18,
      metaHeight = 14;

  var avatar = Ti.UI.createImageView({
  	top:spacing,
  	left:spacing,
  	height:imgDimensions,
  	width:imgDimensions,
  	borderRadius:5,
  	image: 'http://foursquare.com/img/categories/food/default.png'
  });
  winview.add(avatar);

  var avatarOffset = spacing*2+imgDimensions;

  var name = Ti.UI.createLabel({
  	color:'#000000',
  	font: {
  		fontFamily:Yumit.styles.fontFamily,
  		fontSize:14,
  		fontWeight:'bold'
  	},
  	text: Place.place_name,
  	top:spacing,
  	left:avatarOffset,
  	height:nameHeight
  });
  winview.add(name);

  var address = Ti.UI.createLabel({
    color:Yumit.styles.textColor,
  	font: {
  		fontFamily:Yumit.styles.fontFamily,
  		fontSize:12
  	},
  	height:'auto',
  	text: Place.place_address,
  	top: spacing+nameHeight,
  	left:avatarOffset,
  	right:spacing,
  	textAlign:'left'
  });
  winview.add(address);

  ///////////////////////////////////////////////////////////DISH
  var dishView = Ti.UI.createView({top:60, height:55, backgroundColor:'#cccccc'});

  var dish_avatar = Ti.UI.createImageView({
  	top:spacing,
  	left:spacing,
  	height:imgDimensions,
  	width:imgDimensions,
  	borderRadius:5,
  	image:Dish.dish_photo
  });
  dishView.add(dish_avatar);

  var dish_name = Ti.UI.createLabel({
  	color:'#000000',
  	font: {
  		fontFamily:Yumit.styles.fontFamily,
  		fontSize:14,
  		fontWeight:'bold'
  	},
  	text: (Dish.dish_name.length > 30) ? Dish.dish_name.substr(Dish.dish_name, 27)+"..." : Dish.dish_name, 
  	top:spacing,
  	left:avatarOffset,
  	height:nameHeight
  });
  dishView.add(dish_name);

  var dish_category = Ti.UI.createLabel({
    color:Yumit.styles.textColor,
  	font: {
  		fontFamily:Yumit.styles.fontFamily,
  		fontSize:12
  	},
  	height:'auto',
  	text: Dish.dish_category_name,
  	top: spacing+nameHeight,
  	left:avatarOffset,
  	right:spacing,
  	textAlign:'left'
  });
  dishView.add(dish_category);

  var dish_yumscount = Ti.UI.createLabel({
  	color:Yumit.styles.grayTextColor,
  	font: {
  		fontFamily:Yumit.styles.fontFamily,
  		fontSize:10
  	},
  	height:'auto',
  	text:"("+Dish.dish_yums_count+" yums)",
  	width:'auto',
  	top:spacing,
  	right:spacing
  });
  dishView.add(dish_yumscount);
  winview.add(dishView);
  ////////////////////////////////////////////////////////DISH

  var post_a_yum = Titanium.UI.createButton({
  	title:'Post a Yum',
  	color:Yumit.styles.darkRed,
  	highlightedColor:'#0f0',
  	width:200,
  	height:40,
  	top:120
  });
  winview.add(post_a_yum);
  
  var chooseMediaSource = function(event) {
    switch(event.index) {
      case 0:
        newPhoto();
        break;
      case 1:
        chooseFromGallery();
        break;
      case event.destructive:
        alert("cancel");
        break;
    };
  };
    
  post_a_yum.addEventListener('click', function (){
    var chooseMedia = Titanium.UI.createOptionDialog({
      title: 'Choose media',
      options: [ 'New Photo', 'Choose Existing', 'Cancel'],
      cancel: 2
    });
    chooseMedia.addEventListener('click', chooseMediaSource);
    chooseMedia.show({view:winview,animated:true});
    // //win.animate({view:chooser,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  });

  win.add(winview);


  function handleImageEvent(event) {
    Titanium.App.fireEvent("photoChosen");
    var win = Titanium.UI.createWindow({
       // title:'Post a Yum',
       url:'yum_form.js'
     });
    win.Yumit = Yumit;
    win.Place = Place;
    win.Dish = Dish;
    win.media = event.media;
    Titanium.UI.currentTab.open(win,{animated:true});
  };


  function newPhoto() {
    Ti.Media.showCamera({
      mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
      success:function(event) {
    	  handleImageEvent(event);
    	},
  		error:function(error) {
  			Ti.UI.createAlertDialog({
  			  title:'Sorry',
  			  message:'This device either cannot take photos or there was a problem saving this photo.'
  			}).show();
  		},
  		allowImageEditing:true,
  		saveToPhotoGallery:true
    });
  };

  function chooseFromGallery() {
    Ti.Media.openPhotoGallery({
      mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
      success:function(event) {
    	  handleImageEvent(event);
    	},
    	error:function(error){
    	  Ti.UI.createAlertDialog({ 
    	    title:'Sorry',
    	    message: 'We had a problem reading from your photo gallery - please try again'
    	  }).show();
    	},
    	allowImageEditing:true
    });
  };





/////////////////// UNCOMMENT LATER
  
  // var tableView = Ti.UI.createTableView({
  //  top:160,
  //  minRowHeight:60
  //   // search:search,
  //   // hintText: 'Find a Restaurant',
  //   // filterAttribute:'place_name'
  // });
  // 
  // var refresh_dishes = function(dishes) {
  //  var dishData = [];
  //  for (var i=0,l=dishes.length;i<l;i++) {
  //    dishData.push(Yumit.model.Place.createDishRow(dishes[i]));
  //  }
  //  tableView.setData(dishData);
  //  Ti.App.fireEvent('app:hide.loader');
  // };
  // 
  // if (Place.place_origin == "yumit") {
  //   Yumit.model.Place.getDishes({
  //     place_id: Place.place_id,
  //    success: refresh_dishes
  //   });
  // };
  // 
  // 
  // win.add(tableView);
})();