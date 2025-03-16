// src/lib/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String },            // Buyer
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['buyer', 'supplier'], required: true },
    companyName: { type: String },     // Supplier
    contactNumber: { type: String },   // Supplier
    nidPassport: { type: String },
    tradeLicense: { type: String },    // Supplier
    documents: [String],             // Supplier (array of file paths/URLs)
    kycImage: { type: String }        // Buyer (base64 image or URL)
}, { timestamps: true }); // Add createdAt and updatedAt

export default mongoose.models.User || mongoose.model('User', userSchema);