(function() {
    Yumit.sharing_settings = function() {
        /*var networks = [
            {title:'Facebook', color:Yumit.constants.darkRed},
            {title:'Twitter', color:Yumit.constants.darkRed},
            {title:'Flickr', color:Yumit.constants.darkRed},
            {title:'Foursquare', color:Yumit.constants.darkRed}
        ];*/
       var networks = createNetworksList();
        
        var win = new Window({
            id: 'defaultWindow',
            title: 'Share Settings',
            backgroundColor:'#FFF',
            tabBarHidden: true
        });
        
        var tableView = Titanium.UI.createTableView({
            style: Titanium.UI.iPhone.TableViewStyle.GROUPED
        });
        tableView.setData(networks);
        win.add(tableView);
        
        var updateFacebookUserInfo = function(data, row) {
 			Yumit.model.User.update({
        	    success: function() {
        	        tableView.setData(createNetworksList());
        	    },
        	    error: function(error) {
        	        alert('Updating user information failed ' + error);
        	        Yumit.socialNetworks.shareOnFacebook = !Yumit.socialNetworks.shareOnFacebook;
        	    }
        	}, data);
 		};
 		
 		var updateTwitterUserInfo = function(data) {
 			Yumit.model.User.update({
 				success: function() {
 					tableView.setData(createNetworksList());
 				},
 				error: function(error) {
 					alert('Updating user information failed ' + error)
 					Yumit.socialNetworks.shareOnTwitter = !Yumit.socialNetworks.shareOnTwitter;
 				}
 			}, data);
 		};
 		
 		var detachService = function(index) {
 		    switch (index) {
 		    	case 0:
 		    	    Titanium.Facebook.logout();
 		    	break;
 		    	
 		    	case 1:
 		    	    Titanium.App.Properties.BH.deauthorize(function(e) {
			            if (e != false) {
			    	        alert('Deauthorized');
			    	        Yumit.socialNetworks.twitterDisabled = !Yumit.socialNetworks.twitterDisabled;
        		            tableView.setData(createNetworksList());
			            } else {
			    	        alert('Deauthorization failed');
			            }
			        });
			    break;
 		    }
 		}
 		
 		var confirmDialog = function(title, sourceIndex) { 
 		    return Ti.UI.createOptionDialog({
 			    title: 'Detach your ' + title + ' account?',
 			    options: [
 			        'Detach',
 			        'Cancel'
 			    ],
 			    sourceIndex: sourceIndex,
 			    cancel: 1
 		    });
 		};
 		
 		var confirmationDialogClickHandler = function(e) {
 			switch(e.index) {
	            case 0:
	            	detachService(e.source.sourceIndex);
	            break;
	            
	            case e.cancel:
	            break;
	        };
 		};
        
        var notified = false;
        Titanium.Facebook.addEventListener('login', function(e) {
            if (!notified) {
        	    notified = true;
        	    if (e.success) {
        	    	Yumit.socialNetworks.facebookDisabled = !Yumit.socialNetworks.facebookDisabled;
        	    	updateFacebookUserInfo({
        	    		user: {
        	    	        fb_offline_key: Titanium.Facebook.accessToken,
        	    			fb_uid: e.data.id,
        	    			fb_username: e.data.name,
        	    		    share_yums_on_facebook: Yumit.socialNetworks.shareOnFacebook
        	    		}
        	    	});
        	    } else if (!e.cancelled){
        	    	alert('FB authorization failed');
        	    }
        	}
        });
        Titanium.Facebook.addEventListener('logout', function(e) {
        	if (!notified) {
        		notified = true;
        		Yumit.socialNetworks.facebookDisabled = !Yumit.socialNetworks.facebookDisabled;
        		tableView.setData(createNetworksList());
        	}
        });
        
        tableView.addEventListener('click', function(e) {
        	var index = e.index;
        	var row = e.rowData;
        	
        	if (index == 0) {
        		notified = false;
                if (Yumit.socialNetworks.facebookDisabled) {
        	        Titanium.Facebook.authorize();
        	    } else {
        	    	var detachDialog = confirmDialog("Facebook", index);
        	    	detachDialog.addEventListener('click', confirmationDialogClickHandler);
        	    	detachDialog.show();
        	    }
        	}
        	
        	if (index == 1) {
        		if (Yumit.socialNetworks.twitterDisabled) {
        	        Ti.App.Properties.BH.authorize(function(e){                	
                	    if (e != false) {
                		    var config = Ti.App.Properties.BH.config();
                		    Yumit.socialNetworks.twitterDisabled = !Yumit.socialNetworks.twitterDisabled;
        	    		    updateTwitterUserInfo({
        	    			    user: {
        	    			        twitter_id: config.user_id,
        	    			        twitter_username: config.screen_name,
        	    			        twitter_token: config.access_token,
        	    			        twitter_secret: config.access_token_secret,
        	    			        share_yums_on_twitter: Yumit.socialNetworks.shareOnTwitter
        	    		        }
        	    		    });
                	    } else {
                		    alert("Authorization failed");// + e.error);
                	    }
                    });
        	    } else {
			        var detachDialog = confirmDialog("Twitter", index);
        	    	detachDialog.addEventListener('click', confirmationDialogClickHandler);
        	    	detachDialog.show();
        	    }
        	}
        });
        
        return win;
    };
    
    function createNetworkView(args) {
    	var row = Titanium.UI.createTableViewRow({
    		height: 45
    	});
    	var container = Titanium.UI.createView({
    		left: 0,
    		top: 0,
    		//width: 150,
    		layout: 'horizontal'
    	});
    	var indicator = Titanium.UI.createImageView({
    	    left: 'auto',
    	    right: 15,
    	    top: 8,
    	    width: 28,
    	    height: 28,
    	    image: args.selectedImage
    	});
    	var title = new Label({
    		left: 15,
    		top: 12,
    		font: {
    			fontWeight: 'bold',
    			fontSize: 16
       		},
       		color: Yumit.constants.darkRed,
    		width: 240,
    		height: 'auto',
    		text: args.title
    	})
    	//container.add(indicator);
    	container.add(title);
    	container.add(indicator);
    	row.add(container);
    	
    	return row;
    }
    
    function selectImage(disabled) {
        return (disabled) ? 'images/social-network-deactivated.png'
        	              : 'images/social-network-activated.png';
    }
    
    function createNetworksList() {
        var networksList = [];
        var facebookRow = createNetworkView({
        	title: 'Facebook',
        	selectedImage: selectImage(Yumit.socialNetworks.facebookDisabled)
        });
        var twitterRow = createNetworkView({
        	title: 'Twitter',
        	selectedImage: selectImage(Yumit.socialNetworks.twitterDisabled)
        })
        
        networksList.push(facebookRow);
        networksList.push(twitterRow);
        
        return networksList;
    };
    
})();
