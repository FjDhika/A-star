const start = [ ["5", "1", "3","4"], ["2", "", "7","8"],
				 ["9", "6", "10","12"], ["13","14","11","15"] ];

const end = [ ["1", "2", "3","4"], ["5", "6", "7","8"],
				 ["9", "10", "11","12"], ["13","14","15",""] ];

let ul = document.querySelectorAll('li');
var time = 155;

function setup(){
	setId(ul);
	fillGrid(ul,start);
	setClass(ul);

}

function main(){

	path = bstar(start,end);
	console.log(path);

	if(path != null){
		console.log("Following path start");
		replay(path,time);
		console.log("Following path done");
	}else{
		console.log("NULL")
	}
}

function timer(ms) {
 return new Promise(res => setTimeout(res, ms));
}

async function load () {
  for (var i = 0; i < 3; i++) {
    console.log(i);
    await timer(3000);
  }
}

const setId = (items) => {
    for(let i = 0; i < items.length; i++) {
        items[i].setAttribute("id", `li${i}`)
    }
}

const setClass = (items) =>{
	for(let i = 0; i<items.length; i++){
		if(items[i].textContent == ""){
			items[i].setAttribute("class","empty");
		}else{
			items[i].setAttribute("class","");
		}
	}
}

const fillGrid = (items, letters) => {
    items.forEach((item, i) => {
    	var a=parseInt(i/4);
        item.innerText = letters[a][i-(a*4)];
    })
}

async function replay(path,time){
	for(item in path){
		fillGrid(ul,path[item]);
		setClass(ul);
		console.log(path[item]);
		await timer(time);
	}
}