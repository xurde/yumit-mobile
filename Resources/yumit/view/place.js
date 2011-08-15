(function(){
  Yumit.ui.place = function(_place){
    var win = new Window({
      id: 'defaultWindow',
      title:'Place'
    });

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
        fontFamily:Yumit.constants.fontFamily,
        fontSize:14,
        fontWeight:'bold'
      },
      text: _place.place_name,
      top:spacing,
      left:avatarOffset,
      height:nameHeight
    });
    winview.add(name);

    var address = Ti.UI.createLabel({
      color:Yumit.constants.textColor,
      font: {
        fontFamily:Yumit.constants.fontFamily,
        fontSize:12
      },
      height:'auto',
      text: _place.place_address,
      top: spacing+nameHeight,
      left:avatarOffset,
      right:spacing,
      textAlign:'left'
    });
    winview.add(address);

    // use this instead of Titanium.UI.createTabbedBar
    var tabView = Yumit.ui.createtabbedNavigation({
      top:60,
      labels:[{title:'Dishes', enabled:true},
              {title:'Users', enabled:false},
              {title:'Map', enabled:false}],
      callback: function(i) { appFilmStrip.fireEvent('changeIndex',{idx: i});}
    });

    winview.add(tabView);

    win.add(winview);

/////////////////////////////////////////////////////////////////////
 function dishes(){
 	var dishView = Ti.UI.createView();
    var tableView = Ti.UI.createTableView({
      top: 0,
      minRowHeight: 60
    });
    var addDishButton = Ti.UI.createButton({
    	 title:'Add a new Dish',
         highlightedColor:'#0f0',
         bottom: 0,
         height: 40
    });
    setTimeout(function(){
		tableView.height = tableView.height - addDishButton.height;
	}, 500);
	

    tableView.addEventListener('click',function(e) {
       var _dish = e.rowData;
       var win = Yumit.ui.dish(_place, e.rowData);
       tabGroup.activeTab.open(win,{animated:true});
     });

    var refresh_dishes = function(dishes) {
      var dishData = [];
      for (var i=0,l=dishes.length;i<l;i++) {
        dishData.push(Yumit.model.Place.createDishRow(dishes[i]));
      }
      tableView.setData(dishData);
    };
    
    var addDish = function(dish) {
    	var row = Yumit.model.Place.createDishRow(dish);
    	tableView.appendRow(row);
    }

    if (_place.place_origin == "yumit") {
      Yumit.model.Place.getDishes({
        place_id: _place.place_id,
        success: refresh_dishes
      });
    };
    
    addDishButton.addEventListener('click', function(e){
    	showAddDishView(true);
    });
    
    var showAddDishView = function(show){
    	var doShow = (show == true);
    	tableView.visible = !doShow;
    	addDishButton.visible = !doShow;
    	addDishView.visible = doShow;
    }
    
    
    var addDishView = Ti.UI.createView({
		height: '100%',
	    backgroundColor: '#FFF',
		visible: false
	});
    createAddDishView(addDishView, showAddDishView, addDish);

	dishView.add(tableView);
	dishView.add(addDishButton);
	dishView.add(addDishView);
	
    return dishView;
  }
  
function createAddDishView(/*View*/ addDishView, showAddDishView, addDish){
  	
	var addDishLabel = Ti.UI.createLabel({
		text: 'Add New Dish',
		textAlign:'center',
        font:{
        	fontSize:20, 
            fontWeight:'bold'
        },
        color:'#000',
        height:'auto',
        width:'auto',
        top:20
	});
	
	 var nameTextField = Titanium.UI.createTextField({
            hintText:'name',
            color:'#777',
            backgroundColor: '#D5E5F3',
            height:35,
            top:60,
            width:'90%',
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
        });
    
    var categoryLabel = Ti.UI.createLabel({
    	text: 'category',
    	top: 100,
    	width: '90%',
    	height: 35,
    	color:'#777',
        backgroundColor: '#D5E5F3'
    });
        
    var okButton = Ti.UI.createButton({
    	title: 'Add It!',
    	width: 85,
    	height: 40,
    	top: 150,
    	left: '52%'
    }); 
    
    var cancelButton = Ti.UI.createButton({
    	title: 'Cancel',
    	width: 85,
    	height: 40,
    	top: 150,
    	right: '52%'
    });
        
    var categoryPicker = Titanium.UI.createPicker({
    	bottom: 0,
    	selectionIndicator: true
    });
    
    var dishArray = [];
    var dish = null;
    
    var onDishSearshSuccess = function(dishArr) {
    	dishArray = dishArr;
    	var pickerData = new Array();
    	var distinctCatrgories = new Array();
    	for (var i=0; i < dishArr.length; i++) {
    		distinctCatrgories.push(dishArr[i].dish.category_name);
		};
		distinctCatrgories = distinctCatrgories.unique();
		for (var i=0; i < distinctCatrgories.length; i++) {
			pickerData[i] = Titanium.UI.createPickerRow({
    				title:distinctCatrgories[i]
    			});
		}
		clearData(categoryPicker);
		categoryPicker.add(pickerData);
		addDishView.add(categoryPicker);
    }
    
    function clearData(picker){
    	if(picker.columns.length > 0) {
	    	var _col = picker.columns[0];
		    var len = _col.rowCount;
		    for(var x = len-1; x >= 0; x-- ){
		        var _row = _col.rows[x]
		        _col.removeRow(_row);
		    }
		    picker.reloadColumn(_col);
	    }
    }
    
    categoryPicker.addEventListener('change', function(e) {
    	addDishView.remove(categoryPicker);
    	for (var i=0; i < dishArray.length; i++) {
			if (dishArray[i].dish.category_name == e.selectedValue.toString()) {
				dish = dishArray[i].dish;
				nameTextField.value = dish.name;
				categoryLabel.text = 'category: ' + dish.category_name;
				break;
			}
		}
    });
    
    function clearControls() {
    	nameTextField.value = '';
    	categoryLabel.text = 'category';
    }
    
    cancelButton.addEventListener('click', function(){
    	clearControls();
    	showAddDishView(false);
    });
    
    categoryLabel.addEventListener('click', function(e){
    	if(nameTextField.value != null && nameTextField.value != ''){
	    	Yumit.model.Dish.searchDishes({
	    		queryString: nameTextField.value,
	    		success: onDishSearshSuccess
	    	});
    	}
    });
    
    okButton.addEventListener('click', function(e) {
    	if (dish != null) {
    		addDish(dish);
    		clearControls();
    		showAddDishView(false);
    	}
    });
    
    addDishView.add(addDishLabel);
    addDishView.add(nameTextField);
    addDishView.add(categoryLabel);
    addDishView.add(okButton);
    addDishView.add(cancelButton);
}

/////////////////////////////////////////////////////////////////////
function map(){

  var annotation = Titanium.Map.createAnnotation({
    latitude:_place.place_lat,
    longitude:_place.place_lng,
    title:_place.place_name,
    subtitle:_place.place_address,
    animate:true,
     leftButton:'../../images/default.png',
     image:'../../images/foursquare-mini.png'
  });

  var zoomregion = {latitude:_place.place_lat,longitude:_place.place_lng,latitudeDelta:0.0025, longitudeDelta:0.0045};
   //   santiago = {latitude:tt.geo.cords.latitude,longitude:tt.geo.cords.longitude,
   //               latitudeDelta:0.010, longitudeDelta:0.018};
   // CREATE MAP VIEW
   //
   Yumit.ui.mapview.region = zoomregion;
   Yumit.ui.mapview.annotations = [annotation];
   Yumit.ui.mapview.top = 0;

  return Yumit.ui.mapview;
}

/////////////////////////////////////////////////////////////////////
function users(){

   var tableView = Ti.UI.createTableView({
      top:0,
      minRowHeight:60
    });

    // Whenever we have a user page
    // tableView.addEventListener('click',function(e) {
    //    var _dish = e.rowData;
    //    var win = Yumit.ui.dish(_place, e.rowData);
    //    tabGroup.activeTab.open(win,{animated:true});
    //  });

    var refresh_users = function(users) {
      var userData = [];
      for (var i=0,l=users.length;i<l;i++) {
        userData.push(Yumit.model.Place.createUserRow(users[i]));
      }
      tableView.setData(userData);
    };

    if (_place.place_origin == "yumit") {
      Yumit.model.Place.getUsers({
        place_id: _place.place_id,
        success: refresh_users
      });
    };

    return tableView;

}

////////////////////////////////////////////////////////////////////

    var appFilmStrip = Yumit.ui.createFilmStripView({
      views: [
        dishes(),
        users(),
        map()
      ],
      space: {top:95,bottom:0,left:0,right:0}
    });

    win.add(appFilmStrip);

    return win;
  };
})();

Array.prototype.unique =
  function() {
    var a = [];
    var l = this.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };
  
