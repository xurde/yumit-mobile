(function(){
  Yumit.ui.yums_friends = function(){
    var win = new Window({
      id: 'defaultWindow',
      title:'Friends Yums'
    });

    var tableView = Ti.UI.createTableView({
      top:0,
      minRowHeight:280
    });

    var refresh_yums = function(yums) {
      var tvData = [];
      for (var i=0,l=yums.length;i<l;i++) {
        tvData.push(Yumit.model.Yum.createYumRow(yums[i]));
      }
      tableView.setData(tvData);
    };

    tableView.addEventListener('click',function(e) {
      alert("CLICK");
      // var _yum = e.rowData;
      // var win = Yumit.ui.yum(_yum);
      // tabGroup.activeTab.open(win,{animated:true});
    });

    win.add(tableView);
    Yumit.model.Yum.getYumsFriends({
      success: refresh_yums
    });

    return win;
  };

})();