import User from "../models/user.model";
import createError from "http-errors";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return next(createError(400, "Todos los campos son requeridos"));
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(createError(409, "Este email ya está registrado"));
    }

    const newUser = new User({ username, email, password, role });
    await newUser.save();

    const { password: _, ...userObj } = newUser.toObject();
    res.status(201).json(userObj);
  } catch (err) {
    console.error("SignUp error:", err.message);
    next(createError(500, `Error al crear usuario: ${err.message}`));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createError(400, "Email y contraseña son requeridos"));
  }

  try {
    const user = await User.findOne({ email }).select("+password"); //el modelo User tiene "select: false" en password, por eso el .select
    if (!user) return next(createError(401, "Credenciales inválidas"));

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) return next(createError(401, "Credenciales inválidas"));

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    next(createError(500, `Error al iniciar sesión: ${err.message}`));
  }
};

// export const name = async (req, res, next) => {
//   try {
//   } catch (err) {}
// };
