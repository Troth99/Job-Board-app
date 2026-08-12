import {Schema, model} from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required!'],
        trim: true,
    },
    bgName: {
        type: String,
        required: [true, 'Bulgarian category name is required!'],
        trim: true,
    },
    shortName: {
        type: String,
        required: [true, 'Short name is required!'],
        trim: true,
    },
});
export default model('Category', categorySchema)