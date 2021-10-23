const express = require('express');
//const request = require('request');
const axios = require('axios')

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = '3ce35a11909b4ae05ec72636a71a02cf';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
const apiUrl = `http://api.scraperapi.com`;
const amazonUrl = `https://www.amazon.com`

const generateUrl = (apiUrl,apiKey)=>{`${apiUrl}=${apiKey}&autoparse=true`}


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.')
});
/*
// Get Product Details
app.get('/products/:productId', async(req, res)=> {
    const {productId} = req.params;

    try{
        const response = await request(`${baseUrl}&url=${amazonUrl}/dp/${productId}`)
        res.json(response)

    }catch (error){
        res.json(error)
    }
})
*/
// Get Product Details
app.get('/products/:productId', async(req, res)=> {
    const {productId} = req.params;
    const productRequested = `${baseUrl}&url=${amazonUrl}/dp/${productId}`

    axios.get(productRequested)
      .then(response => {
        const html = response.data

        res.json(html)

      }).catch((err)=> console.log(err))
})

// Get Product reviews
app.get('/products/:productId/reviews', async(req, res)=> {
    const {productId} = req.params;
    const productReviews = `${baseUrl}&url=${amazonUrl}/product-reviews/${productId}`

    axios.get(productReviews)
      .then(response => {
        const html = response.data

        res.json(html)

      }).catch((err)=> console.log(err))

})
// Get Product Product offers
app.get('/products/:productId/offers', async(req, res)=> {
    const {productId} = req.params;
    const productOffers = `${baseUrl}&url=${amazonUrl}/gp/offer-listing/${productId}`

    axios.get(productOffers)
      .then(response => {
        const html = response.data

        res.json(html)

      }).catch((err)=> console.log(err))


})

// Get search results
app.get('/search/:searchQuery', async(req, res)=> {
    const {searchQuery} = req.params;
    const findProduct = `${baseUrl}&url=${amazonUrl}/?sk=${searchQuery}`

    axios.get(findProduct)
      .then(response => {
        const html = response.data

        res.json(html)

      }).catch((err)=> console.log(err))

})
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
