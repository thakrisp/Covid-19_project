/* if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} */

const express = require('express')
const app = express();
const axios = require('axios');
const _ = require('lodash');
//const flatted = require('flatted');

app.use(express.json());
app.use(express.static('public'));

//https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#00030720-fae3-4c72-8aea-ad01ba17adf8
app.get('/countries', (req, res) => {
    const url = `https://api.covid19api.com/summary`

    axios({
        url: url,
        responseType: 'json'
    }).then((response)=>{
        let json = (response.data);
        res.send(json);
      }).catch((error)=>{
        console.log(error);
      });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});