// 该文件的功能是用来写首页的js交互的
//不要让进度条显示圆圈
NProgress.configure({showSpinner: false});


$(window).ajaxStart(function () {
    NProgress.start();
})

$(window).ajaxComplete(function () {
    NProgress.done();
})



$('[data-menu]').on('click', function () {
    $('aside').toggle();
    $('section').toggleClass('menu_se');
})

$('aside .menu').on('click', '[href="javascript:;"]', function(){
    var _this = $(this);
    _this.siblings().slideToggle();
})
$('.manage li:nth-child(odd) a').on('click', function () {
    $(this).css({
        color: '#fff',
    }).parent().siblings().children().css({
        color:"#aaa",
    });
});
$('.manage li:nth-child(odd)').on('click', function () {
    $(this).css({
        borderLeft: '3px solid #3c8dbc',
        backgroundColor:'#1d1f21',
    }).siblings().css({
        borderLeft: '',
        backgroundColor:'',
    });
});
