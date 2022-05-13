const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = 8000

const app = express()

app.get('/', (req, res) => {
    res.json('Welcome to News24 Soccer API')
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))







