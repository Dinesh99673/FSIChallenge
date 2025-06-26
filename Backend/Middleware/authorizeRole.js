//Cecking weather the user is allowed for perticular operation/API call or not
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ msg: 'Access Denied: User have no Permissions' });
    }

    next();
  };
};

export default authorizeRole;