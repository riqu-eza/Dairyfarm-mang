import User from '../models/user.model.js';
import Farm from '../models/farm.model.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from '../utils/error.js';
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from '../utils/email.js';
import { generateFarmCode } from '../utils/codegenerator.js';



export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password, phoneNumber, farmName, farmAddress, role } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role, // Assuming role is provided in the request body
    });
    await newUser.save();
    const farmcode = generateFarmCode(farmName);

    // Create a new farm
    const newFarm = new Farm({
      name: farmName,
      address: farmAddress,
      code: farmcode,
      user: newUser._id, // Link the farm to the user
    });
    await newFarm.save();


    const emailSubject = 'Welcome to Our Farm Management System';
    const emailContent = `
      <p>Dear ${fullName},</p> <br>
      <p>Thank you for signing up. Here are the details of your farm:</p> <br>
      <ul>
        <li><strong>Farm Name:</strong> ${farmName}</li>
        <li><strong>Farm Code:</strong> ${farmcode}</li>
      </ul>
      <br> <br>
      <p>Best regards,<br>Dancah Technologies</p>
    `;

    // Send an email to the user with farm name and unique farm code
    await sendEmail(email, emailSubject, emailContent);

    res.status(201).json({ message: ' Created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const subuser = async () => {
 try{
  const { fullName, email, role,  } = req.body;

  console.log('Request received with body:', req.body);
  const farm = await Farm.findOne({ });

  if (farm.subUsers.some(user => user.fullName === fullName)) {
    return res.status(400).json({ message: 'Sub-user already exists for this farm' });
  }

  farm.subUsers.push({ fullName, email, role });
  await farm.save();

 }catch{

 }
}




export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, "User not found"));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 72 * 60 * 60 * 1000),
        })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };