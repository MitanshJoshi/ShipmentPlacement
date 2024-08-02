const express = require('express');
const router = express.Router();
const { getShortestPath } = require('../services/shortestPathService');
const Location = require('../models/location');

router.get('/shortest-path', async (req, res) => {
    const { start_location_id, end_location_id } = req.query;

    if (!start_location_id || !end_location_id) {
        return res.status(400).json({ error: 'Missing required parameters: start_location_id and end_location_id' });
    }

    try {
 
        const startLocation = await Location.findById(start_location_id);
        const endLocation = await Location.findById(end_location_id);

        if (!startLocation || !endLocation) {
            return res.status(404).json({ error: 'Start or end location not found' });
        }

 
        const result = await getShortestPath(start_location_id, end_location_id);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error calculating shortest path:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
