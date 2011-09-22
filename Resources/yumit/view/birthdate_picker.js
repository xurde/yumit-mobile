
(function() {
    Yumit.ui.birthdatePicker = function(date) {
        var winWithPicker = new Window({
    	    id: 'defaultWindow',
    	    title: 'Choose gender'
        });
    		
        var container = Ti.UI.createView({
            layout: 'vertical'
        });
        
        var minDate = new Date();
        minDate.setFullYear(1910);
        minDate.setMonth(0);
        minDate.setDate(1);

        var maxDate = new Date();
        maxDate.setFullYear(2011);
        maxDate.setMonth(11);
        maxDate.setDate(31);

        var picker = Ti.UI.createPicker({
    	    top: 20,
            height: 'auto',
            type:Ti.UI.PICKER_TYPE_DATE,
	        minDate:minDate,
	        maxDate:maxDate,
	        value: date
        });
        /*var data = [];
        data[0]=Ti.UI.createPickerRow({title:'Male',custom_item:'M'});
        data[1]=Ti.UI.createPickerRow({title:'Female',custom_item:'F'});
        data[2]=Ti.UI.createPickerRow({title:'Not showing',custom_item:''});*/
        var currentIndex = 0;
        /*for (var i=0, n=data.length; i < n; i++) {
        	if (data[i].custom_item == customItemValue) {
        		currentIndex = i;
        	}
        }*/

        picker.selectionIndicator = true;
        //picker.add(data);
            
        var doneButton = new Button({
        	id: 'defaultYumitButton',
            top: 15,
    		title: 'Done'
        });
        
        var pickedElement;
        picker.addEventListener('change', function(e) {
            if (e.row && e.rowIndex) {
            	pickedElement = e;
            }
        });
            
        doneButton.addEventListener('click', function() {
            Ti.App.fireEvent('Yumit:profile:birthdateChanged', {pickedElement: pickedElement});
            winWithPicker.close();
        });
        
        winWithPicker.addEventListener('open', function() {
            picker.setSelectedRow(0, currentIndex, true);
        });

        container.add(picker);
        container.add(doneButton);
        winWithPicker.add(container);
        return winWithPicker;
    }
    
})();
