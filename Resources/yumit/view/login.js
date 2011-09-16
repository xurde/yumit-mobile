(function() {
  Yumit.ui.login = function() {
    var login_win = new Window({
      id: 'defaultWindow',
      backgroundColor: '#FFF',
      title: 'Login',
    });

    var usernameValue;
    var passwordValue;

	var scrollView = Ti.UI.createScrollView({
        top: 0,
        showVerticalScrollIndicator:true,
        showHorizontalScrollIndicator:false,
        verticalBounce:true
    });
        
    login_win.add(scrollView);

    var container = Titanium.UI.createView({
      top:0,
      visiblelogin:false,
      layout:'vertical'
    });
    scrollView.add(container);
    
    var logo = Ti.UI.createImageView({
    	image: '/images/logo.png',
    	top: 20,
    	height: 50,
    	width: 'auto'
    });

    var usernameField = Titanium.UI.createTextField({
      color:'#787878',
      value:usernameValue,
      height:35,
      top:25,
      width:250,
      hintText:'Yumit Username',
      keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
      returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
      borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      autocorrect:false
    });
    usernameField.addEventListener('return', function() {
      scrollView.scrollTo(0, 50);
      passwordField.focus();
    });
    usernameField.addEventListener('change', function(e) {
      usernameValue = e.value;
    });

    var passwordField = Titanium.UI.createTextField({
      color:'#787878',
      value:passwordValue,
      height:35,
      top:10,
      width:250,
      hintText:'Yumit Password',
      keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
      returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
      borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      autocorrect:false,
      passwordMask:true
    });
    
    passwordField.addEventListener('return', function() {
      passwordField.blur();
      loginButton.fireEvent('click');
    });

    passwordField.addEventListener('change', function(e) {
      passwordValue = e.value;
    });
    
    passwordField.addEventListener('focus', function() {
        scrollView.scrollTo(0, 50);
    });

    var loginButton = new Button({
        id: 'defaultYumitButton',
        top:20,
        title:'Login'
    });

    var createLabel = Ti.UI.createLabel({
      text: "You don't have an account yet?",
      textAlign:'center',
      font:{
        fontSize:15,
        fontFamily:'Trebuchet MS',
        fontWeight:'regular',
        fontStyle:'italic'
      },
      height:'auto',
      width:'auto',
      color:'#000',
      top:10,
      left:35
    });

    var createAccountButton = new Button({
    	id: 'defaultYumitButton',
      top:10,
      title: 'Create account',
    });
    
    createAccountButton.addEventListener('click', function() {
        var registrationWindow = Yumit.ui.register();
        navGroup.open(registrationWindow);
    });

    container.add(logo);
    container.add(usernameField);
    container.add(passwordField);
    container.add(loginButton);
    container.add(createLabel);
    container.add(createAccountButton);

 	var onSuccessLogin = function(token){
    	Titanium.App.Properties.setString("token",token);
    	//Titanium.App.Properties.setBool("facebookShareDisabled", false);
    	
        Titanium.App.fireEvent("Yumit:ui:hideLoading");
        Titanium.App.fireEvent('Yumit:user:fetchInfo');
        Titanium.App.fireEvent('Yumit:yums:getYumsFriends');
        setTimeout(function() {
            tabGroup.setActiveTab({indexOrObject: 0});
            Titanium.App.fireEvent('Yumit:login');
            if (win) {
                win.close({opacity:0,duration:500});
            } else {
            	login_win.close({opacity:0,duration:500});
            }
            tabGroup.open();
          }, 500);
    }

    loginButton.addEventListener("click", function(e) {
      passwordField.blur();
      Titanium.App.fireEvent("Yumit:ui:showLoading",{title:"Connecting"});
      
      Yumit.model.User.login({
        username: usernameValue,
        password: passwordValue,
        success: onSuccessLogin,
        error: function(){
          Titanium.App.fireEvent("Yumit:ui:hideLoading");
          alert("Wrong user name and/or password");
        }
      });
    });
    
    Ti.App.addEventListener('Yumit:register', function(){
    	if (win) {
            win.close();
       } else {
           login_win.close();
       }
    });
    
    var navGroup = Ti.UI.iPhone.createNavigationGroup({
    	window: login_win
    });
    
    if (navGroup) {
    	var win = Ti.UI.createWindow();
    	win.add(navGroup);
    	return win;
    } else {
    	return login_win;
    }

  };
})();