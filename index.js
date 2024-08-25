const sortHackerNewsArticles = require("./playwright_tests/index");

async function testNewArticles() {
	const result = await sortHackerNewsArticles();
	if (result) {
		console.log("The newest 100 articles are sorted by date");
	} else {
		console.log(
			"The newest 100 articles are not sorted by date or an error occurred"
		);
	}
}

testNewArticles();
