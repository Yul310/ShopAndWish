/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

require("dotenv").config();
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("./models/connection")

const path = require("path")
const Product = require('./models/product');
//Router
const ProductRouter = require("./controllers/products")

// const weatherAlarmRouter = require("./controller/weatherAlarms")


/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), { root: [path.resolve(__dirname, 'views/')] })

const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
app.use("/products",ProductRouter)
// app.use("/seed",SeedRouter)

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT}`)
    //   routesReport.print()
});





app.get("/seed", (req, res) => {
    // let weatherOne = '3d66e1f26639f92a66448326e8180ace'
    // fetch(`https://api.rainforestapi.com/request?api_key=5064CEDE565549D494603E50C5675DB1&type=product&amazon_domain=amazon.com&asin=B073JYC4XM&output=json&device=desktop&language=en_US&customer_location=gb?limit=20`).then(
    fetch(`https://fakestoreapi.com/products`).then(
        
        (response) => {

            response.json().then((data) => {

                res.send(data)
                console.log(data.results);

            })
        }

    )
})
