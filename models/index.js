const mongoose = require('mongoose');

const uri = 'mongodb+srv://mitanshjoshi141203:esxEc1Hl5QyDlGCI@findingpath.0e2p3qy.mongodb.net/?retryWrites=true&w=majority&appName=findingpath';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

module.exports = mongoose;
