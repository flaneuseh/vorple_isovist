export let world = {
    "nouns": [
        {
            "name": "Foyer of the Opera House",
            "shapes": [
                {
                    "coordinates": [40, 0],
                    "shape": [
                        [0, 0],
                        [0, 100],
                        [100, 100],
                        [100, 0],
                        [0, 0]
                    ]
                }
            ]
        },
        {
            "name": "Cloakroom",
            "shapes": [
                {
                    "coordinates": [0, 30],
                    "shape": [
                        [0, 0],
                        [0, 40],
                        [40, 40],
                        [40, 0],
                        [0, 0]
                    ]
                }
            ]
        },
        {
            "name": "small brass hook",
            "shapes": [
                {
                    "coordinates": [13, 30],
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
            "name": "Foyer Bar",
            "shapes": [
                {
                    "coordinates": [40, 100],
                    "shape": [
                        [0, 0],
                        [0, 100],
                        [100, 100],
                        [100, 0],
                        [0, 0]
                    ]
                }
            ]
        },
        {
            "name": "scrawled message",
            "shapes": [
                {
                    "coordinates": [70, 110],
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