
/*
* 检测是否登录
* */
$.ajax({
  url:'/employee/checkRootLogin',
  type:'get',
  dataType: 'json',
  success: function( info ){
    //console.log(info);
    if( info.error === 400) {
      location.href = "login.html";
    }
    if( info.success ) {
      console.log('登录成功');
    }
  }
})