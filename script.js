const apiUrl = 'https://opentdb.com/api.php?amount=3&category=23&difficulty=medium';
console.log('1 Script started');

window.addEventListener('load', () => {
	console.log('2 Window load event');

	// skicka request till api-servern
	// ta hand om information vi får tillbaka
	// visa datan på webbsidan
	// förbättra design och CSS
	let bert = document.querySelector('#bert');
	bert.addEventListener('click', async e => {
		console.log('3 Clicked on Bert');
		// Alternativt sätt att använda fetch:
		// fetch(apiUrl).then(response => { })

		const response = await fetch(apiUrl);
		// the server returns a Promise (with a Response object)
		console.log('4 Got response from server', response);
		const data = await response.json();
		// The response contains a string in JSON format. To convert JSON we would normally type: let object = JSON.parse(string)
		// BUT response.json() is a Promise that does the parsing for us
		console.log('5 JSON data is: ', data);

		// data.results[]
		let allQuestions = data.results;
		let questionContainer = document.querySelector('#questionContainer');
		allQuestions.forEach(q => {
			let element = createQuestionDOM(q);
			questionContainer.appendChild(element);
		})
	})
});

function createQuestionDOM(question) {
	// { question, correct_answer, incorrect_answers }
	let questionElement = document.createElement('div');
	questionElement.className = 'question';
	// Alternativ: questionElement.classList

	let questionHeading = document.createElement('h2');
	questionHeading.innerText = question.question;
	questionElement.appendChild(questionHeading);

	// ... creates a copy of the list (spread operator)
	let options = [...question.incorrect_answers, question.correct_answer];
	// TODO: shuffle the array!!
	// Alternative: question.incorrect_answers.push(..)
	options.forEach(o => {
		let element = document.createElement('div');
		element.className = 'option';
		element.innerText = o;
		element.addEventListener('click', e => {
			console.log('You chose: ' + o);
			if( o === question.correct_answer ) {
				console.log('CORRECT!!');
			} else {
				console.log('Incorrect. Try again!');
			}
		})
		questionElement.appendChild(element);
	});

	return questionElement;
}







//
