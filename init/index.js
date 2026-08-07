const mongoose= require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

const Mongo_Url="mongodb://127.0.0.1:27017/firstdb";

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
});
async function main(){
    await mongoose.connect(Mongo_Url);
}

const initDB= async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"6a585eb5171fe322a386b8aa",
    }));
    await Listing.insertMany(initData.data);    
    console.log("Database initialized with sample data");
};

initDB();
