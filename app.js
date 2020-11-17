const {
    ComPost
} = require("./utils/js/network")
App({
    globalData: {
        gradeOverviewParams: '',
        gradeOverviewParamsFlag: false
    },
    /**
     * 在APP中注册全局设置缓存的函数
     * 传入Token
     */
    setToken: function (token) {
        wx.setStorage({
            key: 'LOCAL-TOKEN',
            data: token
        })
    },
    getToken: function (default_val = "") {
        try {
            let value = wx.getStorageSync('LOCAL-TOKEN');
            if (value) {
                return value
            }
        } catch (e) {
            return default_val
        }
    },

    onLaunch: function () {
        /**
         * 验证Token的有效值
         */
        let token = this.getToken("")
        if (token) {
            ComPost('/user/refresh_token', {token: token}).then(response => {
                if (response.result===1) {
                    this.setToken(response.data.token)
                }
            })
        }
        else {
            console.log("没有token，等待AuthLogin触发")
        }
        // wx.getStorage({
        //     key: 'LOCAL-TOKEN',
        //     success: (result) => {
        //         /**
        //          * 直接刷新Token
        //          */
        //         if (result.data != "") {
        //             post({
        //                 url: "/user/refresh_token",
        //                 data: {
        //                     token: result.data
        //                 },
        //                 success: res => {
        //                     /**
        //                      * 刷新新的Token
        //                      */
        //                     if (res.data.result == 1)
        //                         this.setToken(res.data.data.token)
        //                     else
        //                         this.setToken("")
        //                 }
        //             })
        //         }
        //     },
        //     fail: () => {
        //         /**
        //          * 缓存置空
        //          */
        //         this.setToken("");
        //     }
        // })
    },
    TOut: function (time, callback) {
        setTimeout(() => {
            callback();
        }, time)
    }
})