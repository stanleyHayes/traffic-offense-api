import {Schema, model} from "mongoose";
import validator from "validator";

const driverSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'First name required'],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'Last name required'],
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(`Invalid email ${value}`);
            }
        }
    },
    phone: {
        type: String,
        unique: true,
        index: true,
        required: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error(`Invalid email ${value}`);
            }
        }
    },
    license_id: {
        type: String,
        required: [true, 'License required'],
        unique: true,
        index: true
    },
    address: {
        country: {
            type: String,
            required: [true, 'Country required'],
            trim: true
        },
        city: {
            type: String,
            required: [true, 'City required'],
            trim: true
        },
        address_line_1: {
            type: String,
            required: [true, 'Address line 1 required'],
            trim: true
        },
        address_line_2: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            required: [true, 'State required'],
            trim: true
        }
    }
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

const Driver = model("Driver", driverSchema);

export default Driver;