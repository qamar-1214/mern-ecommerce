import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(
      `mongodb://localhost:27017/
        `,
      { dbName: "ECOMMERCE_MERN_APP" }
    );
    console.log("Database is connected successfully.");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
