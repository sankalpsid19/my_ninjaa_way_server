const connectToDatabase = require("../lib/mongodb");
const Product = require("../models/ProductModel"); // Adjust the path to your Product model

async function getAllProducts(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  const mode = request.query.mode || "";

  // checking if we are on the admin products page because we don't want to have filtering, sorting and pagination there
  if (mode === "admin") {
    try {
      const adminProducts = await Product.find({});
      return response.json(adminProducts);
    } catch (error) {
      return response.status(500).json({ error: "Error fetching products" });
    }
  } else {
    const dividerLocation = request.url.indexOf("?");
    let filterObj = {};
    let sortObj = {};
    let sortByValue = "defaultSort";

    // getting current page
    const page = Number(request.query.page) ? Number(request.query.page) : 1;

    if (dividerLocation !== -1) {
      const queryArray = request.url
        .substring(dividerLocation + 1, request.url.length)
        .split("&");

      let filterType;
      let filterArray = [];

      for (let i = 0; i < queryArray.length; i++) {
        if (queryArray[i].indexOf("filters") !== -1) {
          let filterValue;
          if (queryArray[i].indexOf("category") === -1) {
            filterValue = parseInt(
              queryArray[i].substring(
                queryArray[i].indexOf("=") + 1,
                queryArray[i].length
              )
            );
          } else {
            filterValue = queryArray[i].substring(
              queryArray[i].indexOf("=") + 1,
              queryArray[i].length
            );
          }

          const filterOperator = queryArray[i].substring(
            queryArray[i].indexOf("$") + 1,
            queryArray[i].indexOf("=") - 1
          );
          filterArray.push({ filterType, filterOperator, filterValue });
        }

        if (queryArray[i].indexOf("sort") !== -1) {
          sortByValue = queryArray[i].substring(queryArray[i].indexOf("=") + 1);
        }
      }

      for (let item of filterArray) {
        filterObj = {
          ...filterObj,
          [item.filterType]: {
            [item.filterOperator]: item.filterValue,
          },
        };
      }
    }

    let whereClause = { ...filterObj };

    if (filterObj.category && filterObj.category.equals) {
      delete whereClause.category;
    }

    if (sortByValue === "defaultSort") {
      sortObj = {};
    } else if (sortByValue === "titleAsc") {
      sortObj = {
        title: 1,
      };
    } else if (sortByValue === "titleDesc") {
      sortObj = {
        title: -1,
      };
    } else if (sortByValue === "lowPrice") {
      sortObj = {
        price: 1,
      };
    } else if (sortByValue === "highPrice") {
      sortObj = {
        price: -1,
      };
    }

    let products;

    if (Object.keys(filterObj).length === 0) {
      products = await Product.find({})
        .skip((page - 1) * 10)
        .limit(12)
        .populate("category", "name")
        .sort(sortObj);
    } else {
      if (filterObj.category && filterObj.category.equals) {
        products = await Product.find({
          ...whereClause,
          category: {
            name: {
              equals: filterObj.category.equals,
            },
          },
        })
          .skip((page - 1) * 10)
          .limit(12)
          .populate("category", "name")
          .sort(sortObj);
      } else {
        products = await Product.find(whereClause)
          .skip((page - 1) * 10)
          .limit(12)
          .populate("category", "name")
          .sort(sortObj);
      }
    }

    return response.json(products);
  }
}

async function createProduct(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const {
      slug,
      title,
      mainImage,
      price,
      description,
      manufacturer,
      categoryId,
      inStock,
    } = request.body;

    const product = await Product.create({
      slug,
      title,
      mainImage,
      price,
      rating: 5,
      description,
      manufacturer,
      categoryId,
      inStock,
    });

    return response.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return response.status(500).json({ error: "Error creating product" });
  }
}

// Method for updating existing product
async function updateProduct(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const { id } = request.params; // Getting a slug from params
    const {
      slug,
      title,
      mainImage,
      price,
      rating,
      description,
      manufacturer,
      categoryId,
      inStock,
    } = request.body;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return response.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        slug,
        title,
        mainImage,
        price,
        rating,
        description,
        manufacturer,
        categoryId,
        inStock,
      },
      { new: true }
    );

    return response.status(200).json(updatedProduct);
  } catch (error) {
    return response.status(500).json({ error: "Error updating product" });
  }
}

// Method for deleting a product
async function deleteProduct(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const { id } = request.params;

    // Check for related records in wishlist table
    const relatedOrderProductItems = await CustomerOrderProduct.find({
      productId: id,
    });

    if (relatedOrderProductItems.length > 0) {
      return response.status(400).json({
        error: "Cannot delete product because of foreign key constraint.",
      });
    }

    await Product.findByIdAndDelete(id);
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting product" });
  }
}

async function searchProducts(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const { query } = request.query;
    if (!query) {
      return response
        .status(400)
        .json({ error: "Query parameter is required" });
    }

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    return response.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    return response.status(500).json({ error: "Error searching products" });
  }
}

async function getProductById(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  const { id } = request.params;
  const product = await Product.findById(id).populate("category");

  if (!product) {
    return response.status(404).json({ error: "Product not found" });
  }

  return response.status(200).json(product);
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductById,
};
