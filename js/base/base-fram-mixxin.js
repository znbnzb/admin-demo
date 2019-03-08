//全局公用混合函数
const baseFrameMixin = {
    el: '#container',
    data: function() {
        return {
            //菜单数据对象
            hasMenu: false,
            menuboj: {
                list: []
            },
        }
    }
}