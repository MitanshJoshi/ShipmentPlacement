const mongoose = require('./index');

const trafficUpdateSchema = new mongoose.Schema({
    road_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Road'
    },
    timestamp: {
        type: Date,
        required: true
    },
    traffic_condition: {
        type: String,
        required: true,
        enum: ['clear', 'moderate', 'heavy']
    }
});

const TrafficUpdate = mongoose.model('TrafficUpdate', trafficUpdateSchema);
module.exports = TrafficUpdate;
