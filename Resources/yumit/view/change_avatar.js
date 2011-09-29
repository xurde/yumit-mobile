
(function() {
    Yumit.ui.changeAvatar = function() {
    	var changeAvatarWindow = new Window({
    		id: 'defaultWindow',
            title: 'Change avatar'
    	});
    	
    	var avatarSelector = createAvatarRow();
        
        var avatarTable = Titanium.UI.createTableView({
        	top: 0,
            data: [avatarSelector],
            scrollable: false,
        	style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        	footerView: createFooterView()
        });
        avatarTable.addEventListener('click', function(){});
            
        changeAvatarWindow.add(avatarTable);
        
        var fillUserInfo = function(userInfo) {
    		avatarSelector.avatarImage.image = userInfo.avatar || '/images/user-avatar-big.png';
    	};
        
        Titanium.App.addEventListener('Yumit:avatar:fetchInfo', function() {
    		Ti.API.info('Yumit:profile:fetchInfo handling');
    	    Yumit.model.User.fetchInfo({
    	        success: function(info) {
    	        	Ti.API.info('success');
    	        	fillUserInfo(info);
    	        },
    	        
    	        error: function(error) {
    	        	alert('Error occured: ' + error);
    	        },
    	        
    	        onfinish: function() {
    	        	Ti.API.info('onfinish');
    	        	Titanium.App.fireEvent("Yumit:ui:hideLoading");
    	        }
    	    });
    	});
    	
        return changeAvatarWindow;
        
        function createAvatarRow() {
        	var avatarRow = Titanium.UI.createTableViewRow({
    		    height: 280,
                selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
    	    });
            var avatarContainer = Titanium.UI.createView({
                top: 0,
                width: '100%',
                height: 280,
                layout: 'vertical'
            });
    	    var avatarLabel = Titanium.UI.createLabel({
    	        top: 5,
    	        width: 'auto',
    	        height: 'auto',
    	        font: {
    	            fontSize: 16
    	        },
    	        text: 'Click on image to change the avatar',
    	        color: '#747574'
            });
            var avatarImage = Titanium.UI.createImageView({
    	        top: 10,
    	        width: 230,
    	        height: 230,
                defaultImage: '/images/user-avatar-thumb.png',
                image: 'images/user-avatar-thumb.png'
            });
            avatarImage.addEventListener('click', function() {
        	    Yumit.ui.selectPhoto(Yumit.ui.lastActiveTab, function(photo) {
				    avatarImage.image = photo;
				    avatarRow.photo = photo;
			    });
		    });
            avatarRow.avatarImage = avatarImage;
            avatarContainer.add(avatarImage);
            avatarContainer.add(avatarLabel);
            avatarRow.add(avatarContainer);
            
            return avatarRow;
        }
        
        function createFooterView() {
            var footerContainer = Titanium.UI.createView({
    		    top: 10,
    		    height: 60,
    		    layout: 'vertical'
    	    });
    	    
    	    var saveButton = new Button({
        	    id: 'defaultYumitButton',
    		    title: 'Change avatar'
            });
            
            saveButton.addEventListener('click', function() {
            	if (avatarSelector.photo) {
            	    Yumit.model.User.updateAvatar({
            	    	success: function() {alert('Success')},
            	    	error: function() {alert('Error')}
            	    }, avatarSelector.photo);
            	}
            });
            
            footerContainer.add(saveButton);
            return footerContainer;
        }
    }
})();
