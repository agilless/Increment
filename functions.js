$("document").ready(function(){

var thingies = 0;
var thingyClicksMultiplier = 1;
var thingyClicks = 100;
var position = 0;
var dude = 0;
var runCounter = 0;
var resetter = 0;
var clicking;
var mouseOverInterval = 100;
var b1Interval = 100;
var hoverUpgrades = 0;
var clickUpgrades = 0;
var b1s = 0;
var b1Upgrades = 0;
var b1sMultiplier = 1;
var b1CPS = 0;
//total clicks per second
var CPS = b1CPS + 0;
var groundArray = ["ground1","ground2","ground3","ground4","ground5","ground6"];
//achievement
var numberOfClicks = 0;

$("#mainButton").click(function(){
	thingyClick(thingyClicks * thingyClicksMultiplier);
	moving(thingyClicks * thingyClicksMultiplier);
	numberOfClicks++;
	clickAchievement();
});

function thingyClick(number){
	thingies += number;
	$("#thingies").html(Math.floor(thingies));
	runCounter++;
	if (runCounter > 6){
		running(50);
		runCounter = 0;
	};
};

function running(height) {
	dude += height;
	$("#dude").css("background-position", "0px -" + dude + "px");
	resetter += 1;
	if (resetter > 5) {
		dude = 0;
		resetter = 0;
	};
};

function moving(pixles){
	position -= pixles;
	$("#" + groundArray[0]).css("margin-left", position+"px");
	if (position <= -150){
		position = 0;
		var d = document.getElementById(groundArray[0]);
		d.parentNode.appendChild(d);
		groundArray.push(groundArray.shift());
		$("#" + groundArray[0,1,2,3,4,5]).css("margin-left", 0);
	};
};

$("#clickUpgrade").click(function buyClickUpgrade(){
	var clickUpgradeCost = Math.floor(10 * Math.pow(1.1,clickUpgrades));
	if(thingies >= clickUpgradeCost){
		thingyClicks++;
		clickUpgrades++;
		thingies -= clickUpgradeCost;
		$("#clickUpgrades").html(clickUpgrades);
		$("#thingies").html(Math.floor(thingies));
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,clickUpgrades));
	$("#clickUpgradeCost").html(nextCost);
	$("#thingies").html(Math.floor(thingies));
});

// First Auto Clicking Unit
var b1Clicking;
function faster(){
	b1Clicking = setInterval(function(){
		thingyClick(0.1);
		moving(b1CPS / 100);
	}, b1Interval);
};
$("#b1").click(function buyB1(){
	var b1Cost = Math.floor(10 * Math.pow(1.1,b1s));
	if(thingies >= b1Cost){
		b1s++;
		thingies -= b1Cost;
		$("#b1s").html(b1s);
		$("#thingies").html(Math.floor(thingies));
		b1Interval = b1Interval * .99;
		console.log(b1Interval);

		clearInterval(b1Clicking);
		faster();
	
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,b1s));
	$("#b1Cost").html(nextCost);
	b1CPS = Math.round((1000 / b1Interval * 0.1) * 100) / 100;
	$("#b1sCPS").html(b1CPS);
});

//Upgrades for first unit
$("#b1Upgrade").click(function buyB1Upgrade(){
	var b1UpgradeCost = Math.floor(10 * Math.pow(10,b1Upgrades));
	if (thingies >= b1UpgradeCost){
		b1Upgrades++;
		b1Interval = b1Interval / 2;
		thingies -= b1UpgradeCost;
		$("#b1Upgrades").html(b1Upgrades);
		clearInterval(b1Clicking);
		faster();
	};
	var nextCost = Math.floor(10 * Math.pow(10,b1Upgrades));
	$("#b1UpgradeCost").html(nextCost);
	b1CPS = Math.round((1000 / b1Interval * 0.1) * 100) / 100;
	$("#b1sCPS").html(b1CPS);
});

//Hovering
$("#hoverUpgrade").click(function buyHoverUpgrade(){
	var hoverUpgradeCost = Math.floor(10 * Math.pow(1.1,hoverUpgrades));
	if(thingies >= hoverUpgradeCost){
		hoverUpgrades++;
		mouseOverInterval = mouseOverInterval / 1.005;
		thingies -= hoverUpgradeCost;
		$("#hoverUpgrades").html(hoverUpgrades);
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,hoverUpgrades));
	$("#hoverUpgradeCost").html(nextCost);
	$("#thingies").html = (thingies);
	if (hoverUpgrades === 1){
		$("#mainButton").mouseover(function hoverClicker(){
			clicking = setInterval(function() {
				thingyClick(thingyClicks * thingyClicksMultiplier);
				moving(thingyClicks);
				}, mouseOverInterval);
			$("#mainButton").mouseout(function hoverClicker(){
				clearInterval(clicking);
			});
		});
	};
});

// "Achievements"
function clickAchievement(){
	if (numberOfClicks === 2){
		thingyClicksMultiplier += 1;
		$("#achieved").html("YES");
		$("#hoverUpgrade").removeClass("invisible");
		$("#achieved2").html("YES");
		$("#b1").removeClass("invisible");
		$("#achieved3").html("YES");
		$("#b1Upgrade").removeClass("invisible");
	}
};


});
