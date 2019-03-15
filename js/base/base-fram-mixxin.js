// 全局公用混合对象
const baseFrameMixin = {
    el: '#container',
    data: function() {
        return {
            asideOff: false, // 控制菜单栏开关

            // 菜单数据对象
            hasMenu: false,
            menuobj: {
                list: []
            },
        }
    },

    created: function() {
        this.queryMenu();
    },

    methods: {
        queryMenu: function() {
            // 合并请求

            var _this = this;
            const queryMenus = Bmob.Query('MenuList');
            queryMenus.find().then(res => {
                var menudata = res || [];
                _this.$set(_this.menuobj, "list", menudata);
                _this.hasMenu = true;
                console.log(_this.menuobj);
            })
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
    }
};
// 侧边栏菜单组件
Vue.component('v_aside', {
    props: ['menuobj'], // menus-菜单数据；fm-一级菜单；sm-二级菜单
    template: `
        <aside>
            <ul class="sidebar-menu" id="nav-accordion">
                <li v-for="item in menuobj.list" :class="{'active':item.FirstList==menuobj.fm, 'sub-menu':item.SecondList.length>0}">
                    <a :class="{'active':item.FirstList==menuobj.fm}" :href="item.SecondList.length>0 ? 'javascript\\:;' : item.url">
                        <i class="fa " :class="item.icon||'fa-book'"></i> 
                        <span>{{item.FirstList}}</span>
                    </a>
                    <ul class="sub" :style="{'display:block;':item.FirstList==menuobj.fm}">
                        <li v-for="sub in item.SecondList" :class="{'active':item.FirstList==menuobj.fm&&sub.MenuName==menuobj.sm, 'sub-menu':sub.SecondList}">
                            <a :href="sub.MenuUrl" :class="{'active':sub.MenuName==menuobj.sm}">{{sub.MenuName}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    `,
});

// 底部组件
Vue.component('v_footer', {
    template: `
        <footer class="site-footer">
            <div class="text-center">
                2019 &copy; 饿了么商家管理平台
                <a href="#" class="go-top"><i class="fa fa-angle-up"></i></a>
            </div>
        </footer>
    `
});