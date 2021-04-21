import mongoose from 'mongoose';

export const database = async () => {
    await mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
};
