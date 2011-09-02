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
  '/yumit/model/Dish.js',
  '/yumit/view/places_list.js',
  '/yumit/view/place.js',
  '/yumit/view/dish.js',
  '/yumit/view/yum_form.js',
  '/yumit/view/yums_activity.js',
  '/yumit/view/settings.js',
  '/yumit/view/register.js',
  '/yumit/view/login.js',
  '/yumit/view/missing.js',
  '/yumit/view/postyum/selectphoto.js',
  '/yumit/view/postyum/selectplace.js',
  '/yumit/view/postyum/selectdish.js'
);

var tabGroup = Titanium.UI.createTabGroup();
tabGroup.addEventListener('click', function(e) {
	alert(tabGroup.activeTab);
	if(tabGroup.activeTab == 1) {
		post();
	};
});

//
// ACTIVITY
//
var tab0 = Titanium.UI.createTab({
    title:'Activity',
    icon:'images/activity.png',
    //window:Yumit.ui.yums_activity()
    // window:Yumit.ui.missing()
});
tab0.window = Yumit.ui.yums_activity(tab0);

tab0.window.addEventListener('focus', function() {
	Yumit.ui.lastActiveTab = tab0;
});
//
// PLACES
//
var tab1 = Titanium.UI.createTab({
    title:'Places',
    icon:'images/places.png',
    //window:Yumit.ui.yum_form()
    // window:Yumit.ui.missing()
});
tab1.window = Yumit.ui.places_list(tab1);
tab1.window.addEventListener('focus', function() {
	Yumit.ui.lastActiveTab = tab1;
});

// //
// // SETTINGS
// //
// var tab2 = Titanium.UI.createTab({
    // title:'Settings',
    // icon:'images/settings.png',
    // window:Yumit.ui.settings()
    // // window:Yumit.ui.missing()
// });


// //
// // POSTING
// //

	var win = new Window({
		id : 'defaultWindow',
		title : 'Post',
		backgroundColor : '#FFF'
	});

	var post = function() {
		Yumit.ui.selectPhoto(Yumit.ui.lastActiveTab, function(photo) {
			var nextWin = Yumit.ui.selectPlaceForm(Yumit.ui.lastActiveTab, photo);
			Yumit.ui.lastActiveTab.open(nextWin, {
				animated : true
			});
		})
	};

	var leftNavButton = Titanium.UI.createButton({

		title : 'Activity',
		image : 'images/activity.png',
	});
	leftNavButton.addEventListener('click', function(e) {
		tabGroup.setActiveTab(tab0);
	});

	win.leftNavButton = leftNavButton;

	var rightNavButton = Titanium.UI.createButton({
		title : 'Places',
		icon : 'images/places.png',
	});

	rightNavButton.addEventListener('click', function() {
		tabGroup.setActiveTab(tab3);
	});
	win.rightNavButton = rightNavButton;

	var tab3 = Titanium.UI.createTab({
		title:'Post',
		icon : 'images/photo.png',
		//icon: 'images/default.png',
		//backgroundImage: 'images/default.png',
		window : win
	});

	//win.hide();
	//tab3.icon = 'images/photo.png';
	win.addEventListener('focus', function() {
		post();
		tabGroup.setActiveTab(Yumit.ui.lastActiveTab||tab0);
		
		// Yumit.ui.selectPhoto(tab3, function() {
			// var nextWin = Yumit.ui.selectPlaceForm(tab3, photo);
			// tab3.open(nextWin, {
				// animated : true
			// });
		// })
	});


//
//  add tabs
//
tabGroup.addTab(tab0);
tabGroup.addTab(tab3);
//tabGroup.addTab(tab2);
tabGroup.addTab(tab1);


/////////////////////////////////////////////////////////
if (Titanium.App.Properties.hasProperty("token")==0) {
  var login_window = Yumit.ui.login();
  login_window.open();//{modal:true});
} else {
  Titanium.App.fireEvent('Yumit:yums:getYumsFriends');
  //tabGroup.open();
  setTimeout(function(){
    tabGroup.open();
  }, 500);
};
Titanium.Facebook.appid = "336361767890";
Titanium.Facebook.permissions = ['publish_stream'];

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