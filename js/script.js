let ul = document.querySelectorAll('li');
const letters= [ ["1", "2", "3","4"], ["5", "6", "7","8"],
				 ["9", "10", "11","12"], ["13","14","15",""] ];

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

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        move("kiri");
    }
    else if(event.keyCode == 39) {
        move("kanan");
    }else if(event.keyCode == 38){
    	move("atas");
    }else if (event.keyCode == 40) {
    	move("bawah");
    }
    setClass(ul);
});

function setup() {
	setId(ul);
	fillGrid(ul, letters);	
}

function findIndex(){
	var i = 0;
	var index;
	var index2;
	letters.forEach( j =>{
		if(j.indexOf("") != -1){
			index2 = j.indexOf("");
			index = i;
		}
		i++;
	})
	return [index, index2];
}

function move(arah){
	index = findIndex();
	switch (arah){
		case "atas":
			atas(); break;
		case "bawah":
			bawah(); break;
		case "kiri":
			kiri(); break;
		case "kanan":
			kanan(); break;
	}

}

function atas(){
	index = findIndex();
	if(index[0]-1 >= 0){
		swap(index,-1,0);
		fillGrid(ul,letters);
	}
}

function bawah(){
	index = findIndex();
	if(index[0]+1 <= 3){
		swap(index,+1,0);
		fillGrid(ul,letters);
	}
}

function kiri(){
	index = findIndex();
	if(index[1]-1 >= 0){
		swap(index,0,-1);
		fillGrid(ul,letters);
	}
}

function kanan(){
	index = findIndex();
	if(index[1]+1 <= 3){
		swap(index,0,+1);
		fillGrid(ul,letters);
	}
}

function swap(index,att1,att2){
	temp = letters[index[0]+att1][index[1]+att2];
	letters[index[0]+att1][index[1]+att2] = letters[index[0]][index[1]];
	letters[index[0]][index[1]] = temp;
}