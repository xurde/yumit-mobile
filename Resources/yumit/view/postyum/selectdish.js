(function(){
	Yumit.ui.selectDishForm = function(_closeCallback, _tab, _photo, _place) {
		var win = new Window({
  			id: 'defaultWindow',
			title: 'Select a Dish'
		});
		
		var backButton = Titanium.UI.createButton({
            title: 'Back',
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
        });
        // setTimeout(function(){
        	// win.leftNavButton = backButton;
        // }, 500);
        
        // win.leftNavButton.addEventListener('click', function(){
            // win.close();
        // });
        
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
		var onSuccessSearch = function(dishes) {			
			var data = [];
			if ((JSON.stringify(dishes) == '[]' || dishes.noDishes) 
			        && isPreviewSearchFinished) {				
				setTimeout(function() {
					search.focus();
				}, 500);
				return;
			}
			//if (JSON.stringify(data) == '[]') {
			if (search.value && trim(search.value) != '') {
				//alert(trim(search.value));
				data.push(Yumit.ui.dishRow({
					dishName: 'Add new dish: ' + trim(search.value),
				}, { addNewDish: true }));
			} 
			for (var i=0; i < dishes.length; i++) {
				var dish = dishes[i].dish;
				if (dish.name == trim(search.value)) {
					data.shift();
				}
				data.push(Yumit.ui.dishRow({
					dishName: dish.name
				}, dish));
			}
			table.setData(data);
			isPreviewSearchFinished = true;
		}
		
	    function makeRequest(action) {
	    	Yumit.model.Dish.searchDishes({
				success: onSuccessSearch,
				queryString: (search.value != null) ? trim(search.value) : '' 
			}, action);
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
			win.close();
			_closeCallback();

		}
		
		table.addEventListener('click', function(e){
			var dishData;
			if (e.rowData.dishData.addNewDish) {
				//alert('Adding new dish');
				dishData = {name: search.value};
			} else {
				dishData = e.rowData.dishData;
			}
			var nextWin = Yumit.ui.yum_form(closeFunction, _place, dishData, _photo);
			_tab.open(nextWin, {animated:true});
		});
        
        makeRequest(Yumit.api_path+'/api/v0/places/'+ _place.id +'/dishes.json');
		
		return win;
	}
})();
