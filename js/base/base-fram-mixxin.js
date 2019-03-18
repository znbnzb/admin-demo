// 全局公用混合对象
const baseFrameMixin = {
        el: '#container',
        mixins: [baseUtilsMixin],
        data: function() {
            return {
                asideOff: false, // 控制菜单栏开关
                // 菜单数据对象
                hasMenu: false,
                menuobj: {
                    list: []
                }
            }
        },

        created: function() {
            this.queryMenu()
        },

        methods: {
            getTotalPageForDebug: function(res, pageSize) {
                var totalPage = 1
                var totalCount = res.data.length
                totalPage = Math.ceil(totalCount / pageSize)
                totalPage = totalPage == 0 ? 1 : totalPage
                return totalPage
            },
            getPageDataForDebug: function(res, pageSize, pageNo) {
                var totalCount = res.data.length
                var start = (pageNo - 1) * pageSize
                var end = Math.min(pageNo * pageSize, totalCount)
                return res.data.slice(start, end)
            },
            toast: function(msg, action) {
                // toastr.error(msg, title, opts)
                if (action && action != 'error') {
                    toastr.options.timeOut = 1200
                }
                toastr[action || 'error'](msg, '提示')
            },
            catch: function(e) {
                if (e && !e.ok) {
                    if (e.status === 401) {
                        window.location.href = 'login.html'
                    }
                    if (e.headers && e.headers.map) {
                        let url = e.url
                        if (url.indexOf('?') > -1) {
                            url = url.slice(0, url.indexOf('?'))
                        }
                        let contentType = ''
                        if (e.headers.map['Content-Type'] || e.headers.map['content-type']) {
                            contentType = e.headers.map['Content-Type'] ?
                                e.headers.map['Content-Type'][0] :
                                e.headers.map['content-type'][0]
                        }
                        if (!contentType || contentType.indexOf('text/html') > -1) {
                            this.toast(url + '<br>' + e.status + '&nbsp;&nbsp;' + e.statusText)
                        } else {
                            var msgStr = ''
                            var msg = e.bodyText.split(':', -1)
                            msgStr = msg.length > 1 ? msg[1] : e.bodyText
                                // msgStr = msgStr.replace(/\]/g, "");
                            if (msgStr.indexOf(',') > 0) {
                                this.toast(msgStr.split(',')[0])
                            } else {
                                this.toast(msgStr)
                            }
                        }
                    }
                }
            },
            queryMenu: function() {
                // 合并请求

                var _this = this
                const queryMenus = Bmob.Query('MenuList')
                queryMenus.find().then(res => {
                    var menudata = res || []
                    _this.$set(_this.menuobj, 'list', menudata)
                    _this.hasMenu = true
                })
            },
            buildQueryExpression: function(
                queryObj,
                searchFormSelector,
                conditionStrArray
            ) {
                const _this = this

                if (searchFormSelector === null || searchFormSelector === undefined) {
                    const errorMsg = '参数 searchFormSelector 不能为空'
                    _this.toast(errorMsg)
                    throw errorMsg
                }
                let searchForm = document.querySelector(searchFormSelector)
                if (!searchForm) {
                    const errorMsg =
                        '参数 searchFormSelector[' + searchFormSelector + '] 无效'
                    _this.toast(errorMsg)
                    throw errorMsg
                }
                if (
                    conditionStrArray &&
                    (typeof conditionStrArray !== 'object' ||
                        !(conditionStrArray instanceof Array))
                ) {
                    _this.toast('参数 conditionStr 必须为数组类型')
                    return
                }

                const selectors = _this.getSelectorArrayForSearchForm(searchForm)
                let expr = new Expr()
                for (const selector of selectors) {
                    expr = expr.and(searchFormSelector + ' ' + selector)
                }

                if (conditionStrArray && conditionStrArray.length > 0) {
                    for (const condition of conditionStrArray) {
                        expr = expr.and(condition, true)
                    }
                }

                queryObj.expression = Expr.eval(expr)
            },
            setCurrentMenu: function(_1st_menu, _2nd_menu, _3rd_menu) {
                if (_1st_menu) {
                    this.$set(this.menuobj, 'fm', _1st_menu) // 指定高亮的一级菜单
                }
                if (_2nd_menu) {
                    this.$set(this.menuobj, 'sm', _2nd_menu) // 指定高亮的二级菜单
                }
                if (_3rd_menu) {
                    this.$set(this.menuobj, 'tm', _3rd_menu) // 指定高亮的二级菜单
                }

                this.loadMenuAccordion()
            },
            loadMenuAccordion: function() {
                var _this = this
                if (!_this.hasMenu) {
                    setTimeout(function() {
                        _this.loadMenuAccordion()
                    }, 500)
                    return
                }

                setTimeout(function() {
                    $('#nav-accordion').dcAccordion({
                        speed: 'fast'
                    })
                }, 0)
            }
        }
    }
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