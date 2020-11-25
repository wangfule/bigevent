$(function () {  

    // 获取渲染数据
    getArtCateList();
    function getArtCateList() {  
        $.ajax({
            type:'GET',
            url:'/my/article/cates',
            success:function (res) {  
                if(res.status != 0 ){
                    return layui.layer.msg(res.message)
                }
                let catehtml = template("temArtCateList",res)
                $('.layui-table tbody').html(catehtml);
            }
        })
    }

    // 添加类别按钮点击事件
    let AddCateIndex = null;
    $('#btnAddCate').on('click',function(){
        AddCateIndex = layui.layer.open({
            type:1,
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
          });
    })

    // 添加类别事件

    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function (res) {  
                // console.log(res);
                if(res.status != 0){
                    return layui.layer.msg(res.message)
                }
                getArtCateList();
                layui.layer.msg(res.message)
                layui.layer.close(AddCateIndex); 
            }
        })
    })

    // 编辑按钮添加点击事件
    let editCateIndex = null;
    $('.layui-table tbody').on('click','#btnEdit',function () {  
        // console.log(123);

        // 弹出一个框
        editCateIndex = layui.layer.open({
            type:1,
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
          });


        let id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            type:'GET',
            url:'/my/article/cates/'+id,
            success:function (res) { 
                // console.log(res);
                layui.form.val("formEdit",res.data)
             }
        })
    })

    // 编辑修改提交事件

    $("body").on('submit','#form-edit',function (e) { 
        e.preventDefault(); 
        $.ajax({
            type:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function (res) {  
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                getArtCateList();
                layui.layer.close(editCateIndex); 

            }
        })
    })
    
    // 删除事件

    $('.layui-table tbody').on('click','#btnDel',function(){
        let id = $(this).attr('data-id');
        layui.layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
            //do something

            $.ajax({
                type:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status !==0){
                        return layui.layer.msg(res.message)
                    }
                    layui.layer.msg(res.message)
                    getArtCateList();
                }
            })

            layer.close(index);
          });
    })

})