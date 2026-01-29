// Premium electric bikes and Surrons – accurate specifications (verified)
// Image filenames: place matching photos in /images/bikes/ – see IMAGES.md for sources
const BIKE_IMG = (name) => `/images/bikes/${name}`;

export const bikesData = [
    {
        id: 1,
        name: "Surron Light Bee X",
        type: "Electric Dirt Bike",
        price: 4295,
        condition: "New",
        image: BIKE_IMG("surron-lightx-1.webp"),
        images: [BIKE_IMG("surron-lightx-2.jpg"), BIKE_IMG("surron-lightx-1.webp"), BIKE_IMG("surron-lightx-3.jpg")],
        description: "The iconic Surron Light Bee X – lightweight electric dirt bike with 8kW peak motor (2025), 60V 40Ah lithium-ion battery, and adjustable KYB suspension. Perfect for trail riding and off-road fun. 0–31 mph in 2.7 seconds, up to 75 km/h top speed. Curb weight 57 kg.",
        specs: {
            frame: "Forged aluminum alloy",
            fork: "KYB inverted, 200mm travel",
            gears: "Single speed (direct drive)",
            brakes: "Hydraulic disc front & rear",
            wheels: "19\" front / 18\" rear",
            weight: "57 kg",
            color: "Carbon Black"
        }
    },
    {
        id: 2,
        name: "Surron Ultra Bee",
        type: "Electric Dirt Bike",
        price: 6495,
        condition: "New",
        image: BIKE_IMG("surron-ultra-bee.jpg"),
        images: [BIKE_IMG("surron-ultra-bee.jpg"), BIKE_IMG("surron-ultra-bee.jpg"), BIKE_IMG("surron-ultra-bee.jpg")],
        description: "Step up to the Surron Ultra Bee – 12.5kW peak motor, 74V 55Ah battery, and premium fully adjustable 240mm KYB inverted fork. More power, longer range (~140 km), traction control and regenerative braking. Built for intermediate to experienced riders. Weight 85 kg.",
        specs: {
            frame: "Reinforced aluminum",
            fork: "KYB inverted, 240mm, adjustable",
            gears: "Single speed (direct drive)",
            brakes: "Hydraulic disc, regenerative",
            wheels: "19\" front / 18\" rear",
            weight: "85 kg",
            color: "Storm Gray"
        }
    },
    {
        id: 3,
        name: "Surron Storm Bee",
        type: "Electric Dirt Bike",
        price: 8995,
        condition: "New",
        image: BIKE_IMG("surron-storm-bee.jpg"),
        images: [BIKE_IMG("surron-storm-bee.jpg"), BIKE_IMG("surron-storm-bee.jpg"), BIKE_IMG("surron-storm-bee.jpg")],
        description: "Full-size Surron Storm Bee – 22.5kW peak, 96V 48Ah battery. Built for motocross, enduro and track. The most powerful Surron with race-ready performance and premium components. Full-size moto geometry.",
        specs: {
            frame: "Full-size moto aluminum",
            fork: "Premium inverted, 270mm",
            gears: "Single speed (direct drive)",
            brakes: "High-performance hydraulic disc",
            wheels: "21\" front / 18\" rear",
            weight: "127 kg",
            color: "Racing Red"
        }
    },
    {
        id: 4,
        name: "Surron Light Bee L1e (Road Legal)",
        type: "Electric Motorcycle",
        price: 4695,
        condition: "New",
        image: BIKE_IMG("lte-1.jpg"),
        images: [BIKE_IMG("lte-1.jpg"), BIKE_IMG("l1e-2.jpg")],
        description: "Road-legal Surron Light Bee L1e – same platform as the Light Bee X with 4kW continuous power, restricted to 28 mph. Includes mirrors, indicators, horn and number plate mount. CBT licence required (16+). Ideal for urban and green-lane use.",
        specs: {
            frame: "High-strength aluminum",
            fork: "KYB inverted",
            gears: "Single speed (direct drive)",
            brakes: "Hydraulic disc",
            wheels: "19\" / 18\"",
            weight: "52 kg",
            color: "White / Black"
        }
    },
    {
        id: 5,
        name: "Specialized Turbo Vado 5.0",
        type: "E-Bike (Commuter)",
        price: 4299,
        condition: "Excellent",
        image: BIKE_IMG("turbo-1.jpg"),
        images: [BIKE_IMG("turbo-1.jpg"), BIKE_IMG("turbo-2.webp")],
        description: "Premium commuter e-bike with Specialized 1.3 motor (250W, belt-driven, Rx Street Tune) and 710Wh integrated battery. Smooth, quiet assistance up to 28 mph. Hydraulic disc brakes, integrated lights and lock. Ready for daily urban and mixed-terrain use.",
        specs: {
            frame: "Specialized aluminum",
            fork: "Front suspension, 50mm",
            gears: "10-speed Shimano Deore",
            brakes: "Shimano hydraulic disc",
            wheels: "700c",
            weight: "24 kg",
            color: "Gloss Black"
        }
    },
    {
        id: 6,
        name: "Trek Allant+ 7",
        type: "E-Bike (Hybrid)",
        price: 3699,
        condition: "Excellent",
        image: BIKE_IMG("art-placeholder.jpg"),
        images: [BIKE_IMG("art-placeholder.jpg"), BIKE_IMG("art-placeholder.jpg")],
        description: "Trek Allant+ 7 with Bosch Performance Line motor (250W, 85 Nm) and 625Wh Powertube battery. Hydroformed aluminium frame, SR Suntour XCR32 fork, 10-speed Shimano CUES. Integrated lighting, mudguards and MIK rear rack. Up to 20 mph assist (UK legal). Weight 21.9 kg.",
        specs: {
            frame: "Trek Alpha Aluminum",
            fork: "SR Suntour XCR32, 63mm",
            gears: "10-speed Shimano CUES",
            brakes: "Shimano hydraulic disc",
            wheels: "27.5\"",
            weight: "21.9 kg",
            color: "Lithium Grey"
        }
    },
    {
        id: 7,
        name: "Cube Kathmandu Hybrid Pro 625",
        type: "E-Bike (Touring)",
        price: 3899,
        condition: "Very Good",
        image: BIKE_IMG("art-placeholder.jpg"),
        images: [BIKE_IMG("art-placeholder.jpg"), BIKE_IMG("art-placeholder.jpg")],
        description: "Cube Kathmandu Hybrid Pro 625 – Bosch Performance Line, 625Wh battery, full touring spec with mudguards, pannier rack and lights. Perfect for long-distance e-touring and loaded commuting.",
        specs: {
            frame: "Cube Aluminum Superlite",
            fork: "Suntour NCX, 63mm",
            gears: "11-speed Shimano Deore",
            brakes: "Shimano hydraulic disc",
            wheels: "28\"",
            weight: "26 kg",
            color: "Grey / Green"
        }
    },
    {
        id: 8,
        name: "Haibike AllMtn 7",
        type: "E-MTB",
        price: 5499,
        condition: "Excellent",
        image: BIKE_IMG("art-placeholder.jpg"),
        images: [BIKE_IMG("art-placeholder.jpg"), BIKE_IMG("art-placeholder.jpg")],
        description: "Haibike AllMtn 7 – full suspension e-MTB with Bosch Performance CX, 750Wh battery and 150mm travel. Trail-ready geometry for serious off-road and mountain use. Premium build with Fox suspension.",
        specs: {
            frame: "Aluminum, 150mm travel",
            fork: "Fox 36 Rhythm, 150mm",
            gears: "12-speed Shimano SLX",
            brakes: "Shimano hydraulic disc",
            wheels: "29\"",
            weight: "24.5 kg",
            color: "Matt Slate"
        }
    }
];
