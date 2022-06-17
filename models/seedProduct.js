///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const express = require('express')
const Product = require('./product');
const db = mongoose.connection;
require('dotenv').config

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

db.on("open", (req,res) => {



 
  Product.deleteMany({});
    // fetch(`https://fakestoreapi.com/products`)
    // const requestURL = `https://api.rainforestapi.com/request?api_key=${process.env.AMAZON_BEST_API_KEY}&type=bestsellers&url=https://www.amazon.com/s/zgbs/pc/516866`
    const requestApplianceURL = `https://api.rainforestapi.com/request?api_key=${process.env.AMAZON_BEST_API_KEY}&type=bestsellers&amazon_domain=amazon.com&category_id=bestsellers_appliances`
    fetch(requestApplianceURL)
    .then((apiResponse) => {
      return apiResponse.json()
      .then((jsonData) => {
        // From the complicate Amazon API, I had to extract information I need and change the name of fields.
                const amazonData =jsonData.bestsellers;
                for(i=0;i<amazonData.length;i++){
                  //change the name of the fields
                  amazonData[i].description = amazonData[i].link;
                  amazonData[i].price =amazonData[i].price.value;
                  amazonData[i].category =amazonData[i].current_category.name
                  Product.create(amazonData[i])
                 }
                 
                console.log(Product);
                
            })
            .catch((error) => {
                      console.log(error);
                      db.close();
                    })
    })   
    
    






        })

