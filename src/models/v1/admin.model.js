import {Schema, model} from "mongoose";
import validator from "validator";

const adminSchema = new Schema({
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
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(`Invalid email ${value}`);
            }
        }
    },
    phone: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error(`Invalid phone ${value}`);
            }
        }
    },
    status: {
        type: String,
        default: 'Active'
    },
    password: {
        type: String,
        required: [true, 'License required'],
        unique: true,
        index: true
    },
    username: {
        type: String,
        lowercase: true,
        unique: true,
        index: true
    },
    permissions: {
        authentication: {
            login: {
                type: Boolean,
                default: true
            },
            update_profile: {
                type: Boolean,
                default: true
            },
            get_profile: {
                type: Boolean,
                default: true
            },
            update_password: {
                type: Boolean,
                default: true
            },
            reset_password: {
                type: Boolean,
                default: true
            },
        },
        driver: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            },
        },
        offense: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            },
        },
        vehicle: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            },
        },
        admin: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            },
        },
    }
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

const Admin = model("Admin", adminSchema);

export default Admin;