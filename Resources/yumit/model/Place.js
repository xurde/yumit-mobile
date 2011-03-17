(function(){
  var place_image = function(_place) {
    return (_place.origin == "yumit") ? '/images/yumit-icon.png' : _place.icon ;
  };
  Yumit.model.Place = {
    distanceInMeters: function(place) {
      return place.location.distance+" meters";
    },

    //return places nearby
    getPlacesNearby: function(/*Object*/ _args) {
      var params={ query:'' };
      if (_args.query) {
        params.query = _args.query;
      }
      Yumit.model.request({
        method:'GET',
        action:'http://dev.yumit.com/api/v0/places/nearby', //'?latlon=-33.441355,-70.650566',
        //parameters: params,
        //parameters: 'latlon=-33.441779525,-70.6503987',
        parameters: 'latlon=-33.441779525,-70.6503987&query='+(params.query || ''),
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
        action:'http://dev.yumit.com/api/v0/places/'+_args.place_id+'/dishes.json',
      //  parameters: '',
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

    //create a place row from the given data from yumit
    createPlaceRow: function(_place) {
      var row = Ti.UI.createTableViewRow({
        selectedBackgroundColor: Yumit.constants.grayColor, //I know, this is dumb, but it's currently inconsistent x-platform
        backgroundSelectedColor: Yumit.constants.grayColor,
        className:'tvRow',
        height:'auto',
        place_id: _place.id,
        place_name: _place.name,
        place_image: place_image(_place),
        place_address:  _place.location.address || "",
        place_origin:_place.origin
      }),
      spacing = 6,
      imgDimensions = 45,
      nameHeight = 18,
      metaHeight = 14;

      var avatar = Ti.UI.createImageView({
        top:spacing,
        left:spacing,
        height:imgDimensions,
        width:imgDimensions,
        borderRadius:5,
        image: (_place.origin == "yumit") ? 'images/yumit-icon.png' : _place.icon
      });
      row.add(avatar);

      var avatarOffset = spacing*2+imgDimensions;

      var name = Ti.UI.createLabel({
        color:'#000000',
        font: {
          fontFamily:Yumit.constants.fontFamily,
          fontSize:14,
          fontWeight:'bold'
        },
        text: _place.name,
        top:spacing,
        left:avatarOffset,
        height:nameHeight
      });
      row.add(name);

      var address = Ti.UI.createLabel({
        color:Yumit.constants.textColor,
        font: {
          fontFamily:Yumit.constants.fontFamily,
          fontSize:12
        },
        height:'auto',
        text: _place.location.address || "",
        top: spacing+nameHeight,
        left:avatarOffset,
        right:spacing,
        textAlign:'left'
      });
      row.add(address);

      var distance = Ti.UI.createLabel({
        color:Yumit.constants.grayTextColor,
        font: {
          fontFamily:Yumit.constants.fontFamily,
          fontSize:10
        },
        height:'auto',
        text:Yumit.model.Place.distanceInMeters(_place),
        width:'auto',
        top:spacing,
        right:spacing
      });
      row.add(distance);

      return row;
    },

    //create a place row from the given data from yumit
    createDishRow: function(_dish) {
      var row = Ti.UI.createTableViewRow({
        selectedBackgroundColor: Yumit.constants.grayColor, //I know, this is dumb, but it's currently inconsistent x-platform
        backgroundSelectedColor: Yumit.constants.grayColor,
        className:'tvRow',
        height:'auto',
        dish_id: _dish.id,
        dish_name: _dish.name,
        dish_photo:_dish.photo,
        dish_category_name:_dish.category_name,
        dish_yums_count:_dish.yums_count
      }),
      spacing = 6,
      imgDimensions = 45,
      nameHeight = 18,
      metaHeight = 14;

      var avatar = Ti.UI.createImageView({
        top:spacing,
        left:spacing,
        height:imgDimensions,
        width:imgDimensions,
        borderRadius:5,
        image:_dish.photo
      });
      row.add(avatar);

      var avatarOffset = spacing*2+imgDimensions;

      var name = Ti.UI.createLabel({
        color:'#000000',
        font: {
          fontFamily:Yumit.constants.fontFamily,
          fontSize:14,
          fontWeight:'bold'
        },
        text: (_dish.name.length > 30) ? _dish.name.substr(name, 27)+"..." : _dish.name,
        top:spacing,
        left:avatarOffset,
        height:nameHeight
      });
      row.add(name);

      var address = Ti.UI.createLabel({
        color:Yumit.constants.textColor,
        font: {
          fontFamily:Yumit.constants.fontFamily,
          fontSize:12
        },
        height:'auto',
        text: _dish.category_name,
        top: spacing+nameHeight,
        left:avatarOffset,
        right:spacing,
        textAlign:'left'
      });
      row.add(address);

      var distance = Ti.UI.createLabel({
        color:Yumit.constants.grayTextColor,
        font: {
          fontFamily:Yumit.constants.fontFamily,
          fontSize:10
        },
        height:'auto',
        text:"("+_dish.yums_count+" yums)",
        width:'auto',
        top:spacing,
        right:spacing
      });
      row.add(distance);

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
          leftButton: '../../images/default.png', //(_place.origin == "yumit") ? 'images/default.png' : _place.icon,
          image: (_place.origin == "yumit") ? '../../images/yumit-mini.png' : '../../images/foursquare-mini.png'
       });
       annotation.addEventListener('click', function(e){
          if (e.clicksource == 'rightButton') {
            Titanium.UI.createAlertDialog({title:_place.name, message:"Touched"}).show();
         }
       });
       return annotation;
     }
  };
})();