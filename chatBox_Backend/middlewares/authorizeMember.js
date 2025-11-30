export const authorizeMemberDeletion = (req, res, next) => {
  const loggedInUser = req.user;
  const targetMemberId = req.params.id;

  if (!loggedInUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (loggedInUser.role === "admin") {
    return next();
  }

  if (loggedInUser.id === targetMemberId) {
    return next();
  }

  return res.status(403).json({ message: "Forbidden: insufficient permissions" });
};
