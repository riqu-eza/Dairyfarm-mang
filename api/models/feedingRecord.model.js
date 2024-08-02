import mongoose from 'mongoose';

const feedingRecordSchema = new mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    quantityFed: { type: Number, required: true },
    feedDate: { type: Date, required: true },
});

const FeedingRecord = mongoose.model('FeedingRecord', feedingRecordSchema);


export default FeedingRecord;
