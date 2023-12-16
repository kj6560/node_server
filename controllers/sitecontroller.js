
const SiteController = {
    index(req, res) {
        return res.render('index', { "name": "keshav" });
    },

    uploadFile(req, res) {
        return res.redirect('/');
    }
}
module.exports = SiteController;