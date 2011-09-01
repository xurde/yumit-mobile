(function() {
  Yumit.ui.login = function() {
    var login_win = new Window({
      id: 'defaultWindow',
      backgroundColor: '#FFF'
    });

    var usernameValue; //= Titanium.App.Properties.getString("username");
    var passwordValue; //= Titanium.App.Properties.getString("password");

    var container = Titanium.UI.createView({
      top:0,
      backgroundColor: Yumit.constants.darkRed,
      visiblelogin:false,
      layout:'vertical'
    });

    var loginLabel = Ti.UI.createLabel({
      text: 'Login:',
      textAlign:'left',
      font:{
        fontSize:18,
        fontFamily:'Trebuchet MS',
        fontWeight:'bold',
        fontStyle:'italic'
      },
      height:'auto',
      width:'auto',
      color:'#fff',
      top:10,
      left:35
    });

    var usernameField = Titanium.UI.createTextField({
      color:'#787878',
      value:usernameValue,
      height:35,
      top:10,
      width:250,
      hintText:'Yumit Username',
      keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
      returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
      borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
      autocorrect:false
    });
    usernameField.addEventListener('return', function() {
      usernameField.blur();
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

    var loginButton = Titanium.UI.createButton({
      top:10,
      backgroundImage:'images/button-large-noarrow.png',
      image:'images/label-connect.png',
      width:250,
      height:47
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
      color:'#fff',
      top:20,
      left:35
    });

    var createAccountButton = Titanium.UI.createButton({
      top:10,
      backgroundImage:'images/button-large-noarrow.png',
      image:'images/label-createaccount.png',
      width:250,
      height:47
    });
    createAccountButton.addEventListener('click', function() {
        login_win.close({opacity:0,duration:500});
        var registrationWindow = Yumit.ui.register();
        registrationWindow.open();
    });

    container.add(loginLabel);
    container.add(usernameField);
    container.add(passwordField);
    container.add(loginButton);
    container.add(createLabel);
    container.add(createAccountButton);

 	var onSuccessLogin = function(token){
    	Titanium.App.Properties.setString("token",token);
          Titanium.App.fireEvent("Yumit:ui:hideLoading");
          Titanium.App.fireEvent('Yumit:yums:getYumsFriends');
          setTimeout(function() {
            tabGroup.setActiveTab({indexOrObject: 0});
            Titanium.App.fireEvent('Yumit:login');
            login_win.close({opacity:0,duration:500});
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
    
   
    

    // addButton.addEventListener('click', function() {
    //   Titanium.App.fireEvent("Yumit:ui:showLoading",{title:"Connecting"});
    //   setTimeout(function(){alert("yeee");}, 3000);
    //   //
    //   // var acct = new tt.model.Account();
    //   // acct.authorize({
    //   //  username:unField.value,
    //   //  password:pwField.value,
    //   //  success: function(_xhr) {
    //   //    try {
    //   //      Ti.API.info('New Account Authorized:');
    //   //      Ti.API.info(JSON.stringify(acct));
    //   //      tt.app.currentAccount = acct;
    //   //      Ti.App.Properties.setString('currentAccountID',String(acct.id));
    //   //
    //   //      //on new account, let the rest of the app know a new account is being used
    //   //      Ti.App.fireEvent('app:hide.loader');
    //   //      Ti.App.fireEvent('app:account.selected');
    //   //      Ti.App.fireEvent('app:change.tab',{tabIndex:0}); //Switch to timeline
    //   //    }
    //   //    catch (e) {
    //   //      Ti.API.info(JSON.stringify(e));
    //   //      Ti.App.fireEvent('app:hide.loader');
    //   //    }
    //   //    Ti.App.fireEvent('app:hide.drawer');
    //   //  },
    //   //  error: function(_e, _xhr) {
    //   //    Ti.UI.createAlertDialog({
    //   //      title:'Authorization Failed',
    //   //      message:'Sorry, but we couldn\'t verify your Twitter credentials.  Check your username and password and try again.'
    //   //    }).show();
    //   //    Ti.App.fireEvent('app:hide.drawer');
    //   //    Ti.App.fireEvent('app:hide.loader');
    //   //  }
    //   // });
    // });
    //

    login_win.add(container);
    return login_win;
  };
})();