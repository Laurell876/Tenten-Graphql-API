const validateToken = (authToken) => {
  // ... validate token and return a Promise, rejects in case of an error
  decodedToken = jwt.verify(authToken, "somesupersecretkey");
  return decodedToken;
};

const findUser = (authToken) => {
  //   return (tokenValidationResult) => {
  //     // ... finds user by auth token and return a Promise, rejects in case of an error
  //   };
  const userId = authToken.userId;
  return userId
};

const isAuthSubscription = (connectionParams) => {
  //console.log(connectionParams)
  if (connectionParams.authToken) {
    return validateToken(connectionParams.authToken)
      .then(findUser(connectionParams.authToken))
      .then((user) => {
          console.log(user)
        return {
          currentUser: "123",
        };
      });
  }

  //throw new Error("Missing auth token!");
};

module.exports = isAuthSubscription;
