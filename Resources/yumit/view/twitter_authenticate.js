
(function() {
    Yumit.ui.twitterAuthentication = function() {
        var window = new Window({
            id: 'defaultWindow',
            title: 'Twitter connect',
            backButtonTitle: 'Back'
        });
        
        var tableRows = [
            createUsernameRow(),
            createPasswordRow()
        ];
        
        var mainTable = Titanium.UI.createTableView({
            data: tableRows,
        	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
        });
        mainTable.rows = tableRows;
        
        mainTable.addEventListener('click', function(e) {
        	if (e.source.focuse) {
                e.source.focuse();
            }
        });
        
        
        
        window.add(mainTable);
        
        return window;
        
/*******************************************************************************/
        
        function createUsernameRow() {
    	    var usernameRow = Titanium.UI.createTableViewRow({
                height: 45,
                selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
            });
            var usernameRowContainer = Titanium.UI.createView({
        	    top:0, 
        	    left:0,
        	    height:45, 
        	    layout:'horizontal'
            });
            var usernameLabel = Titanium.UI.createLabel({
                text: 'Username',
                width: 85,
                height: 'auto',
                left: 15,
    		    top: 12,
    		    font: {
    			    fontWeight: 'bold',
    			    fontSize: 16
       		    }
            });
            var usernameTextField = Titanium.UI.createTextField({
                width: 180,
                height: 35,
                top: 4,
                left: 5,
                borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
                autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
                returnKeyType: Titanium.UI.RETURNKEY_NEXT
            });
            usernameTextField.addEventListener('change', function(e) {
                usernameRow.userName = e.value;
            });
            usernameTextField.addEventListener('return', function(e) {
                mainTable.rows[1].fireEvent('focus');
            });
            
            usernameRowContainer.add(usernameLabel);
            usernameRowContainer.add(usernameTextField);
            usernameRow.add(usernameRowContainer);
        
            return usernameRow;
        }
        
        function createPasswordRow() {
    	    var passwordRow = Titanium.UI.createTableViewRow({
                height: 45,
                selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
            });
            
            var passwordRowContainer = Titanium.UI.createView({
        	    top:0, 
        	    left:0,
        	    height:45, 
        	    layout:'horizontal'
            });
            var passwordLabel = Titanium.UI.createLabel({
                text: 'Password',
                width: 85,
                height: 'auto',
                left: 15,
    		    top: 12,
    		    font: {
    			    fontWeight: 'bold',
    			    fontSize: 16
       		    }
            });
            var passwordTextField = Titanium.UI.createTextField({
                width: 180,
                height: 35,
                top: 4,
                left: 5,
                passwordMask: true,
                borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
                autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
                returnKeyType: Titanium.UI.RETURNKEY_SEND 
            });
            passwordTextField.addEventListener('change', function(e) {
            	passwordRow.password = e.value;
            });
            passwordTextField.addEventListener('return', function(e) {
            	var username = mainTable.rows[0].userName;
            	var password = mainTable.rows[1].password;
            	Titanium.App.fireEvent("Yumit:ui:showLoading",{title:"Connecting"});
            	Ti.App.Properties.BH.authorizeWithXAuth(username, password, function(e){
            		Ti.App.fireEvent('Yumit:authorizeTwitter', {result:e});
            		Ti.App.fireEvent("Yumit:ui:hideLoading");
            		window.close();              	
                });
            });
            passwordRow.addEventListener('focus', function(e) {
                passwordTextField.focus();
            });
            
            passwordRowContainer.add(passwordLabel);
            passwordRowContainer.add(passwordTextField);
            passwordRow.add(passwordRowContainer);
        
            return passwordRow;
        }
    };
})();
