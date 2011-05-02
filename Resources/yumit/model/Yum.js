(function(){
  var place_image = function(_place) {
    return (_place.origin == "yumit") ? '/images/yumit-icon.png' : _place.icon ;
  };
  Yumit.model.Yum = {

    //return places nearby
    // getPlacesNearby: function(/*Object*/ _args) {
    //   var params={ query:'' };
    //   if (_args.query) {
    //     params.query = _args.query;
    //   }
    //   Yumit.model.request({
    //     method:'GET',
    //     action:'http://dev.yumit.com/api/v0/places/nearby', //'?latlon=-33.441355,-70.650566',
    //     //parameters: params,
    //     //parameters: 'latlon=-33.441779525,-70.6503987',
    //     parameters: 'latlon=-33.441779525,-70.6503987&query='+(params.query || ''),
    //     error: function(e,xhr) {
    //       Yumit.ui.alert('Arguments', _args.error);
    //     },
    //     success: function(json,xhr) {
    //       var results = [];
    //       for (var i=0,l=json.length;i<l;i++) {
    //         results.push(json[i]);
    //       }
    //       if (_args.success) { _args.success(results); }
    //     }
    //   });
    // },

    //return yums from your friends
    getYumsFriends: function(/*Object*/ _args) {
      Yumit.model.request({
        method:'GET',
        action:'http://dev.yumit.com/api/v0/yums/friends.json',
        username:'pablete', //Titanium.App.Properties.getString("username"),
        password:'pablete', //Titanium.App.Properties.getString("password"),
        parameters: '',
        error: function(e,xhr) {
          Yumit.ui.alert('Arguments', _args.error);
        },
        success: function(json,xhr) {
          var results = [];
          for (var i=0,l=json.length;i<l;i++) {
            results.push(json[i].yum);
          }
          if (_args.success) { _args.success(results); }
        }
      });
    },

    //return yums nearby your current location
    getYumsNearby: function(/*Object*/ _args) {
      Yumit.model.request({
        method:'GET',
        action:'http://dev.yumit.com/api/v0/yums/nearby.json',
        parameters: 'latlon=-33.441779525,-70.6503987',
        error: function(e,xhr) {
          Yumit.ui.alert('Arguments', _args.error);
        },
        success: function(json,xhr) {
          var results = [];
          for (var i=0,l=json.length;i<l;i++) {
            results.push(json[i].yum);
          }
          if (_args.success) { _args.success(results); }
        }
      });
    },
    //create a place row from the given data from yumit
    createYumRow: function(_yum) {
      var row = Ti.UI.createTableViewRow({
        backgroundSelectedColor: Yumit.constants.grayColor,
        height:'auto',
        yum_id: _yum.id,
        yum_text: _yum.text,
        yum_dish_name: _yum.dish_name,
        yum_place_name: _yum.place_name
      }),
      spacing = 6,
      imgDimensions = 45,
      nameHeight = 18,
      metaHeight = 14;
      var icon = new ImageView({
       id:'defaultImageView',
       image: _yum.user_photo_url
      });
      row.add(icon);

      var user_and_place = new Label({
        id:'labelBold',
        text: _yum.user_login + " @ " + _yum.place_name
      });
      row.add(user_and_place);

      var dish_name = new Label({
        id:'labelBold',
        top: 25,
        color: Yumit.constants.darkRed,
        text: _yum.dish_name
      });
      row.add(dish_name);


      var distance = new Label({
        id:'labelLight',
        top: 45,
        text:_yum.created_at_in_words +" ago"
      });
      row.add(distance);

      var full_yum = new ImageView({
       id:'yumImageView',
       image: _yum.photo_url_big
      });
      row.add(full_yum);

      var description = new Label({
        id:'labelNormal',
        top:370,
        left:spacing,
        text: _yum.text || ""
      });
      row.add(description);

//////////////////////////////////////// TAGS HACK
      var daview = Ti.UI.createView({
          backgroundColor:"#FFFFFF",
          top:405,
          height:40,
          width:320,
          layout:'horizontal'
      });

      total_tags = _yum.tags_as_string.length;
      if (total_tags>0) {
        for(var i=0; i<total_tags; i++) {
          var tag_color = "#BBB";
          if (_yum.tags_as_string[i][0] === "@") {
            tag_color = "#69F";
          }
          if (_yum.tags_as_string[i][0] === "#") {
            tag_color = "#000";
          }
          var tags = new Label({
            id:'yumLabelTags',
            backgroundColor:tag_color,
            left:5,
            width:'auto',
            height:20,
            text: " "+_yum.tags_as_string[i]+" "
          });
          daview.add(tags);
        };
      };

      row.add(daview);

/////////////////////////////

      return row;
    }

  };
})();