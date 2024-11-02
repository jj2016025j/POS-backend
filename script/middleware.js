// middleware.js
module.exports = (app) => {
    require('./middlewares/cors')(app);
    require('./middlewares/staticFiles')(app);
    require('./middlewares/bodyParser')(app);
    require('./middlewares/session')(app);
    require('./middlewares/flash')(app);
    require('./middlewares/globalVars')(app);
};
