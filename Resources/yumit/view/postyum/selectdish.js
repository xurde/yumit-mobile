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
        setTimeout(function(){
        	win.leftNavButton = backButton;
        }, 500);
        
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
		var onSuccessSearch = function(dishes) {			
			var data = [];
			if (dishes.noDishes && isPreviewSearchFinished) {				
				search.focus();
				return;
			} 
			for (var i=0; i < dishes.length; i++) {
				var dish = dishes[i].dish;
				//data[i] = {title: dish.name,
				//		   dishData: dish};
				data.push(Yumit.ui.dishRow({
					dishName: dish.name
				}, dish));
			}
			if (JSON.stringify(data) == '[]') {
				data.push(Yumit.ui.dishRow({
					dishName: 'Add new dish: ' + search.value,
				}, { addNewDish: true }));
			}
			table.setData(data);
			isPreviewSearchFinished = true;
		}
		
	    function makeRequest(action) {
	    	Yumit.model.Dish.searchDishes({
				success: onSuccessSearch,
				queryString: (search.value != null) ? search.value : '' 
			}, action);
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
			win.close();
			_closeCallback();

		}
		
		table.addEventListener('click', function(e){
			if (e.rowData.dishData.addNewDish) {
				alert('Adding new dish');
			} else {
				var nextWin = Yumit.ui.yum_form(closeFunction, _place, e.rowData.dishData, _photo);
				_tab.open(nextWin, {animated:true});
			}
		});
        
        makeRequest(Yumit.api_path+'/api/v0/places/'+ _place.id +'/dishes.json');
		
		return win;
	}
})();
