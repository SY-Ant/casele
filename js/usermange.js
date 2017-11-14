
$(function () {
    var getUserManageData = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            success: function (data) {
                // console.log(1);
                console.log(data);
                var userManageList = template('usermanage-template', data);
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
                        getUserManageData(page);
                    }
                })
            }
        })

    }
    //调用
    getUserManageData();



    $('tbody').on('click', '.btn', function () {
        var id = $(this).data('id');
        console.log(id);
        var name = $(this).data('name');
        // console.log(name);
        var isDelete = $(this).hasClass('btn-danger') ? 1 : 0;
        if (isDelete==1) {
            $('#myModal').find('.alert').html(' <i class="glyphicon glyphicon-info-sign"></i> 您确定要启用'+name+'这个用户吗？') 
        }else{
            $('#myModal').find('.alert').html(' <i class="glyphicon glyphicon-info-sign"></i> 您确定要禁用'+name+'这个用户吗？') 
        }
        
    $('#myModal').on('click','.userBtn',function(){
        $.ajax({
            type:'POST',
            url:' /user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                if(data.success==true){
                    $('#myModal').modal('hide');
                    getUserManageData();

                }
            }

        })
    })
    })





})
