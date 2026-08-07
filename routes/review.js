const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review = require("../model/Review.js");
const Listing = require("../model/listing.js");
const {validateReview, isloggedIn,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");



//review route
//post route for reviews
router.post("/",isloggedIn,validateReview,wrapAsync(reviewController.createReview)
);

//delete route for reviews
router.delete("/:reviewId",isloggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview)
);





module.exports=router;