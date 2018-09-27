
$(function() {
  /*
   * 1-进度条
   * 在第一个ajax发送时开启进度条，在所有ajax完成时结束进度条
   *
  */
  $(document).ajaxStart(function(){
    NProgress.start();
  })

  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },3000)
  })

  /*
  * 2 分类管理的二级菜单的显示与隐藏
  *
  * */
  $('.lt_aside .category').click(function(){
    $('.lt_aside .child').stop().slideToggle();
  })

  /*
  * 3 侧边栏显示与隐藏
  * */
  $('.lt_topbar .icon_menu').click(function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
  })

  /*
  * 4 退出登录功能
  * */
  //显示模态框
  $('.lt_topbar .icon_logout').click(function(){
    $('#logoutModal').modal('show');
  })

  //退出功能
  $('.logoutBtn').click(function(){
    $.ajax({
      url:'/employee/employeeLogout',
      type:'get',
      dataType:'json',
      success:function( info ){
        //console.log(info);
        if( info.success ) {
          location.href = 'login.html';
        }
      }
    })
  })


})