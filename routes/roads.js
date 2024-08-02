const express = require('express');
const router = express.Router();
const Road = require('../models/road');

router.post('/roads', async (req, res) => {
    const { start_location_id, end_location_id, distance, traffic_condition } = req.body;

    if (!start_location_id || !end_location_id || !distance || !traffic_condition) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const road = new Road({ start_location_id, end_location_id, distance, traffic_condition });
        await road.save();
        return res.status(201).json({
            status:201,
            road
        });
    } catch (error) {
        console.error('Error creating road:', error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

module.exports = router;
