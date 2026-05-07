import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check missing fields
        if (!username || !email || !password) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({
                success: false,
                message: "All fields are required"
            }));
        }

        // check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.writeHead(409, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({
                success: false,
                message: "User already exists"
            }));
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }));

    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate input
        if (!email || !password) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({
                success: false,
                message: "Email and password are required"
            }));
        }

        // find user
        const user = await User.findOne({ email });

        if (!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({
                success: false,
                message: "User not found"
            }));
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({
                success: false,
                message: "Invalid credentials"
            }));
        }

        // success
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }));

    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};