$(function () { 
    getUserInfo();


    let layer = layui.layer;

    $('#btnLogout').on("click",function () { 
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href = "/login.html"

            layer.close(index);
          });
     })
 })


// 获取到用户的基本信息
 function getUserInfo(){
     $.ajax({
         type:"GET",
         url:"/my/userinfo",     
         success:function (res){
             if(res.status != 0){
                 return layui.layer.msg(res.message)
             }
             renderAvatar(res.data)
         }
     })
 }

//  渲染用户头像

function renderAvatar(user) { 
    console.log(user);
    // 获取到用户的名字
    let uname = user.nickname ||user.username;
    console.log(uname);
    $('#welcome').html("欢迎&nbsp;&nbsp;"+uname)

    // 判断用户有没有头像属性,如果有就渲染图片,没有就渲染文字头像
    if(user.user_pic){
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src',user.user_pic)
    }else{
        $('.layui-nav-img').hide();
        $('.text-avatar').html(uname[0].toUpperCase());
        $('.text-avatar').show();
    }

 }