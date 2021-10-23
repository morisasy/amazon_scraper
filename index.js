const express = require('express');
//const request = require('request');
const axios = require('axios')

const app = express();
const PORT = process.env.PORT || 5000;


//const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}`;
const apiUrl = `http://api.scraperapi.com`;
const amazonUrl = `https://www.amazon.com`

//const generateUrl = (apiUrl,apiKey)=>{`${apiUrl}=${apiKey}&autoparse=true`}
const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.')
});

// Get Product Details
app.get('/products/:productId', async(req, res)=> {
    const {productId} = req.params;
    const {api_key} = req.query;
    const productRequested = `${generateScraperUrl(api_key)}&url=${amazonUrl}/dp/${productId}`

    axios.get(productRequested)
      .then(response => {
        const html = response.data

        res.json(html)

      }).catch((err)=> console.log(err))
})

// Get Product reviews
app.get('/products/:productId/reviews', async(req, res)=> {
    const {productId} = req.params;
    const {api_key} = req.query;
    const productReviews = `${generateScraperUrl(api_key)}&url=${amazonUrl}/product-reviews/${productId}`

    axios.get(productReviews)
      .then(response => {
        const html = response.data

        res.json(html)

      }).catch((err)=> console.log(err))

})
// Get Product offers
app.get('/products/:productId/offers', async(req, res)=> {
    const {productId} = req.params;
    const {api_key} = req.query;
    const productOffers = `${generateScraperUrl(api_key)}&url=${amazonUrl}/gp/offer-listing/${productId}`

    axios.get(productOffers)
      .then(response => {
        const html = response.data

        res.json(html)

      }).catch((err)=> console.log(err))


})

// Get search results
app.get('/search/:searchQuery', async(req, res)=> {
    const {searchQuery} = req.params;
    const {api_key} = req.query;
    const findProduct = `${generateScraperUrl(api_key)}&url=${amazonUrl}/s?k=${searchQuery}`

    axios.get(findProduct)
      .then(response => {
        const html = response.data

        res.json(html)

      }).catch((err)=> console.log(err))

})
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
