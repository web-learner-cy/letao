
$(function(){

  var currentPage = 1;
  var pageSize = 5;
  //渲染页面
  render();
  function render() {
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function( info ) {
        console.log(info);
        $('tbody').html(template('tmp',info));

        //分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a, b, c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  //添加一级分类
  $('.addBtn').click(function(){
    //显示模态框
    $('#addModal').modal('show');
  })

  //表单校验
  $('#form').bootstrapValidator({
    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //指定校验字段
    fields:{
      categoryName : {
        validators : {
          //非空
          notEmpty : {
            message : "请输入一级分类名称"
          }
        }
      }
    }

  })

  //表单校验成功，阻止默认跳转，发送ajax请求，
  $('#form').on('success.form.bv', function( e ) {
    //阻止默认行为
    e.preventDefault();
    //发送ajax请求
    $.ajax({
      type : 'post',
      url : '/category/addTopCategory',
      data : $('#form').serialize(),
      dataType : 'json',
      success : function( info ) {
        console.log(info);
        if( info.success ) {
          //重新渲染第一页页面
          currentPage = 1;
          render();
          //关闭模态框
          $('#addModal').modal('hide');
          //重置表单
          $("#form").data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })
})