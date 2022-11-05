
import express from 'express';
import cors from 'cors';

const app = express(); //armazeno servidor na variavel app
app.use(cors());//permito a conexao com os dados
//nao entendi direito o cors

//express é uma biblioteca/framework que permite receber requisicao https e responder essa requisicao
//
//App servidor dá informações pro front buscando da base de dados
//App que busca informacao na base da dados, fazer através do Node
//Vamos fazer através de express pra não ficar verboso

//ligando servidor


app.listen(4000,(e)=>{console.log("servidor rodando na porta 4000")});
//escute uma porta app... de 3000-4000


        const receitas = [
                {
        id:1,
        nome:"doce de leite",
        ingredientes:"leite condensado, leite..."},

        {
        id:2,
        nome:"doce de leite2 do bom",
        ingredientes:"leite condensado, leite..."},

        ];




//deixa o app receber requisicoes app
app.get("/receitas",(request, response)=>{
	response.send(receitas);
});
app.get("/receitas/:id",(request, response)=>{	
	const id = Number(request.params.id);
	console.log("id",id

	const receita = receitas.find((objeto)=> objeto.id === id);
        response.send(receita);
});



