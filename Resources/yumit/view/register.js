(function() {
    Yumit.ui.register = function() {
        var registerWindow = new Window({
            id: 'defaultWindow',
            title: 'Registration',
            backgroundColor: '#FFF'
        });
        
        var userName;
        var email;
        var password;
        var confirmPassword;
        
        var scrollView = Ti.UI.createScrollView({
        	top: 0,
        	showVerticalScrollIndicator:true,
            showHorizontalScrollIndicator:false,
            verticalBounce:true
        });
        
        registerWindow.add(scrollView);
        
        var container = Ti.UI.createView({
            top:0,
            //backgroundColor: Yumit.constants.darkRed,
            layout:'vertical'
        });
        scrollView.add(container);
//         
        var registrationLabel = Ti.UI.createLabel({
            text: 'Enter your information:',
            textAlign:'left',
            font:{
                fontSize:15,
                fontFamily:'Trebuchet MS',
                fontWeight:'regular',
                fontStyle:'italic'
            },
            height:'auto',
            width:'auto',
            color:'#000',
            top:20,
            left:35
        });
        
        var userNameTextField = Ti.UI.createTextField({
            color:'#787878',
            value:userName,
            height:35,
            top:15,
            width:250,
            hintText:'User name',
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            autocorrect:false
        });
        
        var emailTextField = Ti.UI.createTextField({
            color:'#787878',
            value:email,
            height:35,
            top:15,
            width:250,
            hintText:'Email',
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            autocorrect:false
        });
        
        var passwordTextField = Ti.UI.createTextField({
            color:'#787878',
            value:password,
            height:35,
            top:15,
            width:250,
            hintText:'Password',
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            autocorrect:false,
            passwordMask:true
        });
        
        var confirmPasswordTextField = Ti.UI.createTextField({
            color:'#787878',
            value:confirmPassword,
            height:35,
            top:15,
            width:250,
            hintText:'Confirm password',
            keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
            returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
            borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            autocorrect:false,
            passwordMask:true
        });
        
        var createButton = new Button({//Titanium.UI.createButton({
        	id: 'defaultYumitButton',
            top:20,
            // backgroundImage:'images/button-large-noarrow.png',
            title:'Create',
            // width:250,
            // height:47
        });
        
        var cancelButton = Titanium.UI.createButton({
            top:10,
            backgroundImage:'images/button-large-noarrow.png',
            title:'Cancel',
            width:250,
            height:47
        });
        
        userNameTextField.addEventListener('change', function(e) {
            userName = e.value;
        });
        
        userNameTextField.addEventListener('return', function() {
            //userNameTextField.blur();
            emailTextField.focus();
        });
        
        passwordTextField.addEventListener('change', function(e) {
            password = e.value;
        });
        
        passwordTextField.addEventListener('return', function() {
        	scrollView.scrollTo(0, 110);
        	confirmPasswordTextField.focus();
        });
        
        passwordTextField.addEventListener('focus', function() {
            scrollView.scrollTo(0, 70);
        });
        
        confirmPasswordTextField.addEventListener('change', function(e) {
            confirmPassword = e.value;
        });
        
        confirmPasswordTextField.addEventListener('return', function() {
        	createButton.fireEvent('click');     
        });
        
        confirmPasswordTextField.addEventListener('focus', function() {
            scrollView.scrollTo(0, 110);
        });
        
        emailTextField.addEventListener('change', function(e) {
            email = e.value;
        });
        
        emailTextField.addEventListener('return', function() {
        	passwordTextField.focus();
        });
        
        createButton.addEventListener('click', function() {
        	Titanium.App.fireEvent("Yumit:ui:showLoading",{title:"Registering"});
            Yumit.model.User.register({
            	userName: userName,
            	password: password,
            	confirmPassword: confirmPassword,
            	email: email,
            	
            	success: function(token) {
                    Titanium.App.Properties.setString("token",token);
                    Titanium.App.fireEvent('Yumit:register');
                    Titanium.App.fireEvent('Yumit:yums:getYumsFriends');                    
                    tabGroup.setActiveTab({indexOrObject: 0});
                    tabGroup.open();
                    registerWindow.close({opacity:0,duration:500});
            	}, 
            	error: function(error) {
            		Titanium.App.fireEvent("Yumit:ui:hideLoading");
            		alert("Wrong params: " + error);
            	}
            });
           // tabGroup.open();
           // registerWindow.close();
        });
        
        cancelButton.addEventListener('click', function() {
        	registerWindow.close({opacity:0,duration:500});
        	var loginWindow = Yumit.ui.login();
        	setTimeout(function(){
        	    loginWindow.open({modal:true});
        	}, 500);
        });
        
        container.add(registrationLabel);
        container.add(userNameTextField);
        container.add(emailTextField);
        container.add(passwordTextField);
        container.add(confirmPasswordTextField);
        container.add(createButton);
        //container.add(cancelButton);
        
        //registerWindow.add(container);
        
        return registerWindow;
    };
})();
