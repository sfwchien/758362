const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const allowedOrigins = ['https://your-ladipage-url.com'];
app.use(cors({
    origin: allowedOrigins
}));


const app = express();
const PORT = process.env.PORT || 3000; // Lấy cổng từ môi trường hoặc dùng cổng 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Cho phép tất cả các domain truy cập server
app.use(cors());

// URL của trang Chợ Tốt
const CHOTOT_URL = 'https://www.chotot.com/mua-ban-dien-thoai';

// API để crawl hình ảnh
app.get('/api/images', async(req, res) => {
    try {
        const response = await axios.get(CHOTOT_URL);
        const html = response.data;
        const $ = cheerio.load(html);

        const images = [];
        $('img').each((index, element) => {
            const imgSrc = $(element).attr('src');
            if (imgSrc && imgSrc.startsWith('http')) {
                images.push(imgSrc);
            }
        });

        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Error fetching images');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});