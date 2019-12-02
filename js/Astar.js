class node{

	constructor(parent,position){
		this.parent = parent;
		this.position = position;
		this.g = 0;
		this.h = 0;
		this.f = 0;
	}

}

function astar(start,end){
	start_node = new node(null,start);
	end_node = new node(null,end);

	open_list = [];
	closed_list = [];

	open_list.push(start_node);

	// while(open_list.length > 0){
	for (var q = 0; q < 2; q++) {

		current_node = open_list[0];
		current_index = 0;

		i = 0;
		for(item in open_list){
			if(open_list[item].f < current_node.f){
				current_node = open_list[item];
				current_index = i;
			}
			i++;
		}
		open_list.splice(current_index,1);
		closed_list.push(current_node);

		if(JSON.stringify(current_node)==JSON.stringify(end_node)){
			path = [];
			current = current_node;
			while(current.length != 0){
				path.append(current.position);
				current = current.parent;
			}
			console.log("DONE!!!" + path);
			return path.reverse();
		}

		children = [];
		// console.log(current_node.position);
		generateChildren(current_node.position,children,current_node);
		for(child in children){

			for(closed_children in closed_list){
				if(JSON.stringify(children[child])==JSON.stringify(closed_children)){
					children.splice(child,1);
				}
			}

			children[child].g = current_node.g+1;
			children[child].f = children[child].g + children[child].h;

			for(open_node in open_list){
				if(children[child] == open_list[open_node] && children[child].g > open_list[open_node].g){
					continue;
				}
			}

			open_list.push(children[child]);
		}

		console.log(closed_list);
	}
}


function generateChildren(data,child,current_node){
	index = findIndex(data);

	if(index[0]-1 >= 0){
		a = swap(index,-1,0,data);
		newNode = new node(current_node,a);
		child.push(newNode);
	}
	if(index[0]+1 <= 2){
		a = swap(index,+1,0,data);
		newNode = new node(current_node,a);
		child.push(newNode);
	}
	if(index[1]-1 >= 0){
		a = swap(index,0,-1,data);
		newNode = new node(current_node,a);
		child.push(newNode);
	}
	if(index[1]+1 <= 2){
		a = swap(index,0,+1,data);
		newNode = new node(current_node,a);
		child.push(newNode);
	}
}

function findIndex(data){
	var i = 0;
	var index;
	var index2;
	data.forEach( j =>{
		if(j.indexOf("") != -1){
			index2 = j.indexOf("");
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


function main(){
	const start = [ ["A", "B", "C"], ["D", "E", "F"], ["G", "", "H"] ];
	const end = [ ["A", "B", "C"], ["D", "", "F"], ["G", "E", "H"] ];
	const hasil = [ ["A", "B", "C"], ["D", "", "F"], ["G", "E", "H"] ];

	// console.log(JSON.stringify(end)==JSON.stringify(hasil));
	// path = astar(start,end);
}