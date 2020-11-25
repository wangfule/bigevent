$(function () {  

    // 初始化富文本编辑器
    initEditor()

     // 1. 初始化图片裁剪器
    var $image = $('#image')
  
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为文章类别渲染数据
    initCate()
    function initCate() {  
        $.ajax({
            url:'/my/article/cates',
            type:'GET',
            success:function (res) {  
                // console.log(res);
                 if(res.status !==0){
                    return 
                }
                let classify = template('allClassify',res)
                $('[name="cate_id"]').html(classify);
               layui.form.render()
            }
        })
    }
    
    // 更换要裁剪的图片
    $('#selectCover').on('click',function () {  
        $("#pub_file").click();
    })

    // 监听文件的变化
    $("#pub_file").on('change',function(){
        // console.log(this.files);
        if(this.files.length !=0){
            let file = this.files[0];
            var newImgURL = URL.createObjectURL(file)
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域
        }
    })

    // 点击不同的按钮改变state的属性值
    let art_state = "已发布";
    $('#btnDrafts').on('click',function () {  
        art_state = "草稿";
    })  
    let fd = new FormData();
    fd.append('state',art_state);

    // 监听事件的提交
    $('#form-pub').on('submit',function (e) {  
        e.preventDefault();
        console.log(this);
        let fd = new FormData(this);
        fd.append('state',art_state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img',blob)
                publishArticle(fd);
            })
            // 遍历fd
        // fd.forEach(function(value,index){
        //     console.log(value,index);
        // })
    })

    function publishArticle(fd) {  
        $.ajax({
            url:'/my/article/add',
            type:'POST',
            data:fd,
            contentType: false,
            processData: false,
            success:function (res) { 
                

                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                location.href = '/article/art_list.html'
            }
        })
    }
    

})