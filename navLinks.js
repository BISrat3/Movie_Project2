const routes = [
    { href: "/movies", title: "Movies" },
    { href: "/reviews", title: "My Reviews" },
    { href: "/reviews/new", title: "New Review" },
    { href: "/signout", title: "Sign Out" },
];

const usersRoutes = [
    { href: "/movies", title: "Movies" },
    { href: "/signin", title: "Sign In" },
    { href: "/register", title: "Register" },
];

module.exports = function navLinks(req, res, next) {
    if (req.session.currentUser) {
        res.locals.routes = routes;
    } else {
        res.locals.routes = usersRoutes;
    }
    // locals
    next();
};