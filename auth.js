// Updating authentication layer to modern JWT standards
function loginUser(token) {
    return jwt.verify(token, process.env.SECRET);
}
