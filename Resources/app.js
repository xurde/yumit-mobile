var Yumit={};

Ti.include(
	'/yumit/styles.js',
	'/yumit/ui.js',
	'/yumit/model/model.js',
	'/yumit/model/Place.js'
);

var tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({ 
    title:'Placeswindow', 
    url:'yumit/view/places_list.js'
});
win1.Yumit = Yumit;
var tab1 = Titanium.UI.createTab({  
    title:'Placestab',
    icon:'KS_nav_views.png',
    window:win1
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
    icon:'KS_nav_ui.png',
    window:win2
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

// open tab group
tabGroup.open();  