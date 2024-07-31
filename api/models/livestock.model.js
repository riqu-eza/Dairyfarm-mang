import mongoose from "mongoose";

const LivestockSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    Breed:{
        type: String,
        required: true,
    },
    age:{
        type: Date,
        required: true,
    },
    healthStatus:{
        type: String,
        required: true,
    }
});

const Livestock = mongoose.model("Livestock", LivestockSchema);

export default Livestock;