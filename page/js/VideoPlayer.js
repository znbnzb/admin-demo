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
            curware:{},
            player: null,
            hasVideo:false,
            videoConfig: {
                //playerID:'ckplayer01',//播放器ID，第一个字符不能是数字，用来在使用多个播放器时监听到的函数将在所有参数最后添加一个参数用来获取播放器的内容
                container: '#video', //容器的ID或className
                variable: 'player', //播放函数名称
                //loaded: "loadedHandler", //当播放器加载后执行的函数
                loop: false, //播放结束是否循环播放
                //autoplay: true, //是否自动播放
                //duration: 500, //设置视频总时间
                cktrack: null, //字幕文件
                poster: './img/product-list/pro1.jpg', //封面图片
                config: '', //指定配置函数
                debug: false, //是否开启调试模式
                //flashplayer: true, //强制使用flashplayer
                drag: 'start', //拖动的属性
                seek: 0, //默认跳转的时间
                playbackrate:-1,//默认速度的编号，只对html5有效,设置成-1则不显示倍速
                mobileCkControls:false, //是否在移动端（包括ios）环境中显示控制栏
                //live:true,//是否是直播视频，true=直播，false=点播
                // video: './video/dg.mp4',
                video:[
                    ['./img/product-list/dg.mp4', 'video/mp4', '中文高清', 0]
                ]
            }
        }
    },
    mounted:function(){
        var _this = this;
        // var player = new ckplayer(this.videoConfig);
        setTimeout(function(){
            $('#playerModal').on('show.bs.modal', function () {
                $(".video-loading").show();
            });
            $('#playerModal').on('shown.bs.modal', function () {
                setTimeout(function(){
                    $(".video-loading").hide();
                    _this.playVideo();
                }, 800)
            });
            $('#playerModal').on('hide.bs.modal', function () {
                _this.player.videoPause();
            });
        },0);

        // this.onchange();
    },
    created: function () {
        this.setCurrentMenu('视频管理', '视频播放');
        this.getVideo();

    },
    methods: {
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
        },

        initPlayer: function(){
            var _this = this;
            _this.player = new ckplayer(_this.videoConfig);  //初始化，创建实例并且赋给变量，通过变量拿到实例的方法
            setTimeout(function(){
                _this.player.logo = null;
            },0);

        },
        // 点击播放按钮
        playCourseware:function (courseware) {
            var _this = this;
            _this.curware = courseware;
            _this.hasVideo = false;

        },
        playVideo: function(){
            var _this = this;

            if(!_this.player){  //如果 player函数不为空
                _this.initPlayer();
                _this.playVideo();
                return;
            }

            var path =_this.curware.PlayerPath;

            //_this.videoConfig.video = path;
            //_this.initPlayer();

            var newVideoObject = {
                container: '#video', //容器的ID
                variable: 'player',
                autoplay: false, //是否自动播放
                video: path
            }
            _this.player.newVideo(newVideoObject);
        }
    }

});