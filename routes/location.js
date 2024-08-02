const express = require('express');
const router = express.Router();
const Location = require('../models/location');

router.post('/locations', async (req, res) => {
    const { name, latitude, longitude } = req.body;
    if(!name || !latitude || !longitude)
    {
        return res.status(400).json({
            success:false,
            message:"name, latitude, longitude are required"
        })
    }
    const location = new Location({ name, latitude, longitude });
    await location.save();
    return res.status(201).json({
        status:201,
        location
    });
});

module.exports = router;
