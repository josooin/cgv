$(document).ready(function () {

  let gnb = $('header .gnb > ul > li > a');
  gnb.click(function () {
    $(this).next().toggle().parent().siblings().find('.sub').hide();
  });

  $('main').click(function () {
    $('.sub').hide();
  });

  $('#toggle').click(function () {
    $('#toggle span:nth-child(2)').toggle();
    $('#toggle span:first-child').toggleClass('rotate1');
    $('#toggle span:last-child').toggleClass('rotate2');
    $(this).toggleClass('bgcolor');
    $('header nav').slideToggle();
  });

  const l_btn = $('.visual .s_btn li:first-child');//좌측버튼
  const r_btn = $('.visual .s_btn li:last-child');//우측버튼
  const c_btn = $('.visual .ctrl_btn li'); //콘트롤 버튼
  let v_slide_img = $('.visual > div');//슬라이드 이미지

  let i = $('.visual .ctrl_btn li').index();

  //2. 움직이는 함수 = 서서히 사라지고 나타나는 효과
  function fadeInOut() {
    v_slide_img.stop().fadeOut();
    $('.visual .ctrl_btn li').removeClass('on');
    if (i == 2) {
      i = 0;
    } else {
      i++;
    }
    $('.visual .ctrl_btn li').eq(i).addClass('on');
    v_slide_img.eq(i).stop().fadeIn();
  }

  function fadeInOut2() {
    v_slide_img.stop().fadeOut();
    $('.visual .ctrl_btn li').removeClass('on');
    if (i == 0) {
      i = 2;
    } else {
      i--;
    }
    $('.visual .ctrl_btn li').eq(i).addClass('on');
    v_slide_img.eq(i).stop().fadeIn();
  }

  //3. 매 30초마다 함수를 반복호출하여 슬라이드가 변하게한다.
  let Timer = setInterval(fadeInOut, 30000);

  let isAnimating = false;

  // 좌측 버튼 클릭 시
  l_btn.click(function () {
    if (!isAnimating) {
      clearInterval(Timer);
      fadeInOut2();
      isAnimating = true;
      setTimeout(function () {
        isAnimating = false;
      }, 500);
    }
  });

  // 우측 버튼 클릭 시
  r_btn.click(function () {
    if (!isAnimating) {
      clearInterval(Timer);
      fadeInOut();
      isAnimating = true;
      setTimeout(function () {
        isAnimating = false;
      }, 500);
    }
  });

  c_btn.click(function () {
    clearInterval(Timer); // 타이머 중지
    let idx = $(this).index(); // 클릭한 버튼의 인덱스 가져오기
    // 인덱스에 해당하는 이미지를 보여주기
    v_slide_img.stop().fadeOut();
    $('.visual .ctrl_btn li').removeClass('on');
    $('.visual .ctrl_btn li').eq(idx).addClass('on');
    v_slide_img.eq(idx).stop().fadeIn();
    i = idx;

    // 클릭한 후에는 타이머를 다시 시작
    Timer = setInterval(fadeInOut, 30000);
  });


  //콘트롤버튼에 마우스 오버시 시간을 제거(Timer)하여 슬라이드 멈추게
  $('.ctrl_btn').mouseenter(function () {
    clearInterval(Timer);
  });
  c_btn.mouseleave(function () {
    Timer = setInterval(fadeInOut, 30000);
  });

  let w_width;

  //브라우저의 크기가 변하면 함수내용을 실행한다.
  $(window).resize(function () {

    w_width = $(window).innerWidth();
    console.log(w_width);
  }).resize();


  //탭메뉴 콘텐츠 구현
  $('.cont').eq(0).show();
  let tab_mnu = $('.tab_con_wrap > li > a');

  tab_mnu.click(function () {

    // 만약에 pc해상도라면
    if ($(window).width() >= 768) {
      $(this).next().show().parent().siblings().find('div').hide();
      $(this).addClass('act').parent().siblings().find('a').removeClass('act');
      $(this).find('i.fas').addClass('act01').parent().parent().siblings().find('i.fas').removeClass('act01');

      //li태그의 인덱스 번호를 구하여
      const i = $(this).parent().index();
      console.log(i);
      //만약 인덱스가 2라면(3번째 li태그)
      if (i == 2) {
        //부모박스 높이를 키우고
        $('.tab_con article').height(500);
      } else {
        //그렇지 않으면(0,1일때) 원래높이로 설정함.
        $('.tab_con article').height(500);
      }
    } else {
      $(this).next().slideDown().parent().siblings().find('div').slideUp();
      $(this).addClass('act').parent().siblings().find('a').removeClass('act');
      $(this).find('i.fas').addClass('act01').parent().parent().siblings().find('i.fas').removeClass('act01');

      //li태그의 인덱스 번호를 구하여
      const i = $(this).parent().index();
      console.log(i);
      //만약 인덱스가 2라면(3번째 li태그)
      if (i == 2) {
        //부모박스 높이를 키우고
        $('.tab_con article').height(1100);
      } else {
        //그렇지 않으면(0,1일때) 원래높이로 설정함.
        $('.tab_con article').height(830);
      }
    }


    return false;
  });

  // 윈도우 가로크기가 변경되면 아래 스크립트를 적용한다.
  $(window).resize(function () {
    if ($(window).width() >= 767) {
      $('.tab_con article').height(500);
    } else {
      $('.tab_con article').height(830);
    }
  });


  //이벤트 슬라이드 구현
  const eslide = $('.es_wrap');
  const es_lbtn = $('.event i.fa-angle-left');
  const es_rbtn = $('.event i.fa-angle-right');

  //1번 슬라이드의 앞에 3번을 배치한다.
  $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');

  //왼쪽으로 1200픽셀 이동하여 1번이 가운데 배치가 되게 한다.
  eslide.css('margin-left', '-100%');

  function moveLeft() {
    if (!eslide.is(':animated')) {
      eslide.animate({ 'margin-left': '-200%' }, 500, function () {
        $('.es_wrap > div:first-child').insertAfter('.es_wrap > div:last-child');
        eslide.css('margin-left', '-100%');
      });
    }
  }


  //시간객체를 사용하여 4초마다 움직이도록 한다.
  let Timer2 = setInterval(moveLeft, 5000);

  //moveright함수
  function moveRight() {
    if (!eslide.is(':animated')) {
      eslide.animate({ 'margin-left': '0px' }, 500, function () {
        $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');
        eslide.css('margin-left', '-100%');
      });
    }
  }

  // 좌측버튼 클릭시 
  es_lbtn.click(function () {
    clearInterval(Timer2);
    moveLeft();
  });

  //우측버튼 클릭시
  es_rbtn.click(function () {
    clearInterval(Timer2);
    moveRight();
  });

  //좌, 우 버튼 마우스 아웃시 다시 시간을 생성해서 움직이게
  $('.event i.fas').mouseleave(function () {
    Timer2 = setInterval(moveLeft, 4000);
  });


  // 6. 이미지목록 a요소 클릭시 href값 변수에 담아 modal윈도 띄우기

  const g_list = $('.girl figure a');

  g_list.click(function () {
    let img_src = $(this).attr('href');
    // let title = $(this).attr('title');
    let title = $(this).find('span').text();
    let i = $(this).parent().index() + 1;


    console.log(i); // index값 출력하기
    console.log(img_src); // href값 출력하기
    console.log(title); // title 제목 출력하기

    let modal = `
    <div class= "modal">
      <div class= "center">
        <h3>${title}</h3>
        <img src= ${img_src} alt= "">
        <i class= "fas fa-times"></i>
        <i class= "fas fa-angle-left"></i>
        <i class= "fas fa-angle-right"></i>
        <span class="p_num">${i}/12</span>
      </div>
    </div>
    `;

    // body태그의 맨뒤에 modal변수값 출력하기
    $('body').append(modal);

    $('.modal i.fa-times').click(function () {
      $('.modal').hide();
    });

    // 좌, 우 버튼 클릭 시 각각 함수 작성하기
    $('.modal i.fa-angle-left').click(function () {
      if (i == 1) {
        i = 12;
      } else {
        i--;
      }
      console.log(i); // 1,8,7,6,5,4,3,2,1...
      dataChange(i);
    });

    $('.modal i.fa-angle-right').click(function () {
      if (i == 12) {
        i = 1;
      } else {
        i++;
      }
      console.log(i); // 1,2,3,4,5,6,7,8,1...
      dataChange(i);
    });

    // 좌, 우버튼 클릭 시 받아온 i값을 가지고
    // 제목, 이미지, 페이지 번호 변경하기
    function dataChange(i) {

      // 1. 페이지 번호
      $('.modal .p_num').text(i + '/12');

      // 2. 인덱스번호에 맞는 제목 변경되어야...
      $('.modal h3').text($('.g_list li').eq(i - 1).find('.caption').text());

      // 3. 인덱스번호에 맞는 이미지 출력하기
      if (i == 2 || i == 4) {
        $('.modal img').attr('src', './images/cnt6_' + i + '.png');
      } else
        $('.modal img').attr('src', './images/cnt6_' + i + '.jpg');

    };

    return false;
  });

  // 윈도우 세로 스크롤값을 구하여
  $(window).scroll(function () {
    let s_pos = $(this).scrollTop();
    console.log(s_pos); // 세로스크롤값 체크

    if (s_pos >= 800) { // 얼마이상일때 top버튼 보이게 하고
      $('.t_btn').fadeIn();
    } else { // 그렇지 않으면 top버튼 숨기게 한다.
      $('.t_btn').fadeOut();
    }
  });

  // .t_btn 클릭 시 페이지 상단으로 올라감
  $('.t_btn').click(function () {
    $('html, body').animate({ 'scrollTop': '0px' }, 500);
    return false;
  });

  // 메인페이지 모달 띄우기
  let popup = `
      <div class="p_modal">
          <div class='banner'>
            <a href="#" title="">
              <img src="./images/popup.jpg" alt="">
            </a>
            <input type="checkbox" id="ch">
            <label for="ch">오늘은 그만 보기</label>
            <input type="button" value="닫기" id="c_btn">

          </div>
        </div>
      `
  $('body').append(popup);

  // 현재 브라우저에 쿠키 popup의 값이 none이면 팝업을 나오지 않게 한다.
  if ($.cookie('popup') == 'none') {
    $('.p_modal').hide();
  }

  // 체크박스 변수
  let $ex = $('.p_modal #ch');

  // 체크박스에 사용자가 체크를 했는지 안했는지 확인하기 위한 함수를 작성
  function closePopup() {
    if ($ex.is(':checked')) { // 체크박스에 체크되었다면
      $.cookie('popup', 'none', { expires: 1, path: '/' });
    }
    $('.p_modal').hide(); // 쿠키를 생성하고 종료한다.
  }

  // 닫기 버튼 클릭 시 해당함수를 호출하여 모달윈도 닫기
  $('.p_modal #c_btn').click(function () {
    closePopup();
  });


});