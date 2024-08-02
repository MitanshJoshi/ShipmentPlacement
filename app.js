const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./models/index');
const locationRoutes = require('./routes/location');
const roadRoutes = require('./routes/roads');
const trafficUpdateRoutes = require('./routes/traffic');
const trafficUpdateRoute = require('./routes/trafficUpdate');
const shortestPathRoutes = require('./routes/shortestPath');
const reportRoutes = require('./routes/report');
const Road = require('./models/road');
const TrafficUpdate = require('./models/trafficUpdate');

const app = express();
app.use(bodyParser.json());

app.post('/traffic-updates', async (req, res) => {
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
app.use(locationRoutes);
app.use(roadRoutes);
app.use(trafficUpdateRoutes);
app.use(shortestPathRoutes);
app.use('/', trafficUpdateRoutes);

app.use('/', reportRoutes);

const PORT = 3000;

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
