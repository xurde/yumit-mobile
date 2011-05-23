(function(){
  Yumit.ui.mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    //TODO change region for the region around a guessed user location instead
    //region: {latitude:-33.441779525,longitude:-70.6503987,latitudeDelta:0.0025, longitudeDelta:0.0045},
    animate:true,
    regionFit:true,
    userLocation:true
  });
})();