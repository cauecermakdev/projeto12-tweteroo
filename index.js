
import express from "express"

const user =[];


const tweet =[  
	{
		username: "bobesponja",
		tweet: "eu amo o hub"
	}];

const app = express();	
app.use(express.json());


app.post("/sign-up",(req,res)=>{
	user.push(req.body);
	console.log("sign up objeto",req.body);
	console.log("*******************")
	console.log(user)
	res.send("OK");


});

app.post("/tweets",(req,res)=>{
	//pegar o body e colocar no array tweet
	console.log("REQUISICAO body",req.body);
	tweet.push(req.body);
	res.send("OK, tweets salvos");
});

app.get("/tweets",(req,res)=>{
//	let qtddTweets = tweet.length;

	const ultimosDezTweets = tweet.filter((twt,i)=>{
		if(i < 10) {
			return twt;
		}
	})
	console.log("array com ultimos 10 tweets",ultimosDezTweets);
	res.send(ultimosDezTweets);
	
})

app.listen(5000,(e)=>{
	console.log("Conectou servidor!");
});


