$(function () {



    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '1到6个字符之间'
            }

        }
    })


    initUserInfo()


    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);

                form.val('formUserInfo', res.data)


            }

        })

    }


    // 重置表单处理函数
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为


        e.preventDefault()

        initUserInfo()




    })

    // 提交更新用户数据
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'post',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 在子页面调用父页面的方法
                window.parent.getUserInfo()

            }
        })





    })





})