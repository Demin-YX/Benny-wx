// pages/Mine/index.js
const {AuthHPost} = require('../../utils/js/network')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        head_img: "",
        name: "",
        region: "",
        lists: ["关注商品", "参与论贴", "我的收藏", "平台公约", "意见反馈", "关于我们"],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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