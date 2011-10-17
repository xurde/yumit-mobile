(function(){
  Yumit.ui.settings = function(){

    var data = [
      {title:'Edit profile', hasChild:true, color:Yumit.constants.darkRed},
      {title:'Edit avatar', hasChild:true, color:Yumit.constants.darkRed},
      {title:'Sharing settings', hasChild:true, color:Yumit.constants.darkRed},
      {title:'Logout', color:Yumit.constants.darkRed}//,
      //{title:'Close', color:Yumit.constants.darkRed}
    ];

    // create table view
    var tableview = Titanium.UI.createTableView({
      data:data,
      style: Titanium.UI.iPhone.TableViewStyle.GROUPED
    });

    // create table view event listener
    tableview.addEventListener('click', function(e)
    {
      // event data
      var index = e.index;
      var section = e.section;

      if (index == 0) {
      	Titanium.App.fireEvent("Yumit:ui:showLoading",{title:"Connecting"});
    	//Titanium.App.fireEvent('Yumit:profile:fetchInfo');
    	//setTimeout(function() {
      	  var win = Yumit.ui.profile();
      	  Titanium.App.fireEvent('Yumit:profile:fetchInfo');
          tabGroup.activeTab.open(win, {animated:true});
        //}, 500);
      }
      
      if (index == 1) {
      	Titanium.App.fireEvent("Yumit:ui:showLoading",{title:"Connecting"});
          //alert('Change avatar');
          var win = Yumit.ui.changeAvatar();
      	  Titanium.App.fireEvent('Yumit:avatar:fetchInfo');
          tabGroup.activeTab.open(win, {animated:true});
      }

      if (index == 2) {
        var win = Yumit.sharing_settings();//Yumit.ui.webview();
        tabGroup.activeTab.open(win,{animated:true});
      }

      if (index == 3) {
        Titanium.App.Properties.removeProperty("token");
        var login_window = Yumit.ui.login();
        login_window.open();
        settings_window.close({opacity:0, duration:500});
      }
     
      // if (index == 3) {
      	// settings_window.close();
      // };
      
    });

	/*var backButton = Titanium.UI.createButton({
      title: 'Back',
      style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
    });*/
    
    // add table view to the window
    var settings_window = new Window({
      id: 'defaultWindow',
      title: 'Settings',
      backgroundColor:'#FFF',
      tabBarHidden: true,
      backButtonTitle: 'Close'
    });
    settings_window.add(tableview);
    //settings_window.leftNavButton = backButton;
    
    /*backButton.addEventListener('click', function(){
      settings_window.close();
    });*/

    return settings_window;
  };

  /*Yumit.ui.webview = function(){
    var win = new Window({
      id: 'defaultWindow',
      title:'Sharing',
      backgroundColor: '#FFF'
    });

    var login_mobile_url = Yumit.api_path+'/login_mobile';
    login_mobile_url += '?u='+Titanium.App.Properties.getString("username");
    login_mobile_url += '&p='+Titanium.App.Properties.getString("password");
    login_mobile_url += '&mobile=1';
    var webview = Titanium.UI.createWebView({
      url:login_mobile_url
    });

    var backButton = Ti.UI.createButton({title: 'Back'});
    backButton.addEventListener('click', function(e){
        if (webview.canGoBack()) {
            webview.goBack();
        }
        else {
         win.close();
        }

    });
    win.leftNavButton = backButton;

    win.add(webview);

    return win;
  };*/
})();