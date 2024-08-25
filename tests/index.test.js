const { chromium } = require("playwright");
const sortHackerNewsArticles = require("../index"); // Assuming your function is exported from index.js

test("Validate that the first 100 Hacker News articles are sorted by date", async () => {
	const result = await sortHackerNewsArticles();
	expect(result).toBe(true);
});
