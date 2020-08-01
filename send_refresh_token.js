


module.exports = (res, token) => {
    return res.cookie( // send refresh token as user
      "refresh_token",
      token,
      {
        httpOnly: true,
        path:"/refresh_token"
      }
    ) // first parameter is a random id name, the second param is the actual token, the fourth param are options for the cookie itself
}