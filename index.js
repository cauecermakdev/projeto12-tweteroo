
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
	user.push(req.body);
	console.log("sign up objeto", req.body);
	console.log("*******************");
	console.log(user);
	res.send("OK");
});

app.post("/tweets", (req, res) => {
	//pegar o body e colocar no array tweet
	console.log("REQUISICAO body", req.body);
	tweet.push(req.body);
	res.send("OK, tweets salvos");
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

	for (let i = 0; i < 10; i++) {
		if (i < tweet.length) {
			ultimosDezTweets.push(
				{
					username: tweet[i].username,
					tweet: tweet[i].tweet,
					avatar: findAvatar(tweet[i].username, user)
				}
			)
		} else {
			i = 10;
		}
	} 

	console.log("array com ultimos 10 tweets", ultimosDezTweets);
	res.send(ultimosDezTweets);
})

app.listen(5000, (e) => {
	console.log("Conectou servidor!");
});


