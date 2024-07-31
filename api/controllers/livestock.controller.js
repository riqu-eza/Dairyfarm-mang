import Livestock from "../models/livestock.model.js";

export const create = async (req, res) => {
    console.log("Request Body:", req.body);
    const { name, Breed, age, healthStatus } = req.body;
  
    if (!name || !Breed || !age || !healthStatus) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const newItem = new Livestock({ name, Breed, age, healthStatus });
  
      const createdItem = await newItem.save();
  
      res.status(201).json({ message: 'Item created successfully', item: createdItem });
    } catch (error) {
      console.error('Error creating livestock:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };