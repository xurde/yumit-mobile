(function(){
  var win = Titanium.UI.currentWindow;
  var Yumit = win.Yumit;
  
  var search = Titanium.UI.createSearchBar({
  	barColor:Yumit.styles.darkRed,
  	showCancel:false,
  	hintText:'search for places'
  });

  var tableView = Ti.UI.createTableView({
  	top:0,
  	minRowHeight:60,
  	search:search,
  	hintText: 'Find a Restaurant',
  	filterAttribute:'place_name'
  });

  var refresh_places = function(places) {
  	var tvData = [];
  	for (var i=0,l=places.length;i<l;i++) {
  		tvData.push(Yumit.model.Place.createPlaceRow(places[i]));
  	}
  	tableView.setData(tvData);
  };

  search.addEventListener('change', function(e) {
     //e.value; // search string as user types
  });


  search.addEventListener('return', function(e) {
  	Yumit.model.Place.getPlacesNearby({
  	  query:e.value,
  		success:function(places){
  		  refresh_places(places);
  		  search.value = '';
  		  search.blur();
		  }
  	});
  });
  
  search.addEventListener('cancel', function(e) {
  	search.blur();
  });
  
  search.addEventListener('focus', function(e){
      win.hideNavBar();
  });

  search.addEventListener('blur', function(e){
      win.showNavBar();
  });

  tableView.addEventListener('click',function(e) {
    Ti.API.info("contents:"+e.rowData.place_name);
    var win = Titanium.UI.createWindow({
      url:'place.js'
    });
    win.Place = e.rowData;
    win.Yumit = Yumit;
    Titanium.UI.currentTab.open(win,{animated:true}); 
  });

  win.add(tableView);
  Yumit.model.Place.getPlacesNearby({
  	success: refresh_places
  });
})();