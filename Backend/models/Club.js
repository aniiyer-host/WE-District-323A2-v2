import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: 'Member'
    },
    photo: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    }
}, { _id: true });

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        default: ''
    },
    coverImage: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { _id: true });

const presidentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    }
}, { _id: false });

const clubSchema = new mongoose.Schema({
    clubId: {
        type: String,
        required: [true, 'Club ID is required'],
        unique: true,
        trim: true,
        lowercase: true,
        // e.g., 'anushakti-royals', 'thane-stars-city'
    },
    name: {
        type: String,
        required: [true, 'Club name is required'],
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    president: {
        type: presidentSchema,
        required: true
    },
    members: {
        type: [memberSchema],
        default: []
    },
    events: {
        type: [eventSchema],
        default: []
    },
    images: [{
        type: String
    }],
    coverImage: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    established: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Club = mongoose.model('Club', clubSchema);

export default Club;
