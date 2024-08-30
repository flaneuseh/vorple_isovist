export let world = {
    "nouns": [
        {
            "name": "Ha-ha",
            "coordinates": [0, 400],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 100],
                    [100, 100],
                    [100, 0],
                    [0, 0]
                ],
                "height": -10,
            }]
        },
        {
            "name": "Sheep Field",
            "coordinates": [0, 500],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 100],
                    [100, 100],
                    [100, 0],
                    [0, 0]
                ],
                "height": 0,
            }]
        },
        {
            "name": "black sheep",
            "coordinates": [70, 550],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 20],
                    [10, 20],
                    [10, 0],
                    [0, 0]
                ],
                "height": 4,
            }]
        },
        {
            "name": "Gravel Circle",
            "coordinates": [0, 300],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 100],
                    [100, 100],
                    [100, 0],
                    [0, 0]
                ],
                "height": 0,
            }]
        },
        {
            "name": "half-size Bentley",
            "coordinates": [70, 350],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 20],
                    [10, 20],
                    [10, 0],
                    [0, 0]
                ],
                "height": 3,
            }]
        },
        {
            "name": "The Upper Terrace",
            "coordinates": [100, 300],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 100],
                    [100, 100],
                    [100, 0],
                    [0, 0]
                ],
                "height": 0,
            }]
        },
        {
            "name": "The Obelisk",
            "coordinates": [140, 340],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 20],
                    [20, 20],
                    [20, 0],
                    [0, 0]
                ],
                "height": 50,
            }]
        },
        {
            "name": "Croquet Ground",
            "coordinates": [0, 200],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 100],
                    [100, 100],
                    [100, 0],
                    [0, 0]
                ],
                "height": 0,
            }]
        },
        {
            "name": "stone bench",
            "coordinates": [10, 280],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 10],
                    [20, 10],
                    [20, 0],
                    [0, 0]
                ],
                "height": 3,
            }]
        },
        {
            "name": "The Middle Terrace",
            "coordinates": [100, 200],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 100],
                    [100, 100],
                    [100, 0],
                    [0, 0]
                ],
                "height": 0,
            }]
        },
        {
            "name": "Lily Pond",
            "coordinates": [120, 250],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 20],
                    [40, 20],
                    [40, 0],
                    [0, 0]
                ],
                "height": 0,
            }]
        },
        {
            "name": "Lawn",
            "coordinates": [0, 100],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 100],
                    [100, 100],
                    [100, 0],
                    [0, 0]
                ],
                "height": 0,
            }]
        },
        {
            "name": "The Lower Terrace",
            "coordinates": [100, 100],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 100],
                    [100, 100],
                    [100, 0],
                    [0, 0]
                ],
                "height": 30,
            }]
        },
        {
            "name": "marble anteater",
            "coordinates": [140, 140],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 20],
                    [20, 20],
                    [20, 0],
                    [0, 0]
                ],
                "height": 36,
            }]
        },
        {
            "name": "Rose Garden",
            "coordinates": [0, 0],
            "shapes": [{
                "shape": [
                    [0, 0],
                    [0, 100],
                    [100, 100],
                    [100, 0],
                    [0, 0]
                ],
                "height": 0,
            }]
        },
        {
            "name": "thicket of red roses",
            "coordinates": [0, 0],
            "shapes": [{
                "shape": [
                    [100, 0],
                    [0, 0],
                    [0, 100],
                    [100, 100]
                ],
                "height": 4,
            }]
        }
    ],
    "perspectives": [
        {
            "name": "yourself",
            "pov": [50, 50],
            "facing": Math.PI / 2,
            "stepSize": 10,
            "regions": [
                {
                    "name": "forward",
                    "angle": 0,
                    "range": Math.PI / 4,
                    "isovist": undefined,
                },
                {
                    "name": "left",
                    "angle": -Math.PI / 2,
                    "range": Math.PI / 4,
                    "isovist": undefined,
                },
                {
                    "name": "right",
                    "angle": Math.PI / 2,
                    "range": Math.PI / 4,
                    "isovist": undefined,
                },
                {
                    "name": "back",
                    "angle": Math.PI,
                    "range": Math.PI / 4,
                    "isovist": undefined,
                },
            ]
        }
    ]
}