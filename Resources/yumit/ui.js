Yumit.ui ={};
(function(){
  Yumit.ui.alert = function(/*String*/ _title, /*String*/ _message) {
    Ti.UI.createAlertDialog({
      title:_title,
      message:_message
    }).show();
  };
  //create a film strip like view
  Yumit.ui.createFilmStripView = function(_args) {
    var ww  = Ti.Platform.displayCaps.platformWidth;
    var root = Ti.UI.createView( _args.space ),
    views = _args.views,
    container = Ti.UI.createView({
      top:0,
      left:0,
      bottom:0,
      width:ww*_args.views.length
    });

    for (var i = 0, l = views.length; i<l; i++) {
      var newView = Ti.UI.createView({
        top:0,
        bottom:0,
        left:ww*i,
        width:ww
      });
      newView.add(views[i]);
      container.add(newView);
    }
    root.add(container);

    //set the currently visible index
    root.addEventListener('changeIndex', function(e) {
      var leftValue = ww*e.idx*-1;
      container.animate({
        duration:500,
        left:leftValue
      });
    });

    return root;
  };

})();