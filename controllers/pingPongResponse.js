async function pingPongResponse(request, response) {
  try {
    return response.json("Hi there!!");
  } catch (error) {
    console.error("Error creating category:", error);
    return response.status(500).json({ error: "API is not working" });
  }
}
module.exports = {
  pingPongResponse,
};
