(function(){
  Yumit.ui.places_list = function(){
    var win = new Window({
      id: 'defaultWindow',
      title:'Places'
    });

    var search = Titanium.UI.createSearchBar({
      barColor:Yumit.constants.darkRed,
      showCancel:true,
      hintText:'search for places',
      top:0,
      height:45
    });

    win.add(search);

    var tableView = Ti.UI.createTableView({
      top:45,
      minRowHeight:60
    });

    var refresh_places = function(places) {
      var tableData = [];
      for (var i=0,l=places.length;i<l;i++) {
        tableData.push(Yumit.model.Place.createPlaceRow(places[i]));
      };
      tableView.setData(tableData, { animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN });
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
          tableView.scrollToIndex(0,{animated:true});
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

    tableView.addEventListener('click',function(e) {
      var _place = e.rowData;
      var win = Yumit.ui.place(_place);
      tabGroup.activeTab.open(win,{animated:true});
    });

    win.add(tableView);
    Yumit.model.Place.getPlacesNearby({
      success: refresh_places
    });

    return win;
  };

})();