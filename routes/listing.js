
const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../model/listing.js");
const {isloggedIn,isOwner,validateListing}=require("../middleware.js");
const listingcontroller= require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({storage});



 router.route("/")
 .get(wrapAsync(listingcontroller.index)
)
.post(isloggedIn, upload.single("listing[image][file]"),validateListing,wrapAsync(listingcontroller.createListing)
    );



    //new route
router.get("/new",isloggedIn,wrapAsync(listingcontroller.renderNewForm)
);


router.route("/:id")
.get(isloggedIn,wrapAsync(listingcontroller.showListing)
)
.put(isloggedIn,isOwner, upload.single("listing[image][file]"),validateListing,wrapAsync(listingcontroller.updateListing)
)
.delete(isloggedIn,isOwner,wrapAsync(listingcontroller.destroyListing)
);

//edit route
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync(listingcontroller.renderEditForm)
);

module.exports=router;