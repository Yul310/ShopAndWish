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


  // Run any database queries in this function
//   const startFruits = [
//     { name: "Orange", color: "orange", readyToEat: false },
//     { name: "Grape", color: "purple", readyToEat: false },
//     { name: "Banana", color: "orange", readyToEat: false },
//     { name: "Strawberry", color: "red", readyToEat: false },
//     { name: "Coconut", color: "brown", readyToEat: false },
//   ];

 
  Product.deleteMany({});
    // fetch(`https://fakestoreapi.com/products`)
    // const requestURL = `https://api.rainforestapi.com/request?api_key=${process.env.AMAZON_BEST_API_KEY}&type=bestsellers&url=https://www.amazon.com/s/zgbs/pc/516866`
    const requestApplianceURL = `https://api.rainforestapi.com/request?api_key=${process.env.AMAZON_BEST_API_KEY}&type=bestsellers&amazon_domain=amazon.com&category_id=bestsellers_appliances`
    fetch(requestApplianceURL)
    .then((apiResponse) => {
      return apiResponse.json()
      .then((jsonData) => {
        // for(i=0;i<jsonData.bestsellers.length;i++)
        //        { Product.create(jsonData.bestsellers[i])}
                const amazonData =jsonData.bestsellers;
                for(i=0;i<amazonData.length;i++){
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

