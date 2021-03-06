var wxpay = require('../../utils/pay.js');
var app = getApp();
const api = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoading:true,
        summery:{
            credit:'',
            creditItems:[]
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let {creditItems} = this.data.summery;
        this.setData({
            summery: {credit: options.creditRemain, creditItems}
        });
        that.fetchData();
    },
    onPullDownRefresh:function(){
        this.fetchData();
    },

    fetchData:function(){
        const that = this;
        that.setData({
            isLoading:true
        });
        api.fetchRequest('/api/credit/summary',{status :'DONE'})
            .then(function (res) {
                let summery = that.data.summery;
                if(res.data.data.credit){
                    summery.credit = res.data.data.credit;
                }
                if(res.data.data.creditItems){
                    summery.creditItems = res.data.data.creditItems;
                }
                that.setData({
                    isLoading:false,
                    summery
                });
            })
            .catch((res)=>{
                wx.showToast({
                    title: res.msg,
                    icon:'none'
                });
              
            }).finally(()=>{
                that.setData({
                    isLoading:false
                });
                wx.stopPullDownRefresh();
            })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return getApp().shareMessage();

    },
});