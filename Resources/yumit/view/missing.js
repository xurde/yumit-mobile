(function(){
  Yumit.ui.missing = function(){
    var win = new Window({
      id: 'defaultWindow',
      title:'Missing'
    });
    var emptyView = Ti.UI.createWindow({backgroundColor: '#CCCCCC'});
    win.add(emptyView);
    return win;
  };
})();