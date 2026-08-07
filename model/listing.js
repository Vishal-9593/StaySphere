const mongoose=require("mongoose");
const schema=mongoose.Schema;
const Review=require("./Review.js");
const { ref } = require("joi");

const listingSchema=new schema({
    title:{
        type: String,
        required:true,
    },
   description: {
    type: String,
    required: true,
},
    image: {
       
        filename: String,
        url: String,  
},
    price: {
    type: Number,
    required: true,
    min: 0
},
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type:schema.Types.ObjectId,
            ref:"Review",
          
        },
    ],
    owner:{
       type:schema.Types.ObjectId,
       ref:"User",
    },
    geometry: {
     type: {
      type: String, 
      enum: ['Point'], 
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
    category: {
        type: String,
        enum: [
            "Trending",
            "Room",
            "Iconic Cities",
            "Mountain",
            "Castles",
            "Amazing Pools",
            "Camping",
            "Farm",
            "Arctic"
        ],
        default: "Trending",
    },
});

listingSchema.post("findOneAndDelete", async  (listing)=> 
    {
        if(listing){
            await Review.deleteMany({
                _id: {
                    $in: listing.reviews}});
 }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;  