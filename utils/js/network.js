const configs = require('../../config')

function wxRequest(url, config, resolve, reject) {
    let {
        data = {},
        contentType = 'application/json',
        method = 'GET',
        ...other
    } = {...config}
    wx.request({
        url: configs.url + url,
        data: {...data},
        method: method,
        header: {
            'content-type': contentType,
        },
        success: result => resolve(result),
        fail: err => reject(err)
    })
}


function ComPost(url, data) {
    return new Promise((resolve, reject) => {
        wxRequest(url, {
            data: data,
            contentType: 'application/json',
            method: 'POST',
        }, resolve, reject)
    }).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

function postWithGlobalToken(url, data) {
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
}


module.exports = {
    ComPost,


}