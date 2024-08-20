// srcs/user/user.model.js
import { pool } from "../../config/db.js";
import { BaseError } from "../../config/error.js";
import { userSignUp } from "./user.sql.js";

export class UserModel {
  static async createUser(email, password) {
    try {
      const [result] = await pool.query(userSignUp.INSERT_USER, [email, password]);
      return result.insertId;
    } catch (error) {
      console.log(error);
      throw new BaseError({ message: "회원가입 중 오류 발생", error });
    }
  }

  static async findUserByEmailAndPassword(email, password) {
    try {
      const [rows] = await pool.query(userSignUp.FIND_USER_BY_EMAIL_AND_PASSWORD, [email, password]);
      return rows[0]; // Assuming that the result is an array of users
    } catch (error) {
      console.log(error);
      throw new BaseError({ message: "로그인 실패", error });
    }
  }
}
