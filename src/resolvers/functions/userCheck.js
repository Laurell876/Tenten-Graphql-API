

const userCheck = async (context, user) => {
    if(context.userId != user._id) {
        throw new Error("User does not have permission to perform this action")
    }
}

module.exports = userCheck