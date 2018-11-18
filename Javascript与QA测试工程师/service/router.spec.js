/**
 * 下面这个是一种写法 -> node
    const superagent =require("superagent");
    const app = require("./app");
    function request(){
        return superagent(app.listen());//把上面的接口拿过来
    }
    describe("node接口",function(){
        it("test接口测试",function(){
            request()
            .get('/test') //测试的接口
            .expect("Content-Type",/json/) // 期望得到的是json
            .expect(200)  //得到的请求值是200
            .end(function(err,res){
                if(res.data == "hello world"){
                    done();
                }else{
                    done();
                }
            })
        })
    })
 */
const axios = require("axios");
describe("node接口", function () {
    it("test接口测试", function () {
        axios.get('http://localhost:3000/test')
            .then(function (response) {
                console.log(response);
                if(response.data=="hello world"){
                    done(); //是mocha来的
                }else{
                    done(new Error("数据请求格式错误"))
                }
            })
            .catch(function (error) {
                done(error);
            });
    })
})




