(function(){
  var win = Titanium.UI.currentWindow;
  var Yumit = win.Yumit;
  var annotation = Titanium.Map.createAnnotation({
    latitude:-33.44294,
    longitude:-70.6505173,
    title:"Urriola Restobar",
    subtitle:'Lastarria 70 (22 meters)',
    animate:true,
     leftButton:'images/cafe.png',
     image:'../../images/foursquare-mini.png'
  });

  var santiago = {latitude:-33.441779525,longitude:-70.6503987,latitudeDelta:0.010, longitudeDelta:0.018};
  // if (tt.geo.cords) {
  //   santiago = {latitude:tt.geo.cords.latitude,longitude:tt.geo.cords.longitude,
  //               latitudeDelta:0.010, longitudeDelta:0.018};
  // }

  //
  // CREATE MAP VIEW
  //
  var mapView = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: santiago,
    animate:true,
    regionFit:true,
    userLocation:true,
    annotations:[annotation]
  });

  //////////////////////////////////////////////////////////////////CONTINUE
  win.add(mapView);



})();