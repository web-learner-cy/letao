
$(function(){
  /*
   * 1 校验功能
   * 校验规则：
   1. 用户名不能为空
   2. 用户密码不能为空
   3. 用户密码长度为6-12位
   插件：bootstrap-validator
   * */
  //初始化bootstrapValidator
  $('#form').bootstrapValidator({

    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //设置校验规则
    //指定校验字段
    fields: {

      username : {
       validators: {
         //不能为空
         notEmpty : {
           message : "用户名不能为空"
         },
         //长度校验
         stringLength : {
           min : 3,
           max : 6,
           message : "用户名长度为3-6位"
         },
         callback : {
           message : "用户名不存在"
         }
       }
      },
      password : {
        validators : {
          //不能为空
          notEmpty : {
            message : "密码不能为空"
          },
          //长度校验
          stringLength : {
            min : 6,
            max : 12,
            message : "用户密码长度为6-12位"
          },
          callback : {
            message : "用户名错误"
          }
        }
      }
    }
  })

  /*
   * 2 表单检验成功，通过ajax发送数据，并处理返回的结果
   * */
  //注册表单校验成功事件，阻止默认跳转
  $('#form').on('success.form.bv',function( e ){
    e.preventDefault();

    //点击按钮，通过ajax发送请求
      $.ajax({
        url : '/employee/employeeLogin',
        type : 'post',
        data : $('#form').serialize(),
        dataType : 'json',
        success : function( info ) {
          //console.log(info);
          if( info.success ) {
            //跳转到首页
            location.href = './index.html';
          }

          if( info.error == 1000) {
            //更新状态
            $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID','callback');
          }
          if( info.error == 1001) {
            $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
          }
        }
    })

  })

  /*
  * 2 重置功能完善
  * 重置内容
  * 重置状态
  * */
  $('[type="reset"]').on('click',function(){
    $('#form').data('bootstrapValidator').resetForm();
  })
})


