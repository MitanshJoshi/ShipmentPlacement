const Road = require('../models/road');
const dijkstra = require('dijkstrajs');

const trafficWeights = {
    clear: 1,
    moderate: 5,
    heavy: 10
};

async function getShortestPath(start_location_id, end_location_id) {
    try {
        const roads = await Road.find();
        const graph = {};

        roads.forEach(road => {
            const weight = road.distance * trafficWeights[road.traffic_condition];

            if (!graph[road.start_location_id]) {
                graph[road.start_location_id] = {};
            }

            if (!graph[road.start_location_id][road.end_location_id] ||
                graph[road.start_location_id][road.end_location_id] > weight) {
                graph[road.start_location_id][road.end_location_id] = weight;
            }
        });
        if (!graph[start_location_id]) {
            throw new Error(`Start location ${start_location_id} not present in the graph`);
        }

        // Calculate shortest path
        const path = dijkstra.find_path(graph, start_location_id, end_location_id);

        if (!path || path.length === 0) {
            throw new Error(`Could not find a path from ${start_location_id} to ${end_location_id}`);
        }

        let total_distance = 0;
        const distancePromises = [];

        for (let i = 0; i < path.length - 1; i++) {
            distancePromises.push(
                Road.findOne({
                    start_location_id: path[i],
                    end_location_id: path[i + 1]
                })
                .then(road => {
                    if (road) {
                        total_distance += road.distance;
                    } else {
                        throw new Error(`Road not found between ${path[i]} and ${path[i + 1]}`);
                    }
                })
            );
        }

        await Promise.all(distancePromises);

        const estimated_time = total_distance / 50;

        return {
            path,
            total_distance,
            estimated_time
        };
    } catch (error) {
        console.error('Error calculating shortest path:', error.message);
        throw error;
    }
}

module.exports = { getShortestPath };
