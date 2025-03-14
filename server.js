import express from 'express';
import fetchLatestInstagramPost from './instagramScrapper.js'; // Import Puppeteer function

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/latest-post', async (req, res) => {
    try {
        const username = req.query.username || 'bbcnews'; // Allow dynamic usernames
        const post = await fetchLatestInstagramPost(username);

        if (!post) {
            return res.status(500).json({ error: 'Failed to fetch Instagram post' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
