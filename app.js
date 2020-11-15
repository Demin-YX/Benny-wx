const {
    post
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
            data: token,
            key: 'LOCAL-TOKEN'
        })
    },
    onLaunch: function () {
        if (wx.cloud) {
            wx.cloud.init({
                traceUser: true,
            })
        }
        /**
         * 验证Token的有效值
         */
        wx.getStorage({
            key: 'LOCAL-TOKEN',
            success: (result) => {
                /**
                 * 直接刷新Token
                 */
                if (result.data != "") {
                    post({
                        url: "/user/refresh_token",
                        data: {
                            token: result.data
                        },
                        success: res => {
                            /**
                             * 刷新新的Token
                             */
                            if (res.data.result == 1)
                                this.setToken(res.data.data.token)
                            else
                                this.setToken("")
                        }
                    })
                }
            },
            fail: () => {
                /**
                 * 缓存置空
                 */
                this.setToken("");
            }
        })
    },
    TOut: function (time, callback) {
        setTimeout(() => {
            callback();
        }, time)
    }
})