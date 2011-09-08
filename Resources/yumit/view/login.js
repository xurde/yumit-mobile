(function() {
  Yumit.ui.login = function() {
    var login_win = new Window({
      id: 'defaultWindow',
      backgroundColor: '#FFF',
      title: 'Login',
      //barImage: 'images/navbar-background.png'
    });

    var usernameValue; //= Titanium.App.Properties.getString("username");
    var passwordValue; //= Titanium.App.Properties.getString("password");

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
// //     

    // var loginLabel = Ti.UI.createLabel({
      // text: 'Login:',
      // textAlign:'left',
      // font:{
        // fontSize:18,
        // fontFamily:'Trebuchet MS',
        // fontWeight:'bold',
      // },
      // height:'auto',
      // width:'auto',
      // color:'#000',
      // top:10,
      // left:35
    // });

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

    var loginButton = new Button({//Titanium.UI.createButton({
        id: 'defaultYumitButton',
        top:20,
      //backgroundImage:'/images/button-yumit.png', //'images/button-large-noarrow.png',
      //image:'images/label-connect.png',
        title:'Login',
      //width:220,
      //height:50
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

    var createAccountButton = new Button({//Titanium.UI.createButton({
    	id: 'defaultYumitButton',
      top:10,
      //backgroundImage:'/images/button-yumit.png',//'images/button-large-noarrow.png',
      //image:'images/label-createaccount.png',
      title: 'Create account',
      //width:220,
      //height:50
    });
    createAccountButton.addEventListener('click', function() {
        var registrationWindow = Yumit.ui.register();
        navGroup.open(registrationWindow);
    });

    //container.add(loginLabel);
    container.add(logo);
    container.add(usernameField);
    container.add(passwordField);
    container.add(loginButton);
    container.add(createLabel);
    container.add(createAccountButton);
    //login_win.add(container);

 	var onSuccessLogin = function(token){
    	Titanium.App.Properties.setString("token",token);
          Titanium.App.fireEvent("Yumit:ui:hideLoading");
          Titanium.App.fireEvent('Yumit:yums:getYumsFriends');
          setTimeout(function() {
            tabGroup.setActiveTab({indexOrObject: 0});
            Titanium.App.fireEvent('Yumit:login');
            win.close({opacity:0,duration:500});//login_win.close({opacity:0,duration:500});
            tabGroup.open();
          }, 500);
    }

    loginButton.addEventListener("click", function(e) {
      passwordField.blur();
      Titanium.App.fireEvent("Yumit:ui:showLoading",{title:"Connecting"});
      // setTimeout(function(){
      //   Titanium.App.fireEvent("Yumit:ui:hideLoading");
      // }, 2000);
      // setTimeout(function(){
      //   login_win.close({opacity:0,duration:500});
      //   tabGroup.open();
      // }, 2500);
      // Titanium.App.Properties.setString("username",usernameValue);
      // Titanium.App.Properties.setString("password",passwordValue);
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
    
    var win = Ti.UI.createWindow();
    var navGroup = Ti.UI.iPhone.createNavigationGroup({
    	window: login_win
    });
    win.add(navGroup);
    
    Ti.App.addEventListener('Yumit:register', function(){
        win.close();
    });
    //return login_win;
    return win;
  };
})();