(function(){
  Yumit.ui.settings = function(){

    var data = [
      {title:'Edit profile', hasChild:true, color:Yumit.constants.darkRed},
      {title:'Edit sharing settings', hasChild:true, color:Yumit.constants.darkRed},
      {title:'Logout', color:Yumit.constants.darkRed}
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
        alert("Edit your profile");
      };

      if (index == 1) {
        var win = Yumit.ui.webview();
        tabGroup.activeTab.open(win,{animated:true});
      };

      if (index == 2) {
        alert("logout");
      };
    });

    // add table view to the window
    var settings_window = new Window({
      id: 'defaultWindow',
      title: 'Settings',
      backgroundColor:'#FFF'
    });
    settings_window.add(tableview);

    return settings_window;
  };

  Yumit.ui.webview = function(){
    var win = new Window({
      id: 'defaultWindow',
      title:'Sharing',
      backgroundColor: '#FFF'
    });

    var webview = Titanium.UI.createWebView({
      url:'http://yumit20.yumit.com/login_mobile?u=pablete&p=pablete&mobile=1'
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
  };
})();