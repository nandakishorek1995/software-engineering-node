import mongoose from 'mongoose'
import Tuit from "../models/Tuit";
import {Schema} from "mongoose";
import UserModel from "./UserModel";
import UserSchema from "./UserSchema";

const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: String, ref: 'UserModel'},
    postedOn: {type: Date, default: Date.now}
}, {collection: 'tuits'});

export default TuitSchema;