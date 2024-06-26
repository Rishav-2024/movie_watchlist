import mongoose from "mongoose";

// Created movie schema using mongoose
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    releaseYear: {
        type: Number,
    },
    genre: {
        type: String,
    },
    imageUrl:{
        type:String,
        default:"https://img.freepik.com/free-vector/it-s-movie-time-banner-template-pop-corn-basket-cola-cup-movie-sign-blue-curtain-background_575670-2199.jpg"
    },
    watched: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default:0
    },
    review: {
        type: String,
        default:""
    }
});

// Created movie model using mongoose
const movieModel = mongoose.model('MovieList', MovieSchema);

export default movieModel;