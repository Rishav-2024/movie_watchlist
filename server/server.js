import app from "./index.js"
import { connectDB } from "./src/config/mongooseConfig.js";

// default port number
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    connectDB() // Connecting Mongoose
});