import movieModel from "../model/movieModel.js";


export default class MovieController {

    // fetching movies from db
    getMovies = async (req, res) => {
        try {
            const movies = await movieModel.find();
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // adding new movie if not already added
    addMovie = async (req, res) => {
        let { title, description, releaseYear, genre, imageUrl } = req.body;

        if(imageUrl == ""){
            imageUrl="https://img.freepik.com/free-vector/it-s-movie-time-banner-template-pop-corn-basket-cola-cup-movie-sign-blue-curtain-background_575670-2199.jpg"
        }
    
        try {
            const existingMovie = await movieModel.findOne({ title:title.toLowerCase()});

            if (existingMovie) {
                // If the movie already exists
                return res.status(409).json({ message: 'Movie with this title already exists' });
            }

            const newMovie = new movieModel({ title:title.toLowerCase(), description, releaseYear, genre, imageUrl });
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Updating movie by id & data provided by the form body
    editMovie = async (req, res) => {
        const { id } = req.params;
        let { title, description, releaseYear, genre, imageUrl, rating, review} = req.body;

        if(imageUrl == ""){
            imageUrl="https://img.freepik.com/free-vector/it-s-movie-time-banner-template-pop-corn-basket-cola-cup-movie-sign-blue-curtain-background_575670-2199.jpg"
        }

        try {
            const updatedMovie = await movieModel.findByIdAndUpdate(id, { title, description, releaseYear, genre, imageUrl, rating, review}, { new: true });
            res.status(200).json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Deleting movie by id from db
    deleteMovie = async (req, res) => {
        const { id } = req.params;
    
        try {
            await movieModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Movie deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // toggling watched/unwatched movie
    toggleWatched = async (req, res) => {
        const { id } = req.params;
    
        try {
            const movie = await movieModel.findById(id);
            movie.watched = !movie.watched;
            const updatedMovie = await movie.save();
            res.status(200).json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }; 

    //adding rating to a movie by id in db 
    rateMovie = async (req, res) => {
        const { id } = req.params;
        const { rating } = req.body;
    
        try {
            const movie = await movieModel.findById(id);
            movie.rating = rating;
            const updatedMovie = await movie.save();
            res.status(200).json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // adding review to a movie by id & text provided by form body
    reviewMovie = async (req, res) => {
        const { id } = req.params;
        const { review } = req.body;
    
        try {
            const movie = await movieModel.findById(id);
            movie.review = review;
            const updatedMovie = await movie.save();
            res.status(200).json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

