const {ComPost} = require("../../utils/js/network")
Component({
    properties: {
        show: {
            type: Boolean,
            value: false
        }
    },
    pageLifetimes: {
        show: function () {
            wx.getStorage({
                key: 'LOCAL-TOKEN',
                success: (result) => {
                    if (result.data) {
                        this.setData({
                            show: false
                        })
                    } else {
                        this.setData({
                            show: true
                        })
                    }
                }
            })
        }
    },
    attached: function () {
        setTimeout(() => {
            wx.getStorage({
                key: 'LOCAL-TOKEN',
                success: (result) => {
                    if (result.data) {
                        this.setData({
                            show: false
                        })
                    } else {
                        this.setData({
                            show: true
                        })
                    }
                }
            })
        }, 1000)
    },
    data: {},
    methods: {
        tapMask: function () {
            this.setData({
                opacity: 1
            })
        },
        moveMask: function () {
            this.setData({
                opacity: 1
            })
        },
        login: function (data) {
            ComPost("/user/obtain_token", data).then(response => {
                    if (response.result) {
                        getApp().setToken(response.data.token);
                        this.setData({
                            show: false
                        })
                    }
                }
            );


        },
        tapLogin: function (e) {
            if (e.detail.userInfo) {
                const {
                    nickName,
                    avatarUrl,
                    gender,
                    province,
                    city
                } = e.detail.userInfo;
                const {
                    signature
                } = e.detail;
                wx.login({
                    success: (result) => {
                        this.login({
                            js_code: result.code,
                            nickName: nickName,
                            avatarUrl: avatarUrl,
                            gender: gender,
                            signature: signature,
                            address: `${province},${city}`,
                        })
                    }
                })
            }
        },
    }
});
