// 划线
var canvas = document.getElementById('canvas');
var oDiv = document.getElementById('item11');
var ctx = canvas.getContext('2d');
var oldx = 0;
var oldy = 0;
var onoff = false;
var finish = false;

//canvas框
ctx.fillStyle="transparent";
ctx.fillRect(0,0,336,347);
//画笔大小选择
var linew;

//鼠标点击下去
canvas.addEventListener('touchstart',down,false);
//鼠标移动
canvas.addEventListener('touchmove',draw,false);
//鼠标弹起取消画图
canvas.addEventListener('touchend',up,false);
function down(event){
  onoff = true;
  var touch = event.targetTouches[0];
  oldx = touch.clientX-canvas.offsetLeft;
  oldy = touch.clientY-canvas.offsetTop-oDiv.offsetTop;
  event.preventDefault();
};
function up(){
  onoff = false;
}
function draw(event){
    if(onoff == true){
    var touch = event.targetTouches[0];
    var newx = touch.clientX-canvas.offsetLeft;
    var newy = touch.clientY-canvas.offsetTop-oDiv.offsetTop;
    ctx.lineWidth = 12;
    ctx.strokeStyle = "black";
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(oldx,oldy);
    ctx.lineTo(newx,newy);
    ctx.stroke();

    oldx = newx;
    oldy = newy;
    finish = true;
  };
}
var oSrc;
// 画图
function toImg(){
  document.getElementById('image').src = canvas.toDataURL("image/png");
  oSrc = document.getElementById('image').src;
  $('#btn1').fadeOut();
  $('#btn2').fadeOut();
  $("#image").show();
  $("#canvas").hide();
  peoMove();
}
var bu = document.getElementById('btn1');
var oBtn = document.getElementById('btn2');
// 点击完成
bu.addEventListener('touchstart',toImg,false);

// 画完出现按钮
canvas.addEventListener('touchend',function(){
  $('#btn1').fadeIn();
  $('#btn2').fadeIn();
},false);
// 清除画板
function CanvasClear(currCanvas, currCanvas_context) {
    currCanvas_context.clearRect(0,0,336,347);
    currCanvas.width = currCanvas.width;
}
// 重画
oBtn.addEventListener('touchstart',function(){
  CanvasClear(canvas,ctx);
  ctx.fillStyle="transparent";
  ctx.fillRect(0,0,336,347);
  $('#btn1').fadeOut();
  $('#btn2').fadeOut();
  finish = false;
},false);

function peoMove(){
  $(".canvas-img").addClass("move1");
  setTimeout(function(){
    $('.canvas-img').addClass("status1");
    $('.cell-logo').hide();
    $('.item1').addClass('big');
  },6000)
  setTimeout(function(){
    $('.item2').addClass('show');
    setTimeout(function(){
      $('.canvas-img2').attr("src",$('.canvas-img').attr("src"));
      item2()
    },1100)
  },7000)
}
var school_name = '';
var school_m_name = '';
var school_alink = '';
var school_id;
var _sure = false;
function item2(){
  // 小人在掌上高考上移动
  var screen_H = $("#webContent").height();
  $(".canvas-img2").snabbt({
    position: [0, -194, 0],
    duration: 2000
  })
  var cha_school_top = screen_H - 108;
  var move_over = false;
  var item2_click = false;
  setTimeout(function(){
    $(".canvas-img2").snabbt({
      position: [0, -244, 0],
      duration: 500
    }).snabbt({
      position: [0, -192, 0],
      duration: 300
    }).snabbt({
      position: [0, -cha_school_top, 0],
      duration: 2000
    })
  },3000)
  setTimeout(function() {
    $(".item2-bottom").addClass("break");
  },4000)
  setTimeout(function() {
    $(".pao1").addClass("show");
    item2_click = true;
  },6000)

  function item1_2(){
    $(".school-all").show();
    $('.canvas-img22').attr("src",$('.canvas-img').attr("src"));
    setTimeout(function(){
      $(".canvas-img22").addClass("start");
      $(".huaban").addClass("start");
    },200)
    setTimeout(function(){
      move_over = true;
      $(".pao2").addClass("show");
      $(".canvas-img22").addClass("start-moni").removeClass("start");
    },6100)
  }
  $(".pao1").on("touchstart",function(){
    $(this).removeClass("zoomIn");
    item1_2();
  })
  $(".canvas-img2").on("touchstart",function(){
    $(".pao1").removeClass("zoomIn");
    item1_2();
  })

  $(".item2").on("touchstart",function(){
    if(item2_click == true){
      $(".pao1").removeClass("zoomIn");
      item1_2();
      item2_click = false;
    }
  })

  // 点击学校小人移动

  $(".school").on("touchstart",function(){
    if(_sure == false && move_over == true){
      $(".alert-school").show();
      $(".pao2").removeClass("show");
    }
    _this = $(this);
    $(".btn3").on("touchstart",function(){
      _sure = true;
      school_id = _this.attr("val");
      school_name = _this.attr("name");
      school_m_name = _this.attr("value");
      school_alink = _this.attr("alink");
      school_m_X = parseInt(_this.attr("dirX"));
      school_m_Y = parseInt(_this.attr("dirY"));
      $(".alert-school").hide();
      var move_speed = 0.07;
      var move_time_x = Math.abs(school_m_X) / move_speed;
      var move_time_y = Math.abs(school_m_Y) / move_speed;
      var move_time = move_time_x + move_time_y;
      // 小人移动

      $(".canvas-img22").snabbt({
        position: [school_m_X, 0, 0],
        easing:'linear',
        duration: move_time_x
      })
      setTimeout(function() {
        $(".canvas-img22").snabbt({
          position: [school_m_X, school_m_Y, 0],
          easing:'linear',
          duration: move_time_y
        })

      },move_time_x)


      setTimeout(function() {
        $(".item3").addClass("show");
        $(".tongzhishu-s img").attr("src",'./images/tongzhishu-s'+ school_id +'.png');
        $(".tongzhishu-s img").load(function () {
          $(".tongzhishu-s img").show();
          $(".canvas-img3").attr("src",$("#image").attr("src"));
          setTimeout(function() {
            $(".canvas-img3").addClass("show");
          },500)
          setTimeout(function() {
            $(".pao3").addClass("show");
          },3500)
          setTimeout(function() {
            $(".btn5").fadeIn();
          },5000)
        });
      },move_time)

    })

    $(".btn4").on("touchstart",function(){
      $(".alert-school").hide();
    })

  })

}
$(".canvas-img4").snabbt({
  position: [372, -130, 0],
  easing:'linear',
  duration: 5000
})
$(".btn5").on("touchstart",function(){
  $(".item4").addClass("show");
  var school_title = './images/school-t'+ school_id + '.png';
  var school_info = './images/school-q'+ school_id + '.png';
  $(".school-word img").attr("src",school_title);
  $(".school-info img").attr("src",school_info);
  $(".canvas-img4").attr("src",$("#image").attr("src"));
  $(".canvas-img4").addClass("show");
  $(".canvas-img4").snabbt({
    position: [364, -157, 0],
    easing:'linear',
    duration: 5000
  })
  setTimeout(function(){
    $(".pao4").addClass("show");
  },5000)
  setTimeout(function(){
    $(".btn6").fadeIn();
  },6500)
})
$(".btn6").on("touchstart",function(){
  $(".item5").addClass("show");
  $(".canvas-img5").attr("src",$("#image").attr("src"));
  setTimeout(function(){
    $(".item5-bg").addClass("show");
    $(".canvas-img5").addClass("move3");
  },100)
  setTimeout(function(){
    $(".canvas-img5").addClass("status1");
  },6000)
  setTimeout(function(){
    $(".talk-info img").attr("src",'./images/talk1.png')
    $(".item6").addClass("show");
    setTimeout(function() {
      $(".next-step").fadeIn();
    },1600);
  },7100)
})
var next_step = 0;
// var school_id = 1;
$(".item6").on("touchstart",function(){
    next_step ++;
    if(next_step == 1){
      var talk_img = './images/talk-s'+ school_id +'.png';
      $(".talk-info img").attr("src",talk_img)
    }else if(next_step == 2){
      $(".talk-info img").attr("src",'./images/talk3.png')
    }else{
        $(".saoma").addClass("show");
    }
})

$(".saoma").on("touchstart",function(){
    $(".item7").addClass("show");
    // 修改标题
    document.setTitle = function(t) {
        document.title = t;
        var i = document.createElement('iframe');
        i.src = 'http://www.eol.cn/html/moble_test/limy/h5demo01/images/favicon.ico';
        i.style.display = 'none';
        i.onload = function() {
          setTimeout(function(){
            i.remove();
          }, 9)
        }
        document.body.appendChild(i);
    }
    $(".qun1").find(".txt span").html(school_name);
    $(".qun9").find(".txt span").html(school_name);
    setTimeout(function(){
      document.setTitle('新生群235')
      $(".qun1").show();
      setTimeout(function(){
        $(".qun2").show();
      },1500)
      setTimeout(function(){
        $(".input-alert").show();
      },2500)
      var qun9_img = './images/share-s'+ school_id +'.jpg';
      $(".qun9").find(".img-txt img").attr("src",qun9_img);
    },500)
})


// 键盘弹出
$('.wchat-txt').focusin(function(e){
  var $this = $(this);
  e.preventDefault();
  setTimeout(function(){
      $(window).scrollTop($this.offset().top - 10);
  },200)

  $(".btn7").show();
  $(".input-alert").hide();
})
$('.wchat-txt').focusout(function(e){
  console.log(e);
  var $this = $(this);
  e.preventDefault();
  setTimeout(function(){
      $(window).scrollTop(0);
  },200)
  var chat_txt = $(".wchat-txt").val();
  if(chat_txt.length == 0){
    $(".btn7").hide();
  }
})
var talk_step = 0;
var shareName = '';
var sharePlace = '';
var shareTitle = '';
$(".btn7").on("touchstart",function(){
  var chat_txt = $(".wchat-txt").val();
  $(".btn7").hide();
  $(".wchat-txt").blur();
  var finish = false;
  if(chat_txt.length == 0){
    alert("跟大家聊聊吧！")
  }else{
    talk_step ++;
    var user_img = $("#image").attr("src");
    var chat_txts = '<div class="qun peo"><img src="'+ user_img +'" alt="" class="tuxiang canvas-img7"><h4>小人</h4><div class="txt"><i></i><h3>'+ chat_txt +'</h3></div></div>'
    if(talk_step == 1){
      $(".item7-info .info").append(chat_txts);
      shareName = $(".wchat-txt").val();
      $(".qun3").find(".txt span").html(shareName);
      $(".wchat-txt").val("");
      // var talk_info_1 = '<div class="qun qun3 qun-add">' + $(".qun3").html() + '</div><div class="qun qun4 qun-add">' +
      // $(".qun4").html() + '</div>';
      setTimeout(function() {
        $(".item7-info .info").append('<div class="qun qun3 qun-add">' + $(".qun3").html() + '</div>');
        setTimeout(function() {
          $(".item7-info .info").append('<div class="qun qun4 qun-add">' + $(".qun4").html() + '</div>');
          $("#talk-info").scrollTop($(".item7-bottom").offset().top + 1000);
          $(".input-alert").show();
        },1500)
        setTimeout(function() {
          $(".input-alert").show();
        },2300)
      },1200)
    }else if(talk_step == 2){
      $(".item7-info .info").append(chat_txts);
      sharePlace = $(".wchat-txt").val();
      $(".wchat-txt").val("");
      $("#talk-info").scrollTop($(".item7-bottom").offset().top + 1000);
      setTimeout(function() {
        $(".item7-info .info").append('<div class="qun qun5 qun-add">' + $(".qun5").html() + '</div>');
        $("#talk-info").scrollTop($(".item7-bottom").offset().top + 1000);
      },1000)
      setTimeout(function() {
        $(".item7-info .info").append('<div class="qun qun6 qun-add">' + $(".qun6").html() + '</div>');
        $("#talk-info").scrollTop($(".item7-bottom").offset().top + 1000);
      },3000)
      setTimeout(function() {
        $(".item7-info .info").append('<div class="qun qun7 qun-add">' + $(".qun7").html() + '</div>');
        $("#talk-info").scrollTop($(".item7-bottom").offset().top + 1000);
      },5000)
      setTimeout(function() {
        $(".item7-info .info").append('<div class="qun qun8 qun-add">' + $(".qun8").html() + '</div>');
        $("#talk-info").scrollTop($(".item7-bottom").offset().top + 1000);
      },9000)
      setTimeout(function() {
        $(".item7-info .info").append('<div class="qun qun9 qun-add">' + $(".qun9").html() + '</div>');
        $("#talk-info").scrollTop($(".item7-bottom").offset().top + 1000);
      },13000)
      setTimeout(function() {
        $(".item7-info .info").append('<div class="qun qun10 qun-add">' + $(".qun10").html() + '</div>');
        $("#talk-info").scrollTop($(".item7-bottom").offset().top + 1000);
        finish = true;
      },15000)
      $(".item7-info").on("touchstart",function(){
        if(finish == true){
          $(".share-con").show();
          shareTitle = sharePlace + '的' + shareName + '同学画个小人带你上' + school_name;
          document.title = shareTitle;
        }
      })
    }
  }
})
$(".btn8").on("touchstart",function(){
  location.reload();
})
$(".btn9").on("touchstart",function(){
  $(".share-con").hide();
  $(".wchart-share").show();
})
$(".btn12").on("touchstart",function(){
  $(".wchart-share").hide();
  $(".share-con").show();
})
$(".btn10").on("touchstart",function(){
  window.location.href= school_alink;
})
$(".btn11").on("touchstart",function(){
  window.location.href="http://www.eol.cn/html/g/wap/eolgkShare/";
})
