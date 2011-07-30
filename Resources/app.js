var Yumit={};
Yumit.global = {};
Yumit.current = {};
Ti.include('/yumit/constants.js');
Ti.include('/yumit/lib/birdhouse.js');
var used = [Ti.UI.createLabel, Ti.UI.createAlertDialog, Ti.UI.createButton, Ti.UI.createImageView,
    Ti.UI.createAnimation, Ti.UI.createWindow, Ti.UI.createScrollView];
Ti.include('redux.js');
includeRJSSGlobal('styles/yumit.rjss');

Ti.include(
  '/yumit/ui.js',
  '/yumit/view/loading.js',
  '/yumit/model/model.js',
  '/yumit/model/Place.js',
  '/yumit/model/Yum.js',
  '/yumit/model/User.js',
  '/yumit/view/places_list.js',
  '/yumit/view/place.js',
  '/yumit/view/dish.js',
  '/yumit/view/yum_form.js',
  '/yumit/view/yums_activity.js',
  '/yumit/view/settings.js',
  '/yumit/view/login.js',
  '/yumit/view/missing.js'
);

var tabGroup = Titanium.UI.createTabGroup();

//
// ACTIVITY
//
var tab0 = Titanium.UI.createTab({
    title:'Activity',
    icon:'images/activity.png',
    window:Yumit.ui.yums_activity()
    // window:Yumit.ui.missing()
});

//
// PLACES
//
var tab1 = Titanium.UI.createTab({
    title:'Places',
    icon:'images/places.png',
    window:Yumit.ui.yum_form()
    //window:Yumit.ui.places_list()
    // window:Yumit.ui.missing()
});

// //
// // SETTINGS
// //
var tab2 = Titanium.UI.createTab({
    title:'Settings',
    icon:'images/settings.png',
    window:Yumit.ui.settings()
    // window:Yumit.ui.missing()
});

//
//  add tabs
//
tabGroup.addTab(tab0);
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);


/////////////////////////////////////////////////////////
if (Titanium.App.Properties.hasProperty("username")==0) {
  var login_window = Yumit.ui.login();
  login_window.open({modal:true});
} else {
  Titanium.App.fireEvent('Yumit:yums:getYumsFriends');
  tabGroup.open();
};
Titanium.Facebook.appid = "336361767890";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];

Ti.App.Properties.searchType = 0;

Ti.App.Properties.BH = new BirdHouse({
    consumer_key: "U1L5Rwh08FBeFqfyMgPTKA",
    consumer_secret: "QbWpQAATvDLwABZYjPN0uHcd1LSrWkp4usvBi8xY"
});

////////////////////////////////////////////////////////
Ti.include('/yumit/view/geolocation.js');


//////////////////////////////////// GLOBAL TIMER?

// var timer = null;
//
// timer = setInterval(function() {
//   Ti.API.info("Global Timer");
//   Titanium.App.fireEvent('Yumit:ui:showLoading',{title:"Obtaining Geolocation"});
//   Titanium.App.fireEvent('Yumit:core:getGeolocation');
//   if (Yumit.current.locationAdded) {
//     clearInterval(timer);
//     setTimeout(function(){Titanium.App.fireEvent("Yumit:ui:hideLoading");}, 1000);
//     Titanium.App.fireEvent('Yumit:places:getPlacesNearby');
//     Titanium.App.fireEvent('Yumit:yums:getYumsNearby');
//   };
// }, 2000);
//