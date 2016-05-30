//********定义区******************
level=1;
monster={
	x:[],
	y:[]

};
hero={
	x:2,
	y:8,
	hp:100,
	power:0,
	protect:0,
	money:0

};
herotwo={
	x:8,
	y:2,
	hp:100,
	power:0,
	protect:0,
	money:0
}
key1num=0;
key2num=0;
var hpm;
power=0;
protect=0;
money=0;
twoplay=0;
playtwo=0;
twoturnstatus=1;
turnstatus=1;
//**********代码区********************
changelevel();
var twoplayers=function()
{
twoplay=1;
}
var drawmap=function(){
	c=document.getElementById("mainmap");
    cxt = c.getContext("2d"); 
	var i,j;
	var floorpic=document.getElementById("floorpic");
	var wallpic=document.getElementById("wallpic");
	var door1=document.getElementById("door1");
	var door2=document.getElementById("door2");
	var dooropen=document.getElementById("dooropen");
	var monster1pic=document.getElementById("monster1pic");
	var key1pic=document.getElementById("key1");
	var key2pic=document.getElementById("key2");
	var flag=document.getElementById("flag");
	var tomb=document.getElementById("tomb");
	for(i=0;i<10;i++)
  		for(j=0;j<10;j++){
  			cxt.drawImage(floorpic,i*60,j*60,60,60);
  	}
	
  	for(i=0;i<10;i++)
  		for(j=0;j<10;j++)
  		{
  			if(map[i][j]==1)cxt.drawImage(door1, j*60,i*60,60,60);
			if(map[i][j]==2)cxt.drawImage(door2, j*60,i*60,60,60);
			if(map[i][j]==3)cxt.drawImage(wallpic, j*60,i*60,60,60);
			if(map[i][j]==11)cxt.drawImage(monster1pic, j*60,i*60,60,60);
			if(map[i][j]==8)cxt.drawImage(key1pic, j*60,i*60,60,60);
			if(map[i][j]==9)cxt.drawImage(key2pic, j*60,i*60,60,60);
			if(map[i][j]==10)cxt.drawImage(flag, j*60,i*60,60,60);
			if(map[i][j]==13)cxt.drawImage(tomb, j*60,i*60,60,60);
			if(map[i][j]==15)cxt.drawImage(dooropen, j*60,i*60,60,60);

	}
}
$(document).keydown(function(event){ 
if(event.keyCode == 37){event.preventDefault();	playtwo=1;goleft();}//左
else if (event.keyCode == 39){event.preventDefault();	playtwo=1;goright();}//右 
else if (event.keyCode == 38){event.preventDefault();	playtwo=1;goup();}//上
else if (event.keyCode == 40){event.preventDefault();	playtwo=1;godown();}//下
}); 
$(document).keydown(function(event){ 
if(event.keyCode == 65){event.preventDefault();	playtwo=2;goleft();}//左
else if (event.keyCode == 68){event.preventDefault();	playtwo=2;goright();}//右 
else if (event.keyCode == 87){event.preventDefault();	playtwo=2;goup();}//上
else if (event.keyCode == 83){event.preventDefault();	playtwo=2;godown();}//下
}); 

function changekey(){
	document.getElementById("keybg1").innerHTML=key1num;
	document.getElementById("keybg2").innerHTML=key2num;
}

function changehp(){
	document.getElementById("hp").innerHTML="生命值~~~~ "+hero.hp;
	document.getElementById("hp2").innerHTML="生命值~~~~ "+herotwo.hp;
	document.getElementById("hp3").innerHTML="敌人生命值~~~ "+mph;
}

function changepower(){
	document.getElementById("power").innerHTML="能力值~~~~ "+hero.power;
	document.getElementById("power2").innerHTML="能力值~~~~ "+herotwo.power;
}

function changeprotect(){
	document.getElementById("protect").innerHTML="防御力~~~~ "+hero.protect;
	document.getElementById("protect2").innerHTML="防御力~~~~ "+herotwo.protect;
}

function changemoney(){
	document.getElementById("money").innerHTML="财富值~~~~ "+hero.money;
	document.getElementById("money2").innerHTML="财富值~~~~ "+herotwo.money;
}

var pickkey=function(y,x)
{
	if(map[y][x]==8)key1num++;
	else if(map[y][x]==9)key2num++;
	map[y][x]=0;
	changekey();
	heromove();
}

function opendoor(){
	map[py][px]=0;
	changekey();
	heromove();
}

function gameover(){
	


}

var operation=function(y,x)
{
	if(map[y][x]==0)
	{
		
		
		if(playtwo==1)
		{
			hero.x=x;
			hero.y=y;
		}
		if(playtwo==2)
		{
			herotwo.x=x;
			herotwo.y=y;
		}
		heromove();
	}
	else if(map[y][x]==8||map[y][x]==9)
	{
		if(playtwo==1)
		{
			hero.x=x;
			hero.y=y;
			pickkey(y,x);
		}
		if(playtwo==2)
		{
			herotwo.x=x;
			herotwo.y=y;
			pickkey(y,x);
			
		}
	}	
	else if((map[y][x]==1&&key1num!=0)||(map[y][x]==2&&key2num!=0))
	{
		if(map[y][x]==1)key1num--;
		if(map[y][x]==2)key2num--;		
		py=y;
		px=x;
		map[y][x]=15;
		heromove();
		time=setTimeout("opendoor()",100);
	}
	else if(map[y][x]==11||map[y][x]==12)
	{
		if(map[y][x]==11)mph=20;
		else if(map[y][x]==12)mph=25;
		var attacks;
		if(playtwo==1)
		{
		if(5+Math.floor(hero.power*0.5)<=20)
		{
			attacks=Math.ceil(mph/(5+Math.floor(hero.power*0.5)));
			hero.hp -= 5-Math.floor(hero.protect*0.5)*attacks;
		}
		else
			hero.hp -= 20-Math.floor(hero.protect*0.5);
			
		changehp();	
		if(hero.hp<=0)
		{
			gameover();
		}
		else
		{
			py=y;
			px=x;
			map[y][x]=13;//dead monster
			heromove();
			time=setTimeout("opendoor();heromove()",800);
		}
		}
		if(playtwo==2)
		{
		if(5+Math.floor(herotwo.power*0.5)<=20)
		{
			attacks=Math.ceil(mph/(5+Math.floor(herotwo.power*0.5)));
			herotwo.hp -= 5-Math.floor(herotwo.protect*0.5)*attacks;
		}
		else
			herotwo.hp -= 20-Math.floor(herotwo.protect*0.5);
			
		changehp();	
		if(herotwo.hp<=0)
		{
			gameover();
		}
		else
		{
			py=y;
			px=x;
			map[y][x]=13;//dead monster
			heromove();
			time=setTimeout("opendoor();heromove()",800);
		}
		}
	}
	else if(map[y][x]==10)
	{
		if(playtwo==1)
		{
			hero.x=x;
			hero.y=y;
		}
		if(playtwo==2)
		{
			herotwo.x=x;
			herotwo.y=y;
		}
		heromove();
		if(twoplay==1){
		if(map[hero.y][hero.x]==10&&map[herotwo.x][herotwo.y]==10)showbox();}
		if(twoplay==0){
		if(map[hero.y][hero.x]==10)showbox();}
	}
}
var showbox=function(){
	document.getElementById("nextlevel").style.display = "block";
	var up1=document.getElementById("up1");
	var c1 = document.getElementById("levelup");
	var cxt1 = c1.getContext("2d");
	cxt1.clearRect(0,0,1600,600);
	
	cxt1.fillStyle="rgba(96,176,249,0.5)";//blue
	cxt1.strokeStyle="rgba(96,176,249,0.5)";
	cxt1.linewidth=1;
	cxt1.fillRect(10,160,460,400);
	cxt1.fillRect(1000,340,500,200);
	
	cxt1.fillStyle="rgba(251,132,135,0.5)";//red
	cxt1.strokeStyle="rgba(251,132,135,0.5)";
	cxt1.linewidth=1;
	cxt1.fillRect(200,360,300,300);
	cxt1.fillRect(960,140,400,300);
	
	cxt1.fillStyle="rgba(225,254,112,0.5)";//red
	cxt1.linewidth=1;
	cxt1.fillRect(450,0,600,600);
	
	cxt1.drawImage(up1,550,0,400,600);
	
	cxt1.font="bold 300px 書體坊顏體㊣";
	cxt1.textAlign = "center";
	cxt1.textBaseline = "middle";
	cxt1.fillStyle = "#993333";
	cxt1.fillText('通',220,300);
	cxt1.fillText('关',1250,300);
	
	
	cxt1.font="bold 100px 書體坊顏體㊣";
	cxt1.textAlign = "center";
	cxt1.textBaseline = "middle";
	cxt1.fillStyle = "#993333";
	cxt1.fillText('おめでとう',250,500);
	cxt1.fillText('パス',1250,500);
	time=setTimeout("up()",500);
}
var up=function(){
	var up2=document.getElementById("up2");
	var c1 = document.getElementById("levelup");
	var cxt1 = c1.getContext("2d");
	cxt1.clearRect(0,0,1600,600);
	
	cxt1.fillStyle="rgba(96,176,249,0.5)";//blue
	cxt1.strokeStyle="rgba(96,176,249,0.5)";
	cxt1.linewidth=1;
	cxt1.fillRect(10,160,460,400);
	cxt1.fillRect(1000,340,500,200);
	
	cxt1.fillStyle="rgba(251,132,135,0.5)";//red
	cxt1.strokeStyle="rgba(251,132,135,0.5)";
	cxt1.linewidth=1;
	cxt1.fillRect(200,360,300,300);
	cxt1.fillRect(960,140,400,300);
	
	cxt1.fillStyle="rgba(225,254,112,0.5)";//red
	cxt1.linewidth=1;
	cxt1.fillRect(450,0,600,600);
	
	cxt1.drawImage(up2,550,0,400,600);
	
	cxt1.font="bold 300px 書體坊顏體㊣";
	cxt1.textAlign = "center";
	cxt1.textBaseline = "middle";
	cxt1.fillStyle = "#993333";
	cxt1.fillText('通',220,300);
	cxt1.fillText('关',1250,300);
	
	
	cxt1.font="bold 100px 書體坊顏體㊣";
	cxt1.textAlign = "center";
	cxt1.textBaseline = "middle";
	cxt1.fillStyle = "#993333";
	cxt1.fillText('おめでとう',250,500);
	cxt1.fillText('パス',1250,500);
	time=setTimeout("up2()",500);
}
var up2=function(){
	var up1=document.getElementById("up1");
	var c1 = document.getElementById("levelup");
	var cxt1 = c1.getContext("2d");
	cxt1.clearRect(0,0,1600,600);
	
	cxt1.fillStyle="rgba(96,176,249,0.5)";//blue
	cxt1.strokeStyle="rgba(96,176,249,0.5)";
	cxt1.linewidth=1;
	cxt1.fillRect(10,160,460,400);
	cxt1.fillRect(1000,340,500,200);
	
	cxt1.fillStyle="rgba(251,132,135,0.5)";//red
	cxt1.strokeStyle="rgba(251,132,135,0.5)";
	cxt1.linewidth=1;
	cxt1.fillRect(200,360,300,300);
	cxt1.fillRect(960,140,400,300);
	
	cxt1.fillStyle="rgba(225,254,112,0.5)";//red
	cxt1.linewidth=1;
	cxt1.fillRect(450,0,600,600);
	
	cxt1.drawImage(up1,550,0,400,600);
	
	cxt1.font="bold 300px 書體坊顏體㊣";
	cxt1.textAlign = "center";
	cxt1.textBaseline = "middle";
	cxt1.fillStyle = "#993333";
	cxt1.fillText('通',220,300);
	cxt1.fillText('关',1250,300);
	
	
	cxt1.font="bold 100px 書體坊顏體㊣";
	cxt1.textAlign = "center";
	cxt1.textBaseline = "middle";
	cxt1.fillStyle = "#993333";
	cxt1.fillText('おめでとう',250,500);
	cxt1.fillText('パス',1250,500);
	time=setTimeout("up()",500);
}
var levelnext=function()
{
	level++;
	document.getElementById("showlevel").innerHTML="第 "+level+" 关";
	document.getElementById("nextlevel").style.display="none";
	changelevel();
	heromove();
}
var goleft=function(){
	
	if(playtwo==1)
	{
	turnstatus=3;	
	operation(hero.y,hero.x-1);
	}
	if(playtwo==2)
	{
		twoturnstatus=3;
		operation(herotwo.y,herotwo.x-1);
	}
	heromove();
}
var goright=function(){
	if(playtwo==1)
	{
		turnstatus=4;
	operation(hero.y,hero.x+1);
	}
	if(playtwo==2)
	{
		twoturnstatus=4;
		operation(herotwo.y,herotwo.x+1);
	}
	heromove();

}
var goup=function(){
	if(playtwo==1)
	{
		turnstatus=2;
	operation(hero.y-1,hero.x);
	}
	if(playtwo==2)
	{
		twoturnstatus=2;
		operation(herotwo.y-1,herotwo.x);
	}
	heromove();
}
var godown=function(){
	if(playtwo==1)
	{	
		turnstatus=1;
		operation(hero.y+1,hero.x);
	}
	if(playtwo==2)
	{
		twoturnstatus=1;
		operation(herotwo.y+1,herotwo.x);
	}
	heromove();
}
var heromove=function(){
	cxt.clearRect(0,0,600,600);
	drawmap();
	var heropic1=document.getElementById("heropic1");
	var heropic2=document.getElementById("heropic2");
	var heropic3=document.getElementById("heropic3");
	var heropic4=document.getElementById("heropic4");
	if(turnstatus==1)cxt.drawImage(heropic1,hero.x*60,hero.y*60,60,60);
	if(turnstatus==2)cxt.drawImage(heropic2,hero.x*60,hero.y*60,60,60);
	if(turnstatus==3)cxt.drawImage(heropic3,hero.x*60,hero.y*60,60,60);
	if(turnstatus==4)cxt.drawImage(heropic4,hero.x*60,hero.y*60,60,60);
	if(twoplay==1)
	{
		var heropic21=document.getElementById("heropic21");
		var heropic22=document.getElementById("heropic22");
		var heropic23=document.getElementById("heropic23");
		var heropic24=document.getElementById("heropic24");
		if(twoturnstatus==1)cxt.drawImage(heropic21,herotwo.x*60,herotwo.y*60,60,60);
		if(twoturnstatus==2)cxt.drawImage(heropic22,herotwo.x*60,herotwo.y*60,60,60);
		if(twoturnstatus==3)cxt.drawImage(heropic23,herotwo.x*60,herotwo.y*60,60,60);
		if(twoturnstatus==4)cxt.drawImage(heropic24,herotwo.x*60,herotwo.y*60,60,60);
	}
} 
$(document).ready(function () { 
	drawmap();
	heromove();
});


$(document).ready(function(e) {
	$("#ch1").animate({
		left:'270px',
		top:'20%',
		opacity:'1',
		height:'300',
		width:'300'
	});
	$("#ch2").animate({
		left:'520px',
		top:'20%',
		opacity:'0.5',
		height:'150px',
		width:'150px'
	});
	$("#ch3").animate({
		left:'550',
		opacity:'0',
		height:'300px',
		width:'300px'
	});
	$("#ch4").animate({
		left:'550',
		opacity:'0',
		height:'300px',
		width:'300px'
	});
});

var cn=1;

$(document).ready(function(){
  $("#p1").click(function(){
	--cn;
	switch (cn)
	{
	  	case 1:
    		$("#ch1").animate({
				left:'270px',
				top:'20%',
				opacity:'1',
				height:'300',
				width:'300'
			});
			$("#ch2").animate({
				left:'520px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			$("#ch3").animate({
				left:'600',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'150px'
			});
			$("#ch4").animate({
				left:'600',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'150px'
			});
			break;
		case 2:
			$("#ch1").animate({
				left:'120px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			$("#ch2").animate({
				left:'270px',
				top:'20%',
				opacity:'1',
				height:'300',
				width:'300'
			});
			$("#ch3").animate({
				left:'520px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			$("#ch4").animate({
				left:'600',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'150px'
			});
			break;
		case 3:
			$("#ch1").animate({
				left:'0px',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'150px'
			});
			$("#ch2").animate({
				left:'120px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			$("#ch3").animate({
				left:'270px',
				top:'20%',
				opacity:'1',
				height:'300',
				width:'300'
			});
			$("#ch4").animate({
				left:'520px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			break;
		case 4:
			$("#ch1").animate({
				left:'0px',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'150px'
			});
			$("#ch2").animate({
				left:'0px',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'150px'
			});
			$("#ch3").animate({
				left:'120px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			$("#ch4").animate({
				left:'270px',
				top:'20%',
				opacity:'1',
				height:'300',
				width:'300'
			});
			break;
	}
  });
  
  $("#p2").click(function(){
	++cn;
	switch (cn)
	{
	  	case 1:
    		$("#ch1").animate({
				left:'270px',
				top:'20%',
				opacity:'1',
				height:'300',
				width:'300'
			});
			$("#ch2").animate({
				left:'520px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			$("#ch3").animate({
				left:'600',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'1500px'
			});
			$("#ch4").animate({
				left:'600',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'150px'
			});
			break;
		case 2:
			$("#ch1").animate({
				left:'120px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			$("#ch2").animate({
				left:'270px',
				top:'20%',
				opacity:'1',
				height:'300',
				width:'300'
			});
			$("#ch3").animate({
				left:'520px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			$("#ch4").animate({
				left:'600',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'150px'
			});
			break;
		case 3:
			$("#ch1").animate({
				left:'0px',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'150px'
			});
			$("#ch2").animate({
				left:'120px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			$("#ch3").animate({
				left:'270px',
				top:'20%',
				opacity:'1',
				height:'300',

				width:'300'
			});
			$("#ch4").animate({
				left:'520px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			break;
		case 4:
			$("#ch1").animate({
				left:'0px',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'150px'
			});
			$("#ch2").animate({
				left:'0px',
				top:'20%',
				opacity:'0',
				height:'150px',
				width:'150px'
			});
			$("#ch3").animate({
				left:'120px',
				top:'20%',
				opacity:'0.5',
				height:'150px',
				width:'150px'
			});
			$("#ch4").animate({
				left:'270px',
				top:'20%',
				opacity:'1',
				height:'300',
				width:'300'
			});
			break;
	}
  });
});


function hidechoice(){
    document.getElementById("choice").style.display = "none";
}