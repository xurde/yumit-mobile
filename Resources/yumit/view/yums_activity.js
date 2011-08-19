(function(){
  Yumit.ui.yums_activity = function(_tab){
    var win = new Window({
      id: 'defaultWindow',
      title:'Activity'
    });

    var map_button = Titanium.UI.createButton({
      systemButton:Titanium.UI.iPhone.SystemButton.CAMERA
    });
    win.rightNavButton = map_button;
    
    var onPhotoSelect = function(photo) {
    	var nextWin = Yumit.ui.selectPlaceForm(_tab, photo);
    	_tab.open(nextWin, {animated:true});
    }
    

    
    map_button.addEventListener('click', function(e) {
    	Yumit.ui.selectPhoto(win, onPhotoSelect);
    	//onPhotoSelect();
    });

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

          ///////////////////////
          // PSEUDO API
          ///////////////////////

          Titanium.App.addEventListener('Yumit:yums:getYumsFriends', function() {
           Ti.API.info("get yums nearby triggered!");
             Yumit.model.Yum.getYumsFriends({
               success: refresh_yums
             });
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
              };
              if(tvData.length == 0) { //NO YUMS
                var error_row = Ti.UI.createTableViewRow({height:150});
                var error_label = Ti.UI.createLabel({
                  text:'Sorry, No Yums nearby..',
                  font:{fontSize:14},
                  color:'#888',
                  left:50});
                error_row.add(error_label);
                tvData.push(error_row);
              };
              tableView.setData(tvData);
            };

            tableView.addEventListener('click',function(e) {
              alert("CLICK");
              // var _yum = e.rowData;
              // var win = Yumit.ui.yum(_yum);
              // tabGroup.activeTab.open(win,{animated:true});
            });

            ///////////////////////
            // PSEUDO API
            ///////////////////////

            Titanium.App.addEventListener('Yumit:yums:getYumsNearby', function() {
             Ti.API.info("get yums nearby triggered!");
              Yumit.model.Yum.getYumsNearby({
                location: Yumit.current.latitude + "," + Yumit.current.longitude,
                success: refresh_yums
              });
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