const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database/connection');

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('port', process.env.PORT || 4000);

app.use('/api/users', require('./routers/user-route'));
app.use('/api/tweest', require('./routers/tweets-route'));
app.use('/api/hashtags', require('./routers/hashtag-route'));
app.use('/api/trends', require('./routers/trend-route'));

app.listen(app.get('port'), console.log('Server on port 4000'));





