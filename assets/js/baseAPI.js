// 每次post get 或者ajax发送请求之前会调用
$.ajaxPrefilter(function(option){
    option.url = "http://ajax.frontend.itheima.net" + option.url
    

    // 为每次需要验证的请求添加headers
    if(option.url.indexOf('/my/') !== -1){
     
        option.headers = {
            Authorization : localStorage.getItem('token')
        }
    }

option.complete = function(res){
    // console.log(res);
    if(res.responseJSON.status === 1 && res.responseJSON.message ==="身份认证失败！"){
        // console.log(123);
        localStorage.removeItem('token');
        location.href = "/login.html"
    }
}

})