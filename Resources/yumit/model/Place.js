(function(){
  Yumit.model.Place = {
    distanceInMeters: function(_place) {
      return _place.location.distance+" meters";
    },

    safeSubString: function(_str, _len) {
      return (_str.length > _len) ? _str.substr(_str, (_len-3))+"..." : _str ;
    },

    //return places nearby
    getPlacesNearby: function(/*Object*/ _args) {
      var params={ query:'' };
      if (_args.query) {
        params.query = _args.query;
      }
      params.location = _args.location;
      Yumit.model.request({
        method:'GET',
        action:'http://new.yumit.com/api/v0/places/nearby.json',
        parameters: 'latlon='+params.location+'&query='+params.query,
        error: function(e,xhr) {
          Yumit.ui.alert('Arguments', _args.error);
        },
        success: function(json,xhr) {
          var results = [];
          for (var i=0,l=json.length;i<l;i++) {
            results.push(json[i]);
          }
          if (_args.success) { _args.success(results); }
        }
      });
    },

    //return places nearby
    getDishes: function(/*Object*/ _args) {
      Yumit.model.request({
        method:'GET',
        action:'http://new.yumit.com/api/v0/places/'+_args.place_id+'/dishes.json',
        parameters: '',
        error: function(e,xhr) {
          Yumit.ui.alert('Arguments', _args.error);
        },
        success: function(json,xhr) {
          var results = [];
          for (var i=0,l=json.length;i<l;i++) {
            results.push(json[i].dish);
          }
          if (_args.success) { _args.success(results); }
        }
      });
    },

    //return places nearby
    getUsers: function(/*Object*/ _args) {
      Yumit.model.request({
        method:'GET',
        action:'http://new.yumit.com/api/v0/places/'+_args.place_id+'/users.json',
        parameters: '',
        error: function(e,xhr) {
          Yumit.ui.alert('Arguments', _args.error);
        },
        success: function(json,xhr) {
          var results = [];
          for (var i=0,l=json.length;i<l;i++) {
            results.push(json[i].user);
          }
          if (_args.success) { _args.success(results); }
        }
      });
    },
    //create a place row from the given data from yumit
    createPlaceRow: function(_place) {
      var row = Ti.UI.createTableViewRow({
        backgroundColor: "#FFF",
        backgroundSelectedColor: Yumit.constants.grayColor,
        height:60,
        place_id: _place.id,
        place_name: _place.name,
        place_image: _place.icon,
        place_address:  _place.location.address || "",
        place_origin: _place.origin,
        place_lat: _place.location.lat,
        place_lng: _place.location.lng
      }),
        spacing = 6,
        imgDimensions = 45,
        nameHeight = 18,
        metaHeight = 14;

      var icon = new ImageView({
        id:'defaultImageView',
        image: _place.icon
      });
      row.add(icon);

      var name = new Label({
        id:'labelBold',
        text: _place.name
      });
      row.add(name);

      var address = new Label({
        id:'labelNormal',
        text: _place.location.address || ""
      });
      row.add(address);

      var distance = new Label({
        id:'labelLight',
        text:Yumit.model.Place.distanceInMeters(_place)
      });
      row.add(distance);

      return row;
    },

    //create a place row from the given data from yumit
    createDishRow: function(_dish) {
      var row = Ti.UI.createTableViewRow({
        backgroundSelectedColor: Yumit.constants.grayColor,
        height:'auto',
        //height:Yumit.constants.spacing*2+Yumit.constants.imgDimensions+5,
        dish_id: _dish.id,
        dish_name: _dish.name,
        dish_photo:_dish.photo,
        dish_category_name:_dish.category_name,
        dish_yums_count:_dish.count
      });

      var icon = new ImageView({id:'defaultImageView', image:_dish.photo });
      row.add(icon);

      var name = new Label({
        id:'labelBold',
        text: Yumit.model.Place.safeSubString(_dish.name, 30)
      });
      row.add(name);

      var category_name = new Label({
        id:'labelNormal',
        text: _dish.category_name
      });
      row.add(category_name);

      var yum_count = new Label({
        id:'labelLight',
        text:"("+_dish.count+" yums)"
      });
      row.add(yum_count);

      return row;
    },

    //create a place row from the given data from yumit
    createUserRow: function(_user) {
      _user.name = _user.name || "";
      var row = Ti.UI.createTableViewRow({
        backgroundSelectedColor: Yumit.constants.grayColor,
        height:'auto',
        //height:Yumit.constants.spacing*2+Yumit.constants.imgDimensions+5,
        user_id: _user.id,
        user_login: _user.login,
        user_photo:_user.photo_url_thumb,
        user_name:_user.name,
        user_yums_count:_user.yums_count
      });

      var icon = new ImageView({id:'defaultImageView', image:_user.photo_url_thumb });
      row.add(icon);

      var login = new Label({
        id:'labelBold',
        text: Yumit.model.Place.safeSubString(_user.login, 30)
      });
      row.add(login);

      var name = new Label({
        id:'labelNormal',
        text: Yumit.model.Place.safeSubString(_user.name, 40)
      });
      row.add(name);

      var yum_count = new Label({
        id:'labelLight',
        text:"("+_user.count+" yums)"
      });
      row.add(yum_count);

      return row;
    },

    createPlaceAnnotation: function(_place) {
       var annotation = Titanium.Map.createAnnotation({
         latitude:_place.location.lat,
         longitude:_place.location.lng,
         title:_place.name,
         subtitle:_place.location.address+" ("+_place.location.distance+" meters)",
         animate:true,
          rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
          leftButton: '../../image/default.png'
       });

       annotation.addEventListener('click',function (e) {
         if (e.clicksource == 'rightButton') {
           var y = {
             place_id: _place.id,
             place_name: _place.name,
             place_image: _place.icon,
             place_address:  _place.location.address || "",
             place_origin: _place.origin,
             place_lat: _place.location.lat,
             place_lng: _place.location.lng
           };
          //remember not to choose stupid naming conventions next time
          tabGroup.activeTab.open(Yumit.ui.place(y),{animated:true});
         };
       });

       return annotation;
     }
  };
})();