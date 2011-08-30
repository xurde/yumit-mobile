(function(){
	Yumit.ui.selectPhoto = function(_winView, onPhotoSelect){
		var chooseMedia = Titanium.UI.createOptionDialog({
        	title: 'Choose media',
        	options: [ 'New Photo', 'Choose Existing', 'Cancel'],
        	cancel: 2
      	});
      	
      	var chooseMediaSource = function(event) {
	      switch(event.index) {
	        case 0:
	          newPhoto();
	          break;
	        case 1:
	          chooseFromGallery();
	          break;
	        case event.cancel:
	          //alert("cancel");
	          break;
	      };
	    };
	    
	    function newPhoto() {
	      Ti.Media.showCamera({
	        mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
	        success:function(event) {
	          handleImageEvent(event);
	        },
	        error:function(error) {
	          Ti.UI.createAlertDialog({
	            title:'Sorry',
	            message:'This device either cannot take photos or there was a problem saving this photo.'
	          }).show();
	        },
	        allowImageEditing:true,
	        saveToPhotoGallery:true
	      });
	    };
	
	    function chooseFromGallery() {
	      Ti.Media.openPhotoGallery({
	        mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
	        success:function(event) {
	          handleImageEvent(event);
	        },
	        error:function(error){
	          Ti.UI.createAlertDialog({
	            title:'Sorry',
	            message: 'We had a problem reading from your photo gallery - please try again'
	          }).show();
	        },
	        allowImageEditing:true
	      });
	    };
	    
	    function handleImageEvent(event) {
	      var photo  = event.media;
	      onPhotoSelect(photo);
	    };
      	
      	chooseMedia.addEventListener('click', chooseMediaSource);
      	chooseMedia.show({
      		view: _winView,
      		animated: true
      	});
	}
})();