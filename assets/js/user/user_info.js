$(function (){
  let form = layui.form;
    form.verify({
       nickname: function(value){ 
        //  console.log(value);
            if(value.length >6){
              return '昵称不能大于6';
            }
        }
    })


    // 获取用户信息设置初始值

  initUserInfo()
   function initUserInfo() { 
      $.ajax({
        type:'GET',
        url:'/my/userinfo',
        success:function (res) { 
          // console.log(res);
          form.val('userfilter', res.data);
        }
      })
    }

    // 更新用户的信息

    $('.layui-form').on('submit',function (e) {
      e.preventDefault();
      console.log($(this).serialize());
        $.ajax({
          type:'POST',
          url:'/my/userinfo',
          data:$(this).serialize(),
          success:function (res) {
            console.log(res);
            if(res.status != 0){
              return layui.layer.msg(res.message)
            }
            window.parent.getUserInfo()
            layui.layer.msg(res.message)
            
          }
        })
    })
    // 重置
    $('#resetinfo').on('click',function (e) {
      e.preventDefault();
      initUserInfo()
    })
})