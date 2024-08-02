const mongoose = require('./index');

const roadSchema = new mongoose.Schema({
    start_location_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Location'
    },
    end_location_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Location'
    },
    distance: {
        type:Number,
        required:true,
    },
    traffic_condition: {
        type: String,
        required: true,
        enum: ['clear', 'moderate', 'heavy']
    }
});


const Road = mongoose.model('Road', roadSchema);
module.exports = Road;
