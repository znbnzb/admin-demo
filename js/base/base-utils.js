const baseUtilsMixin = {
    methods: {
        throwError: function (errorMsg) {
            throw new Error(errorMsg)
        },
        logJson: function (obj, msgPrefix) {
            if (!msgPrefix) {
                console.log(JSON.stringify(obj))
            } else {
                console.log(msgPrefix + ': ' + JSON.stringify(obj))
            }
        },

        // using library 'axis' to check type
        isArray: function (param) {
            return window.axis.isArray(param)
        },
        isObject: function (param) {
            return window.axis.isObject(param)
        },
        isString: function (param) {
            return window.axis.isString(param)
        },
        isDate: function (param) {
            return window.axis.isDate(param)
        },
        isRegExp: function (param) {
            return window.axis.isRegExp(param)
        },
        isFunction: function (param) {
            return window.axis.isFunction(param)
        },
        isBoolean: function (param) {
            return window.axis.isBoolean(param)
        },
        isNumber: function (param) {
            return window.axis.isNumber(param)
        },
        isNull: function (param) {
            return window.axis.isNull(param)
        },
        isUndefined: function (param) {
            return window.axis.isUndefined(param)
        },
        isNullOrUndefined: function (param) {
            return window.axis.isNull(param) || window.axis.isUndefined(param)
        },
        // 分页插件
        updatePageNoInQueryObj: function (queryObj, pageNo) {
            if (!!pageNo) {
                this.$set(queryObj, 'pageNo', pageNo);
            }
        },
        // 请求服务端分页后返回的数据response,queryObj初始化数据，divClass,总页数，回调函数，重新获取
        createPagination: function (response, queryObj, paginationDivSelectorStr, callbackQueryFunc) {
            this.$nextTick(() => {
                $(paginationDivSelectorStr).off().createPage({
                    pageCount: queryObj.pagetotl,
                    current: queryObj.pageNo,
                    backFn: (pageNo) => {
                        this.updatePageNoInQueryObj(queryObj, pageNo);
                        callbackQueryFunc();
                    }
                });
            })
        }
    }
}