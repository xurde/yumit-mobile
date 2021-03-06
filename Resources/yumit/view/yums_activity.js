(function(){
    Yumit.ui.yums_activity = function(_tab){
        var win = new Window({
            id: 'defaultWindow',
            title:'Activity'
        });

    // var refresh_button = Titanium.UI.createButton({
// //      image:'images/photo.png'
      // systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
    // });
    // win.rightNavButton = refresh_button;
//     
    // refresh_button.addEventListener('click', function(e) {
    // });
//     
//     
     // var settings_button = Titanium.UI.createButton({
      // image:'images/photo.png'
    // });
//    
   // win.leftNavButton = settings_button;
//     
    // settings_button.addEventListener('click', function(e) {
   		// win = Yumit.ui.settings();
   		// win.open(); 
    // });
        Yumit.ui.currentTab = 0;
        var refresh = function() {
            switch(Yumit.ui.currentTab) {
                case 0: 
    	            Ti.App.fireEvent("Yumit:ui:showLoading", 
    	                {title : "Updating..."}
    	            );				
		            Ti.App.fireEvent('Yumit:yums:getYumsFriends');
    	        break;
    	        case 1: 
    	            Ti.App.fireEvent('Yumit:yums:getYumsNearby');
    	        break;
    	        default: 
    	            alert('Unhandled Refresh:' + Yumit.ui.currentTab);
    	        break;
            }
            if (Yumit.ui.currentTab) {};
        };
    
        Yumit.ui.addNavButtons({win:win, refresh:refresh, tab:_tab});

        var tabView = Yumit.ui.createtabbedNavigation({
            labels:[
                {title:'Following', enabled:true},
                {title:'Nearby', enabled:false}
            ],
            callback: function(i) { 
            	appFilmStrip.fireEvent('changeIndex',{idx: i});
            }
        });

        win.add(tabView);

		function onPlaceLabelClicked(e) {
			if (e.source.placeLabel) {
			    //alert('click');
			    var yumData = e.rowData.yum_data;
                var place = {
                	place_id: yumData.place_id,
                	place_name: yumData.place_name,
                	place_address: yumData.place_address,
                	place_lat: yumData.place_lat,
                	place_lng: yumData.place_lng,
                	place_origin: 'yumit'
                };
                var win = Yumit.ui.place(place);
                //win.tabBarHidden = true;
                tabGroup.activeTab.open(win,{animated:true});
			}
		}
    ////////////////////////////////////////////////////////////////////
    /////////////////////////////  FOLLOWING ACTIVITY
        function activity_following() {
            var tableView = Ti.UI.createTableView({
                top:0,
                minRowHeight:280
            });

            var refresh_yums = function(yums) {
            	// alert(yums);
                var tvData = [];
                for (var i=0,l=yums.length;i<l;i++) {
                    tvData.push(Yumit.model.Yum.createYumRow(yums[i]));
                }
                tableView.setData(tvData);
            };

            //tableView.allowsSelection = false;
			tableView.addEventListener('click', function(e) {
			    onPlaceLabelClicked(e);
			});

          ///////////////////////
          // PSEUDO API
          ///////////////////////

            Titanium.App.addEventListener('Yumit:yums:getYumsFriends', function() {
                Ti.API.info("get yums nearby triggered!");
                setTimeout(function() {
                	Yumit.model.Yum.getYumsFriends({
                    	success: refresh_yums,
			        	onfinish: function(){ Titanium.App.fireEvent("Yumit:ui:hideLoading"); }
                	});
                }, 1000);
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
                for (var i=0, l=yums.length; i<l; i++) {
                    tvData.push(Yumit.model.Yum.createYumRow(yums[i]));
                };
                if(tvData.length == 0) { //NO YUMS
                    var error_row = Ti.UI.createTableViewRow({height:150});
                    var error_label = Ti.UI.createLabel({
                        text:'Sorry, No Yums nearby..',
                        font:{fontSize:14},
                        color:'#888',
                        left:50
                    });
                    error_row.add(error_label);
                    tvData.push(error_row);
                } else {
              	    Yumit.global.yumsNearbyLoaded = true;
                };
				Titanium.App.fireEvent("Yumit:ui:hideLoading");
                tableView.setData(tvData);
            };

			//tableView.allowsSelection = false;
			tableView.addEventListener('click', function(e) {
			    onPlaceLabelClicked(e);
			});

            ///////////////////////
            // PSEUDO API
            /////////////////////// 

			Titanium.App.addEventListener('Yumit:yums:getYumsNearby', function() {
				Ti.API.info("get yums nearby triggered!");
				Titanium.App.fireEvent("Yumit:ui:showLoading", {title : "Updating..."});				
				Yumit.model.Yum.getYumsNearby({
					location : Yumit.current.latitude + "," + Yumit.current.longitude,
					success : refresh_yums,
					onfinish: function(){ Titanium.App.fireEvent("Yumit:ui:hideLoading"); }
				});          
			});

            return tableView;
        }
    //////////////////////////////////////////////////////////
        
        Ti.App.addEventListener('Yumit:login', function(e) {
            tabView.children[0].fireEvent('click');
            appFilmStrip.children[0].children[0].children[0].scrollToTop(0);
        });
        
        Ti.App.addEventListener('Yumit:register', function(e) {
            tabView.children[0].fireEvent('click');
            appFilmStrip.children[0].children[0].children[0].setData([]);
            appFilmStrip.children[1].children[0].children[0].setData([]);
        });
        
        Ti.App.addEventListener('Yumit:redrawTableView', function(e) {
        	tabView.hide();
        	tabView.show();
        });

        var appFilmStrip = Yumit.ui.createFilmStripView({	
            views: [
                activity_following(),
                activity_nearby()
            ],
            space: {top:35,bottom:0,left:0,right:0}
        });
		appFilmStrip.addEventListener('changeIndex', function(e) {
			Yumit.ui.currentTab = e.idx;
			if (e.idx == 1 && !Yumit.global.yumsNearbyLoaded) {
				Ti.API.debug('\t>>>>appFilmStrip(yums):changeIndex:1:Loading Nearbyes');
				Titanium.App.fireEvent('Yumit:yums:getYumsNearby');
				
			};
		});
		
        win.add(appFilmStrip);
    
        return win;
    };

})();