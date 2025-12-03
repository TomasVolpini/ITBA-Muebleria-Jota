export const getUserProfile = (req, res) => {
  res.json({ message: `Bienvenido al perfil, ${req.user.username}` });
};
