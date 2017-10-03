function logout_service(req, res, app) {
    res.clearCookie('reactjo_token')
    res.clearCookie('reactjo_id')
    res.clearCookie('reactjo_name')
    res.clearCookie('reactjo_is_staff')
    res.clearCookie('reactjo_is_superuser')
    res.clearCookie('reactjo_is_active')
    app.render(req, res, '/')
}

module.exports = { logout_service }
