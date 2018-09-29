$(function(){

  var currentPage = 1;//当前页码
  var pageSize = 5;//每页多少条

  //渲染页面
  render();
  function render () {
    $.ajax({
      type : 'get',
      url : '/category/querySecondCategoryPaging',
      data : {
        page : currentPage,
        pageSize : pageSize
      },
      dataType : 'json',
      success : function( info ) {
        //console.log(info);
        $('tbody').html(template('renderTmp',info));

        //分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion : 3,
          totalPages : Math.ceil(info.total/info.size),
          currentPage : info.page,
          onPageClicked : function(a, b, c, page ) {
            //page 指当前页
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  //添加分类
  $('.addBtn').click(function(){
    //显示模态框
    $('#addtModal').modal('show');

    //发送ajax ,请求一级分类
    $.ajax({
      type : 'get',
      url : '/category/queryTopCategoryPaging',
      data : {
        page : 1,
        pageSize : 100
      },
      dataType : 'json',
      success : function( info ) {
        //console.log(info);
        $('.dropdown-menu').html(template('dropdownTmp', info));
      }
    })
  })

  //选择一级分类
  $('.dropdown-menu').on('click', 'a', function(){
    var txt = $(this).text();

    var id = $(this).data('id');
    //console.log(id);
    //console.log(txt);
    $('.dropdownTxt').text(txt);

    $('[name="categoryId"]').val(id);

    //手动更新状态
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
  })

  //图片上传
  $('#fileupload').fileupload({
    dataType : 'json',
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done : function(e , data) {
      console.log(data.result);
      var src = data.result.picAddr;
      console.log(src);

      $('#imgBox img').attr('src',src);

      $('[name="brandLogo"]').val(src);

      //手动更新状态
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
  })

  //表单校验
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //隐藏表单校验
    excluded: [],

    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定校验字段
    fields : {
      categoryId : {
        validators : {
          notEmpty : {
            message : "请选择一级分类"
          }
        }
      },
      brandName : {
        validators : {
          notEmpty : {
            message : "请输入二级分类"
          }
        }
      },
      brandLogo : {
        validators : {
          notEmpty : {
            message : "请选择图片"
          }
        }
      }
    }
  })

  //表单校验成功，发送数据，
  $('#form').on('success.form.bv', function( e ) {
    e.preventDefault();
    $.ajax({
      type : 'post',
      url : '/category/addSecondCategory',
      data : $('#form').serialize(),
      dataType: 'json',
      success : function( info ) {
        //console.log(info);
        if( info.success ) {
          //重新渲染当前页
          currentPage = 1;
          render();

          //关闭模态框
          $('#addtModal').modal('hide');

          //重置表单
          $('#form').data('bootstrapValidator').resetForm(true);
          $('.dropdownTxt').text('请输入一级分类');
          $('#imgBox img').attr('src','images/none.png');


        }
      }
    })
  })
})