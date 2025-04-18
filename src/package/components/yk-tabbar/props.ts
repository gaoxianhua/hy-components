export default {
    /**
     * tab当前值
     * */
    current: 0,
    /**
     * 文字颜色
     * */
    textColor: "#FFFFFF",
    /**
     * 底部导航栏背景颜色
     * 支持渐变色--linear-gradient(155deg, #192b6e, #a6307c)
     * */
    bgColor: "linear-gradient(155deg, #192b6e, #a6307c)",
    /**
     * 点击突出按钮的背景颜色
     * 支持渐变色--linear-gradient(0deg, #ffa576,#0951eb)
     * */
    activeColor: "linear-gradient(0deg, #ffa576,#0951eb)",
    /**
     * 导航栏值
     * {
     *     key: 唯一建值,
     *     label: 中文名,
     *     icon: uview-plus里面的矢量图标库
     *     iconUrl: 图片地址
     * }
     * */
    list: [
        {
            key: 0,
            label: "首页",
            icon: "home",
            iconUrl: ""
        },
        {
            key: 1,
            label: "工具栏",
            icon: "grid",
            iconUrl: ""
        },
        {
            key: 2,
            label: "我的",
            icon: "account",
            iconUrl: ""
        }
    ]
}