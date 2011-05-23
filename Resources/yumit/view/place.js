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
    var tableView = Ti.UI.createTableView({
      top:0,
      minRowHeight:60
    });

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

    if (_place.place_origin == "yumit") {
      Yumit.model.Place.getDishes({
        place_id: _place.place_id,
        success: refresh_dishes
      });
    };

    return tableView;
  }

/////////////////////////////////////////////////////////////////////
function map(){

  var annotation = Titanium.Map.createAnnotation({
    latitude:_place.place_lat,
    longitude:_place.place_lng,
    title:_place.place_name,
    subtitle:_place.place_address+ '(xxx meters)',
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