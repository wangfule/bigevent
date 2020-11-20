$(function () { 
    // 实现切换
    $('#link_reg').on('click',function(){
        $('.loginBox').hide().siblings(".regBox").show();
    })
    $('#link_login').on('click',function(){
        $('.regBox').hide().siblings(".loginBox").show();
    })
    var layer = layui.layer;
    var form  =layui.form;

    // 表单验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          repwd:function (value) { 
              console.log(value);
              let pwd = $('.regBox [name="password"]').val();
              if(value != pwd){
                  return "两次输入的密码不一致"
              }
           }
    })

    // 实现注册

    $('#reg_form').on("submit",function (e) { 
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"/api/reguser",
            data:$(this).serialize(),
            success:function (res) { 
                if(res.status != 0){
                    return layer.msg(res.message)
                }
                layer.msg("注册成功,请登录!!!",{time:1500},function(){
                    $('#link_login').click();
                    $('#reg_form')[0].reset();
                })
             }
        })
     })

    // 实现登录
    $("#login_form").on("submit",function (e) { 
        e.preventDefault();
        
        console.log($("#login_form").serialize());
        $.ajax({
            type:"POST",
            url:"/api/login",
            data:$(this).serialize(),
            success:function (res) { 
                console.log(res);
                if(res.status !== 0){
                    $("#login_form")[0].reset();
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                localStorage.setItem('token',res.token)
                location.href = "/index.html"
             }
        })
     })


 })