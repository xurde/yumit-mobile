Yumit.ui ={};
(function(){
  Yumit.ui.alert = function(/*String*/ _title, /*String*/ _message) {
  	Ti.UI.createAlertDialog({
  		title:_title, 
  		message:_message
  	}).show();
  };
})();