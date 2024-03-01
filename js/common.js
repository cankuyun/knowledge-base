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