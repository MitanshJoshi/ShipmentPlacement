const express = require('express');
const router = express.Router();
const Road = require('../models/road');
const Location = require('../models/location'); 
const { Parser } = require('json2csv');

// Generate traffic report
router.get('/report/traffic', async (req, res) => {
    try {
        const roads = await Road.find();

        if (!roads || roads.length === 0) {
            return res.status(404).json({ message: 'No roads found' });
        }

        // Fetch all locations
        const locations = await Location.find();
        const locationMap = {};
        locations.forEach(location => {
            locationMap[location._id] = location.name;
        });

        // Replace IDs with names in roads data
        const roadsWithNames = roads.map(road => ({
            start_location: locationMap[road.start_location_id] || road.start_location_id,
            end_location: locationMap[road.end_location_id] || road.end_location_id,
            distance: road.distance,
            traffic_condition: road.traffic_condition
        }));

        const fields = ['start_location', 'end_location', 'distance', 'traffic_condition'];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(roadsWithNames);

        res.header('Content-Type', 'text/csv');
        res.attachment('traffic_report.csv');
        res.send(csv);
    } catch (error) {
        console.error('Error generating traffic report:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
