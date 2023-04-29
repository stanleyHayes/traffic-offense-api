import {Schema, model} from "mongoose";

const vehicleSchema = new Schema({
    number_plate: {
        type: String,
        required: [true, 'Number plate'],
        trim: true
    },
    driver: {},
    color: {
        type: String,
        required: [true, 'Color required'],
        trim: true
    },
    year: {
        type: String,
        required: [true, 'Year required'],
        trim: true,
        min: [2000, "Year must be after 2000"],
        max: [9999, "Year cannot be after 9999"]
    },
    make: {
        type: String,
        required: [true, 'Make required'],
        trim: true
    },
    model: {
        type: String,
        required: [true, 'Model required'],
        trim: true
    }
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

const Vehicle = model('Vehicle', vehicleSchema);

export default Vehicle;