# ShipmentPlacement

USE mitansh Branch to see the code

## Features

- Add and manage locations and roads.
- Update traffic conditions.
- Calculate the shortest path between two locations considering current traffic conditions.
- Generate traffic condition reports in CSV format.

  1) for adding a road the api is-
 http://localhost:3000/locations

 Body-{
  "name": "Chile",
  "latitude": 100,
  "longitude": 200
}

 api resp-{
    "status": 201,
    "location": {
        "name": "Chile",
        "latitude": 100,
        "longitude": 200,
        "_id": "66acbabcbe93c0830cbf486a",
        "__v": 0
    }
}

2) for adding route between two locations the api is(Make sure you enter the id of the location you got from the previous api we can implement it by name in frontend also)
   http://localhost:3000/roads

body-
{
  "start_location_id": "66acb50301719b920e12f168",
  "end_location_id": "",
  "distance": 100,
  "traffic_condition": "clear"
}

api resp-
{
    "status": 201,
    "road": {
        "start_location_id": "66acb0456576ce7cff8b9150",
        "end_location_id": "66acb0456576ce7cff8b9150",
        "distance": 20,
        "traffic_condition": "clear",
        "_id": "66acbe0bed43389f839faae6",
        "__v": 0
    }
}

3)Update traffic condition-
http://localhost:3000/traffic-updates

body-
{
  "road_id": "66acc2784e610b664fd2521d",
  "timestamp": "2024-06-25T14:00:00Z",
  "traffic_condition": "heavy"
}


response-
{
    "road_id": "66acc2784e610b664fd2521d",
    "timestamp": "2024-06-25T14:00:00.000Z",
    "traffic_condition": "heavy",
    "_id": "66acc2a075e8e74cd28845e5",
    "__v": 0
}


4)for finding shortest path i have build a graph using road data by adjusting distances based on traffic conditions and i have used dijstrajs algorithm to find shortest path between two locations give ids of locations in params
 api-http://localhost:3000/shortest-path?start_location_id=66acb0456576ce7cff8b9150&end_location_id=66acb0506576ce7cff8b9152

 resp-
 {
    "path": [
        "66acb0456576ce7cff8b9150",
        "66acb0506576ce7cff8b9152"
    ],
    "total_distance": 15,
    "estimated_time": 0.3
}

BONUS

5)getting traffic conditions for road
api-http://localhost:3000/roads/66acb06a6576ce7cff8b9154/traffic-condition

api resp-
{
    "start_location_name": "Gandhinagar",
    "end_location_name": "Ahmedabad",
    "distance": 15,
    "traffic_condition": "Heavy"
}

6)Generate a CSV report of all roads with their traffic conditions.
api-http://localhost:3000/report/traffic

api resp-
"start_location","end_location","distance","traffic_condition"
"Gandhinagar","Ahmedabad",15,"Heavy"
"Gandhinagar","Ahmedabad",10,"clear"
"location A","location B",100,"clear"
"location A","location B",100,"clear"
"Gandhinagar","Gandhinagar",20,"clear"
"Gandhinagar","Gandhinagar",20,"clear"
"Gandhinagar","Gandhinagar",20,"clear"
   
