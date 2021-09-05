$(function () {

    var form = layui.form

    // var layer = layui.layer

    // var varify=layui.varify

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        same: function (value) {
            if (value === $('[name=oldpwd]').val()) {
                return '不能与原密码相同'



            }
        },
        repwd: function (value) {
            if (value !== $('[name=newpawd]'.val())) {
                return '两次密码不一致'
            }

        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            url: '/my/updatepwd',
            method: 'post',
            data: {
                oldPwd: $('[name=oldpwd]').val(),
                newPwd: $('[name=newpawd]').val()

            },

            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('密码更新失败')
                }
                layui.layer.msg('密码更新成功')

                $('.layui-form')[0].reset()

            }
        })
    })




})