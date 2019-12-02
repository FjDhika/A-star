// //1.	Tetapkan L sebagai daftar node awal
// //2.	Misal n adalah node pertama pada L dimana f(n) yang minimal. Jika L kosong, maka pencarian gagal.
// //3.	Jika n adalah node goal, berhenti, dan kembalikan node tersebut beserta jalur/path yang dilalui 	dari node awal hingga node n
// //4. 	Jika n bukan node goal, hapus n dari L dan tambahkan semua anak-anak dari n ke dalam L. Beri label	jalur/path dari node awal menuju semua node anak. Kembali ke langkah 2
// const L = [["A", "B", "C"], ["D", "E", "F"], ["G", "", "H"]];
// const pohon = []

class node{

	constructor(state,parent,action){
		this.state = state;
		this.parent = parent;
		this.action = action;
		if (parent != null) {
			this.cost = parent.getCost()+1;
		}else{
			this.cost = 0;
		}
	}

	getAction(){ return this.action; }
	getCost(){ return this.cost; }
	getParent(){ return this.parent; }
	getState(){ return this.state; }
	getDepth(){ return this.depth; }

	getActions(){
		steps = new array(this.depth);
		for (var i = 0; i < this.depth; i++) {
			steps[i] = this.parent.getAction();
		}
		return steps;
	}
}