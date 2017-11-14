
$(function () {
    var getProductData = function (pageNum) {
        $.ajax({
            type: 'get',
            url:'/product/queryProductDetailList',
            data: {

                // page 是页数
                page: pageNum || 1,
                pageSize: 5
            },
            success: function (data) {
                // console.log(1);
                // console.log(data);
                var productList = template('productManage-template', data);
                // console.log(userManageList);
                $('table tbody').html(productList);
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
                } ,onPageClicked: function (event, originalEvent, type, page) {
                        //事件：typePage是被点击的页码
                        getProductData(page);
                    }
                 
            })
        }
    })
}
    //调用
    getProductData();
    initUpload();

    $('#productform').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名是name属性的值
            proName: {
              validators: {
                notEmpty: {
                  message: '商品名称不能为空'
                }
              }
            },
            proDesc: {
              validators: {
                notEmpty: {
                  message: '商品描述不能为空'
                }
              }
            },
            num: {
              validators: {
                notEmpty: {
                  message: '商品库存不能为空'
                }
              }
            },
            price: {
              validators: {
                notEmpty: {
                  message: '商品价格不能为空'
                }
              }
            },
            oldPrice: {
              validators: {
                notEmpty: {
                  message: '商品原价不能为空'
                }
              }
            }, 
            size: {
              validators: {
                notEmpty: {
                  message: '商品尺码不能为空'
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
        // console.log(data);
        // console.log(data);
        $.each(picList,function(i,item){
            // console.log(i,item);

            data= data+'&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr;
            // data = data +'&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr;
            // key=value&key1=value1
            // console.log(data);
            // data+='&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr;
        })
        data = data + '&brandId=4';
        // console.log($form);
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: data,
            dataType: 'json',
            success: function (data) {
                // console.log(1);
                $('#product-modal').modal('hide');
                getProductData();
            }
        })
        });

})

var  picList = [];
var initUpload = function () {
    $("#pic").fileupload({
        url:"/product/addProductPic",
        done:function(e,data){
            $('.fileupload').append('<img width="50" height="auto" src="'+data.result.picAddr+'" alt = "">');
            picList.push(data.result);
        }
    })
}
