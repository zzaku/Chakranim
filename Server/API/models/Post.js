const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    duree: {
        type: String,
        required: true
    },
    genre: [String],
    image: {
        type: String,
        required: true
    },
    langue: {
        type: String,
        required: true
    },
    links : [{
        format_VOD : String,
        episode : String,
        lien: String,
        type: Array
        }],
    nextLinks : [{
        format_VOD : String,
        episode : String,
        lien: String,
        type: Array
        }],
    newEp: {
        type: Boolean,
        required: false,
    },  
    saison: {
        type: String,
        required: true,
    },
    nombre_episode: {
        type: Number,
        required: true,
    },
    nombre_episode_final: {
        type: Number,
        required: true,
    },
    need_suite : Boolean,
    lastPart : Boolean
})



module.exports = mongoose.model('Anime', PostSchema);