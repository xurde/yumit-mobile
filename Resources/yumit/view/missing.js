(function(){
  Yumit.ui.missing = function(){
    var win = new Window({
      id: 'defaultWindow',
      title:'Missing',
      backgroundColor: '#FFF'
    });

    return win;
  };

  Yumit.ui.test_window = function(){
    var win = new Window({
      id: 'defaultWindow',
      title:'Test Window',
      backgroundColor: '#FFF'
    });

    return win;
  };

})();