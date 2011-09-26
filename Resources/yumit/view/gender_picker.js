

(function() {
    Yumit.ui.genderPicker = function(/*customItemValue*/) {
        var winWithPicker = new Window({
    	    id: 'defaultWindow',
    	    title: 'Choose gender'
        });
    		
        var container = Ti.UI.createView({
            layout: 'vertical'
        });

        var picker = Ti.UI.createPicker({
    	    top: 0,
            height: 'auto'
        });
        var data = [];
        data[0]=Ti.UI.createPickerRow({title:'Male',custom_item:'M'});
        data[1]=Ti.UI.createPickerRow({title:'Female',custom_item:'F'});
        data[2]=Ti.UI.createPickerRow({title:'Not saying',custom_item:''});
        /*var currentIndex = 0;
        for (var i=0, n=data.length; i < n; i++) {
        	if (data[i].custom_item == customItemValue) {
        		currentIndex = i;
        	}
        }*/

        picker.selectionIndicator = true;
        picker.add(data);
        picker.data = data;
            
        var doneButton = new Button({
        	id: 'defaultYumitButton',
            top: 15,
    		title: 'Done'
        });
        
        var pickedElement;
        /*picker.addEventListener('change', function(e) {
            if (e.row && e.rowIndex) {
            	pickedElement = e;
            }
        });*/
            
        doneButton.addEventListener('click', function() {
            Ti.App.fireEvent('Yumit:profile:genderChanged', {pickedElement: pickedElement});
            winWithPicker.close();
        });
        
        /*winWithPicker.addEventListener('open', function() {
            picker.setSelectedRow(0, currentIndex, true);
        });*/

        container.add(picker);
        container.add(doneButton);
        winWithPicker.add(container);
        return picker;//winWithPicker;
    }

})();
