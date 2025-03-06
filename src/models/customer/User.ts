import { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
    {
        _id: { type: Number, require: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'user',
        toJSON: {
            transform: function (_, d) {
                d.id = d._id;
                delete d._id;
                delete d.__v;
            }
        },
        toObject: {
            transform: function (_, d) {
                d.id = d._id;
                delete d._id;
                delete d.__v;
            }
        }
    }
);

export default UserSchema;
