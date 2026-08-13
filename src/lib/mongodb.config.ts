import { MongoClient, type MongoClientOptions } from "mongodb";
import mongoose from "mongoose";

const options: MongoClientOptions = {};

const createClientPromise = (): Promise<MongoClient> => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        return Promise.reject(new Error("MONGODB_URI is not set"));
    }
    return new MongoClient(uri, options).connect();
};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = createClientPromise();
    }
    clientPromise = global._mongoClientPromise;
} else {
    clientPromise = createClientPromise();
}

export { clientPromise };

export const connectMongoDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error("MONGODB_URI is not set");
        await mongoose.connect(uri, { dbName: "catalogue" });
    } catch (error) {
        console.log(error);
    }
};

export const disconnectMongoDB = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
    }
};
