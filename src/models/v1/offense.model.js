import {model, Schema} from "mongoose";

const offenseSchema = new Schema({
    fine: {
        currency: {type: String, required: [true, 'Currency required'], default: "GHS"},
        amount: {type: Number, required: [true, 'Fine amount required'], default: 150}
    },
    driver: {type: Schema.Types.ObjectId, ref: "Driver", required: [true, "Driver required"]},
    vehicle: {type: Schema.Types.ObjectId, ref: "Vehicle", required: [true, "Vehicle required"]},
    image: {
        secure_url: {type: String, required: true},
        public_id: {type: String, required: true},
        resource_type: {type: String, required: true},
        bytes: {type: Number, required: true},
        format: {type: String, required: true},
        width: {type: Number, required: true},
        height: {type: Number, required: true}
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PENDING', 'PAID'],
        default: 'PENDING'
    },
    offense_name: {
        type: String,
        enum: ['RED_LIGHT', 'SPEEDING'],
        required: true
    },
    email_sent: {
        type: Boolean,
        default: false
    }
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

const Offense = model("Offense", offenseSchema);

export default Offense;