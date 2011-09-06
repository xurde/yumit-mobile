(function(){
	Yumit.ui.selectPlaceForm = function(_tab, _photo) {
		var win = new Window({
			id: 'defaultWindow',
			title: 'Select a Place',
      		tabBarHidden: true
		});
		
		var backButton = Titanium.UI.createButton({
            title: 'Back',
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
        });
        win.leftNavButton = backButton;
		
		backButton.addEventListener('click', function(){
            win.close();
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
	    
	    function makeRequest(_query) {
	    	Yumit.model.Place.getPlacesNearby({
				success: onSuccessSearch,
				location: Yumit.current.latitude + ',' + Yumit.current.longitude,
				query: search.value,
				external: true
			});
	    }
		
		search.addEventListener('return', function(e){
			search.blur();
		});
		
		search.addEventListener('cancel', function(e){
			search.blur();
		});
	
		search.addEventListener('change', function(e){
			if (isPreviewSearchFinished) {
			    isPreviewSearchFinished = false;
			    setTimeout(function() {
			        makeRequest();
			    }, 500);
			}
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
