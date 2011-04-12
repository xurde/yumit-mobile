(function(){
  Yumit.ui.place = function(_place){
    var win = new Window({
      id: 'place_window',
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

    var buttonObjects = [
      {title:'Dishes', width:100, enabled:true},
      {title:'Users', width:100, enabled:true},
      {title:'Map', width:100, enabled:true}
    ];

    var tabbar = Titanium.UI.createTabbedBar({
      labels:buttonObjects,
      backgroundColor:Yumit.constants.grayColor,
      top:60,
      style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
      height:40,
      index:0
    });

    winview.add(tabbar);

    var plain = false;
    tabbar.addEventListener('click', function(e) {
       Ti.API.info("You clicked index " + e.index);
       appFilmStrip.fireEvent('changeIndex',{idx:e.index});
    });

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
function map(){

  var annotation = Titanium.Map.createAnnotation({
    latitude:_place.place_lat,
    longitude:_place.place_lng,
    title:_place.name,
    subtitle:_place.place_address+ '(xxx meters)',
    animate:true,
     leftButton:'../../images/default.png',
     image:'../../images/foursquare-mini.png'
  });

  var zoomregion = {latitude:-33.441779525,longitude:-70.6503987,latitudeDelta:0.0025, longitudeDelta:0.0045};
   //   santiago = {latitude:tt.geo.cords.latitude,longitude:tt.geo.cords.longitude,
   //               latitudeDelta:0.010, longitudeDelta:0.018};
   // CREATE MAP VIEW
   //
   var mapView = Titanium.Map.createView({
     mapType: Titanium.Map.STANDARD_TYPE,
     region: zoomregion,
     animate:true,
     regionFit:true,
     userLocation:true,
     annotations:[annotation]
   });

  return mapView;
}

function users(){
  var nothing = Ti.UI.createView({
    top:0,left:0, width:Ti.Platform.displayCaps.platformWidth, height:'auto',
    backgroundColor:'#ffdddd'
  });
  return nothing;
}
////////////////////////////////////////////////////////////////////

var appFilmStrip = Yumit.ui.createFilmStripView({
  views: [
    dishes(),
    users(),
    map()
  ]
});
////////////////////////////////////////////////////////////////////

//toggle view state of application to the relevant tab
function selectIndex(_idx) {
  for (var i = 0, l = tabs.length; i<l; i++) {
    //select the tab and move the tab 'cursor'
    if (_idx === i) {
      //if the tab is already selected, do nothing
      if (!tabs[i].on) {
        Ti.API.info('selecting tab index: '+_idx);
        //animate the tab
        tab.animate({
          duration:$$.animationDuration,
          left:tabWidth*i,
          bottom:0
        },function(idx) { //use closure to retain value of i in idx
          return function() {
            if (!tabs[idx].on) {
              tabs[idx].toggle();
            }
          };
        }(i));

        //set the current film strip index
        appFilmStrip.fireEvent('changeIndex',{idx:i});
      }
    }
    else if (tabs[i].on && (_idx !== i)) {
      tabs[i].toggle();
    }
  }
}
//////////////////////////////////////////

    win.add(appFilmStrip);

    return win;
  };
})();