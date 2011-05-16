/*
--------------------------------------------
           API  Works for Android/iPhone
--------------------------------------------

  Titanium.App.fireEvent("Yumit:ui:showLoading",{title:"Obtaining Geolocation"});

  Titanium.App.fireEvent("Yumit:ui:changeLoading",{title:"Obtaining new Places"});

  Titanium.App.fireEvent("Yumit:ui:hideLoading");

*/


// ---------------------------------------------------------------
// Create custom loading indicator
// ---------------------------------------------------------------
Yumit.loading ={};
Yumit.loading.loadingShowing = false;
Yumit.loading.loadingWindow = null;
Yumit.loading.activitySpinner = null;
Yumit.loading.androidSpinner = null;

(function(){
  // ----------------------------
  // Show Loading spinner window
  // ----------------------------
  Yumit.ui.showLoading = function(_title) {
    Yumit.loading.loadingShowing = true;
    Ti.API.info("showLoading with title: " + _title);

    // window container
    Yumit.loading.loadingWindow = Titanium.UI.createWindow({
      height:150,
      width:150
    });

    // black view
    var blackView = Titanium.UI.createView({
      height:150,
      width:150,
      backgroundColor:'#000',
      borderRadius:10,
      opacity:0.6
    });
    Yumit.loading.loadingWindow.add(blackView);

    // loading indicator
    Yumit.loading.activitySpinner = Titanium.UI.createActivityIndicator({
      style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
      height:30,
      width:30
    });
    Yumit.loading.loadingWindow.add(Yumit.loading.activitySpinner);

    // message
    var message = Titanium.UI.createLabel({
      text:_title,
      color:'#fff',
      width:'auto',
      height:'auto',
      font:{fontSize:15,fontWeight:'bold'},
      textAlign:'center',
      bottom:18
    });
    Yumit.loading.loadingWindow.add(message);
    Yumit.loading.loadingWindow.open();
    Yumit.loading.activitySpinner.show();
  };
  // ----------------------------
  // Hide Loading spinner window
  // ----------------------------
  Yumit.ui.hideLoading = function() {
    Yumit.loading.loadingShowing = false;
    Yumit.loading.activitySpinner.hide();
    Yumit.loading.loadingWindow.close({opacity:0,duration:500});
  };

  // ---------------------------------------------------------------
  // Add global event handlers to hide/show custom indicator
  // ---------------------------------------------------------------
  Titanium.App.addEventListener('Yumit:ui:showLoading', function(e) {
    Ti.API.info("after_show");
    if(e.title == null) { e.title = 'Loading'; };
    if(Ti.Platform.name == 'android') {
      Yumit.loading.androidSpinner = Titanium.UI.createActivityIndicator({message:e.title});
      Yumit.loading.androidSpinner.show();
    } else {
      if(Yumit.loading.loadingShowing == true) { Yumit.ui.hideLoading(); };
      Yumit.ui.showLoading(e.title);
    };

  });

  Titanium.App.addEventListener('Yumit:ui:changeLoading', function(e) {
    Ti.API.info("after_change");
    if(e.title) {
      if(Ti.Platform.name == 'android') {
        Yumit.loading.androidSpinner.hide();
        Yumit.loading.androidSpinner = Titanium.UI.createActivityIndicator({message:e.title});
        // Yumit.loading.androidSpinner.message = e.title;
        Yumit.loading.androidSpinner.show();
      } else {
        Yumit.ui.hideLoading();
        Yumit.ui.showLoading(e.title);
      };
    };
  });

  Titanium.App.addEventListener('Yumit:ui:hideLoading', function(e) {
    Ti.API.info("after_hide");
    if(Ti.Platform.name == 'android') {
      Yumit.loading.androidSpinner.hide();
    } else {
      Yumit.ui.hideLoading();
    };
  });

})();