// 每次post get 或者ajax发送请求之前会调用
$.ajaxPrefilter(function(option){
    option.url = "http://ajax.frontend.itheima.net" + option.url
    console.log(option.url);

})