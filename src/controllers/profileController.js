import { Profile } from "../models/profileModel.js";
import { User } from "../models/userModel.js";
import mongoose from "mongoose";

export const createProfile = async (req, res) => {
    try {
        const { userId, name, age, dob, gender, hobby } = req.body;

        // 1. check missing fields
        if (!userId || !name || !age || !dob || !gender || !hobby) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({
                success: false,
                message: "All fields are required"
            }));
        }



        // 3. check if user exists
        const userExists = await User.findById(userId);

        if (!userExists) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({
                success: false,
                message: "User does not exist"
            }));
        }

        // 4. create profile
        const profile = await Profile.create({
            userId,
            name,
            age,
            dob,
            gender,
            hobby
        });

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: true,
            profile
        }));

    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};

export const getUserProfiles = async (req, res) => {
    try {
        const { userId } = req.params;

        // fetch all profiles for this user
        const profiles = await Profile.find({ userId });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: true,
            count: profiles.length,
            profiles
        }));

    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};