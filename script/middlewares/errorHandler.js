module.exports = (app) => {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    });
};
