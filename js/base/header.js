Vue.component('v_header', {
    template: `
    <header class="header white-bg" >
        <div class="sidebar-toggle-box">
                <i class="fa fa-bars"></i>
            </div>
            <a href="index.html" class="logo">饿了么<span>商家管理</span></a>
    
            <div class="top-nav ">
     
            <ul class="nav pull-right top-menu">
                <li>
                    <input type="text" class="form-control search" placeholder="Search">
                </li>
           
                <li class="dropdown">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                        <img alt="" src="../img/avatar1_small.jpg">
                        <span class="username">管理员</span>
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu extended logout">
                        <div class="log-arrow-up"></div>
                        <li><a href="#"><i class=" fa fa-suitcase"></i>个人信息</a></li>
                        <li><a href="#"><i class="fa fa-cog"></i> 设置</a></li>
                        <li><a href="#"><i class="fa fa-bell-o"></i> 消息</a></li>
                        <li><a href="login.html"><i class="fa fa-key"></i> 退出</a></li>
                    </ul>
                </li>
            </ul>
          
        </div>
    </header>
        `,
})