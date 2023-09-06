const db = require("./db");

/*
function listarSalas() {
	return db.findAll("conversa");
}
*/

let listarSalas = async ()=>{
	let salas = await db.findAll("salas");
	return salas;
};

/* usando versão abaixo parabuscar o erro
let buscarSala = async (idsala)=>{
	return await db.findOne("salas",idsala);
}
*/

let buscarSala = async (idsala)=>{
	console.log("model id da sala: ",idsala);
	let sal = await db.findOne("salas",idsala);
	console.log("model findone: ",sal);
	return sal;
}

let atualizarMensagens=async (sala)=>{
	return await db.updateOne("salas",sala,{_id:sala._id});
}

let buscarMensagens = async (idsala, timestamp)=>{
	let sala = await buscarSala(idsala);
	if(sala.msgs){
		let msgs=[];
		sala.msgs.forEach((msg)=>{
			if(msg.timestamp >= timestamp){
				msgs.push(msg);
			}
		});
		return msgs;
	}
	return [];
}


module.exports = {listarSalas, buscarSala, atualizarMensagens, buscarMensagens}