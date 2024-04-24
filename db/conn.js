const mongoose = require("mongoose");

main().then((data) => console.log("mongo db is connected"));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    process.env.MONGO_URL
    // , { dbName: "mycruddb1" }
  );
}
