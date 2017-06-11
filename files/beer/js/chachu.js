$(function(){
  // 是否擦除完
  var chachuIs = false;
  // 擦除完执行chachuIsFun
  var chachuIsFun;
  var set_chachu_value = function(_a,event){
    alert(222)
      chachuIs = _a;
      if(event){
         event();
      }
      console.log(chachuIs);
  };
  var canvas = document.getElementById("cas"), ctx = canvas.getContext("2d");
  var x1, y1, a = 10, timeout, totimes = 100, distance = 30;
  var saveDot = [];
  var canvasBox = document.getElementById("bb");
  // canvas.width = canvasBox.clientWidth;
  // canvas.height = canvasBox.clientHeight;
  canvas.width = $(".QR-result").width();
  canvas.height = $(".QR-result").height();
  var img = new Image();
  img.src = "images/QR-moca.jpg";
  img.onload = function () {
    var w = canvas.height*img.width/img.height;
    ctx.drawImage(img, (canvas.width-w)/2, 0, w, canvas.height);
    tapClip()
  };
  function getClipArea(e, hastouch){
    var x = hastouch ? e.targetTouches[0].pageX : e.clientX;
    var y = hastouch ? e.targetTouches[0].pageY : e.clientY;
    var ndom = canvas;
    while(ndom.tagName!=="BODY"){
      x -= ndom.offsetLeft;
      y -= ndom.offsetTop;
      ndom = ndom.parentNode;
    }
    return {
      x: x,
      y: y
    }
  }

  //通过修改globalCompositeOperation来达到擦除的效果
  function tapClip() {
    var hastouch = "ontouchstart" in window ? true : false,
      tapstart = hastouch ? "touchstart" : "mousedown",
      tapmove = hastouch ? "touchmove" : "mousemove",
      tapend = hastouch ? "touchend" : "mouseup";
    var area;
    var x2,y2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = a * 2;
    var chachu = true;
    ctx.globalCompositeOperation = "destination-out";
    canvasBox.addEventListener(tapstart, function (e) {
      clearTimeout(timeout);
      e.preventDefault();
      area = getClipArea(e, hastouch);
      x1 = area.x;
      y1 = area.y;
      drawLine(x1, y1);
      this.addEventListener(tapmove, tapmoveHandler);
      this.addEventListener(tapend, function () {
        this.removeEventListener(tapmove, tapmoveHandler);
        //检测擦除状态
        timeout = setTimeout(function () {
          var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          var dd = 0;
          for (var x = 0; x < imgData.width; x += distance) {
            for (var y = 0; y < imgData.height; y += distance) {
              var i = (y * imgData.width + x) * 4;
              if (imgData.data[i + 3] > 0) { dd++ }
            }
          }
          if (dd / (imgData.width * imgData.height / (distance * distance)) < 0.7 && chachu) {
            canvas.className = "noOp";
            $(".QR-hand").fadeOut(600);
            chachu = false;
            console.log("刮奖完毕");
            set_chachu_value(true,chachuIsFun);
          }
        }, totimes)
      });
      function tapmoveHandler(e) {
        clearTimeout(timeout);
        e.preventDefault();
        area = getClipArea(e, hastouch);
        x2 = area.x;
        y2 = area.y;
        drawLine(x1, y1, x2, y2);
        x1 = x2;
        y1 = y2;
      }
    })
  }
  function drawLine(x1, y1, x2, y2){
    ctx.save();
    ctx.beginPath();
    if(arguments.length==2){
      ctx.arc(x1, y1, a, 0, 2 * Math.PI);
      ctx.fill();
    }else {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 刚触摸抽奖区
  $('#cas').one('touchstart',function(){
    console.log("开始抽奖，向服务器请求数据...");

    // 虚拟data
    var data = {};
    var data = {
          errcode: 20,
          datatype:2,
          name:'一等奖/奥林巴斯相机1台！',
          errmsg:''
        }
    // hlsjs.ready(function(x) {
    // 	hlsjs.takeActivity(function(data) {

        var fontN = [];
        var fontN = [{font:"微"},{font:"波"},{font:"海"},{font:"尔"},{font:"电"},{font:"单"},{font:"相"}];
        var beerNumLocalhost = 0;
        beerNumLocalhost = parseInt(Math.random() * fontN.length);

        if(!localStorage.getItem("beerNumLocalhost")){
          localStorage.setItem("beerNumLocalhost",beerNumLocalhost);
        }else{
          beerNumLocalhost = localStorage.getItem("beerNumLocalhost");
        }

        // 当chachuIs 为 true时执行下面的函数
        chachuIsFun = function(){
          if(chachuIs == true){
            console.log("开始抽奖选择");
            if (data.errcode == 0){
              if (data.datatype == 2){
                if(data.name.indexOf("机") > -1){
                  $(".QR-result").html("<div class=\"QR-word\"><span>\"机\"</span></div><em>字</em>");
                }else if(data.name.indexOf("炉") > -1){
                  $(".QR-result").html("<div class=\"QR-word\"><span>\"炉\"</span></div><em>字</em>");
                }else if(data.name.indexOf("脑") > -1){
                  $(".QR-result").html("<div class=\"QR-word\"><span>\"脑\"</span></div><em>字</em>");
                }
                $(".diag-prize").find(".prize-zhong").show().find("p").html(data.name);
                $(".diag-prize").find(".show-info").html("长按关注公众号兑换大奖");
                jiance();
              }

            }else if(data.errcode == 20){
              //未中奖
              $(".QR-result").html("<div class=\"QR-word\"><span>\"" + fontN[beerNumLocalhost].font + "\"</span></div><em>字</em>");
              $(".diag-prize").find(".prize-sorry").show();
              $(".diag-prize").find(".show-info").html("长按关注公众号，关注更多精彩活动");
              jiance();
            }else if(data.errcode == 2){
              //重复扫码
              $(".QR-result").html("<div class=\"QR-word\"><span>\"" + fontN[beerNumLocalhost].font + "\"</span></div><em>字</em>");
              $(".diag-prize").find(".prize-shishen").show();
              $(".diag-prize").find(".show-info").html("长按关注公众号，关注更多精彩活动");
              jiance();
            }else{
              //失败  没中奖
              console.log(data.errmsg);
              $(".QR-result").html("<div class=\"QR-word\"><span>\"" + fontN[beerNumLocalhost].font + "\"</span></div><em>字</em>");
              $(".diag-prize").find(".prize-sorry").show();
              $(".diag-prize").find(".show-info").html("长按关注公众号，关注更多精彩活动");
              jiance();
            }
            // 抽奖完毕
          }
        }
      // 	});
      // });

    })

  // 再次点击
  $("body").on("touchstart",'.QR-place',function(){
    var casTouched = $("#cas").attr("touched");
    if(casTouched == 'true'){
      jiance();
    }
  })
})
