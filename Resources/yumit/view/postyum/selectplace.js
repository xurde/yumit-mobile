(function(){
	Yumit.ui.selectPlaceForm = function(_tab, _photo) {
		var win = new Window({
			id: 'defaultWindow',
			title: 'Select a Place',
      		tabBarHidden: true,
      		backButtonTitle: 'Back'
		});
        
		var search = Titanium.UI.createSearchBar({
		    barColor: Yumit.constants.darkRed,
		    height: 40,
		    showCancel: true,
		    top: 0
		});
		win.add(search);
        
		var table = Titanium.UI.createTableView({
			top: 40
		});
		win.add(table);
		
		function trim(string) {
			if (string) {
			    return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			} else {
				return string;
			}
		}
		
		var isPreviewSearchFinished = true;
		var onSuccessSearch = function(places){
			var data = [];
			for (var i=0; i < places.length; i++) {
				//data[i] = {title: places[i].name, placeData: places[i]};
				data.push(Yumit.model.Place.createPostPlaceRow(places[i]));
			}
			table.setData(data);
			isPreviewSearchFinished = true;
		}
	    
	    function makeRequest() {
	    	Yumit.model.Place.getPlacesNearby({
				success: onSuccessSearch,
				location: Yumit.current.latitude + ',' + Yumit.current.longitude,
				query: trim(search.value),
				external: true
			});
	    }
	    
	    function searchRequest() {
	    	if (isPreviewSearchFinished) {
			    isPreviewSearchFinished = false;
			    setTimeout(function() {
			        makeRequest();
			    }, 500);
			}
	    }
		
		search.addEventListener('return', function(e){
			searchRequest();
			search.blur();
		});
		
		search.addEventListener('cancel', function(e){
			search.blur();
		});
	
		search.addEventListener('change', function(e){
			searchRequest();
		});
		
		var closeFunction = function() {
			setTimeout(function() {
				win.close();
			}, 400);
		}
		
		table.addEventListener('click', function(e){
			var nextWin = Yumit.ui.selectDishForm(closeFunction, _tab, _photo, e.rowData.placeData);
			_tab.open(nextWin, {animated:true});
		});
		
        makeRequest();
		return win;
	}
})();
