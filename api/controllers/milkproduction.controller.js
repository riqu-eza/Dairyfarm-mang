import Production from "../models/milkproduction.model.js";

export const create = async (req, res) => {
    console.log("Request Body:", req.body);
    const { milkProductionKilos } = req.body;
  
  
  
    try {
      const newItem = new Production({milkProductionKilos });
  
      const createdItem = await newItem.save();
  
      res.status(201).json({ message: 'Item created successfully', item: createdItem });
    } catch (error) {
      console.error('Error creating livestock:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };