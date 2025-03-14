import puppeteer from 'puppeteer';

/**
 * Fetches the latest Instagram post caption and image URL.
 * @param {string} username - The Instagram username to scrape.
 * @returns {Promise<{ caption: string, imageUrl: string }>} - Latest post details.
 */
async function fetchLatestInstagramPost(username) {
    const url = `https://www.instagram.com/${username}/`;
    let browser;

    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Set headers and user-agent to mimic real users
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
        );
        await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

        // Handle unexpected errors like "Something went wrong" pages
        page.on('response', async (response) => {
            if (response.status() === 401) {
                console.error('Error 401: Unauthorized - Instagram may be blocking access.');
                throw new Error('Error 401: Unauthorized - Instagram may be blocking access. Try using a session-based approach.');
            }
            if (response.status() >= 400) {
                console.error(`HTTP Error: ${response.status()} - ${response.statusText()}`);
            }
        });

        await page.goto(url, { waitUntil: 'networkidle2' }).catch(() => {
            throw new Error('Failed to load Instagram page. Check your internet connection or Instagram availability.');
        });

        // Check for errors or private accounts
        const pageContent = await page.evaluate(() => document.body.innerText);
        if (pageContent.includes("Sorry, this page isn't available.") || pageContent.includes("The link you followed may be broken")) {
            throw new Error('User not found or account is private.');
        }
        if (pageContent.includes("Something went wrong")) {
            throw new Error('Instagram is temporarily unavailable.');
        }

        // Detect login page (if required)
        const loginDetected = await page.evaluate(() => {
            return document.body.innerText.includes('Log in to Instagram');
        });
        if (loginDetected) {
            throw new Error('Instagram requires login. Try using a session-based approach.');
        }

        // Wait for the latest post to load
        await page.waitForSelector('article div img', { timeout: 5000 }).catch(() => {
            throw new Error('Could not find any posts. The account may be private.');
        });

        // Extract the latest post's image and caption
        const postData = await page.evaluate(() => {
            const imgElement = document.querySelector('article div img');
            const captionElement = document.querySelector('article span');

            return {
                imageUrl: imgElement ? imgElement.src : null,
                caption: captionElement ? captionElement.innerText : 'No caption available'
            };
        });

        if (!postData.imageUrl) {
            throw new Error('Could not fetch image URL.');
        }

        return postData;
    } catch (error) {
        console.error('Error fetching Instagram post:', error.message);
        return { error: error.message };
    }
}

export default fetchLatestInstagramPost;
