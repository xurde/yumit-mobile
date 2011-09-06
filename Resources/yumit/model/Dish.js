(function(){
  Yumit.model.Dish = {
  	
  	searchDishes: function(/*Object*/ _args, _action) {

      Yumit.model.request({
        method:'GET',
        action:_action || Yumit.api_path+'/api/v0/dishes/search.json',
        parameters: 'querystring='+_args.queryString,
        error: function(e,xhr) {
          alert('can not find dish');
        },
        success: function(json,xhr) {
          if (_args.success) { 
          	_args.success(json); 
          }
        }
      });
    }
    
  };
})();