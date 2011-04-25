(function(){
  Yumit.ui.yums_friends = function(){
    var win = new Window({
      id: 'defaultWindow',
      title:'Activity'
    });

//////////////////////////////////////////////////////////
    var box = Ti.UI.createView({
      top:0,
      left:0,
      bottom:0,
      width:320,
      backgroundColor:Yumit.constants.darkRed
    });
    var buttonObjects = [
      {title:'Following', width:100, enabled:true},
      {title:'NearBy', width:100, enabled:true}
    ];

    var tabbar = Titanium.UI.createTabbedBar({
      labels:buttonObjects,
      backgroundColor:Yumit.constants.darkRed,
      top:5,
      style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
      height:30,
      index:0
    });

    box.add(tabbar);
    win.add(box);

    var plain = false;
    tabbar.addEventListener('click', function(e) {
       Ti.API.info("You clicked index " + e.index);
       appFilmStrip.fireEvent('changeIndex',{idx:e.index});
    });

/////////////////////////////////////////////////////////////////////

/////////////////////////////  FOLLOWING ACTIVITY
    function activity_following() {
      var tableView = Ti.UI.createTableView({
        top:0,
        minRowHeight:280
      });

      var refresh_yums = function(yums) {
        var tvData = [];
        for (var i=0,l=yums.length;i<l;i++) {
          tvData.push(Yumit.model.Yum.createYumRow(yums[i]));
        }
        tableView.setData(tvData);
      };

      tableView.addEventListener('click',function(e) {
        alert("CLICK");
        // var _yum = e.rowData;
        // var win = Yumit.ui.yum(_yum);
        // tabGroup.activeTab.open(win,{animated:true});
      });


      Yumit.model.Yum.getYumsFriends({
        success: refresh_yums
      });

      return tableView;
    }
//////////////////////////////////////////////////////////

/////////////////////////////  NEARBY ACTIVITY
      function activity_nearby() {
        var tableView = Ti.UI.createTableView({
          top:0,
          minRowHeight:280
        });

        var refresh_yums = function(yums) {
          var tvData = [];
          for (var i=0,l=yums.length;i<l;i++) {
            tvData.push(Yumit.model.Yum.createYumRow(yums[i]));
          }
          tableView.setData(tvData);
        };

        tableView.addEventListener('click',function(e) {
          alert("CLICK");
          // var _yum = e.rowData;
          // var win = Yumit.ui.yum(_yum);
          // tabGroup.activeTab.open(win,{animated:true});
        });

        Yumit.model.Yum.getYumsNearby({
          success: refresh_yums
        });

        return tableView;
      }
//////////////////////////////////////////////////////////

    var appFilmStrip = Yumit.ui.createFilmStripView({
      views: [
        activity_following(),
        activity_nearby()
      ],
      space: {top:40,bottom:0,left:0,right:0}
    });

    win.add(appFilmStrip);

    return win;
  };

})();