const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
	// Launch browser
	// Using headless mode still tests out fine, but we dont need load the whole page, making the test faster
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext();
	const page = await context.newPage();

	// Go to Hacker News "newest" page
	await page.goto("https://news.ycombinator.com/newest");

	// Create a list to store articles on the website
	let articles = [];

	// Checks for the first 100 articles
	while (articles.length < 100) {
		await page.waitForSelector("span.age");

		// Timestamps of the current articles
		const newArticles = await page.$$eval("span.age", (elements) =>
			// Only want the title attribute
			elements.map((el) => el.getAttribute("title"))
		);

		// Combine article lists
		articles = articles.concat(newArticles);

		// If less than 100 articles, get more
		if (articles.length < 100) {
			await page.click("a.morelink");
		}
	}

	// We only want exactly 100 articles
	articles = articles.slice(0, 100);

	// Convert to usable Date objects
	const articleDates = articles.map((dateString) => new Date(dateString));

	// Check if sorted in date order
	const isDescending = checkDatesDescending(articleDates);

	// Close browser
	await browser.close();

	// Return the result for jest tests
	return articleDates.length === 100 && isDescending;
}

function checkDatesDescending(dates) {
	for (let i = 0; i < dates.length - 1; i++) {
		if (dates[i] < dates[i + 1]) {
			return false;
		}
	}
	return true;
}

module.exports = sortHackerNewsArticles;
