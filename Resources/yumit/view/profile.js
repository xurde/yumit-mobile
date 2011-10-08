
(function() {
    Yumit.ui.profile = function() {
    	var genderValue = '';
    	var genderKey = '';
    	var emailValue = '';
    	var fullNameValue = '';
    	var shownPicker = null;
    	
    	var profileWindow = new Window({
    	    id: 'defaultWindow',
            title: 'Edit profile'
    	});
    	
    	var profileWindowContainer = Ti.UI.createView({
    	    top: 0,
    	    left: 0,
    	    height: 'auto',//480,
    	    width: '100%'
    	});
    	
    	var genderPickerView = Titanium.UI.createView({layout:'vertical', height:248,bottom:-248});
    	var birthdatePickerView = Titanium.UI.createView({height:248,bottom:-248});
    	var countryPickerView = Titanium.UI.createView({height:248,bottom:-248});
    	var slideIn = Titanium.UI.createAnimation({bottom:-33});
        var slideOut = Titanium.UI.createAnimation({bottom:-251});
        var compress = Titanium.UI.createAnimation({height:207});

        
        
        /*var done =  Titanium.UI.createButton({
	            title:'Done',
	            style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
            });
            done.addEventListener('click', function() {
        	    profileMainTable.height = null;
                shownPicker.animate(slideOut);                
            });
 
            var spacer =  Titanium.UI.createButton({
	            systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
            });*/
 
            /*var toolbar =  Titanium.UI.createToolbar({
	            top:0,
	            barColor: Yumit.constants.darkRed,
	            items:[spacer, done, spacer]
            });
            
            var toolbar2 =  Titanium.UI.createToolbar({
	            top:0,
	            barColor: Yumit.constants.darkRed,
	            items:[spacer, done, spacer]
            });*/
        
        var genderPicker = Yumit.ui.genderPicker();
        genderPickerView.add(genderPicker);
        genderPicker.addEventListener('change', function(e) {
        	profileMainTable.rows[2].genderViewLabel.text = e.row.title;
        	profileMainTable.rows[2].genderViewLabel.custom_item = e.row.custom_item;
        });
        var birthdatePicker = Yumit.ui.birthdatePicker();
        birthdatePickerView.add(birthdatePicker);
    	birthdatePicker.addEventListener('change', function(e) {
    		var pickedDate = e.value;
            profileMainTable.rows[3].birthdateViewLabel.text = pickedDate.getFullYear() 
                    + '/' + (parseInt(pickedDate.getMonth()) + 1) 
                    + '/' + pickedDate.getDate();
        });
        var countryPicker = Yumit.ui.countryPicker();
        countryPickerView.add(countryPicker);
        countryPicker.addEventListener('change', function(e) {
            profileMainTable.rows[4].countryViewLabel.text = e.row.title;
        	profileMainTable.rows[4].countryViewLabel.custom_item = e.row.custom_item;
        });
    	
    	var avatarSelector = createAvatarSelector();
    	var footer = createFooterView();
    	var profileMainTableRows = [];
    	profileMainTableRows.push(createEmailRow());
    	profileMainTableRows.push(createFullnameRow());
    	profileMainTableRows.push(createGenderRow());
    	profileMainTableRows.push(createBirthdateRow());
    	profileMainTableRows.push(createCountryRow());
    	profileMainTableRows.push(createCityRow());
    	profileMainTableRows.push(createWebsiteUrlRow());
    	var profileMainTable = Ti.UI.createTableView({
    	    top: 0,
            data: profileMainTableRows,
        	style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        	//headerView: avatarSelector,
        	footerView: footer
    	});
    	profileMainTable.addEventListener('click', function(e) {});
    	profileMainTable.rows = profileMainTableRows;
    	//profileWindowContainer.add(profileMainTable);
    	//scrollView.add(profileWindowContainer);
    	//scrollView.add(profileMainTable);
    	//profileWindow.add(profileWindowContainer);
    	profileWindow.add(profileMainTable);
    	profileWindow.add(genderPickerView);
    	profileWindow.add(birthdatePickerView);
    	profileWindow.add(countryPickerView);
    	
    	/* ============== EVENT LISTENER ============== */
    	
    	var fillUserInfo = function(userInfo) {
    		//alert(JSON.stringify(userInfo));
    		profileMainTable.rows[0].emailTextField.value = userInfo.email;
    		profileMainTable.rows[1].fullnameTextField.value = userInfo.name;
    		setGender(userInfo.gender);
    		setBirthdate(userInfo.birthdate);
    		setCountry(userInfo.country);
    		profileMainTable.rows[5].cityTextField.value = userInfo.city;
    		profileMainTable.rows[6].websiteUrlTextField.value = userInfo.website;
    		avatarSelector.avatarImage.image = userInfo.avatar || '/images/user-avatar-thumb.png';
    	};
    	
    	var setGender = function(key) {
    		for (var i = 0, n = genderPicker.data.length; i < n; i++) {
    		    if (genderPicker.data[i].custom_item == key) {
    		    	genderPicker.setSelectedRow(0, i, true);
        		}
    		}
    	};
    	
    	var setBirthdate = function(date) {
    	    var dateValue = date.split('T')[0];
    	    var dateArray = dateValue.split('-');
    	    var year = parseInt(dateArray[0]);
    	    var month = parseInt(dateArray[1]);
    	    var day = parseInt(dateArray[2]);
    	    var value = new Date();
    	    value.setFullYear(year);
    	    value.setMonth(month - 1);
    	    value.setDate(day);
    	    birthdatePicker.value = value;
    	    profileMainTable.rows[3].birthdateViewLabel.text = year + '/' + month + '/' + day;
    	};
    	
    	var setCountry = function(countryCode) {
    		for (var i = 0, n = countryPicker.data.length; i < n; i++) {
    		    if (countryPicker.data[i].custom_item === countryCode) {
    		    	countryPicker.setSelectedRow(0, i, true);
    		    	break;
        		}
    		}
    	}
    	
    	Titanium.App.addEventListener('Yumit:profile:fetchInfo', function() {
    		Ti.API.info('Yumit:profile:fetchInfo handling');
    	    Yumit.model.User.fetchInfo({
    	        success: function(info) {
    	        	Ti.API.info('success');
    	        	fillUserInfo(info);
    	        },
    	        
    	        error: function(error) {
    	        	alert('Error occurred: ' + error);
    	        },
    	        
    	        onfinish: function() {
    	        	Ti.API.info('onfinish');
    	        	Titanium.App.fireEvent("Yumit:ui:hideLoading");
    	        }
    	    });
    	});
    	
    	/* ============ END EVENT LISTENERS =========== */
    	
    	return profileWindow;
    	
/*********************************************************************************/
        function createAvatarSelector(image) {
            var avatarContainer = Titanium.UI.createView({
    		    top: 10,
    		    width: '100%',
    		    height: 115,
    		    layout: 'vertical'
    	    });
    	    var avatarLabel = Titanium.UI.createLabel({
    	        top: 0,
    	        width: 100,
    	        height: 'auto',
    	        font: {
    	            fontSize: 12
    	        },
    	        text: 'Click on image to change the avatar',
    	        color: Yumit.constants.textColor
            });
            var avatarImage = Titanium.UI.createImageView({
    	        top: 10,
    	        width: 75,
    	        height: 75,
                defaultImage: '/images/user-avatar-thumb.png',
                image: image || 'images/user-avatar-thumb.png'
            });
            avatarImage.addEventListener('click', function() {
                /*Yumit.ui.selectPhoto(Yumit.ui.lastActiveTab, function(photo) {
			        
		        });*/
            });
            avatarContainer.avatarImage = avatarImage;
            avatarContainer.add(avatarImage);
            avatarContainer.add(avatarLabel);
            
            return avatarContainer;
        }
        
        function createFooterView() {
            var footerContainer = Titanium.UI.createView({
    		    top: 10,
    		    height: 60,
    		    layout: 'vertical'
    	    });
    	    
    	    var saveButton = new Button({
        	    id: 'defaultYumitButton',
    		    title: 'Save Changes'
            });
            
            saveButton.addEventListener('click', function() {
            	saveButton.enabled = false;
                Titanium.App.fireEvent("Yumit:ui:showLoading",{title:"Uploading..."});
                Yumit.model.User.update({
        	        success: function() {
        	        },
        	        error: function(error) {
        	            alert('Updating user information failed ' + error);
        	        },
        	        onfinish: function() {
        	            Titanium.App.fireEvent("Yumit:ui:hideLoading");
            	    	saveButton.enabled = true;
        	        }
        	    }, {
        	    	user: {
        	    	    email: profileMainTable.rows[0].emailTextField.value,
    		            name: profileMainTable.rows[1].fullnameTextField.value,
    		            gender: profileMainTable.rows[2].genderViewLabel.custom_item,
    		            birthdate: profileMainTable.rows[3].birthdateViewLabel.text,
    		            country: profileMainTable.rows[4].countryViewLabel.custom_item,
    		            city: profileMainTable.rows[5].cityTextField.value,
    		            website: profileMainTable.rows[6].websiteUrlTextField.value
    		        }
        	    });
            });
            
            footerContainer.add(saveButton);
            return footerContainer;
        }
    	
    	function createEmailRow() {
    	    var emailRow = Titanium.UI.createTableViewRow({
                height: 45,
                selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
            });
            emailRow.addEventListener('focus', function() {
                emailTextField.focus();
            });
            var emailRowContainer = Titanium.UI.createView({
        	    top:0, 
        	    left:0,
        	    height:45, 
        	    layout:'horizontal'
            });
            var emailLabel = Titanium.UI.createLabel({
                text: 'Email',
                width: 85,
                height: 'auto',
                left: 15,
    		    top: 12,
    		    font: {
    			    fontWeight: 'bold',
    			    fontSize: 16
       		    },
       		    color:Yumit.constants.darkRed
            });
            var emailTextField = Titanium.UI.createTextField({
                width: 180,
                height: 35,
                top: 4,
                left: 5,
                borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
                autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
                returnKeyType: Titanium.UI.RETURNKEY_NEXT
            });
            emailRow.emailTextField = emailTextField;
            emailTextField.addEventListener('change', function(e) {
                emailRow.email = e.value;
            });
            emailTextField.addEventListener('return', function(e) {
                //profileMainTable.rows[1].fireEvent('focus');
            });
            
            emailRowContainer.add(emailLabel);
            emailRowContainer.add(emailTextField);
            emailRow.add(emailRowContainer);
        
            return emailRow;
        }
    	
    	function createFullnameRow() {
    	    var fullnameRow = Titanium.UI.createTableViewRow({
                height: 45,
                selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
            });
            fullnameRow.addEventListener('focus', function() {
                fullnameTextField.focus();
            });
            var fullnameRowContainer = Titanium.UI.createView({
        	    top:0, 
        	    left:0,
        	    height:45, 
        	    layout:'horizontal'
            });
            var fullnameLabel = Titanium.UI.createLabel({
                text: 'Full Name',
                width: 85,
                height: 'auto',
                left: 15,
    		    top: 12,
    		    font: {
    			    fontWeight: 'bold',
    			    fontSize: 16
       		    },
       		    color:Yumit.constants.darkRed
            });
            var fullnameTextField = Titanium.UI.createTextField({
                width: 180,
                height: 35,
                top: 4,
                left: 5,
                borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
                autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
                returnKeyType: Titanium.UI.RETURNKEY_NEXT
            });
            fullnameRow.fullnameTextField = fullnameTextField;
            fullnameTextField.addEventListener('change', function(e) {
                fullnameRow.fullName = e.value;
            });
            fullnameTextField.addEventListener('return', function(e) {
                //profileMainTable.rows[5].fireEvent('focus');
            });
            
            fullnameRowContainer.add(fullnameLabel);
            fullnameRowContainer.add(fullnameTextField);
            fullnameRow.add(fullnameRowContainer);
        
            return fullnameRow;
        }
        
        function createGenderRow() {
        	var genderRow = Titanium.UI.createTableViewRow({
                height: 45,
                selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
            });
            var genderContainer = Titanium.UI.createView({
    	        top: 0,
    	        left: 0,
    	        height: 45,
    	        layout: 'horizontal'
    	    });
    	
    	    var genderLabel = Titanium.UI.createLabel({
                text: 'Gender',
                width: 85,
                height: 'auto',
                left: 15,
    		    top: 12,
    		    font: {
    			    fontWeight: 'bold',
    			    fontSize: 16
       		    },
       		    color:Yumit.constants.darkRed
            });
    	
    	    var genderView = Ti.UI.createLabel({
                width: 180,
                height: 35,
                top: 4,
                left: 5,
                backgroundColor: '#ffffff',
                text: 'Gender',
                type: 'Button'
            });
            genderRow.genderViewLabel = genderView;
    	    genderView.addEventListener('click', function() {
    	    	//scrollView.scrollTo(0, 120);
                if (shownPicker) {
                    shownPicker.animate(slideOut);
                }
                shownPicker = genderPickerView;
                profileMainTable.animate(compress);
                var done = Titanium.UI.createButton({
	                title:'Done',
	                style:Titanium.UI.iPhone.SystemButtonStyle.Done
                });
                profileWindow.rightNavButton = done;
                done.addEventListener('click', function() {
                    genderPickerView.animate(slideOut);
                    profileMainTable.height = null;
                    profileWindow.rightNavButton = null;
                });
                genderPickerView.animate(slideIn);
    	    });
    	    
    	    genderContainer.add(genderLabel);
    	    genderContainer.add(genderView);
    	    genderRow.add(genderContainer);
    	    return genderRow;
        }
        
        function createBirthdateRow() {
        	var birthdateRow = Titanium.UI.createTableViewRow({
                height: 45,
                selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
            });
            
            var birthdateContainer = Titanium.UI.createView({
                top: 0,
                left: 0,
                height: 45,
                layout: 'horizontal'
            });

            var birthdateLabel = Titanium.UI.createLabel({
                text: 'Birthdate',
                width: 85,
                height: 'auto',
                left: 15,
    		    top: 12,
    		    font: {
    			    fontWeight: 'bold',
    			    fontSize: 16
       		    },
       		    color:Yumit.constants.darkRed
            });
            
            var birthdateView = Ti.UI.createLabel({//Titanium.UI.createButton({
                width: 180,
                height: 35,
                top: 4,
                left: 5,
                backgroundColor: '#ffffff',
                text: 'Birthdate',
                type: 'Button'
            });
            birthdateRow.birthdateViewLabel = birthdateView;
            birthdateView.addEventListener('click', function() {
                if (shownPicker) {
            	    //scrollView.scrollTo(0, 150);
                	shownPicker.animate(slideOut);
                }
                shownPicker = birthdatePickerView;
                profileMainTable.animate(compress);
                var done = Titanium.UI.createButton({
	                title:'Done',
	                style:Titanium.UI.iPhone.SystemButtonStyle.Done
                });
                profileWindow.rightNavButton = done;
                done.addEventListener('click', function() {
                    birthdatePickerView.animate(slideOut);
                    profileMainTable.height = null;
                    profileWindow.rightNavButton = null;
                });
                birthdatePickerView.animate(slideIn);
            });
            
            birthdateContainer.add(birthdateLabel);
            birthdateContainer.add(birthdateView);
            birthdateRow.add(birthdateContainer);
            return birthdateRow;
        }
        
        function createCountryRow() {
        	var countryRow = Titanium.UI.createTableViewRow({
                height: 45,
                selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
            });
            
            var countryContainer = Titanium.UI.createView({
                top: 0,
                left: 0,
                height: 45,
                layout: 'horizontal'
            });

            var countryLabel = Titanium.UI.createLabel({
                text: 'Country',
                width: 85,
                height: 'auto',
                left: 15,
    		    top: 12,
    		    font: {
    			    fontWeight: 'bold',
    			    fontSize: 16
       		    },
       		    color:Yumit.constants.darkRed
            });
            
            var countryView = Ti.UI.createLabel({
                width: 180,
                height: 35,
                top: 4,
                left: 5,
                backgroundColor: '#ffffff',
                text: 'Country',
                type: 'Button'
            });
            countryRow.countryViewLabel = countryView;
            countryView.addEventListener('click', function() {
            	if (shownPicker) {
            		shownPicker.animate(slideOut);
            	}
            	shownPicker = countryPickerView;
            	profileMainTable.animate(compress);
            	var done = Titanium.UI.createButton({
	                title:'Done',
	                style:Titanium.UI.iPhone.SystemButtonStyle.Done
                });
                profileWindow.rightNavButton = done;
                done.addEventListener('click', function() {
                    countryPickerView.animate(slideOut);
                    profileMainTable.height = null;
                    profileWindow.rightNavButton = null;
                });
                countryPickerView.animate(slideIn);
            });
            
            countryContainer.add(countryLabel);
            countryContainer.add(countryView);
            countryRow.add(countryContainer);
            return countryRow;
        }
        
        function createCityRow() {
            var cityRow = Titanium.UI.createTableViewRow({
                height: 45,
                selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
            });
            cityRow.addEventListener('focus', function() {
                cityTextField.focus();
            });
            var cityContainer = Titanium.UI.createView({
                top: 0,
                left: 0,
                height: 45,
                layout: 'horizontal'
            });
    	
    	    var cityLabel = Titanium.UI.createLabel({
    		    text: 'City',
                width: 85,
                height: 'auto',
                left: 15,
    		    top: 12,
    		    font: {
    			    fontWeight: 'bold',
    			    fontSize: 16
       		    },
       		    color:Yumit.constants.darkRed
            });
    	
            var cityTextField = Titanium.UI.createTextField({
                width: 180,
                height: 35,
                top: 4,
                left: 5,
                borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
                autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
                returnKeyType: Titanium.UI.RETURNKEY_NEXT
            });
            cityRow.cityTextField = cityTextField;
            cityTextField.addEventListener('change', function(e) {
                cityRow.city = e.value;
            });
            cityTextField.addEventListener('return', function(e) {
            	//profileMainTable.rows[6].fireEvent('focus');
            });
            
            cityContainer.add(cityLabel);
            cityContainer.add(cityTextField);
            cityRow.add(cityContainer);
            return cityRow;
        }
        
        function createWebsiteUrlRow() {
            var websiteUrlRow = Titanium.UI.createTableViewRow({
                height: 45,
                selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
            });
            websiteUrlRow.addEventListener('focus', function() {
                websiteUrlTextField.focus();
            });
            var websiteUrlContainer = Titanium.UI.createView({
                top: 0,
                left: 0,
                height: 45,
                layout: 'horizontal'
            });
    	
    	    var websiteUrlLabel = Titanium.UI.createLabel({
    		    text: 'Web site',
                width: 85,
                height: 'auto',
                left: 15,
    		    top: 12,
    		    font: {
    			    fontWeight: 'bold',
    			    fontSize: 16
       		    },
       		    color:Yumit.constants.darkRed
            });
    	
            var websiteUrlTextField = Titanium.UI.createTextField({
                width: 180,
                height: 35,
                top: 4,
                left: 5,
                borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
                autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
                returnKeyType: Titanium.UI.RETURNKEY_NEXT
            });
            websiteUrlRow.websiteUrlTextField = websiteUrlTextField;
            websiteUrlTextField.addEventListener('change', function(e) {
                websiteUrlRow.websiteUrl = e.value;
            });
            websiteUrlTextField.addEventListener('return', function(e) {
            	//websiteUrlTextField.blur();
            });
            
            websiteUrlContainer.add(websiteUrlLabel);
            websiteUrlContainer.add(websiteUrlTextField);
            websiteUrlRow.add(websiteUrlContainer);
            return websiteUrlRow;
        }
    }
})();
