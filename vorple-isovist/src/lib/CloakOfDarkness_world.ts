export let world = {
    "nouns": [
        {
            "name": "Foyer of the Opera House",
            "coordinates": [40, 0],
            "shapes": [
                {
                    "shape": [
                        [0, 0],
                        [0, 100],
                        [100, 100],
                        [100, 0],
                        [0, 0],
                    ]
                },
                {
                    "shape": [
                        [-1, -1],
                        [-1, 101],
                    ]
                },
                {
                    "shape": [
                        [-1, 101],
                        [101, 101],
                    ]
                },
                {
                    "shape": [
                        [101, 101],
                        [101, -1],
                    ]
                },
                {
                    "shape": [
                        [101, -1],
                        [-1, -1]
                    ]
                },
            ]
        },
        {
            "name": "Cloakroom",
            "coordinates": [0, 30],
            "shapes": [
                {
                    "shape": [
                        [0, 0],
                        [0, 40],
                        [40, 40],
                        [40, 0],
                        [0, 0]
                    ]
                },
                {
                    "shape": [
                        [-1, -1],
                        [-1, 41],
                    ]
                },
                {
                    "shape": [
                        [-1, 41],
                        [41, 41],
                    ]
                },
                {
                    "shape": [
                        [41, 41],
                        [41, -1],
                    ]
                },
                {
                    "shape": [
                        [41, -1],
                        [-1, -1]
                    ]
                },
            ]
        },
        {
            "name": "small brass hook",
            "coordinates": [13, 30],
            "shapes": [
                {
                    "shape": [
                        [0, 0],
                        [0, 4],
                        [4, 4],
                        [4, 0],
                        [0, 0]
                    ]
                }
            ]
        },
        {
            "name": "velvet cloak",
            "coordinates": [],
            "shapes": [
                {
                    "shape": [
                        [0, 0],
                        [0, 10],
                        [10, 10],
                        [10, 0],
                        [0, 0]
                    ]
                }
            ]
        },
        {
            "name": "Foyer Bar",
            "coordinates": [40, 100],
            "shapes": [
                {
                    "shape": [
                        [0, 0],
                        [0, 100],
                        [100, 100],
                        [100, 0],
                        [0, 0]
                    ]
                },
                {
                    "shape": [
                        [-1, -1],
                        [-1, 101],
                    ]
                },
                {
                    "shape": [
                        [-1, 101],
                        [101, 101],
                    ]
                },
                {
                    "shape": [
                        [101, 101],
                        [101, -1],
                    ]
                },
                {
                    "shape": [
                        [101, -1],
                        [-1, -1]
                    ]
                },
            ]
        },
        {
            "name": "scrawled message",
            "coordinates": [70, 115],
            "shapes": [
                {
                    "shape": [
                        [0, 0],
                        [40, 0],
                        [40, 40],
                        [0, 40],
                        [0, 0]
                    ]
                }
            ]
        }
    ],
    "perspectives": [
        {
            "name": "yourself",
            "pov": [90, 20],
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