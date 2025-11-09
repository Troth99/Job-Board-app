import {Schema, model} from "mongoose";


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required!'],
        minlength: [3, 'Category name must be at least 3 characters long!'], 
        maxlength: [50, 'Category name cannot be longer than 50 characters!'],
    },
    shortName: {
        type: String,
        required: true,
        minlength: [2, 'Short name must be at least 2 characters long!'],
        maxlength: [20, 'Short name cannot be longer than 20 characters!'], 
    },
});

export default model('Category', categorySchema)