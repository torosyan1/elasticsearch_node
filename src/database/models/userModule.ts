import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, es_indexed: true },
    email: { type: String, es_indexed: true },
    age: { type: Number, es_indexed: true },
    city: { type: String, es_indexed: true },
    address: { type: String, es_indexed: true },
    bio: { type: String, es_indexed: true },
});
UserSchema.plugin(mongoosastic, {
    host: 'localhost',
    port: 9200,
});

export const UserModel = mongoose.model('user', UserSchema);
