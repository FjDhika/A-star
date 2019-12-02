class node{

	constructor(parent,position){
		this.parent = parent;
		this.position = position;
		this.g = 0;
		this.h = 0;
		this.f = 0;
	}

}

function bstar(start,end){
	start_node = new node(null,start);
	end_node = new node(null,end);

	open_list = [];
	closed_list = [];

	open_list.push(start_node);
	g=1;

	while(open_list.length > 0){

		console.log("Loading...");
		ind = findMin(open_list);

		current_node = open_list[ind];

		if(JSON.stringify(current_node.position) == JSON.stringify(end_node.position)){
			path = [];
			while(current_node.parent != null){
				path.push(current_node.position);
				current_node = current_node.parent;
			}
			path.push(current_node.position);
			console.log("FINDING PATH DONE!");
			return path.reverse();
			break;
		}

		children=[];
		generateChildren(current_node.position,children,current_node);

		for (var i = children.length - 1; i >= 0; i--) {
			for( item in closed_list){
				if(JSON.stringify(children[i].position)==JSON.stringify(closed_list[item])){
					children.splice(i,1);
					// console.log("sama closed");
					break;
				}
			}
		}
		
		for (var i = children.length - 1; i >= 0; i--) {
			for( item in open_list){
				if(JSON.stringify(children[i].position)==JSON.stringify(open_list[item].position)){
					children.splice(i,1);
					break;
				}
			}
		}

		//TODO: hitung f,g,h;
		for(i in children){
			children[i].h = heuristic(children[i].position,end_node.position);
			children[i].g = g;
			children[i].f = children[i].h + children[i].g
		}

		closed_list.push(current_node.position);
		open_list.splice(ind,1);
		
		if(children.length > 0){
			open_list.unshift(...children);
		}

		g++;
	}

	return null;
}

function generateChildren(data,child,current_node){
	index = findIndex(data,"");
	
	if(index[1]-1 >= 0){
		a = swap(index,0,-1,data);
		newNode = new node(current_node,a);
		child.push(newNode);
	}
	if(index[1]+1 <= 3){
		a = swap(index,0,+1,data);
		newNode = new node(current_node,a);
		child.push(newNode);
	}
	if(index[0]-1 >= 0){
		a = swap(index,-1,0,data);
		newNode = new node(current_node,a);
		child.push(newNode);
	}
	if(index[0]+1 <= 3){
		a = swap(index,+1,0,data);
		newNode = new node(current_node,a);
		child.push(newNode);
	}
}

function findIndex(data,value){
	var i = 0;
	var index;
	var index2;
	data.forEach( j =>{
		if(j.indexOf(value) != -1){
			index2 = j.indexOf(value);
			index = i;
		}
		i++;
	})
	return [index, index2];
}

function swap(index,att1,att2,data){
	array = JSON.parse(JSON.stringify(data));
	temp = array[index[0]+att1][index[1]+att2];
	array[index[0]+att1][index[1]+att2] = array[index[0]][index[1]];
	array[index[0]][index[1]] = temp;

	return array;
}

function heuristic(dataNow,dataGoal){
	angka=["","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
	jmlh=0;
	for(h in angka){
		indexNow = findIndex(dataNow,angka[h]);
		indexGoal = findIndex(dataGoal,angka[h]);

		heu = Math.sqrt(Math.abs(indexNow[0]-indexGoal[0]) + Math.abs(indexNow[1]-indexNow[1]) );
		jmlh+=heu;
	}

	return jmlh;
}

function findMin(array){
	min = array[0].f;
	curr = 0;
	for(item in array){
		if(array[item].f < min){
			min = array[item].f;
			curr = item;
		}
	}
	return curr;
}
