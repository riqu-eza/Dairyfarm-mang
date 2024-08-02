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

  export const getAllMilkProduction = async (req, res) => {
    try {
      const productions = await Production.find().sort({ Timestamp: 1 });
      res.status(200).json(productions);
    } catch (error) {
      console.error('Error fetching productions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const getByDate = async (req, res) => {
    const { date } = req.params;

    try {
        // Parse the date from the request and calculate start and end of the day
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setDate(startOfDay.getDate() + 1);

        // Query the database for records within the specified date range
        const schedules = await Production.find({
            Timestamp: { $gte: startOfDay, $lt: endOfDay }
        }).sort({ Timestamp: 1 });

        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};