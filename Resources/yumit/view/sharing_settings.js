(function() {
    Yumit.sharing_settings = function() {
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
 		
//============================= FACEBOOK SECTION =================================
 		var updateFacebookUserInfo = function(data, row) {
 			Yumit.model.User.update({
        	    success: function() {
        	        tableView.setData(createNetworksList());
        	    },
        	    error: function(error) {
        	        alert('Updating user information failed ' + error);
        	        Yumit.socialNetworks.facebookDisabled = !Yumit.socialNetworks.facebookDisabled;
        	    }
        	}, data);
 		};
        
        var notified = false;
        Titanium.Facebook.addEventListener('login', function(e) {
            if (!notified) {
        	    notified = true;
        	    if (e.success) {
                    Yumit.socialNetworks.facebookDisabled = false;
        	    	updateFacebookUserInfo({
        	    		user: {
	        	    	    facebook_access_token: Titanium.Facebook.accessToken,
	        	    	    facebook_uid: e.data.id,
	                        facebook_username: e.data.name,
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
        		Yumit.socialNetworks.facebookDisabled = true;
        	    updateFacebookUserInfo({
        	    	user: {
        	    	  fb_offline_key: '',
        	    		fb_uid: '',
        	    		fb_username: ''
        	    	}
        	    });
        		tableView.setData(createNetworksList());
        	}
        });
// ==================== END FACEBOOK SECTION ===========================

// ========================= TWITTER SECTION ===========================
        var updateTwitterUserInfo = function(data) {
 			Yumit.model.User.update({
 				success: function() {
 					tableView.setData(createNetworksList());
 				},
 				error: function(error) {
 					alert('Updating user information failed ' + error)
 					Yumit.socialNetworks.twitterDisabled = !Yumit.socialNetworks.twitterDisabled;
 				}
 			}, data);
 		};
 		
 		var authorizeTwitter = function() {
 			var twitterAuthWindow = Yumit.ui.twitterAuthentication();
 			tabGroup.activeTab.open(twitterAuthWindow);
 			Ti.App.addEventListener('Yumit:authorizeTwitter', function(e) {           	
                if (e.result != false) {
                    var config = Ti.App.Properties.BH.config();
                    Yumit.socialNetworks.twitterDisabled = false;
        	        updateTwitterUserInfo({
        	            user: {
        	    	        twitter_id: config.user_id,
        	    			twitter_username: config.screen_name,
        	    			twitter_token: config.access_token,
        	    			twitter_secret: config.access_token_secret
        	    		}
        	        });
                } else {
                    alert("Authorization failed");// + e.error);
                }
            });
 		};
 		
 		var deauthorizeTwitter = function() {
 			Titanium.App.Properties.BH.deauthorize(function(e) {
			    if (e != false) {
			        Yumit.socialNetworks.twitterDisabled = true;
			    	updateTwitterUserInfo({
        	    	    user: {
        	    	        twitter_id: '',
        	    					twitter_username: '',
        	    					twitter_token: '',
        	    					twitter_secret: ''
        	    		}
        	    });
        		tableView.setData(createNetworksList());
			    } else {
			        alert('Deauthorization failed');
			    }
		    });
 		};
// ======================== END TWITTER SECTION ========================

// ======================== FOURSQUARE SECTION =========================
        var updateFoursquareUserInfo = function(data) {
 			Yumit.model.User.update({
 				success: function() {
 					tableView.setData(createNetworksList());
 				},
 				error: function(error) {
 					alert('Updating user information failed ' + error)
 					Yumit.socialNetworks.foursquareDisabled = !Yumit.socialNetworks.foursquareDisabled;
 				}
 			}, data);
 		};
        
        var authorizeFoursquare = function() {
        	Titanium.App.Properties.Foursquare.authorize({
			    callback: function(params) {
			        if (Titanium.App.Properties.Foursquare.authorized()) {
        			    if (params.accessToken) {
        			    	Yumit.socialNetworks.foursquareDisabled = false;
        	                updateFoursquareUserInfo({
        	                    user: {
        	    	                foursquare_token: params.accessToken,
        	    		        }
        	                });
        	            }
                    } else {
                        alert("Authorization failed");
                    }
			    }
			});
        }
        
        var detachFoursquare = function() {
        	Yumit.socialNetworks.foursquareDisabled = true;
        	updateFoursquareUserInfo({
        	    user: {
        	        foursquare_token: ''
        	    }
        	});
        }
// ====================== END FOURSQUARE SECTION =======================

// ========================== FLICKR SECTION ===========================
        var updateFlickrUserInfo = function(data) {
 			Yumit.model.User.update({
 				success: function() {
 					tableView.setData(createNetworksList());
 				},
 				error: function(error) {
 					alert('Updating user information failed ' + error)
 					Yumit.socialNetworks.flickrDisabled = !Yumit.socialNetworks.flickrDisabled;
 				}
 			}, data);
 		};
 		
 		var authorizeFlickr = function() {
 			Ti.App.Properties.Flickr.authorize(function(params) {
        	    if (params && params.auth) {
        	       alert(params);
        			Yumit.socialNetworks.flickrDisabled = false;
        	        updateFlickrUserInfo({
        	            user: {
        	    	        flickr_token: params.auth.token['_content'],
        	    	        flickr_username: params.auth.user.username,
        	    	        flickr_nsid: params.auth.user.nsid
        	    		}
        	        });
        		} else {
        			alert("Authorization failed");
        		}
        	});
 		}

        var detachFlickr = function() {
        	Yumit.socialNetworks.flickrDisabled = true;
        	updateFlickrUserInfo({
        	    user: {
        	      flickr_token: '',
        	    	flickr_username: '',
        	    	flickr_nsid: ''
        	    }
        	});
        }

// ======================== END FLICKR SECTION =========================
        
        var detachService = function(index) {
 		    switch (index) {
 		    	case 0:
 		    	    Titanium.Facebook.logout();
 		    	break;
 		    	
 		    	case 1:
 		    	    deauthorizeTwitter();
			    break;
			    
			    case 2:
			        detachFlickr();
			    break;
			    
			    case 3:
			        detachFoursquare();
			    break;
 		    }
 		}
 		
 		var detachDialog = function(title, sourceIndex) { 
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
 		
 		var showDetachDialog = function(title, sourceIndex) {
 			var dialog = detachDialog(title, sourceIndex);
        	dialog.addEventListener('click', detachDialogClickHandler);
        	dialog.show();
 		}
 		
 		var detachDialogClickHandler = function(e) {
 			switch(e.index) {
	            case 0:
	            	detachService(e.source.sourceIndex);
	            break;
	            
	            case e.cancel:
	            break;
	        };
 		};
        
        tableView.addEventListener('click', function(e) {
        	var index = e.index;
        	var row = e.rowData;
        	
        	switch (index) {
        	    case 0:
        		    notified = false;
                    if (Yumit.socialNetworks.facebookDisabled) {
        	            Titanium.Facebook.authorize();
        	        } else {
        	    	    showDetachDialog('Facebook', index);
        	        }
        	    break;
        	
        	    case 1:
        		    if (Yumit.socialNetworks.twitterDisabled) {
        	            authorizeTwitter();
        	        } else {
        	    	    showDetachDialog('Twitter', index);
        	        }
        	    break;
        	
        	    case 2:
        		    if (Yumit.socialNetworks.flickrDisabled) {
        			    authorizeFlickr();
        		    } else {
        			    showDetachDialog('Flickr', index);
        		    }
        		break;
        		
        		case 3:
        		    if (Yumit.socialNetworks.foursquareDisabled) {
        			    authorizeFoursquare();
        		    } else {
        			    showDetachDialog('Foursquare', index);
        		    }
        		break;
        	}
        	
        });
        
        return win;
    };
    
// ======================= CREATING LIST SECTION =========================== 
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
    	});
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
        });
        var flickrRow = createNetworkView({
        	title: 'Flickr',
        	selectedImage: selectImage(Yumit.socialNetworks.flickrDisabled)
        });
        var foursquareRow = createNetworkView({
        	title: 'Foursquare',
        	selectedImage: selectImage(Yumit.socialNetworks.foursquareDisabled)
        });
        
        networksList.push(facebookRow);
        networksList.push(twitterRow);
        networksList.push(flickrRow);
        networksList.push(foursquareRow);
        
        return networksList;
    };
// =================================================================
})();
