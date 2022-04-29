const routes = [
    { href: "/signin", title: "signin" },
];

const usersRoutes = [
    { href: "/users/singin", title: "signin" },
    { href: "/users/new", title: "Register" },
];

let navLinks = function hello(req, res, next) {
    if (req.session.currentUser) {
        res.locals.routes = routes;
    } else {
        res.locals.routes = usersRoutes;
    }
    // locals
    next();
};

module.exports = navLinks