$(document).ready(function() {
	// 事件处理代码
  $('#benMore').click(function() {
    $(".TopButtonsBG").is(":hidden")?($(".TopButtonsBG").show(),
			navigator.userAgent.match(/UCBrowser/ig)?$(".TopButtons").show():$(".TopButtons").slideDown()):($(".TopButtonsBG").hide(),
			navigator.userAgent.match(/UCBrowser/ig)?$(".TopButtons").hide():$(".TopButtons").slideUp());
			return!1
  });
  $(".TopButtonsBG").click(function(){
		$(".TopButtonsBG").hide();
		$(".TopButtons").slideUp()
	});


});


//懒加载
window.onload = function(){
    var scrollTop = window.scrollY;
    var imgs = Array.from(document.querySelectorAll('.cover-full'));
    lazyLoad();
    // 采用了节流函数
    window.addEventListener('scroll',throttle(lazyLoad,500,1000));

    function throttle(fun, delay, time) {
        var timeout,
            startTime = new Date();
        return function() {

            var context = this,
                args = arguments,
                curTime = new Date();
            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            // console.log(curTime - startTime)
            if (curTime - startTime >= time) {
                fun();
                startTime = curTime;
                // 没达到触发间隔，重新设定定时器
            } else {
                timeout = setTimeout(fun, delay);
            }
        };
    };
    // 实际想绑定在 scroll 事件上的 handler
    // 需要访问到imgs ,  scroll 
    function lazyLoad(){
        scrollTop = window.scrollY;
        imgs.forEach((item,index)=>{
            if( scrollTop===0 && item.dataset.src !== '' && item.offsetTop < window.innerHeight + scrollTop ){
                // alert()
                item.setAttribute('src',item.dataset.src)
                item.setAttribute('data-src','')
            }else if( item.dataset.src !== '' && item.offsetTop < window.innerHeight + scrollTop && item.offsetTop > scrollTop ){
                item.setAttribute('src',item.dataset.src)
                item.setAttribute('data-src','')
            }
        })
    };

}
