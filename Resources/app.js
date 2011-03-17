var Yumit={};
Ti.include('/yumit/constants.js');

Ti.include('redux.js');
includeRJSSGlobal('styles/yumit.rjss');

var used = [Ti.UI.createLabel, Ti.UI.createAlertDialog, Ti.UI.createButton, Ti.UI.createImageView,
    Ti.UI.createAnimation, Ti.UI.createWindow, Ti.UI.createScrollView];

var tabGroup = Titanium.UI.createTabGroup();

Ti.include(
  '/yumit/ui.js',
  '/yumit/model/model.js',
  '/yumit/model/Place.js',
  '/yumit/view/places_list.js',
  '/yumit/view/place.js',
  '/yumit/view/dish.js',
  '/yumit/view/yum_form.js'
);

var tab1 = Titanium.UI.createTab({
    title:'Places',
    icon:'images/places.png',
    window:Yumit.ui.places_list()
});

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({
    title:'Map',
    url:'yumit/view/places_map.js'
});
win2.Yumit = Yumit;
var tab2 = Titanium.UI.createTab({
    title:'Map',
    icon:'images/settings.png',
    window:win2
});

//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

// open tab group
tabGroup.open();
