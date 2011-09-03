(function(){
	Yumit.ui.createPostWindow = function() {
        var win = new Window({
		    id : 'defaultWindow',
		    title : 'Post',
		    backgroundColor : '#FFF'
	    });

	    var post = function() {
		    Yumit.ui.selectPhoto(Yumit.ui.lastActiveTab, function(photo) {
			    var nextWin = Yumit.ui.selectPlaceForm(Yumit.ui.lastActiveTab, photo);
			    Yumit.ui.lastActiveTab.open(nextWin, {
				    animated : true
			    });
		    })
	    };

	    var leftNavButton = Titanium.UI.createButton({
		    title : 'Activity',
		    image : 'images/activity.png',
	    });
	        
	    leftNavButton.addEventListener('click', function(e) {
		    tabGroup.setActiveTab(tab0);
	    });

	    win.leftNavButton = leftNavButton;

	    var rightNavButton = Titanium.UI.createButton({
		    title : 'Places',
		    icon : 'images/places.png',
	    });

	    rightNavButton.addEventListener('click', function() {
		    tabGroup.setActiveTab(tab3);
	    });
	    
	    win.rightNavButton = rightNavButton;

	    //win.hide();
	    //tab3.icon = 'images/photo.png';
	    win.addEventListener('focus', function() {
		    post();
		    tabGroup.setActiveTab(Yumit.ui.lastActiveTab||tab0);
	    });
	    
	    return win;
    };	
})();
