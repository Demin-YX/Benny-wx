// pages/Mine/index.js
const {AuthHPost} = require('../../utils/js/network')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        head_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605110735881&di=15da923bf6a347aff83725f0d90a69b5&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F12%2F20200512125346_RPeUw.thumb.400_0.jpeg",
        name: "请登录",
        region: "",
        lists: ["关注商品", "参与论贴", "我的收藏", "平台公约", "意见反馈", "关于我们"],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (this.data.name!=="请登录"){
            return
        }
        AuthHPost("/user/info").then(
            response => {
                console.log(response)
                if (response.result===1){//如果状态码是对的
                    this.setData({
                        head_img:response.data.avatarUrl,
                        name:response.data.nickName,
                        region:response.data.address
                    })
                }
            }
        ).catch(err => {
            console.log(err)
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})