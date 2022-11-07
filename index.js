
import express from "express";
import cors from 'cors';


const user = [{
	username: 'bobesponja',
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
}];

const tweet = [
	{
		username: "bobesponja", 
		tweet: "eu amo o hub"
	}];

const app = express();
app.use(express.json());
app.use(cors());//acessa local host do arquivo html

app.post("/sign-up", (req, res) => {
	if (req.body.username && req.body.avatar) {
		user.push(req.body);
		//console.log("sign up objeto", req.body);
		//console.log("*******************");
		//console.log(user);
		/* res.status(201).send("OK, sign-up feito!"); */
		res.send("OK");
	} else {
		res.status(400).send("Todos os campos são obrigatórios!");
	}
});

app.post("/tweets", (req, res) => {
	const user = req.headers.user; // com U minúsculo mesmo!
	//pegar o body e colocar no array tweet
	//console.log("REQUISICAO body", req.body);
	if (req.body.tweet !== ""){
		const objetoTweet = {
			username: user,
			tweet: req.body.tweet
		}
		tweet.unshift(objetoTweet);
		/* tweet.push(req.body); */
		res.status(201).send("OK, tweets salvos");
	} else {
		res.status(400).send("Todos os campos são obrigatórios!");
	}
});

function findAvatar(username, user) {

	console.log("esse eh meu user findAvatar", user);

	const myUser = user.find((user) => username === user.username);
	console.log("MY fucking USER", myUser);
	console.log("MY fucking USER.avatar", myUser.avatar);

	/* 	if(myUser){ */
	return myUser.avatar;
	/* 	} */
	/* return ""; */
}

app.get("/tweets", (req, res) => {
	const pageNumber = parseInt(req.query.page);
	console.log("Valor de pageNumber interno", pageNumber);

	//1:0-9; 2:10-19; 3: 20-29; 4: 30-39
	const primeiroTweet = (pageNumber*10) - 10;
	const ultimoTweet = (pageNumber*10) - 1;

	console.log("primeiroTweet", primeiroTweet);
	console.log("ultimoTweet", ultimoTweet);
	//	let qtddTweets = tweet.length;
	console.log("Olá eu sou o GET e vou printar os users: ", user);

	/* 	 	const ultimosDezTweets = tweet.filter((twt, i) => {
				if (i < 10) {
					return {
						username: twt.username,
						tweet: twt.tweet,
						avatar: findAvatar(twt.username, user) 
					};
				}
			}) */

	let ultimosDezTweets = [];

	for (let i = primeiroTweet; i <= ultimoTweet; i++) {
		if (i < tweet.length) {
			ultimosDezTweets.push(
				{
					username: tweet[i].username,
					tweet: tweet[i].tweet,
					avatar: findAvatar(tweet[i].username, user)
				}
			)
		} else {
			i = ultimoTweet;
		}
	}

	console.log("array com ultimos 10 tweets", ultimosDezTweets);
	res.send(ultimosDezTweets);
})




app.get("/tweets/:username", (req, res) => {
	const username_id = req.params.username;
	//	let qtddTweets = tweet.length;
	//console.log("Olá eu sou o GET e vou printar os users: ", user);

	const userPosts = tweet.filter((tweet)=> tweet.username ===  username_id);
	res.send(userPosts);
})




app.listen(5000, (e) => {
	console.log("Conectou servidor!");
});


