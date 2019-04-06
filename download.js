(function() {
  var bodyHTML = document.body.outerHTML;
  var userid = /userId: '(.*)'/.exec(bodyHTML)[1];
  var roomid = /roomId=(.*?)&/.exec(document.location.href)[1];
  var ts = new Date().getTime()
  var callback = 'jQuery19006346632665517793_' + ts;
  $.ajax({
    url: 'http://view.csslcloud.net/api/view/replay/v2/info',
    data: {
      callback: 'jsonp',
      roomid: roomid,
      userid: userid,
      groupid: 'groupid',
      recordid: cc_videoid,
      viewertoken: 'password',
      viewername: 'name',
      _: ts
    },
    dataType: 'jsonp',
    jsonpCallback: callback,
    success: function(data) {
      if (data) {
        var docs = data.datas.meta.pageChange;
        var result = [];
        for (var i = 0; i < docs.length; i++) {
          var doc = docs[i];
          result.push(doc.url);
        }
        var filename = '百通世纪.txt';
        var a = document.createElement('a');
        var blob = new Blob([result.join(',')]);
        a.download = filename;
        a.href = URL.createObjectURL(blob);
        a.click();       
      }
    }
  })
})()