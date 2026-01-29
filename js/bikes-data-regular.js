// Regular (non-electric) bikes – mountain, hybrid, fixie, etc.
// Image filenames: place matching photos in /images/bikes/ (e.g. trek-marlin-7.jpg)
const BIKE_IMG = (name) => `/images/bikes/${name}`;

export const bikesDataRegular = [
  {
    id: 1,
    name: "Trek Marlin 7",
    type: "Mountain Bike",
    price: 749,
    condition: "Excellent",
    image: BIKE_IMG("trek-marlin-7.jpg"),
    images: [BIKE_IMG("trek-marlin-7.jpg"), BIKE_IMG("trek-marlin-7.jpg"), BIKE_IMG("trek-marlin-7.jpg")],
    description: "Entry-level hardtail mountain bike with Alpha Silver Aluminum frame, 100mm Suntour fork, and 2x9 Shimano drivetrain. Hydraulic disc brakes and 29\" wheels. Great for trails and light XC riding.",
    specs: {
      frame: "Trek Alpha Silver Aluminum",
      fork: "Suntour XCE 28, 100mm",
      gears: "2x9 Shimano",
      brakes: "Tektro hydraulic disc",
      wheels: "29\"",
      weight: "14.5 kg",
      color: "Trek Black"
    }
  },
  {
    id: 2,
    name: "Specialized Rockhopper Comp",
    type: "Mountain Bike",
    price: 899,
    condition: "Very Good",
    image: BIKE_IMG("specialized-rockhopper-comp.jpg"),
    images: [BIKE_IMG("specialized-rockhopper-comp.jpg"), BIKE_IMG("specialized-rockhopper-comp.jpg"), BIKE_IMG("specialized-rockhopper-comp.jpg")],
    description: "Versatile hardtail with A1 Aluminum frame and 100mm travel fork. 2x9 Shimano drivetrain, hydraulic discs, and 29\" wheels. Ideal for commuting and trail riding.",
    specs: {
      frame: "Specialized A1 Aluminum",
      fork: "SR Suntour XCE 28, 100mm",
      gears: "2x9 Shimano",
      brakes: "Tektro hydraulic disc",
      wheels: "29\"",
      weight: "13.2 kg",
      color: "Gloss Black"
    }
  },
  {
    id: 3,
    name: "Cannondale Trail 6",
    type: "Mountain Bike",
    price: 699,
    condition: "Good",
    image: BIKE_IMG("cannondale-trail-6.jpg"),
    images: [BIKE_IMG("cannondale-trail-6.jpg"), BIKE_IMG("cannondale-trail-6.jpg"), BIKE_IMG("cannondale-trail-6.jpg")],
    description: "Affordable hardtail with SmartForm C2 Aluminum frame and 100mm Suntour fork. 3x8 drivetrain and mechanical disc brakes. Solid choice for beginners.",
    specs: {
      frame: "Cannondale SmartForm C2",
      fork: "Suntour XCM, 100mm",
      gears: "3x8 Shimano",
      brakes: "Tektro mechanical disc",
      wheels: "29\"",
      weight: "14.8 kg",
      color: "Slate Grey"
    }
  },
  {
    id: 4,
    name: "Giant Talon 2",
    type: "Mountain Bike",
    price: 599,
    condition: "Very Good",
    image: BIKE_IMG("giant-talon-2.jpg"),
    images: [BIKE_IMG("giant-talon-2.jpg"), BIKE_IMG("giant-talon-2.jpg"), BIKE_IMG("giant-talon-2.jpg")],
    description: "Value hardtail with ALUXX-grade Aluminum frame, 80mm fork, and 2x8 drivetrain. Hydraulic disc brakes. Perfect for green lanes and light off-road.",
    specs: {
      frame: "Giant ALUXX Aluminum",
      fork: "Suntour XCM, 80mm",
      gears: "2x8 Shimano",
      brakes: "Tektro hydraulic disc",
      wheels: "29\"",
      weight: "14.2 kg",
      color: "Matte Black"
    }
  },
  {
    id: 5,
    name: "Boardman MTR 8.6",
    type: "Mountain Bike",
    price: 549,
    condition: "Good",
    image: BIKE_IMG("boardman-mtr-86.jpg"),
    images: [BIKE_IMG("boardman-mtr-86.jpg"), BIKE_IMG("boardman-mtr-86.jpg"), BIKE_IMG("boardman-mtr-86.jpg")],
    description: "Budget-friendly hardtail with double-butted aluminium frame and 100mm fork. 2x9 gearing and hydraulic discs. Great for getting into mountain biking.",
    specs: {
      frame: "Double-butted aluminium",
      fork: "Suntour XCM, 100mm",
      gears: "2x9 Shimano",
      brakes: "Tektro hydraulic disc",
      wheels: "29\"",
      weight: "14.1 kg",
      color: "Blue / Black"
    }
  },
  {
    id: 6,
    name: "Raleigh Strada 3",
    type: "Hybrid",
    price: 449,
    condition: "Excellent",
    image: BIKE_IMG("raleigh-strada-3.jpg"),
    images: [BIKE_IMG("raleigh-strada-3.jpg"), BIKE_IMG("raleigh-strada-3.jpg"), BIKE_IMG("raleigh-strada-3.jpg")],
    description: "Comfortable hybrid with upright riding position. 21-speed gearing, alloy frame, and 700c wheels. Suited to commuting and leisure rides.",
    specs: {
      frame: "Raleigh aluminium",
      fork: "Rigid",
      gears: "3x7 Shimano",
      brakes: "Rim brakes",
      wheels: "700c",
      weight: "13.5 kg",
      color: "Silver / Black"
    }
  },
  {
    id: 7,
    name: "Carrera Subway 1",
    type: "Hybrid",
    price: 349,
    condition: "Good",
    image: BIKE_IMG("carrera-subway-1.jpg"),
    images: [BIKE_IMG("carrera-subway-1.jpg"), BIKE_IMG("carrera-subway-1.jpg"), BIKE_IMG("carrera-subway-1.jpg")],
    description: "Popular commuter hybrid with 21-speed drivetrain and front suspension. Robust build and practical for daily use.",
    specs: {
      frame: "Aluminium",
      fork: "Suntour suspension, 63mm",
      gears: "3x7 Shimano",
      brakes: "V-brake",
      wheels: "700c",
      weight: "14.0 kg",
      color: "Black"
    }
  },
  {
    id: 8,
    name: "Fuji Feather",
    type: "Fixie / Single Speed",
    price: 499,
    condition: "Excellent",
    image: BIKE_IMG("fuji-feather.jpg"),
    images: [BIKE_IMG("fuji-feather.jpg"), BIKE_IMG("fuji-feather.jpg"), BIKE_IMG("fuji-feather.jpg")],
    description: "Classic steel fixie/single-speed with flip-flop hub. Lightweight, minimal, and ideal for urban riding. Can be run fixed or freewheel.",
    specs: {
      frame: "Fuji Butted Chromoly",
      fork: "Chromoly",
      gears: "Single speed / fixie",
      brakes: "Front caliper",
      wheels: "700c",
      weight: "9.5 kg",
      color: "Cream / Black"
    }
  },
  {
    id: 9,
    name: "Genesis Flyer",
    type: "Single Speed",
    price: 449,
    condition: "Very Good",
    image: BIKE_IMG("genesis-flyer.jpg"),
    images: [BIKE_IMG("genesis-flyer.jpg"), BIKE_IMG("genesis-flyer.jpg"), BIKE_IMG("genesis-flyer.jpg")],
    description: "British-designed single-speed with steel frame and clean lines. Perfect for city and flat commuting.",
    specs: {
      frame: "Genesis steel",
      fork: "Steel",
      gears: "Single speed",
      brakes: "Dual pivot caliper",
      wheels: "700c",
      weight: "10.2 kg",
      color: "British Racing Green"
    }
  },
  {
    id: 10,
    name: "Pinnacle Laterite 2",
    type: "Hybrid",
    price: 499,
    condition: "Very Good",
    image: BIKE_IMG("pinnacle-laterite-2.jpg"),
    images: [BIKE_IMG("pinnacle-laterite-2.jpg"), BIKE_IMG("pinnacle-laterite-2.jpg"), BIKE_IMG("pinnacle-laterite-2.jpg")],
    description: "Versatile hybrid with 24-speed gearing and front suspension. Suited to mixed terrain and longer rides.",
    specs: {
      frame: "Aluminium",
      fork: "Suntour suspension",
      gears: "3x8 Shimano",
      brakes: "Disc",
      wheels: "700c",
      weight: "13.8 kg",
      color: "Grey / Orange"
    }
  }
];
