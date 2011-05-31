(function(){

  Titanium.App.fireEvent('Yumit:ui:showLoading',{title:"Obtaining Geolocation"});

  Ti.Geolocation.preferredProvider = "gps";

  if (Yumit.IPhone3_2_Plus) {
    //NOTE: starting in 3.2+, you'll need to set the applications
    //purpose property for using Location services on iPhone
    Ti.Geolocation.purpose = "Yumit Places Lookup";
  }

  function translateErrorCode(code) {
    if (code == null) {
      return null;
    };
    switch (code) {
      case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
        return "Location unknown";
      case Ti.Geolocation.ERROR_DENIED:
        return "Access denied";
      case Ti.Geolocation.ERROR_NETWORK:
        return "Network error";
      case Ti.Geolocation.ERROR_HEADING_FAILURE:
        return "Failure to detect heading";
      case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
        return "Region monitoring access denied";
      case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
        return "Region monitoring access failure";
      case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
        return "Region monitoring setup delayed";
    };
  };

  Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

  Titanium.Geolocation.distanceFilter = 20;

  Yumit.locationCallback = function(e) {
   if (!e.success || e.error) {
     Ti.API.info("Code translation: "+translateErrorCode(e.code));
     alert('error ' + JSON.stringify(e.error));
     return;
   };

   Yumit.current.locationAdded = true;
   Yumit.current.longitude = e.coords.longitude;
   Yumit.current.latitude = e.coords.latitude;
   Yumit.current.accuracy = e.coords.accuracy;
   Yumit.current.timestamp = e.coords.timestamp;

   Titanium.API.info('geo - location obtained: ' + new Date(e.coords.timestamp) + ' long ' + e.coords.longitude + ' lat ' + e.coords.latitude + ' accuracy ' + e.coords.accuracy);

   setTimeout(function(){Titanium.App.fireEvent("Yumit:ui:hideLoading");}, 1000);
   Titanium.App.fireEvent('Yumit:places:getPlacesNearby');
   Titanium.App.fireEvent('Yumit:yums:getYumsNearby');
  };

  Titanium.Geolocation.getCurrentPosition(Yumit.locationCallback);

  // this fires whenever the distance filter is surpassed
  Titanium.Geolocation.addEventListener('location', Yumit.locationCallback);

  if (Yumit.android)
   {
     //  as the destroy handler will remove the listener, only set the pause handler to remove if you need battery savings
     Ti.Android.currentActivity.addEventListener('pause', function(e) {
       Ti.API.info("pause event received");

       if (Yumit.current.locationAdded) {
         Ti.API.info("removing location callback on pause");
         Titanium.Geolocation.removeEventListener('location', Yumit.locationCallback);
         Yumit.current.locationAdded = false;
       }
     });
     Ti.Android.currentActivity.addEventListener('destroy', function(e) {
       Ti.API.info("destroy event received");

       if (Yumit.current.locationAdded) {
         Ti.API.info("removing location callback on destroy");
         Titanium.Geolocation.removeEventListener('location', Yumit.locationCallback);
         Yumit.current.locationAdded = false;
       }
     });
     Ti.Android.currentActivity.addEventListener('resume', function(e) {
       Ti.API.info("resume event received");

       if (!Yumit.current.locationAdded) {
         Ti.API.info("adding location callback on resume");
         Titanium.Geolocation.addEventListener('location', Yumit.locationCallback);
         Yumit.current.locationAdded = true;
       }
     });
   };

})();