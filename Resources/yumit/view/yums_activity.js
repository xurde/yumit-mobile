(function(){
  Yumit.ui.yums_activity = function(){
    var win = new Window({
      id: 'defaultWindow',
      title:'Activity'
    });

    var map_button = Titanium.UI.createButton({
      systemButton:Titanium.UI.iPhone.SystemButton.CAMERA
    });
    win.rightNavButton = map_button;

    var tabView = Yumit.ui.createtabbedNavigation({
      labels:[{title:'Following', enabled:true},
              {title:'Nearby', enabled:false}],
      callback: function(i) { appFilmStrip.fireEvent('changeIndex',{idx: i});}
    });

    win.add(tabView);

    ////////////////////////////////////////////////////////////////////

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
            activity_nearby(),
            activity_nearby()
          ],
          space: {top:35,bottom:0,left:0,right:0}
        });

        win.add(appFilmStrip);

    return win;
  };

})();