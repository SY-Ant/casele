
$(function () {
    var getSecondData = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {

                // page 是页数
                page: pageNum || 1,
                pageSize: 5
            },
            success: function (data) {
                // console.log(1);
                // console.log(data);
                var userManageList = template('categorySecond-template', data);
                // console.log(userManageList);
                $('table tbody').html(userManageList);
                $('.pagination').bootstrapPaginator({
                    /*当前使用的是3版本的bootstrap*/
                    bootstrapMajorVersion: 3,
                    size: 'small',
                    currentPage: data.page,//当前页面  
                    // numberOfPages: 5,  //一页显示几个按钮（在ul里面生成5个li）  
                    totalPages: Math.ceil(data.total / data.size), 
                    itemTexts: function(type, page, current) { //修改显示文字
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                            }
                },onPageClicked: function (event, originalEvent, type, page) {
                        //事件：typePage是被点击的页码
                        getSecondData(page);
                    }
                })
            }
        })
    }
    //调用
    getSecondData();
    initDropDown();
    initUpload();

    $('#secondform').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: '二级分类分类不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);
        // console.log($form);
        // var bv = $form.data('bootstrapValidator');
        var data = $form.serialize();
        // console.log($form);
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.success == true) {
                    $('#category_first').modal('hide');
                    getSecondData();
                }
            }

        })
    });

})

var initDropDown = function () {
    var dropdown = $('.dropdown');
    dropdown.click(function () {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var html = "";
                $.each(data.rows, function (i, item) {
                    console.log(i, item);
                    html += '<li><a href="javascript:;" data-id="' + item.id + '">' + item.categoryName + '</a></li>'
                })
                $('.dropdown-menu').html(html);
                $('.dropdown-menu').on('click', 'a', function () {
                    $('.dropdown-text').html($(this).html());
                    $('#categoryId').val($(this).attr('data-id'));
                })
            }
        })
    })
}

var initUpload = function () {
    $('#secondupload').fileupload({
        url: '/category/addSecondCategoryPic',
        done: function (e, data) {
            console.log(data);
            $("#previewimg").attr('src', data.result.picAddr);
            $('#brandLogo').val(data.result.picAddr);
        }

    })
}
