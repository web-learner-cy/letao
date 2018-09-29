
$(function(){

  var currentPage = 1;
  var pageSize = 5;

  //存储id
  var currentId;
  var isDelete;

  render();
  function render() {
    $.ajax({
      url:'/user/queryUser',
      type:'get',
      data:{
        page: currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function( info ) {
        //console.log(info);
        //渲染
        $('tbody').html(template('tmp',info));

        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages: Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a, b, c, page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  //禁用与启动功能
  $('tbody').on('click','button',function(){
    //显示模态框
    $('#userModal').modal('show');

    currentId = $(this).parent().data('id');
    isDelete  = $(this).hasClass('btn-danger')? 0: 1;

  })
  $('.submitBtn').click(function(){
    $.ajax({
      url : '/user/updateUser',
      type : 'post',
      data : {
        id : currentId,
        isDelete : isDelete
      },
      success:function( info ) {
        //console.log(info);
        if( info.success ) {
          //隐藏模态框
          $('#userModal').modal('hide');
          //重新渲染
          render();
        }

      }
    })
  })

})