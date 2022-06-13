///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Product = require('./product');
const db = mongoose.connection;


///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

db.on("open", () => {


  // Run any database queries in this function
//   const startFruits = [
//     { name: "Orange", color: "orange", readyToEat: false },
//     { name: "Grape", color: "purple", readyToEat: false },
//     { name: "Banana", color: "orange", readyToEat: false },
//     { name: "Strawberry", color: "red", readyToEat: false },
//     { name: "Coconut", color: "brown", readyToEat: false },
//   ];

 
  Product.deleteMany({});
    fetch(`https://fakestoreapi.com/products`)
    .then((data) => {
           data.json().then((json) => {
                Product.create(json)
                console.log(json);
                
            })
  
            .catch((error) => {
                      console.log(error);
                      db.close();
                    })
    })      


        })


        // app.get("/seed", (req, res) => {
   
        //     fetch(`https://fakestoreapi.com/products`)
        //     .then((response) => {
        //             response.json().then((data) => {
        //                 Product.create(data)
        //                 console.log(data);
        //                 res.send(data)
                       
        //             })
          
        //             .catch((error) => {
        //                       console.log(error);
        //                       db.close();
        //                     })
        //     })      
        
        
        //         })




//   Fruit.deleteMany({})
//     .then((deletedFruits) => {
//       // add the starter fruits
//       Fruit.create(startFruits)
//         .then((newFruits) => {
//           // log the new fruits to confirm their creation
//           console.log(newFruits);
//           db.close();
//         })
//         .catch((error) => {
//           console.log(error);
//           db.close();
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//       db.close();
//     });

 
// });