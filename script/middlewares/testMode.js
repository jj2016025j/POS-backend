module.exports = (app) => {
    app.use((req, res, next) => {
        if (process.env.ONLY_API_TEST === 'true') {
            return res.status(200).json({ message: 'middleware api work' });
        }
        next();
    });
};
