const { MongoClient } = require("mongodb");
const connectToDatabase = require("../lib/mongodb"); // Assuming this is where your MongoDB connection is established

const demoProducts = [
  {
    _id: "1", // In MongoDB, _id is the identifier field
    title: "Smart phone",
    price: 22,
    rating: 5,
    description: "This is smart phone description",
    mainImage: "product1.webp",
    slug: "smart-phone-demo",
    manufacturer: "Samsung",
    categoryId: "3117a1b0-6369-491e-8b8b-9fdd5ad9912e",
    inStock: 0,
  },
  {
    _id: "2",
    title: "SLR camera",
    price: 24,
    rating: 0,
    description: "This is slr description",
    mainImage: "product2.webp",
    slug: "slr-camera-demo",
    manufacturer: "Canon",
    categoryId: "659a91b9-3ff6-47d5-9830-5e7ac905b961",
    inStock: 0,
  },
  // Other products go here
];

const demoCategories = [
  {
    _id: "7a241318-624f-48f7-9921-1818f6c20d85",
    name: "speakers",
  },
  {
    _id: "313eee86-bc11-4dc1-8cb0-6b2c2a2a1ccb",
    name: "trimmers",
  },
  // Other categories go here
];

async function insertDemoData() {
  try {
    const db = await connectToDatabase();
    const categoriesCollection = db.collection("categories");
    const productsCollection = db.collection("products");

    // Insert demo categories
    await categoriesCollection.insertMany(demoCategories);
    console.log("Demo categories inserted successfully!");

    // Insert demo products
    await productsCollection.insertMany(demoProducts);
    console.log("Demo products inserted successfully!");
  } catch (error) {
    console.error("Error inserting demo data:", error);
  } finally {
    // MongoClient will close automatically when script ends
  }
}

insertDemoData();
