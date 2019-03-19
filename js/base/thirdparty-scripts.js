(function() {
    // toastr配置
    toastr.options = {
        closeButton: false,
        debug: false,
        progressBar: true,
        positionClass: 'toast-top-center',
        onclick: null,
        showDuration: '300',
        hideDuration: '1000',
        timeOut: '3000',
        extendedTimeOut: '1000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
    }
})();

Date.prototype.Format = function(fmt) {
    //author: meizz
    const o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'H+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    for (const k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            )
    return fmt
}

/*! axis.js v1.2.1 | (c) 2016 @toddmotto | https://github.com/toddmotto/axis */
;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else if (typeof exports === 'object') {
        module.exports = factory()
    } else {
        root.axis = factory()
    }
})(this, function() {
    'use strict'

    const axis = {}

    const types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(
        ' '
    )

    function type() {
        return Object.prototype.toString.call(this).slice(8, -1)
    }

    for (let i = types.length; i--;) {
        axis['is' + types[i]] = (function(self) {
            return function(elem) {
                return type.call(elem) === self
            }
        })(types[i])
    }

    return axis
})