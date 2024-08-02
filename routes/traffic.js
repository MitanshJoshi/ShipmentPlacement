const express = require('express');
const router = express.Router();
const Road = require('../models/road');
const Location = require('../models/location'); 
router.get('/roads/:id/traffic-condition', async (req, res) => {
    try {
        const roadId = req.params.id;
        if (!roadId) {
            return res.status(400).json({ message: 'Enter Road Id' });
        }

        const road = await Road.findById(roadId);
        if (!road) {
            return res.status(404).json({ message: 'Road not found' });
        }

        const startLocation = await Location.findById(road.start_location_id);
        const endLocation = await Location.findById(road.end_location_id);

        if (!startLocation || !endLocation) {
            return res.status(404).json({ message: 'One or both locations not found' });
        }

        res.status(200).json({
            start_location_name: startLocation.name,
            end_location_name: endLocation.name,
            distance: road.distance,
            traffic_condition: road.traffic_condition
        });
    } catch (error) {
        console.error('Error fetching road and location details:', error.message);
        res.status(500).json({ message: 'Give Proper id' });
    }
});

module.exports = router;
