import FeedingRecord from "../models/feedingRecord.model.js";
import FoodSupply from "../models/foodrecord.model.js";

export const getFoodSupply = async (req, res) => {
    try {
        const foodSupply = await FoodSupply.find();
        res.json(foodSupply);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching food supply records', error });
    }
};

export const createFoodSupplyRecord = async (req, res) => {
    const { type, description, quantity, nutritionalContent, cost } = req.body;

    const newRecord = new FoodSupply({
        type,
        description,
        quantity,
        nutritionalContent,
        cost,
    });

    try {
        await newRecord.save();
        res.status(201).json({ message: 'Record added successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error adding record', error });
    }
};

export const feedFoodSupply = async (req, res) => {
    const { type, description, quantityFed, feedDate } = req.body;

    try {
        // Find the record by type and description
        const record = await FoodSupply.findOne({ type, description });
        
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        // Deduct the quantity
        record.quantity -= quantityFed;
        record.lastFedDate = feedDate; // Update the last fed date
        await record.save();

        // Save feeding record
        const newFeedingRecord = new FeedingRecord({ type, description, quantityFed, feedDate });
        await newFeedingRecord.save();

        res.status(200).json({ message: 'Record updated successfully', record });
    } catch (error) {
        res.status(500).json({ message: 'Error updating record', error });
    }
};

export const getFeedingRecords = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const query = {};

        if (startDate && endDate) {
            query.feedDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const records = await FeedingRecord.find(query);
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feeding records', error });
    }
};