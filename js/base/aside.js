Vue.component('v_aside', {
    // props: ['menuobj'], // menus-菜单数据；fm-一级菜单；sm-二级菜单
    data: function() {
        return {
            ItemObj: [{
                // FirstList: '',
                // IndexUrl: '',
                // SecondList: [],
                // indexList: '',
                // induxUrl: ''
                // list: ''
            }],
            isActive: false,
            //菜单数据对象
            hasMenu: false,
            menuobj: {
                list: []
            },
        }
    },
    created() {
        // this.getMenu();
        this.queryMenu();
    },
    methods: {
        //请求菜单
        queryMenu: function() {
            var _this = this;
            const queryMenus = Bmob.Query('MenuList');
            queryMenus.find().then(res => {
                var menudata = res || [];
                _this.$set(_this.menuobj, "list", menudata);
                _this.hasMenu = true;
                console.log(_this.menuobj);
            })
        },

        getMenu() {
            const _this = this
            const getMenu = Bmob.Query('MenuList')
            getMenu.find().then(res => {
                _this.ItemObj = res;
            })
        },
        isActive2() {
            this.isActive = true
        },
        setCurrentMenu: function(_1st_menu, _2nd_menu, _3rd_menu) {
            if (_1st_menu) {
                this.$set(this.menuobj, 'fm', _1st_menu); // 指定高亮的一级菜单
            }
            if (_2nd_menu) {
                this.$set(this.menuobj, 'sm', _2nd_menu); // 指定高亮的二级菜单
            }
            if (_3rd_menu) {
                this.$set(this.menuobj, 'tm', _3rd_menu); // 指定高亮的二级菜单
            }

            this.loadMenuAccordion();

        },
        loadMenuAccordion: function() {
            var _this = this;
            if (!_this.hasMenu) {
                setTimeout(function() {
                    _this.loadMenuAccordion();
                }, 500);
                return;
            }

            setTimeout(function() {
                $('#nav-accordion').dcAccordion({
                    speed: 'fast'
                });
            }, 0);
        },
    },

    template: `
    <aside>
            <!-- sidebar menu start-->
            <ul class="sidebar-menu" id="nav-accordion">
                 <li v-for="item in menuobj.list" :class="{'active':item.FirstList==menuobj.fm, 'sub-menu':item.FirstList.length>0}">
                    <a :class="{'active':item.FirstList==menuobj.fm}" :href="item.FirstList.length>0 ? 'javascript\\:;' : item.url"><i class="fa" :class="item.icon||'fa-folder'"></i> <span>{{item.FirstList}}</span></a>
                    <ul class="sub" :style="{'display:block;':item.name==menuobj.fm}">
                        <li v-for="sub in item.SecondList" :class="{'active':item.name==menuobj.fm&&sub.name==menuobj.sm&&!sub.SecondList, 'sub-menu':sub.SecondList}">
                            <a :href="sub.MenuUrl" :class="{'active':sub.MenuName==menuobj.sm}">{{sub.MenuName}}</a>
                        </li>
                    </ul>
                </li>
                <!--multi level menu end-->

            </ul>
        <!-- sidebar menu end-->
    </aside>
    </aside>
        `
})