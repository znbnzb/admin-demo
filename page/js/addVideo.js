var app;
app = new Vue({
    mixins: [baseFrameMixin],
    data: function () {
        return {
            navItems: "",
            queryObj: {
                expression: '',
                orderBy: '',
                groupBy: '',
                pageNo: 1,
                pageSize: 5,
                pagetotl: 10,
                withTotal: true
            },
            sum: -16,
        }
    },
    created: function () {
        this.setCurrentMenu('视频管理', '新增视频');
        this.getCount();
        this.getVideo();

    },
    methods: {
        getCount: function () {
            const _this = this;
            const queryObj = _this.queryObj;
            const query = Bmob.Query('datalist');
            query.count().then(res => {
                queryObj.pagetotl = `${res}`;
                // console.log(`共有${res}条记录`)
            });
        },
        // 获取列表
        // getVideo: function (pageNo) {
        //     var _this = this;
        //     const queryObj = _this.queryObj;
        //     _this.updatePageNoInQueryObj(queryObj, pageNo);
        //     const Query = Bmob.Query('aaa');
        //     _this.sum=(_this.sum)+16;
        //
        //     Query.skip(_this.sum);
        //     console.log(_this.sum);
        //     Query.limit(16);
        //
        //     Query.find().then(res => {
        //         _this.navItems = res;
        //         _this.createPagination(res, queryObj, '.custom-page', _this.getVideo);
        //     });
        //     console.log(_this.navItems);
        // },
        getVideo: function (pageNo) {
            var _this = this;
            const queryObj = _this.queryObj;
            _this.updatePageNoInQueryObj(queryObj, pageNo);
            const Query = Bmob.Query('datalist');
            _this.sum=(_this.sum)+16;

            Query.skip(_this.sum);
            console.log(_this.sum);
            Query.limit(4);
            Query.find().then(res => {
                _this.navItems = res;
                console.log(_this.navItems);
                _this.createPagination(res, queryObj, '.custom-page', _this.getVideo);
            });
            console.log(_this.navItems);
        },
    }


});