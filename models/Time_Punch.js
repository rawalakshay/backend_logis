const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    punchIn: { type: Date, default: null },
    punchOut: { type: Date, default: null },
    punchInlatitude: { type: String, required: true },
    punchInlongitude: { type: String, required: true },
    punchOutlatitude: { type: String, required: false },
    punchOutlongitude: { type: String, required: false },

}, { timestamps: true });

module.exports = mongoose.model('time_punch', userSchema);
