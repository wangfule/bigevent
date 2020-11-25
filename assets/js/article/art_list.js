$(function () {  
    var form = layui.form

    // 为模板引擎的时间加一个过滤器

    template.defaults.imports.dataFormat = function(date){
        const dt = new Date(date);

        let y = dt.getFullYear();
        let m = addZero(dt.getMonth()+1);
        let d = addZero(dt.getDate())

        let hh = addZero(dt.getHours());
        let mm = addZero(dt.getMinutes());
        let dd = addZero(dt.getSeconds());

        return y+'-'+m+'-'+d+' '+hh+":"+mm+":"+dd
    }

    // 时间补零
    function addZero(d) {  
        return d>10?d:"0"+d;
    }

    // 定义一个默认的查询条件
    let condition = {
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }

    // 获取文章,渲染列表
    getArtList();
    function getArtList() {  
        $.ajax({
            type:'GET',
            url:'/my/article/list',
            data:condition,
            success:function (res) {  

                if(res.status !==0){
                    return layui.layer.msg(res.message)
                }
                let atrListHtml = template('artList',res)
                
                // console.log(classify);
                $('.layui-table tbody').html(atrListHtml)
                renderPage(res.total)
            }
        })
    }

    // 获取文章分类渲筛选
    initTable()
    function initTable(){
        $.ajax({
            url:'/my/article/cates',
            type:'GET',
            success:function (res) {  
                // console.log(res);
                if(res.status !==0){
                    return 
                }
                let classify = template('allClassify',res)
                $('#cate_name').html(classify);
                // console.log($('#cate_name')[0]);
                // 通过 layui 重新渲染表单区域的UI结构
               form.render()
            }
        })
    }

    //筛选后渲染列表

    $('#screen').on('submit',function (e) {  
        e.preventDefault();
        condition.cate_id = $('#cate_name').val();
        condition.state = $('#s_state').val();
        getArtList();   
    })


    // 分页栏渲染
    function renderPage(total) {  
        // console.log(total);
        layui.laypage.render({
            elem: 'pageBox',
            count: total,
            limit:condition.pagesize, 
            curr: condition.pagenum, 
            limits:[2,3,5,10],
            first: '首页',
            last:'尾页',
            layout: ['count','limit', 'first','prev', 'page', 'next','skip'],
            jump: function(obj, first){            
                condition.pagenum = obj.curr;
                condition.pagesize =obj.limit;
                if(!first){
                    // console.log(!first);
                    getArtList();
                }
                
            }
          });
 
    }


    // 删除按钮
    $('.layui-table tbody').on('click','.btn-delete',function () {  
        let id= $(this).attr('data-id');
        layui.layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type:'GET',
                url:'/my/article/delete/'+id,
                success:function (res) {  
                    // console.log(res);
                    if(res.status != 0){
                        return layui.layer.msg(res.message)
                    }
                    layui.layer.msg(res.message)
                    if($('.btn-delete').length ===1){
                        condition.pagenum= condition.pagenum==1?1:condition.pagenum-1
                    }
                    getArtList();
                }
            })

            layer.close(index);
          });
       
    })


    // 编辑按钮
    $('.layui-table tbody').on('click','.btn-edit',function (){
        location.href = '/article/art_edit.html?id='+$(this).attr('data-id');
    })
})