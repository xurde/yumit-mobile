(function(){
  Yumit.ui.places_list = function(){
    var win = new Window({
      id: 'defaultWindow',
      title:'Places'
    });

    var tabView = Yumit.ui.createtabbedNavigation({
      top:0,
      labels:[{title:'List', enabled:true},
              {title:'Map', enabled:false}],
      callback: function(i) { appFilmStrip.fireEvent('changeIndex',{idx: i});}
    });

    win.add(tabView);

    var search = Titanium.UI.createSearchBar({
      barColor:Yumit.constants.darkRed,
      showCancel:true,
      hintText:'search for places',
      top:35,
      height:45
    });

    win.add(search);

    var refresh_places = function(places) {
      var tableData = [];
      var mapData = [];
      for (var i=0,l=places.length;i<l;i++) {
        tableData.push(Yumit.model.Place.createPlaceRow(places[i]));
        anno = Yumit.model.Place.createPlaceAnnotation(places[i]);
        mapData.push(anno);
      };
      table_list.setData(tableData, { animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN });
      table_map.removeAllAnnotations();
      table_map.annotations = mapData;
      table_list.scrollToIndex(0,{animated:true});
    };

    search.addEventListener('change', function(e) {
      // return e.value;
      // Titanium.API.info('search bar: you type ' + e.value + ' act val ' + search.value);
    });

    search.addEventListener('blur', function(e) {
      Titanium.API.info('BLUR');
      return e.value;
    });

    search.addEventListener('return', function(e) {
      Titanium.API.info('RETURN');
      search.blur();
      Yumit.model.Place.getPlacesNearby({
        query:e.value,
        success:function(places){
          refresh_places(places);
        }
      });
      return e.value;
    });

    search.addEventListener('cancel', function(e) {
      Titanium.API.info('CANCEL');
    });

    search.addEventListener('focus', function(e) {
       Titanium.API.info('FOCUS');
    });


////////////////////////////////////////////////////
    function show_list() {
      var tableView = Ti.UI.createTableView({
        top:10,
        minRowHeight:60
      });

      tableView.addEventListener('click',function(e) {
        var _place = e.rowData;
        var win = Yumit.ui.place(_place);
        tabGroup.activeTab.open(win,{animated:true});
      });
      return tableView;
    }

////////////////////////////////////////////////////
    function show_map() {
      var zoomregion = {latitude:-33.441779525,longitude:-70.6503987,latitudeDelta:0.0025, longitudeDelta:0.0045};
       //   santiago = {latitude:tt.geo.cords.latitude,longitude:tt.geo.cords.longitude,
       //               latitudeDelta:0.010, longitudeDelta:0.018};
       // CREATE MAP VIEW
       //
       var mapView = Titanium.Map.createView({
         top:10,
         mapType: Titanium.Map.STANDARD_TYPE,
         region: zoomregion,
         regionFit:true,
         userLocation:true
       });

      return mapView;
    }

///////////Trigger
    Yumit.model.Place.getPlacesNearby({
      success: refresh_places
    });

    var table_list = show_list();
    var table_map = show_map();

    var appFilmStrip = Yumit.ui.createFilmStripView({
      views: [
        table_list,
        table_map
      ],
      space: {top:70,bottom:0,left:0,right:0}
    });

    win.add(appFilmStrip);

    return win;
  };

})();

