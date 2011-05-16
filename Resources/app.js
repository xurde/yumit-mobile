var Yumit={};
Yumit.global = {};
Ti.include('/yumit/constants.js');

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
  '/yumit/view/places_list.js',
  '/yumit/view/place.js',
  '/yumit/view/dish.js',
  '/yumit/view/yum_form.js',
  '/yumit/view/yums_activity.js',
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
    window:Yumit.ui.places_list()
    // window:Yumit.ui.missing()
});

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({
    id: 'defaultWindow',
    title:'Map',
    url:'yumit/view/places_map.js'
});
win2.Yumit = Yumit;
var tab2 = Titanium.UI.createTab({
    title:'Dishes',
    icon:'images/dishes.png',
    window:win2
});

//
// SETTINGS
//
var tab3 = Titanium.UI.createTab({
    title:'Settings',
    icon:'images/settings.png',
    window:Yumit.ui.missing()
});

//
//  add tabs
//
tabGroup.addTab(tab0);
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);

// open tab group
tabGroup.open();