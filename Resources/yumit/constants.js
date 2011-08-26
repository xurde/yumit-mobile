(function() {
  Yumit.constants = {
    textColor:'#000000',
    grayTextColor:'#888888',
    headerColor:'#FFFFFF',
    darkRed:'#940000',
    lightBlue:'#006cb1',
    darkBlue:'#93caed',
    grayColor:'#c4c5c4',
    mainFont:'Helvetica Neue',
    // fontFamily: tt.os({
    // iphone:'Helvetica Neue',
    // android:'Droid Sans'
    spacing: 6,
    imgDimensions: 48,
    nameHeight: 18,
    metaHeight: 14,
    avatarOffset: 6*2+48, //spacing*2+imgDimensions
    httpTimeout: 45*1000
  };

  Yumit.android = Ti.Platform.name == 'android';
  //Yumit.api_path = "http://10.211.55.2:3000"
  Yumit.api_path = "http://new.yumit.com"
	//Yumit.api_path = "http://localhost:3000"
  //
  // returns true if iphone/ipad and version is 3.2+
  //
  Yumit.IPhone3_2_Plus = (function() {
    // add iphone specific tests
    if (Titanium.Platform.name == 'iPhone OS') {
      var version = Titanium.Platform.version.split(".");
      var major = parseInt(version[0],10);
      var minor = parseInt(version[1],10);

      // can only test this support on a 3.2+ device
      if (major > 3 || (major == 3 && minor > 1)) {
        return true;
      };
    };
    return false;
  })();

  Yumit.iOS4Plus = (function() {
    // add iphone specific tests
    if (Titanium.Platform.name == 'iPhone OS') {
      var version = Titanium.Platform.version.split(".");
      var major = parseInt(version[0],10);

      // can only test this support on a 3.2+ device
      if (major >= 4) {
        return true;
      };
    };
    return false;
  })();

})();
