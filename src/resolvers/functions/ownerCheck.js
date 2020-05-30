

const ownerCheck= (context, listing) =>{
    const isOwner = listing.owner == context.userId
    if (!isOwner) {
      throw new Error("User does not have required permissions");
    }
}

module.exports = ownerCheck