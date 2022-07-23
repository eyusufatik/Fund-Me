
// only used after auth middleware
const onlyAdminVerifier = (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({ msg: 'Need to login first!' }) // if someone accidentally uses this funcion without auth() 
    }

    if (req.user.type === 1) {
        return next()
    }

    return res.status(400).json({ msg: 'Only admins can invoke this functionality!' })
}

module.exports = onlyAdminVerifier