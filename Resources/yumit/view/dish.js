(function(){
  Yumit.ui.dish = function(_place, _dish){
    var win = new Window({
      id: 'defaultWindow',
      title:'Dish'
    });

    var winview = Ti.UI.createView({top:0, backgroundColor:'#fff'});

    var spacing = 6,
        imgDimensions = 45,
        nameHeight = 16,
        metaHeight = 14;

    var avatar = Ti.UI.createImageView({
      top:spacing,
      left:spacing,
      height:imgDimensions,
      width:imgDimensions,
      borderRadius:5,
      defaultImage:'images/place-default-thumb.png',
      image: _place.icon || 'images/place-default-thumb.png'//_dish.dish_photo
    });
    winview.add(avatar);

    var avatarOffset = spacing*2+imgDimensions;

    var placeName = Ti.UI.createLabel({
      color:'#000000',
      font: {
        fontFamily:Yumit.constants.fontFamily,
        fontSize:12,
        fontWeight:'bold'
      },
      text: _place.place_name,
      top:spacing,
      left:avatarOffset,
      height:nameHeight
    });
    winview.add(placeName);
    
    var dish_name = Ti.UI.createLabel({
      color: '#990000',
      font: {
        fontFamily: Yumit.constants.fontFamily,
        fontSize: 12,
        fontWeight: 'bold'
      },
      text: (_dish.dish_name.length > 25) ? _dish.dish_name.substr(_dish.dish_name, 23)+"..." : _dish.dish_name,
      top: spacing + nameHeight,
      left: avatarOffset,
      height: nameHeight
    });
    winview.add(dish_name);
    
    var dish_yumscount = Ti.UI.createLabel({
      color: Yumit.constants.grayTextColor,
      font: {
        fontFamily: Yumit.constants.fontFamily,
        fontSize: 10
      },
      height: 'auto',
      text: "("+_dish.dish_yums_count+" yums)",
      width: 'auto',
      top: spacing + nameHeight*2,
      left: avatarOffset
    });
    winview.add(dish_yumscount);

  ///////////////////////////////// post yum

    var post_a_yum = Titanium.UI.createButton({
      backgroundImage:"images/post-yum.png",
      backgroundSelectedImage: "images/post-yum-over.png",
      //title:'Post a Yum',
      color:Yumit.constants.darkRed,
      highlightedColor:'#0f0',
      width:284/3,
      height:53/1.7,
      top:15,
      right: 10
    });
    //winview.add(post_a_yum);

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
      //Titanium.App.fireEvent("photoChosen");
      var _photo  = event.media;
      var win = Yumit.ui.yum_form(_place, _dish, _photo);
      //tabGroup.activeTab.open(win,{animated:true});
      win.open({modal:true});
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
  
   var yumsView = listOfYums();
   winview.add(yumsView);
  
   ////////////////////////////////////////////// Yums list
   function listOfYums() {
		var tableView = Ti.UI.createTableView({
			top: 60
		});

		var refresh_yums = function(yums) {
			var tvData = [];
			for (var i=0,l=yums.length;i<l;i++) {
				tvData.push(createYumRow(yums[i].yum));
			}
			tableView.setData(tvData);
		};
		
		function createYumRow(yum){
			var row = Ti.UI.createTableViewRow({
		        backgroundSelectedColor: Yumit.constants.grayColor,
		        height:'auto',
		        yum_id: yum.id,
		        yum_text: yum.text,
		        yum_dish_name: yum.dish_name,
		        yum_place_name: yum.place_name
     		});
     		
     		var userIcon = new ImageView({
		       id:'defaultImageView',
		       defaultImage: 'images/user-avatar-thumb.png',
		       image: yum.user_photo_url || 'images/user-avatar-thumb.png'
		    });
		    row.add(userIcon);
		    
     		var userLabel = new Label({
        		color:'#00E',
				font: {
				   fontFamily:Yumit.constants.fontFamily,
				   fontSize:14,
				   fontWeight:'bold'
				},
				top:Yumit.constants.spacing + 10,
				height:Yumit.constants.nameHeight,
				left:Yumit.constants.avatarOffset,
        		text: yum.user_login
      		});
      		row.add(userLabel);
      		
      		var createdLabel = new Label({
        		color: '#111',
				font: {
				   fontFamily:Yumit.constants.fontFamily,
				   fontSize:14,
				   fontWeight:'bold'
				},
				top: Yumit.constants.spacing + 25,
				height: Yumit.constants.nameHeight,
				left: Yumit.constants.avatarOffset,
        		text: yum.created_at_in_words + " ago | " 
        			 + yum.likes_count + " likes | "
        			 + yum.shouts_count + " views" //TODO: ??
      		});
      		row.add(createdLabel);
      		
      		var yumImage = new ImageView({
       			id:'yumImageView',
       			defaultImage:'images/dish-default-big.png',
       			image: yum.photo_url_big || 'images/dish-default-big.png'
      		});
      		row.add(yumImage);
      		
      		var textLabel = new Label({
        		top: 370,
        		font: {
				   fontFamily: Yumit.constants.fontFamily,
				   fontSize: 14
				},
				height: 20, 
        		left: spacing,
        		text: yum.text
      		});
      		row.add(textLabel);
      		
      		var tagStr = yum.tags_as_string[0];
      		for (var i=1; i < yum.tags_as_string.length; i++) {
				tagStr += ', ' + yum.tags_as_string[i];
			}
      		var tagsLabel = new Label({
      			top: 390,
            	font: {
				   fontFamily: Yumit.constants.fontFamily,
				   fontSize: 14,
				   fontWeight: 'bold'
				},
				color: '#777',
				left: spacing + 5,
            	height: 20,
            	text: tagStr
          	});         	
          	row.add(tagsLabel);
      		
			return row;
		}
		
		Yumit.model.Yum.getYumsForDishAndPlace({
			dishId: _dish.dish_id,
			placeId: _place.place_id,
            success: refresh_yums
        });

		return tableView;
   }
  /////////////////////////////////////////////

    return win;
  };
})();