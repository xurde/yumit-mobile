var Yumit={};
Yumit.global = {};
Yumit.socialNetworks = {};
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
  '/yumit/view/sharing_settings.js',
  '/yumit/view/settings.js',
  '/yumit/view/register.js',
  '/yumit/view/login.js',
  '/yumit/view/post.js',
  '/yumit/view/missing.js',
  '/yumit/view/postyum/selectphoto.js',
  '/yumit/view/postyum/selectplace.js',
  '/yumit/view/postyum/selectdish.js'
);

var tabGroup = Titanium.UI.createTabGroup();

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

var tab3 = Titanium.UI.createTab({
    title:'Post',
	icon : 'images/photo.png',
});

tab3.window = Yumit.ui.createPostWindow();

//
//  add tabs
//
tabGroup.addTab(tab0);
tabGroup.addTab(tab3);
tabGroup.addTab(tab1);

/////////////////////////////////////////////////////////
if (Titanium.App.Properties.hasProperty("token")==0) {
    var login_window = Yumit.ui.login();  
    login_window.open();
} else {
    Titanium.App.fireEvent("Yumit:ui:showLoading",{title:"Connecting"});
    Titanium.App.fireEvent('Yumit:yums:getYumsFriends');
    setTimeout(function(){
    	Titanium.App.fireEvent('Yumit:user:fetchInfo');
        tabGroup.open();
    }, 500);
};

Titanium.App.addEventListener('Yumit:user:fetchInfo', function() {
    Yumit.model.User.fetchInfo({
        success: function(info) {
            //alert(JSON.stringify(info));
            // alert(Titanium.Facebook.loggedIn);
            Yumit.socialNetworks.facebookDisabled = (info.facebook_enabled) ? !info.facebook_enabled : true;//!Titanium.Facebook.loggedIn;
            Yumit.socialNetworks.shareOnFacebook = info.share_yums_on_facebook || false;
            Yumit.socialNetworks.twitterDisabled = (info.twitter_enabled) ? !info.twitter_enabled : true;//!Titanium.App.Properties.BH.authorized();
            Yumit.socialNetworks.shareOnTwitter = info.share_yums_on_twitter || false;
            Yumit.socialNetworks.foursquareDisabled = (info.foursquare_enabled) ? !info.foursquare_enabled : true;//!Titanium.App.Properties.Foursquare.authorized();
            Yumit.socialNetworks.shareOnFoursquare = info.share_yums_on_foursuqare || false;
            Yumit.socialNetworks.flickrDisabled = (info.flickr_enabled) ? !info.flickr_enabled : true;
            Yumit.socialNetworks.shareOnFlickr = info.share_yums_on_flickr || false;
        },
        error: function(error) {
            alert('Error occured: ' + error);
        }
    });
});

Titanium.Facebook.appid = Yumit.constants.socialNetworks.facebookAppid;
Titanium.Facebook.permissions = ['publish_stream', 'read_stream', 'offline_access'];

Ti.App.Properties.searchType = 0;

Ti.App.Properties.BH = new BirdHouse({
    consumer_key: Yumit.constants.socialNetworks.twitterConsumerKey,
    consumer_secret: Yumit.constants.socialNetworks.twitterConsumerSecret
});

Ti.include('/yumit/lib/foursquare.js');
Ti.include('yumit/lib/md5.js');
Ti.include('/yumit/lib/flickr.js');

Ti.App.Properties.Foursquare = new FoursquareAPI({
	clientId: Yumit.constants.socialNetworks.foursquareClientId,
	redirectUri: Yumit.constants.socialNetworks.foursquareRedirectUri
});

Ti.App.Properties.Flickr = new FlickrAPI(
	Yumit.constants.socialNetworks.flickrKey,
	Yumit.constants.socialNetworks.flickrSecret
);

////////////////////////////////////////////////////////
Ti.include('/yumit/view/geolocation.js');
