export let world = {
    "nouns": [
        {
            "name": "Foyer of the Opera House",
            "coordinates": [40, 0],
            "height": 10,
            "shape": [
                [0, 0],
                [0, 100],
                [100, 100],
                [100, 0],
                [0, 0]
            ]
        },
        {
            "name": "Cloakroom",
            "coordinates": [0, 30],
            "height": 10,
            "shape": [
                [0, 0],
                [0, 40],
                [40, 40],
                [40, 0],
                [0, 0]
            ]
        },
        {
            "name": "small brass hook",
            "coordinates": [13, 30],
            "shape": [
                [0, 0],
                [0, 4],
                [4, 4],
                [4, 0],
                [0, 0]
            ]
        },
        {
            "name": "Bar",
            "coordinates": [40, 100],
            "height": 0,
            "shape": [
                [0, 0],
                [0, 100],
                [100, 100],
                [100, 0],
                [0, 0]
            ]
        },
        {
            "name": "message",
            "coordinates": [70, 110],
            "height": 0,
            "shape": [
                [0, 0],
                [40, 0],
                [40, 40],
                [0, 40],
                [0, 0]
            ]
        }
    ],
    "perspectives": [
        {
            "name": "player",
            "pov": [90, 20],
            "facing": Math.PI / 2,
            "stepSize": 10,
            "regions": [
                {
                    "name": "front",
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
                }
            ]
        }
    ]
}