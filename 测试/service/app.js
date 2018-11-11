//这是一个小的测试接口demo
var express = require("express");

var app =express();

app.get("/test",function(req,res){
    res.send({
        data:"hello world"
    })
})

var server = app.listen(3000,function(){
    console.log("DEMO app 启动成功");
})

module.exports=app; //导出让测试文件拿到