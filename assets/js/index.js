$(function () {







    getUserInfo()

    var layer = layui.layer


    $(btnLogout).on('click', function () {
        console.log('ok');


        layer.confirm('确定退出登录', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 清空本地存储的token


            localStorage.removeItem('token')
            // 跳转到登录页

            location.href = '/login.html'

            layer.close(index);
        });



    })

})


// 获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function (res) {
            // console.log(res);
            // renderAvatar(res.data)
            // 成功后调用这个获取用户信息函数
            if (res.status !== 0) {
                return layui.layer.msg('读取信息失败')
            }
            renderAvatar(res.data)

        },
        // complete: function (res) {
        //     // console.log(res);
        //     if (res.responseJSON.staus === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         // 跳转到登录页

        //         location.href = '/login.html'

        //     }

        // }

    })


}

// 渲染用户信息函数
function renderAvatar(res) {
    // 有限获取用户昵称
    var name = res.nickname || res.username;
    $('#welcome').html('欢迎' + name);

    // 显示用户头像
    if (res.user_pic !== null) {
        $('.layui-nav-img').attr('src', res.user_pic).show();
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide();


    }

}