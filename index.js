const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = 8000

const app = express()

const newspapers = [
    {
        name: 'thegaurdian',
        address: 'https://www.theguardian.com/football'
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/sport/football'
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/football/'
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.com/sport/football'
    },
    {
        name: 'standard',
        address: 'https://www.standard.co.uk/sport/football'
    },
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk/sport/football/'
    }
  
]

const articles = []

// Function to Loop through array of newspapers
newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("Liverpool")', html).each(function () {
          const title = $(this).text()
          const url = $(this).attr('href')

          articles.push({
              title,
              url,
              source: newspaper.name
          })

        })

    })
})

app.get('/', (req, res) => {
    res.json('Welcome to News24 Soccer API')
})

app.get('/football', (req, res) => {
   res.json(articles)
})

app.get('/football/:newspaperId',(req, res) => {
   const newspaperId = req.params.newspaperId

   const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address

  axios.get(newspaperAddress)
  .then(response => {
      const html = response.data
      const $ = cheerio.load(html)
      const specificArticles = []

      $('a:contains("Liverpool")', html).each(function () {
          const title = $(this).text()
          const url = $(this).attr('href')
          specificArticles.push({
              title,
              url,
              source: newspaperId
          })
      })
      res.json(specificArticles)
  }).catch(err => console.log(err))


})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))







