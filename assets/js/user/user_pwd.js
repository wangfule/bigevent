$(function () { 

    // 表单正则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samepwd:function (value) {
            if(value == $('[name="oldPwd"]').val()){
                return "新密码不能与原密码一样!"
            }
        },
        repwd:function (value) { 
            if(value !== $('[name="newPwd"]').val()){
                return "两次输入的密码不一致!"
            }
         }
    })


    // 修改密码

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function (res) { 
                console.log(res);
                if(res.status != 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg("修改成功,请重新登录!",{time:1500},function () { 
                    window.parent.location.href = '/login.html'
                 })
             }
        })
    })

 })