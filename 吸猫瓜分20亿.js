/**
 * 作者：ROCEYS
 * 时间：2020-10-21 01:01:53
 * Version：0.0.3
 * 增加去搜索功能
 * 增加自动撸猫功能（偶尔出现1600暴击）
 * 增加自动领奖励功能
 * 1021晚上发现淘宝增加了脚本检测 可能喵币只有1/100奖励了
 */

var i = 0;
var j = 0;
var taskList = ['去浏览','去搜索', '去完成'];
var height = device.height;
var width = device.width;
setScreenMetrics(width, height);
var speed = 1;

dialogs.alert("请确认无障碍和悬浮窗权限已开启,感谢使用,\n作者:ROCEYS\n仅供学习参考, B站同名");
menu: while (true) {
    var choose = dialogs.select("选择脚本速度", "干就完了，给我上最快的", "网速不太好，别整太快了", "手机和网速都不咋滴", "我太难了，整个最慢的叭");
    switch (choose) {
        case -1:
            toast("请选择");
            continue menu;
        case 0:
            toast("牛批啊，火箭已准备就绪");
            speed = 0.75;
            break menu;
        case 1:
            toast("慢慢来，稳中求胜");
            speed = 1;
            break menu;
        case 2:
            toast("老铁666，自行车发车啦");
            speed = 1.5;
            break menu;
        case 3:
            toast("村通网，莫得办法");
            speed = 2;
            break menu;

        default:
            break;
    }
}

console.show();
try {
    auto.waitFor();
}
catch(e) {
    dialogs.alert("当前auto.js版本为4.0以下版本，无法检测是否开启无障碍模式，请确保无障碍模式已经打开");
}

sleep(1000 * speed);

log("正在打开淘宝");
launch("com.taobao.taobao");
sleep(1000 * speed);
log("正在等待进入吸猫活动页面");
log("请手动进入活动页面")

className("android.widget.Button").text("赚喵币").waitFor()
sleep(1000);
if (!textContains("累计任务奖励").exists()) {
    className("android.widget.Button").text("赚喵币").findOne().click()
    log("进入活动成功");
}
sleep(1500 * speed);
if (!textContains("签到").exists()) { log("已签到"); }
sleep(1500 * speed);

var k=0;
taskList.forEach(task => {
    while (textContains(task).exists()) {
        if(k>1){
            log("邀请任务需手动完成！");
            break;
        }
        log("开始做第" + (i+1) + "次任务！");
        var a = text(task).findOnce(j);
        switch (task) {
            case '去完成':
                log("开始去完成任务...")
                var ls = text(task).find();
                var flag = a.parent().children().forEach(function (child) {
                    if(child.text().indexOf("邀请")!=-1){return false;}
                });
                if (!flag && ls.size() > 1) {
                    click('去完成',1);
                }else if(!flag && ls.size() == 1 ){
                    k++;
                    break;
                }else{
                    click('去完成',0);
                }

                if (textContains("签到").exists()) {
                    log("签到完成！");
                    continue;
                }

				sleep(1500 * speed);
				if (textContains("当前淘宝账号").exists()) {
					log("暂不支持跳转其它APP！");
					back();
					continue;
				}
                swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
                sleep(15000 * speed);
				swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
				textContains("完成").findOne(10000 * speed);
				i++;
				log("已完成第" + i + "次任务！");
				back();
                break;
            case '去搜索':
            case '去浏览':
                sleep(500 * speed);
                a.click();
                sleep(1500 * speed);
				if (!textContains("跟主播聊").exists() || !textContains("赚金币").exists()) {
					swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
					sleep(3500 * speed);
					swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
					sleep(12000 * speed);
					swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
				}else{
					sleep(15000 * speed);
				}
                textContains("完成").findOne(10000 * speed);
                i++;
                log("已完成第" + i + "次任务！")
                back();
                break;
            default:
                log("Powered by ROCEYS 20201021")
                break;
        }
        sleep(2000 * speed);
    }
});

var catCoins = text("已领取").find();
if(catCoins == null || (catCoins != null && catCoins.size() < 4)){
    sleep(1500 * speed);
    click('领取奖励');
    sleep(1500 * speed);
    click('领取奖励');
    sleep(1500 * speed);
    click('领取奖励');
}
log("奖励已领取完成!");

sleep(3000 * speed);
var close = text("关闭").findOnce();
if(null != close){
    close.click();
    log("开始撸猫");
    var num = dialogs.input("输入撸猫次数", 300);
    if(num==null){
        num = 300;
    }
    var i=1;
    while (true) {
        click(width/2,height/2);
        log(i+"喵喵喵~");
        if(i==num){
            break;
        }
        i++;
    }
}else{
    log("请关闭任务界面并手动运行撸猫脚本");
}

log("Done!");
exit();