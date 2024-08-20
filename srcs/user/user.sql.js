// srcs/user/user.sql.js
export const userSignUp = {
  INSERT_USER: "INSERT INTO USER (email, password) VALUES (?, ?)",
  FIND_USER_BY_EMAIL_AND_PASSWORD: "SELECT * FROM USER WHERE email = ? AND password = ?",
};
