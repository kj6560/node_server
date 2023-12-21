
const SiteController = {
    index(req, res) {
        return res.render('index', { "name": "keshav" });
    },

    uploadFile(req, res) {
        // make entry in database
        return res.redirect('/');
    }
}
export { SiteController };