(function(){
  Yumit.ui.place = function(_place){
    var win = new Window({
      id: 'DefaultWindow',
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

    var tb4 = Titanium.UI.createTabbedBar({
      labels:buttonObjects,
      backgroundColor:Yumit.constants.grayColor,
      top:60,
      style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
      height:40,
      index:0
    });

    winview.add(tb4);

    var plain = false;
    tb4.addEventListener('click', function(e) {
       Ti.API.info("You clicked index " + e.index);
    });

    win.add(winview);

    var tableView = Ti.UI.createTableView({
      top:110,
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

    win.add(tableView);

    return win;
  };
})();