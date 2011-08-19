(function(){
	Yumit.ui.selectDishForm = function(_tab, _photo, _place) {
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
		    barColor: '#000',
		    height: 40,
		    showCancel: true,
		    top: 0
		});
		win.add(search);
        
		var table = Titanium.UI.createTableView({
			top: 40
		});
		win.add(table);
		
		
		var onSuccessSearch = function(dishes) {
			var data = [];
			for (var i=0; i < dishes.length; i++) {
				var dish = dishes[i].dish;
				data[i] = {title: dish.name,
						   dishData: dish};
			}
			table.setData(data);
		}
	    
	    function makeRequest() {
	    	Yumit.model.Dish.searchDishes({
				success: onSuccessSearch,
				queryString: (search.value != null) ? search.value : '' 
			});
	    }
		
		search.addEventListener('return', function(e){
			search.blur();
		});
		
		search.addEventListener('cancel', function(e){
			search.blur();
		});
		
		search.addEventListener('change', function(e){
			makeRequest();
		});
		
		table.addEventListener('click', function(e){
			var nextWin = Yumit.ui.yum_form(_place, e.rowData.dishData, _photo);
			_tab.open(nextWin, {animated:true});
		});
        
        makeRequest();
		
		return win;
	}
})();
