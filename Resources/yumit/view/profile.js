
(function() {
    Yumit.ui.profile = function() {
    	var genderValue = '';
    	var genderKey = '';
    	var emailValue = '';
    	var fullNameValue = '';
    	
    	var profileWindow = new Window({
    	    id: 'defaultWindow',
            title: 'Edit profile'
    	});
    	
    	var scrollView = Titanium.UI.createScrollView({
	        contentWidth:'auto',
	        contentHeight:'auto',
	        top:0,
	        showVerticalScrollIndicator:true,
	        showHorizontalScrollIndicator:false,
	        //verticalBounce: true
        });
    	
    	var profileWindowContainer = Titanium.UI.createView({
    		top: 15,
    	    width: '100%',
    	    height: 610,
    	    layout: 'vertical'
    	});
    	
    	scrollView.addEventListener('singletap', function(e) {
    		genderPickerView.animate(slideOut);
    		birthdatePickerView.animate(slideOut);
    	});
    	
    	var genderPickerView = Titanium.UI.createView({height:248,bottom:-248});
    	var birthdatePickerView = Titanium.UI.createView({height:248,bottom:-248});
    	var countryPickerView = Titanium.UI.createView({height:248,bottom:-248});
    	var slideIn = Titanium.UI.createAnimation({bottom:-33});
        var slideOut = Titanium.UI.createAnimation({bottom:-251});
        
        var genderPicker = Yumit.ui.genderPicker();
        genderPickerView.add(genderPicker);
        genderPicker.addEventListener('change', function(e) {
        	genderButton.title = e.row.title;//genderPicker.getSelectedRow(0).title;
        	genderButton.custom_item = e.row.custom_item;
        	//alert(JSON.stringify(genderPicker.data[0]));
        });
        var birthdatePicker = Yumit.ui.birthdatePicker();
        birthdatePickerView.add(birthdatePicker);
        //birthdatePickerView.add(Ti.UI.createLabel({text: 'lalala'}));
        birthdatePicker.addEventListener('change', function(e) {
            //alert(e.value);
            var pickedDate = e.value;
            birthdateButton.title = pickedDate.getFullYear() + '-' + (parseInt(pickedDate.getMonth()) + 1) + '-' + pickedDate.getDate();
        });
        /*var picker = Titanium.UI.createPicker({top:0});
        picker.selectionIndicator=true;
        var pickerValues = [
	        Titanium.UI.createPickerRow({title:'John'}),
	        Titanium.UI.createPickerRow({title:'Alex'}),
	        Titanium.UI.createPickerRow({title:'Marie'}),
	        Titanium.UI.createPickerRow({title:'Eva'}),
	        Titanium.UI.createPickerRow({title:'James'})
        ];
        picker.add(pickerValues);
        
        genderPickerView.add(picker);
        picker.addEventListener('change', function(e) {
        	//alert('change');
        	genderButton.title = picker.getSelectedRow(0).title;
        });*/
    	
    	var avatarContainer = Titanium.UI.createView({
    		top: 0,
    		width: 'auto',
    		height: 'auto',
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
    		align: 'center',
    		color: Yumit.constants.textColor
    	});
    	
    	var avatarImage = Titanium.UI.createImageView({
    		top: 0,
    		left: 10,
    		width: 77,
    		height: 77,
            defaultImage: '/images/user-avatar-thumb.png',
            image: 'images/user-avatar-thumb.png'
    	});
  
    	var emailContainer = Titanium.UI.createView({
    		top: 0,
    		left: 0,
    		right: 0,
    		width: '100%',
    		height: 'auto',
    		layout: 'vertical'
    	});
    	
    	var emailLabel = Titanium.UI.createLabel({
    		top: 0,
    		left: 15,
    		width: 'auto',
    		height: 'auto',
    		font: {
    		   fontSize: 16
    		},
    		text: 'Email',
    		align: 'center',
    		color: Yumit.constants.textColor
    	});
    	
    	var emailTextField = Titanium.UI.createTextField({
            color:Yumit.constants.textColor,
            height:35,
            top: 5,
            left: 10,
            right: 10,
            width: 300,
            font:{
                fontFamily:Yumit.constants.fontFamily,
                fontSize:14
            },
            borderWidth:2,
            borderColor:'#bbb',
            borderRadius:7,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
            autocorrect: false,
            firstFocus:false
        });
        
        var fullnameContainer = Titanium.UI.createView({
    		top: 10,
    		left: 0,
    		width: '100%',
    		height: 'auto',
    		layout: 'vertical'
    	});
    	
    	var fullnameLabel = Titanium.UI.createLabel({
    		top: 0,
    		left: 15,
    		width: 'auto',
    		height: 'auto',
    		font: {
    		   fontSize: 16
    		},
    		text: 'Full name',
    		align: 'center',
    		color: Yumit.constants.textColor
    	});
    	
    	var fullnameTextField = Titanium.UI.createTextField({
            color:Yumit.constants.textColor,
            height:35,
            top: 5,
            left: 10,
            width: 300,
            font:{
                fontFamily:Yumit.constants.fontFamily,
                fontSize:14
            },
            borderWidth:2,
            borderColor:'#bbb',
            borderRadius:7,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
            autocorrect: false,
            firstFocus:false
        });
        
        var genderContainer = Titanium.UI.createView({
    		top: 15,
    		left: 0,
    		width: '100%',
    		height: 'auto',
    		layout: 'horizontal'
    	});
    	
    	var genderLabel = Titanium.UI.createLabel({
    		top: 10,
    		left: 15,
    		width: 100,//'auto',
    		height: 'auto',
    		font: {
    		   fontSize: 16
    		},
    		text: 'Gender',
    		align: 'center',
    		color: Yumit.constants.textColor
    	});
    	
    	var genderButton = Titanium.UI.createButton({
    		top: 0,
    		left: 10,
    		width: 180,
    		height: 35,
    		font: {
    		   fontSize: 16
    		},
    		title: 'Gender',
    		color: Yumit.constants.textColor,
    		borderWidth:2,
            borderColor:'#bbb',
            borderRadius:7,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    	});
    	
    	genderButton.addEventListener('click', function() {
    		//win = Yumit.ui.genderPicker('F');
            //win.open({modal:true});
            genderPickerView.animate(slideIn);
    	});
    	
    	var birthdateContainer = Titanium.UI.createView({
    		top: 15,
    		left: 0,
    		width: '100%',
    		height: 'auto',
    		layout: 'horizontal'
    	});
    	
    	var birthdateLabel = Titanium.UI.createLabel({
    		top: 10,
    		left: 15,
    		width: 100,//'auto',
    		height: 'auto',
    		font: {
    		   fontSize: 16
    		},
    		text: 'Birthdate',
    		color: Yumit.constants.textColor
    	});
    	
    	var birthdateButton = Titanium.UI.createButton({
    		top: 0,
    		left: 10,
    		width: 180,
    		height: 35,
    		font: {
    		   fontSize: 16
    		},
    		title: 'Date',
    		color: Yumit.constants.textColor,
    		borderWidth:2,
            borderColor:'#bbb',
            borderRadius:7,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    	});
    	
    	birthdateButton.addEventListener('click', function() {
    		//win = Yumit.ui.birthdatePicker();
            //win.open({modal:true});
            birthdatePickerView.animate(slideIn);
    	});
    	
    	var countryContainer = Titanium.UI.createView({
    		top: 15,
    		left: 0,
    		width: '100%',
    		height: 'auto',
    		layout: 'horizontal'
    	});
    	
    	var countryLabel = Titanium.UI.createLabel({
    		top: 10,
    		left: 15,
    		width: 100,
    		height: 'auto',
    		font: {
    		   fontSize: 16
    		},
    		text: 'Country',
    		color: Yumit.constants.textColor
    	});
    	
    	var countryButton = Titanium.UI.createButton({
    		top: 0,
    		left: 10,
    		width: 180,
    		height: 35,
    		font: {
    		   fontSize: 16
    		},
    		title: 'Country',
    		color: Yumit.constants.textColor,
    		borderWidth:2,
            borderColor:'#bbb',
            borderRadius:7,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    	});
    	
    	countryButton.addEventListener('click', function() {
    		win = Yumit.ui.countryPicker();
            win.open({modal:true});
    	});
    	
    	var cityContainer = Titanium.UI.createView({
    		top: 10,
    		left: 0,
    		width: '100%',
    		height: 'auto',
    		layout: 'horizontal'
    	});
    	
    	var cityLabel = Titanium.UI.createLabel({
    		top: 0,
    		left: 15,
    		width: 'auto',
    		height: 'auto',
    		font: {
    		   fontSize: 16
    		},
    		text: 'City',
    		color: Yumit.constants.textColor
    	});
    	
    	var cityTextField = Titanium.UI.createTextField({
            color:Yumit.constants.textColor,
            height:35,
            top: 5,
            left: 10,
            width: 300,
            font:{
                fontFamily:Yumit.constants.fontFamily,
                fontSize:14
            },
            borderWidth:2,
            borderColor:'#bbb',
            borderRadius:7,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
            autocorrect: false,
            firstFocus:false
        });
        
        var websiteUrlContainer = Titanium.UI.createView({
    		top: 10,
    		left: 0,
    		width: '100%',
    		height: 'auto',
    		layout: 'horizontal'
    	});
    	
    	var websiteUrlLabel = Titanium.UI.createLabel({
    		top: 0,
    		left: 15,
    		width: 'auto',
    		height: 'auto',
    		font: {
    		   fontSize: 16
    		},
    		text: 'Website url',
    		color: Yumit.constants.textColor
    	});
    	
    	var websiteUrlTextField = Titanium.UI.createTextField({
            color:Yumit.constants.textColor,
            height:35,
            top: 5,
            left: 10,
            width: 300,
            font:{
                fontFamily:Yumit.constants.fontFamily,
                fontSize:14
            },
            borderWidth:2,
            borderColor:'#bbb',
            borderRadius:7,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
            autocorrect: false,
            firstFocus:false
        });
        
        var saveChangesButton = new Button({
        	id: 'defaultYumitButton',
            top: 15,
    		title: 'Save Changes'
        });
        
        avatarContainer.add(avatarImage);
        avatarContainer.add(avatarLabel);
        emailContainer.add(emailLabel);
        emailContainer.add(emailTextField);
        fullnameContainer.add(fullnameLabel);
        fullnameContainer.add(fullnameTextField);
        genderContainer.add(genderLabel);
        genderContainer.add(genderButton);
        birthdateContainer.add(birthdateLabel);
        birthdateContainer.add(birthdateButton);
        countryContainer.add(countryLabel);
        countryContainer.add(countryButton);
        cityContainer.add(cityLabel);
        cityContainer.add(cityTextField);
        websiteUrlContainer.add(websiteUrlLabel);
        websiteUrlContainer.add(websiteUrlTextField);
        
        profileWindowContainer.add(avatarContainer);
        profileWindowContainer.add(emailContainer);
        profileWindowContainer.add(fullnameContainer);
        profileWindowContainer.add(genderContainer);
        profileWindowContainer.add(birthdateContainer);
        profileWindowContainer.add(countryContainer);
        profileWindowContainer.add(cityContainer);
        profileWindowContainer.add(websiteUrlContainer);
        profileWindowContainer.add(saveChangesButton);
        
        scrollView.add(profileWindowContainer);
        profileWindow.add(scrollView);
        profileWindow.add(genderPickerView);
        profileWindow.add(birthdatePickerView);
    	
    	/* ============== EVENT LISTENER ============== */
    	
    	var fillUserInfo = function(userInfo) {
    		alert(JSON.stringify(userInfo));
    		emailTextField.value = userInfo.email;
    		fullnameTextField.value = userInfo.name;
    		setGender(userInfo.gender);
    		setBirthdate(userInfo.birthdate);
    		//avatarImage.image = 
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
    	    birthdateButton.title = year + '-' + month + '-' + day;
    	};
    	
    	/*var getGender = function(key) {
    		return (key === 'M') ? 'Male' 
    		     : (key === 'F') ? 'Female'
    		     : 'Not Saying';
    	};
    	
    	var getGenderKey = function(gender) {
    		return (gender === 'Male')   ? 'M'
    		     : (gender === 'Female') ? 'F'
    		     : '';
    	};*/
    	
    	Titanium.App.addEventListener('Yumit:profile:fetchInfo', function() {
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
    	
    	Titanium.App.addEventListener('Yumit:profile:genderChanged', function(e) {
    		if (e.pickedElement) {
    		    //alert(e.pickedElement.rowIndex);
    		    
    		}
    	});
    	
    	/* ============ END EVENT LISTENERS =========== */
    	
    	return profileWindow;
    }
})();
