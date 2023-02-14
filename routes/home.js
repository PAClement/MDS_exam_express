
exports.default = (app) => {
    app.route('/')
        .get(function(req, res) {
            res.render('index', {
                title: 'Express Login'
            });
        })
        .post(function(req, res) {
            res.send('Add a book');
        })
}

