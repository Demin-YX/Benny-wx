const config = require('../../config')

function post(url, data) {
    let promise = new Promise((resolve, reject) => {
        CwxRequest(url, data, resolve, reject)
    })
    return promise.then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

function CwxRequest(url, data, resolve, reject) {
    wx.request({
        url: config.url + url,
        method: "POST",
        data: data,
        header: {
            'content-type': "application/json",
        },
        success: (result) => resolve(result),
        fail: (err) => reject(err)
    })
}


function wxRequest(url, config, resolve, reject) {
    let {
        data = {},
        contentType = 'application/json',
        method = 'GET',
        ...other
    } = {...config}
    wx.request({
        url: url,
        data: {...data},
        method: method,
        header: {
            'content-type': contentType,
            'Cookie': app.globalData.cookie  // 全局变量中获取 cookie
        },
        success: (data) => resolve(data),
        fail: (err) => reject(err)
    })
}

module.exports = {
    post: post,

    postWithGlobalToken: function (url, data) {
        wx.getStorage({
            key: 'LOCAL-TOKEN',
            success: (result => {
                let token = result.data ? result.data : "";
                wx.request({
                    url: config.url + url,
                    data: data,
                    header: token ? {
                        "Authorization": "JWT " + token
                    } : {},
                    success: result => {
                        console.log(result)
                    },
                    fail: res => {
                        console.log(res)
                    }
                })

            }),
            fail: () => {
                wx.setStorage({
                    data: '',
                    key: 'LOCAL-TOKEN',
                })
            }
        })
    },
}