import {Schema, model} from "mongoose";
import validator from "validator";

const offenseSchema = new Schema({
    fine: {
        currency: {
            type: String,
            required: [true, 'Currency required']
        },
        amount: {
            type: Number,
            required: [true, 'Fine amount required']
        }
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: "Driver",
        required: [true, "Driver required"]
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: "Vehicle",
        required: [true, "Vehicle required"]
    },
    image: {
        secure_url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PENDING', 'PAID'],
        default: 'DRAFT'
    }
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

const Offense = model("Offense", offenseSchema);

export default Offense;