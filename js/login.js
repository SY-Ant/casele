$(function () {
    $('#login-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    },
                    different: {
                        field: 'username',
                        message: '不能和用户名相同'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);
        // console.log(1);
        // var bv = $form.data('bootstrapValidator');
        $.ajax({
            url: ' /employee/employeeLogin',
            type: 'post',
            data: $form.serialize(),
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.success == true) {
                    location.href = './index.html';
                } else if (data.error == 1001) {
                    $('#login-form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                } else if (data.error == 1000) {
                    $('#login-form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
            }
        })
    });
});