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
        }
    },
    created: function () {
        this.setCurrentMenu('视频管理', '新增视频');
        // this.getCount();
        this.getVideo();
        // this.players();

    },
    methods: {
        getCount: function () {
            const _this = this;
            const queryObj = _this.queryObj;
            const query = Bmob.Query('datalist');
            query.count().then(res => {
                queryObj.pagetotl = `${res}`;
                console.log(`共有${res}条记录`)
            });
        },
        // 获取列表
        getVideo: function (pageNo) {
            var _this = this;
            const queryObj = _this.queryObj;  //将queryObj进行赋值方便调用
            const pageSize =queryObj.pageSize;  // 将 queryObj.pageSize（每页多少条数据的页面大小） 进行赋值 不要每次写那么长

            const query = Bmob.Query('datalist');  //取后台服务  datalist 后台表名字
            // 总记录数
            query.count().then(res => {    //计算总记录数
                _this.updatePageNoInQueryObj(queryObj, pageNo); //刷新页面
                const total =`${res}`;  //将获取的总记录数进行赋值
                const totalPage = Math.ceil(total / pageSize);  //  总共记录数 除以  每页的大小 取整  有多少页
                queryObj.pagetotl = totalPage;  //将总页数进行赋值 方便传给后台
                query.skip((queryObj.pageNo-1)*queryObj.pageSize); //偏移值
                query.limit(queryObj.pageSize);
                query.find().then(res => {
                    _this.navItems = res;
                    _this.createPagination(res, queryObj, '.custom-page', _this.getVideo);
                });
            });

            console.log(_this.navItems);
        },
    }


});