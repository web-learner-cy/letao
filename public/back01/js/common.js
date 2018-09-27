
$(function() {
  /*
   * 1-进度条
   * 在第一个ajax发送时开启进度条，在所有ajax完成时结束进度条
   * */
  $(document).ajaxStart(function(){
    NProgress.start();
  })

  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },3000)

  })
})