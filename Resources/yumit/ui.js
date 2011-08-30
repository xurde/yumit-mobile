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

  //////////////////tabbed navigation
  // try to replicate Titanium.UI.createTabbedBar for Android/iOS
  Yumit.ui.createtabbedNavigation = function(_args) {
    var _top       = _args.top || 0;
    var _callback  = _args.callback;
    var _labels    = _args.labels;
    var platformWidth = Ti.Platform.displayCaps.platformWidth;

    //create the main application window
    var tabHeight = 35,
        tabWidth = platformWidth/_labels.length,
        tabView = Ti.UI.createView({
          top:_top,
          height:tabHeight,
          width:platformWidth
        }),
        tabs = [];

    //create clickable tab images
    function createTab(_text,_cb,_on) {
      var view = Ti.UI.createView({
        width:tabWidth,
        backgroundImage: (_on) ? 'images/tab_background.png' : 'images/tab_background_off.png'
        //backgroundColor:"#fcc"
      }),
      label = Ti.UI.createLabel({
        id:'yumLabelTags',
        left:10,

        color: '#fff',
        shadowColor:"#000",
        shadowOffset:{x:-1, y:-1},
        font: {
          fontFamily:Yumit.constants.fontFamily,
          fontSize:14,
          fontWeight:'bold'
        },
        textAlign:'center',
        text:_text
      });
      view.on = _on||false;

      //assemble view
      view.add(label);
      view.addEventListener('click', _cb);

      //'instance' method
      view.toggle = function() {
        view.on = !view.on;
        view.backgroundImage = (view.on) ? 'images/tab_background.png' : 'images/tab_background_off.png';
      };

      return view;
    }

    //toggle view state of application to the relevant tab
    function selectIndex(_idx, _callback) {
      for (var i = 0, l = tabs.length; i<l; i++) {
        //select the tab and move the tab 'cursor'
        if (_idx === i) {
          //if the tab is already selected, do nothing
          if (!tabs[i].on) {
            Ti.API.info('selecting tab index: '+_idx);
            tabs[i].toggle();
            //set the current film strip index
            _callback(i);
          }
        }
        else if (tabs[i].on && (_idx !== i)) {
          tabs[i].toggle();
        }
      }
    }

    for (var i = 0, l = _labels.length; i<l; i++) {
      tabs.push(createTab(_labels[i].title,
                          function(x) {
                              return function(){
                                selectIndex(x, _callback);
                              };
                            }(i),
                          _labels[i].enabled));

      //add tabs to layout
      tabs[i].left = tabWidth*i;
      tabView.add(tabs[i]);
    }

    return tabView;
  };

	Yumit.ui.addNavButtons = function(_arg) {

		if(!_arg.win) {
			return;
		};

		var settings_button = Titanium.UI.createButton({
			image : 'images/gear2.png'
		});
		settings_button.addEventListener('click', function(e) {
			_arg.win = Yumit.ui.settings();
			//_arg.win.open();
			_arg.tab.open(_arg.win);
		});

		_arg.win.leftNavButton = settings_button;

		if(_arg.refresh) {
			var refresh_button = Titanium.UI.createButton({
		      //image:'images/refresh_double.png'
			  systemButton : Titanium.UI.iPhone.SystemButton.REFRESH
			});

			refresh_button.addEventListener('click', function(){_arg.refresh();});
			_arg.win.rightNavButton = refresh_button;
		};

	}

})();