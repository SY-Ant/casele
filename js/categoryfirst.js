
$(function () {
    var getFirstData = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            success: function (data) {
                console.log(1);
                console.log(data);
                var userManageList = template('categoryFirst-template', data);
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
                }, //总页数 
                    onPageClicked: function (event, originalEvent, type, page) {
                        //事件：typePage是被点击的页码
                        getFirstData(page);
                    }
                })
            }
        })

    }
    //调用
    getFirstData();

        $('#category_first').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                categoryName: {
                    validators: {
                        notEmpty: {
                            message: '一级分类名称不能为空'
                        }
                    }
                }
            }
        }).on('success.form.bv', function (e) {
            e.preventDefault();
            // var $form = $(e.target);
            // var bv = $form.data('bootstrapValidator');
            // console.log($form);
        });
        $('#category_first').on('click','#save',function(){
            var formData = $('#first-form').serialize();
            $.ajax({
                type:'post',
                url:'/category/addTopCategory',
                data:formData,
                dataType:'json',
                success:function(data){
                    if(data.success == true) {
                        $('#category_first').modal('hide');
                        getFirstData();
                    }  
                }

            })
        })









})
