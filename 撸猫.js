/**
 * 作者:ROCEYS
 * 时间：2020-10-21 02:43:45
 */
console.show();
var h = device.height;
var w = device.width;
setScreenMetrics(w,h);
log("正在打开淘宝");
launch("com.taobao.taobao");
log("请在10秒内进入撸猫界面");
sleep(10000);
var num = dialogs.input("输入撸猫次数", 300);
log("开始撸猫");
if(num==null){
    num = 300;
}
var i=1;
while (true) {
	click(w/2,h/2);
	log(i+"喵喵喵~");
	if(i==num){
		break;
	}
	i++;
}

log("Done!");
exit();
