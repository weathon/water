/**
 * 求导
 * 为了算x轴所对应的y值
 * **/
var Deri = {
    /**
     * @param ps 包含了4个数的数组
     * @param targ 目标值
     * @param t
     * @constructor
     */
    NTBezierFunc: function(ps, targ, t){
        return (1.0-t) * (1.0-t) *(1.0-t)*ps[0] +
            3 * (1.0-t) * (1.0-t) * t * ps[1] +
            3 * (1.0-t) * t * t * ps[2] +
            t * t * t * ps[3] -
            targ;
    },
    /**
     * 求导数公式
     * @param ps
     * @param targ
     * @param t
     * @constructor
     */
    DeltaNTBezierFunc: function(ps, targ, t){
        var dt = 1e-8;
        return (this.NTBezierFunc(ps, targ, t) - this.NTBezierFunc(ps, targ, t-dt))/dt;
    },
    /**
     * 开始创建曲线
     **/
    start: function(x) {
        var dot_x = [0,0,25,50];
        var dot_y = [0,15,5,0];
        var t = 0.5;  // t的初始值
        for(var i=0;i<1000;i++){
            t = t- this.NTBezierFunc(dot_x,x,t)/ this.DeltaNTBezierFunc(dot_x,x,t);
            if(this.NTBezierFunc(dot_x,x,t)<=1e-5){
                break;
            }
        }
        var res_y = this.NTBezierFunc(dot_y,0,t);
        return res_y;
    }
};