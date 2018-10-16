const express = require('express');
const SMSClient = require('@alicloud/sms-sdk');
const bodyParser = require('body-parser')
let app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', (req, res) => {
    res.send('hello world');
})
app.post('/sendSMS', bodyParser.json(), async (req, res) => {
    console.log('req.body...', req.body);
    let result = await sendSMS(req.body.phone);
    if (result){
        res.json({
            code: 0,
            msg: '发送短信成功'
        })
    }else{
        res.json({
            code: -1,
            msg: '发送短信失败'
        })
    }
});

function sendSMS(phone) {
    // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
    const accessKeyId = 'omFtRkaRs3Xu0pTW'
    const secretAccessKey = 'a8LXFS3hXAU3vbtJqjEQh038j7iTDU'
    //初始化sms_client
    let smsClient = new SMSClient({
        accessKeyId,
        secretAccessKey
    })
    //发送短信
    return smsClient.sendSMS({
        PhoneNumbers: phone,
        // 必填: 待发送手机号。 支持以逗号分隔的形式进行批量调用， 批量上限为1000个手机号码,
        // 批量调用相对于单条调用及时性稍有延迟,
        // 验证码类型的短信推荐使用单条调用的方式； 发送国际 / 港澳台消息时， 接收号码格式为： 国际区号 + 号码， 如“ 85200000000”
        SignName: 'jasonandjay',
        // 必填: 短信签名 - 可在短信控制台中找到
        TemplateCode: 'SMS_144457028',
        // 必填: 短信模板 - 可在短信控制台中找到， 发送国际 / 港澳台消息时， 请使用国际 / 港澳台短信模版
        TemplateParam: `{"code":${Math.floor(Math.random()*899999)+100000}}`
        // 可选: 模板中的变量替换JSON串,
        // 如模板内容为 "亲爱的${name},您的验证码为${code}" 时。
    }).then(function (res) {
        let {
            Code
        } = res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res)
            return true;
        }
        return false;
    }, function (err) {
        console.log(err)

    })
}

app.listen(10001, () => {
    console.log('正在监听10000端口');
});