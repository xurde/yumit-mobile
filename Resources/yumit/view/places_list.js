(function(){
  Yumit.ui.mapview = Titanium.Map.createView({
      mapType: Titanium.Map.STANDARD_TYPE,
      //TODO change region for the region around a guessed user location instead
      //region: {latitude:-33.441779525,longitude:-70.6503987,latitudeDelta:0.0025, longitudeDelta:0.0045},
      animate:true,
      regionFit:true,
      userLocation:true
  });

  Yumit.ui.places_list = function(_tab){
    var win = new Window({
      id: 'defaultWindow',
      title:'Places'
    });
    win.addEventListener('open', function(){
    	if (Yumit.global.placesNearbyLoaded) {
    		return;
    	};
		Titanium.App.fireEvent("Yumit:ui:showLoading", {title : "Loading..."});				
		Ti.API.info("\t>>>Loading places!");
		Titanium.App.fireEvent('Yumit:places:getPlacesNearby');
    });
    
    var tabViewCallback = function(i){
        appFilmStrip.fireEvent('changeIndex',{idx: i});
        if (i == 1) {
          if (Yumit.current.places_annotations && table_map.annotations.length < 2) {
            Yumit.ui.mapview.top = 10;
            Yumit.ui.mapview.removeAllAnnotations();
            Yumit.ui.mapview.annotations = Yumit.current.places_annotations;
          }
        }
    	
    };
    
    var tabView = Yumit.ui.createtabbedNavigation({
      top:0,
      labels:[{title:'List', enabled:true},
              {title:'Map', enabled:false}],
      callback: function(i) {
      	tabViewCallback(i);
        // appFilmStrip.fireEvent('changeIndex',{idx: i});
        // if (i == 1) {
          // if (Yumit.current.places_annotations && table_map.annotations.length < 2) {
            // Yumit.ui.mapview.top = 10;
            // Yumit.ui.mapview.removeAllAnnotations();
            // Yumit.ui.mapview.annotations = Yumit.current.places_annotations;
          // }
        // }
      }
    });
    
    var refresh = function() {
		Yumit.global.placesNearbyLoaded = false;
		tabView.children[0].fireEvent('changeToIt');
		win.fireEvent('open');
    };
    
    Yumit.ui.addNavButtons({win:win, refresh:refresh, tab:_tab});

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
      	Yumit.global.placesNearbyLoaded = true;
        tableData.push(Yumit.model.Place.createPlaceRow(places[i]));
        anno = Yumit.model.Place.createPlaceAnnotation(places[i]);
        mapData.push(anno);
      };
      table_list.setData(tableData, { animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN });
      table_map.removeAllAnnotations();
      table_map.annotations = mapData;
      Yumit.current.places_annotations = mapData;
      table_list.scrollToIndex(0,{animated:true});
    };
    
    var makeRequest = function(e) {
        Yumit.model.Place.getPlacesNearby({
      	    location: Yumit.current.latitude + ',' + Yumit.current.longitude,
            query: search.value,
            success: function(places){
                refresh_places(places);
            }
        });
    };

    search.addEventListener('return', function(e) {
      //Titanium.API.info('RETURN');
      search.blur();
      makeRequest();
    });

    search.addEventListener('cancel', function(e) {
      //Titanium.API.info('CANCEL');
      search.blur();
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
      return Yumit.ui.mapview;
    }

    ///////////////////////
    // PSEUDO API
    ///////////////////////

    Titanium.App.addEventListener('Yumit:places:getPlacesNearby', function() {
      var zoomregion = { latitude: Yumit.current.latitude, longitude:Yumit.current.longitude,
                         latitudeDelta:0.0022, longitudeDelta:0.0012 };
      Yumit.ui.mapview.region = zoomregion;
      // var santiago = {latitude:-33.439028,longitude:-70.648059,latitudeDelta:0.010, longitudeDelta:0.018};
      // Yumit.ui.mapview.region = santiago;
      Yumit.ui.mapview.top = 10;

      Yumit.model.Place.getPlacesNearby({
        location: Yumit.current.latitude + "," + Yumit.current.longitude,
        success: refresh_places,
        onfinish: function(){ Titanium.App.fireEvent("Yumit:ui:hideLoading"); }

      });
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

