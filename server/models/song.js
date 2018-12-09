const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'lyric'
  }]
});

SongSchema.statics.addLyric = function(id, content) {
  const Lyric = mongoose.model('lyric');

  return this.findById(id)
    .then(song => {
      console.log('Song', song);
      const lyric = new Lyric({ song:id, likes:0, content  });
      console.log('Song Lyrics', song.lyrics);
      console.log('Song From dir', typeof song.lyrics);
      //song.lyrics.push(lyric);
      // let lyrics = new Array(song.lyrics);
      // lyrics.length > 0 ? lyrics.push(lyric): lyrics = [lyric];
      song.lyrics = [lyric, ...song.lyrics]; 
      console.log('Song', song);
      console.log('Lyric', lyric);
    
      return Promise.all([lyric.save(), song.save()])
        .then(([lyric, song]) => song);
    });
}

SongSchema.statics.findLyrics = function(id) {
  return this.findById(id)
    .populate('lyrics')
    .then(song => song.lyrics);
}

mongoose.model('song', SongSchema);
