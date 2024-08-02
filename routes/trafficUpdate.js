const express = require('express');
const router = express.Router();
const TrafficUpdate = require('../models/trafficUpdate');
const Road = require('../models/road');

router.post('/traffic-updates', async (req, res) => {
    const { road_id, timestamp, traffic_condition } = req.body;

    if (!road_id || !timestamp || !traffic_condition) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const road = await Road.findById(road_id);
        if (!road) {
            return res.status(404).json({
                success: false,
                message: "Road ID not found"
            });
        }

        const update = new TrafficUpdate({ road_id, timestamp, traffic_condition });
        await update.save();
        res.status(201).json(update);
    } catch (error) {
        console.error('Error creating traffic update:', error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
});

module.exports = router;
