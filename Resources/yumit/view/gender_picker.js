

(function() {
    Yumit.ui.genderPicker = function(customItemValue) {
        var winWithPicker = new Window({
    	    id: 'defaultWindow',
    	    title: 'Choose gender'
        });
    		
        var container = Ti.UI.createView({
        	//backgroundColor: 'transparent',
            layout: 'vertical'
        });

        var picker = Ti.UI.createPicker({
    	    //top: 43,
    	    top: 0,
            height: 'auto'
        });
        var data = [];
        data[0]=Ti.UI.createPickerRow({title:'Male',custom_item:'M'});
        data[1]=Ti.UI.createPickerRow({title:'Female',custom_item:'F'});
        data[2]=Ti.UI.createPickerRow({title:'Not saying',custom_item:''});

        picker.selectionIndicator = true;
        picker.add(data);
        picker.data = data;
            
        var doneButton = new Button({
        	id: 'defaultYumitButton',
            top: 0,
    		title: 'Done'
        });
        
        if (customItemValue) {
            var currentIndex = 0;
            for (var i=0, n=data.length; i < n; i++) {
        	    if (data[i].custom_item == customItemValue) {
        		    currentIndex = i;
        	    }
            }
            picker.setSelectedRow(0, currentIndex, true);
        }
        
        //container.add(doneButton);
        //container.add(picker);
        return picker;//container;
    }

})();
