import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['forage', 'silage', 'hay', 'concentrates', 'byProducts', 'specialtyFeeds', 'waterSupply', 'feedAdditives']
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    nutritionalContent: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const FoodSupply = mongoose.model("FoodSupply", foodSchema);

export default FoodSupply;
