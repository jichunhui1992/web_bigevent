$(function () {
    var form = layui.form

    var layer = layui.layer
    //点击注册账号的链接
    $('#link_reg').on('click', () => {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', () => {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            var pass = $('.reg-box [name=password]').val()
            if (value !== pass) {
                return '两次密码不一致'
            }

        }
    })
    // 监听注册事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }

        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            // 主业完毕后自动跳转到登录界面
            $('#link_login').click()


        })


    })
    // 监听登录事件登录成功后跳转主页

    $('#form-login').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')

                // console.log(res.token);
                // 将登录成功的字符串存在local
                localStorage.setItem('token', res.token)

                location.href = '/index.html'
            }
        })

    })






})