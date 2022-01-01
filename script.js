// JavaScript Document
//"no-console":0
//"no-console": "off"
let order = [];
let playerOrder =[];
let flash;
let turn;
let good;
let compTurn;
let intervalID;
let strict = false;
let noise = true ;
let on = false;
let win;


const turnCounter = document.querySelector("#level");//put this id into this const variable 
const boxOne = document.querySelector("#one");
const Panel = document.querySelector("#panelDiv");
const boxTwo = document.querySelector("#two");
const boxThree = document.querySelector("#three");
const boxFour = document.querySelector("#four");
const strictButtom = document.querySelector("#strict");
const startButtom = document.querySelector("#start");
const onButtom = document.querySelector("#on");

//game code 
strictButtom.addEventListener('click', (event)=>{
	if ( strict.checked == true){
		strict = true;
	} else{
		strict = false;
	}
});

onButtom.addEventListener('click',(event)=>{
	
	if ( onButtom.checked == true){
		on = true;
		turnCounter.innerHTML = "0";
		addHover();
		panelOn();
		//put a dash on turn counter 
		
	}else{
		on = false;
		turnCounter.innerHTML = "";
		clearColor();
		panelOff();
		delHover();
		clearInterval(intervalID);
	}
	
});

function panelOn(){
	Panel.classList.add("panelOn");
}

function panelOff(){
	Panel.classList.remove("panelOn");
}

function addHover(){
	boxOne.classList.add("mouse");
	boxTwo.classList.add("mouse");
	boxThree.classList.add("mouse");
	boxFour.classList.add("mouse");
}


function delHover(){
	boxOne.classList.remove("mouse");
	boxTwo.classList.remove("mouse");
	boxThree.classList.remove("mouse");
	boxFour.classList.remove("mouse");
}

startButtom.addEventListener('click',(event)=>{
	if ( on || win){
		play();
		
	}
	
});

function play(){
	
	win = false;
	order =[];
	playerOrder=[];
	flash = 0;
	intervalID = 0 ;
	turn = 1;
	turnCounter.innerHTML = 1;
	good = true;//everything is correct 
	for ( var i = 0 ; i < 20 ; i++){
		order.push(Math.floor(Math.random()*4)+1);// ramdon number between 1 - 4 and fill the array
		
	}
	compTurn= true;
	
	intervalID = setInterval(gameLevel, 640);// runs gameLevel every 800 ml
	
}

function gameLevel(){
	on = false;
	
	if ( flash == turn){
		clearInterval(intervalID);
		addHover();
		compTurn = false;
		clearColor();
		on = true;
	}
	
	if ( compTurn){
		clearColor();
		delHover();
		setTimeout(()=>{
			if ( order[flash] == 1) one();	
			if ( order[flash] == 2) two();
			if ( order[flash] == 3) three();
			if ( order[flash] == 4) four();
			flash++;
		}, 160)// all the above happens after 200 ml  
	}
}

function one(){
	if (noise){
		let audio = document.getElementById("clip1");
		audio.play();
	}
	
	noise = true;
	boxOne.classList.add("zoom");
	boxOne.classList.add("innerShadow1");
	
}

function two(){
	if (noise){
		let audio = document.getElementById("clip2");
		audio.play();
	}
	
	noise = true;
	boxTwo.classList.add("zoom");
	boxTwo.classList.add("innerShadow1");
	
}

function three(){
	if (noise){
		let audio = document.getElementById("clip3");
		audio.play();
	}
	
	noise = true;
	
	boxThree.classList.add("zoom");
	boxThree.classList.add("innerShadow1");
}

function four(){
	if (noise){
		let audio = document.getElementById("clip4");
		audio.play();
	}
	
	noise = true;
	boxFour.classList.add("zoom");
	boxFour.classList.add("innerShadow1");
}

function clearColor(){
//	boxOne.style.backgroundColor= "darkgreen";
//	boxTwo.style.backgroundColor= "darkred";
//	boxThree.style.backgroundColor= "goldenrod";
//	boxFour.style.backgroundColor= "darkblue";
	boxOne.classList.remove("innerShadow1");
	boxTwo.classList.remove("innerShadow1");
	boxThree.classList.remove("innerShadow1");
	boxFour.classList.remove("innerShadow1");

}

function flashColor(){
//	boxOne.style.backgroundColor= "green";
//	boxTwo.style.backgroundColor= "tomato";
//	boxThree.style.backgroundColor= "yellow";
//	boxFour.style.backgroundColor= "skyblue";
	boxOne.classList.add("innerShadow1");
	boxTwo.classList.add("innerShadow1");
	boxThree.classList.add("innerShadow1");
	boxFour.classList.add("innerShadow1");
}
boxOne.addEventListener('click', (event)=> {
	if (on){
		playerOrder.push(1);
		check();
		one();
		if (!win){
			setTimeout(()=> {
				clearColor();
			}, 240);//clear after 300 ml
		}
	}
})

boxTwo.addEventListener('click', (event)=> {
	if (on){
		playerOrder.push(2);
		check();
		two();
		if (!win){
			setTimeout(()=> {
				clearColor();
			}, 240);//clear after 300 ml
		}
	}
})

boxThree.addEventListener('click', (event)=> {
	if (on){
		playerOrder.push(3);	
		check();
		three();
		if (!win){
			setTimeout(()=> {
				clearColor();
			}, 240);//clear after 300 ml
		}
	}
})

boxFour.addEventListener('click', (event)=> {
	if (on){
		playerOrder.push(4);
		check();
		four();
		if (!win){
			setTimeout(()=> {
				clearColor();
			}, 240);//clear after 300 ml
		}
	}
})

function check(){
	if (playerOrder[playerOrder.length -1]!== order[playerOrder.length -1]) good = false;
	
	if ( playerOrder.length == 20 && good){
		winGame();
	}
	
	if (good == false){
		flashColor();
		turnCounter.innerHTML = "NO!";
		setTimeout(() => {
			turnCounter.innerHTML = turn;
			clearColor();
			
			if(strictButtom.checked == true){
				play();
			}
			else{
				compTurn = true;
				flash = 0;
				playerOrder =[];
				good = true;
				intervalID =setInterval(gameLevel, 640);
			}
		},640);
		
		noise = false;
		
	}
	
	if ( turn == playerOrder.length && good && !win){
		turn++;
		playerOrder=[];
		compTurn = true;
		flash = 0 ;
		turnCounter.innerHTML = turn;
		intervalID = setInterval(gameLevel, 640);
	}
}

function winGame(){
	flashColor();
	turnCounter.innerHTML = "WIN!";
	on = false;
	win = true;
}
