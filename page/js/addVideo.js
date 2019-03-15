var app = new Vue({
    mixins: [baseFrameMixin],
    data() {
        return {
            navItems: [{
                    name: '小米商城',
                    url: 'https://www.mi.com/index.html'
                },
                {
                    name: 'MIUI',
                    url: 'http://www.miui.com/'
                },
                {
                    name: '米聊',
                    url: 'http://www.miliao.com/'
                },
                {
                    name: '米聊',
                    url: 'http://www.miliao.com/'
                }
            ]
        }
    },
    created: function() {
        this.setCurrentMenu('视频管理', '新增视频');
    },
    methods: {

    }
})