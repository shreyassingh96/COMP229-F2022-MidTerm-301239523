// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the product model
let product = require("../models/products");

/* GET products List page. READ */
router.get("/", (req, res, next) => {
  // find all products in the products collection
  product.find((err, products) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("products/index", {
        title: "Products",
        products: products,
      });
    }
  });
});

//  GET the Product Details page in order to add a new Product
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   res.render("products/details", {
    title: "Product list",
    products: "",
  }); 
});

// POST process the Product Details page and create a new Product - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   const {Productid, Productname, Description, Price} = req.body; // Extrapolating data from req.body

   const newProduct = new product({
    Productid,
    Productname,
    Description,
    Price,
   });
 
   product.create(newProduct, (err, product) => {
     if (err) res.end(err);
     else res.redirect("/products");
   });
});

// GET the Product Details page in order to edit an existing Product
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id;
   product.findById(id, (err, productToEdit) => {
     if (err) res.end(err);
     else {
       res.render("products/details", {
         title: "Product list",
         products: productToEdit,
       });
     }
   });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id;
   const {Productid, Productname, Description, Price} = req.body;
 
   const updatedProduct = new product({
     _id: id,
     Productid,
     Productname,
     Description,
     Price,
   });
   product.updateOne({_id: id}, updatedProduct, (err) => {
     if (err) {
       res.end(err);
     } else {
       res.redirect("/products");
     }
   });
 });


// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id;
   product.deleteOne({_id: id}, (err) => {
     if (err) res.end(err);
     else res.redirect("/products");
   });
});

module.exports = router;
