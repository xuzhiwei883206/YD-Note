const Mocha = require("mocha");
const mocha = new Mocha({
    reporter:'mochawesome',//报表
    reporterOptions:{
        reportDir:'./docs/mochawesome-reporter'
    }
});

mocha.addFile('./service/router.spec.js');
mocha.run(function(){
    console.log("done");
    process.exit();  //这句话一定要写，不然进程不退出就一直堵在这儿
})