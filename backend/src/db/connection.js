import mongoose from "mongoose"

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URI
    );
    if (connection) console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default dbConnect;
