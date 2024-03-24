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

// 听书相关
const playPauseBtn = document.getElementById("playPauseBtn");
//判断当前页面是否有播放按钮
if (playPauseBtn) {
    let isPlaying = false; // 跟踪播放状态
    let currentAudio = null; // 当前正在播放的音频对象
    let currentSentenceIndex = 0; // 当前句子的索引
    const contentSource = document.getElementById("contentsource");
    const originalText = contentSource.innerText;
    const sentences = originalText.match(/[^\.!\?。！？]+[\.!\?。！？]+/g); // 分割文本成句子   

    playPauseBtn.addEventListener("click", function() {
        // 禁用文字放大缩小操作
        var smallButton = document.querySelector('button[aria-data="small"]');
        var largeButton = document.querySelector('button[aria-data="large"]');
        largeButton.disabled = true;
        smallButton.disabled = true;

        if (!isPlaying) {
            // 开始播放或继续播放
            playPauseBtn.textContent = "暂停";
            if (!currentAudio) {
                // 如果还没有开始播放，初始化播放器
                startPlaying();
            } else {
                // 如果已经开始播放，继续播放当前句子
                currentAudio.play();
            }
            isPlaying = true;
        } else {
            // 暂停播放
            playPauseBtn.textContent = "播放";
            if (currentAudio) {
                currentAudio.pause();
            }
            isPlaying = false;
        }
    });

    function startPlaying() {
        contentSource.innerHTML = ''; // 清空原内容        
        sentences.forEach((sentence, index) => {
            const span = document.createElement("p");
            span.id = `sentence-${index}`;
            span.textContent = sentence;
            contentSource.appendChild(span);
        });
        playSentence(currentSentenceIndex);
    };

    function playSentence(index) {
        if (!sentences || index >= sentences.length) {
            resetPlayer();
            return; // 如果所有句子都已播放，结束函数
        }

        const sentence = sentences[index];
        currentAudio = new Audio(`https://agent.shukuwu.com?url=https%3A%2F%2Ffanyi.baidu.com%2Fgettts%3Flan%3Dzh%26spd%3D6%26source%3Dweb%26text%3D${encodeURIComponent(sentence)}`);
        
        highlightSentence(index); // 高亮当前句子
        isPlaying = true;

        currentAudio.addEventListener('ended', function() { // 当前句子播放结束时播放下一句
            currentSentenceIndex++;
            playSentence(currentSentenceIndex);
        });

        currentAudio.play();
    };

    function resetPlayer() {
        // 重置播放器到初始状态
        currentAudio = null;
        currentSentenceIndex = 0;
        isPlaying = false;
        playPauseBtn.textContent = "播放";
    };

    function highlightSentence(index) {
        const previous = document.querySelector(".highlight");
        if (previous) previous.classList.remove("highlight");
        
        const current = document.getElementById(`sentence-${index}`);
        if (current) current.classList.add("highlight");
    };
};




//文章内容页相关按钮
document.addEventListener('DOMContentLoaded', (event) => {
    // 设置按钮对象
    var anniu = document.querySelector('[data-reactid=".0.2.1"]');
    // 设置弹窗对象
    var szpan = document.querySelector('[data-reactid=".0.21.0.1"]');    
  // 查找所有具有 data-reactid 属性的元素
  const elements = document.querySelectorAll('[data-reactid]');
  // 定义所有可能的主题类
  const themes = ['theme-pink', 'theme-blue', 'theme-green', 'theme-white', 'theme-dark'];
  // 获取id为"contentsource"的div内的所有p标签
  const paragraphs = document.querySelectorAll('#contentsource p');
  //改变颜色的方法
  function sediao(sez){
    // 移除所有颜色类
    themes.forEach(t => {
        document.body.classList.remove(t);
        anniu.classList.remove(t);
    });
    document.body.classList.add(sez);
    anniu.classList.add(sez);
    localStorage.setItem('theme', sez); // 保存当前主题到localStorage
  };
  //改变字体
  function sefont(cz){
    const savedfont = localStorage.getItem('fontSizes');
    const savedheight = localStorage.getItem('Heights');
    paragraphs.forEach(function(p) {
        let currentFontSize = parseFloat(window.getComputedStyle(p, null).getPropertyValue('font-size'));
        let currentHeight = parseFloat(window.getComputedStyle(p, null).getPropertyValue('min-height'));
        //放大操作
        if (cz == 1) {
            // 判断字体是否小于36
            if (currentFontSize < 36) {
                var fonts = (currentFontSize + 2) + 'px';
                var heights = (currentHeight + 3) + 'px';
                p.style.fontSize = fonts; // 放大2px
                p.style.minHeight = heights; // 放大3px
                p.style.paddingBottom = heights; // 放大3px
                localStorage.setItem('fontSizes', fonts); // 保存字体大小到localStorage
                localStorage.setItem('Heights', heights); // 保存最小高度到localStorage
            }
            // else{
            //     alert("字体已经最大了");
            // };
        }else{
        //缩小操作
            // 判断字体是否大于12
            if (currentFontSize > 12) {
                var fonts = (currentFontSize - 2) + 'px';
                var heights = (currentHeight - 3) + 'px';
                p.style.fontSize = fonts; // 缩小2px
                p.style.minHeight = heights; // 缩小3px
                p.style.paddingBottom = heights; // 缩小3px
                localStorage.setItem('fontSizes', fonts); // 保存字体大小到localStorage
                localStorage.setItem('Heights', heights); // 保存最小高度到localStorage
            }
            // else{
            //     alert("字体已经最小了");
            // };
        };        
    });
  };
  // 为每个元素添加点击事件监听器
  elements.forEach(element => {
    //获取背景颜色值
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = ''; // 清除body上的所有类
        document.body.classList.add(savedTheme); // 添加保存的主题类
    }else{
        document.body.classList.add("theme-green"); // 默认为绿色
    };
    //获取字体值
    const savedfont = localStorage.getItem('fontSizes');
    const savedheight = localStorage.getItem('Heights');
    if (savedfont && savedheight) {
        paragraphs.forEach(function(p) {
            p.style.fontSize = savedfont;
            p.style.minHeight = savedheight;
            p.style.paddingBottom = savedheight;
        });
    }else{
        paragraphs.forEach(function(p) {
            p.style.fontSize = '16px';
            p.style.minHeight = '24px';
            p.style.paddingBottom = '24px';
        });
    };    
    element.addEventListener('click', (event) => {
        // alert(element.getAttribute('data-reactid'));
      // 当设置被点击时，这个函数会被调用
      if (element.getAttribute('data-reactid') == ".0.2.1.1.3") {
        // szpan.classList.replace('hide', 'control-panel');
        // alert(szpan.classList);
        if (szpan.classList == 'hide') {
            szpan.classList.replace('hide', 'control-panel');
        }else{
            szpan.classList.replace('control-panel', 'hide');
        }        
      };
      //黑色模式
      if (element.getAttribute('data-reactid') == ".0.2.1.0.1.1.4") {
        sediao('theme-dark');        
      };
      // 粉色模式
      if (element.getAttribute('data-reactid') == ".0.2.1.0.1.1.0") {
        sediao('theme-pink');
      };
      // 白色模式      
      if (element.getAttribute('data-reactid') == ".0.2.1.0.1.1.3") {
        sediao('theme-white');
      };
      // 蓝色模式      
      if (element.getAttribute('data-reactid') == ".0.2.1.0.1.1.1") {
        sediao('theme-blue');
      };
      // 绿色模式      
      if (element.getAttribute('data-reactid') == ".0.2.1.0.1.1.2") {
        sediao('theme-green');
      };
      //放大文字
      if (element.getAttribute('data-reactid') == ".0.2.1.0.0.1.1") {
        sefont(1);
      };
      //缩小文字
      if (element.getAttribute('data-reactid') == ".0.2.1.0.0.1.0") {
        sefont(0);
      };
    });
  });
    // 添加点击事件监听器到document，用于检测点击空白处的动作
    document.addEventListener('click', function(event) {
      // 设置弹窗对象
      var szpan = document.querySelector('[data-reactid=".0.21.0.1"]');
      // 检查点击的元素是否是颜色选择器元素或其子元素
      const isColorPickerElement = event.target.closest('.controller');       
      // 如果不是颜色选择器元素或其子元素
      if (!isColorPickerElement) {
        // document.body.className = ''; // 清除body上的所有类
        // localStorage.removeItem('theme'); // 移除保存的主题
        if (szpan) {
            szpan.classList.replace('control-panel','hide');
        };        
      };
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
