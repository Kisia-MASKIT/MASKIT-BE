// srcs/user/user.service.js
import jwt from 'jsonwebtoken'; // 추가
import { UserModel } from "./user.model.js";
import { BaseError } from "../../config/error.js";

const JWT_SECRET = process.env.JWT_SECRET; // 환경 변수에서 비밀 키 로드

export class UserService {
  static async signUp(email, password) {
    try {
      const userId = await UserModel.createUser(email, password);
      return { userId, email }; // Ensure this matches the expected format
    } catch (error) {
      throw new BaseError({ message: "회원가입 중 오류 발생", error });
    }
  }

  static async login(email, password) {
    try {
      const user = await UserModel.findUserByEmailAndPassword(email, password);
      if (!user) {
        throw new BaseError({ message: "잘못된 이메일 또는 비밀번호" });
      }

      // 액세스 토큰 생성
      const token = jwt.sign({ userId: user.user_id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

      return { user, token }; // Ensure this matches the expected format
    } catch (error) {
      console.log(error);
      throw new BaseError({ message: "로그인 중 오류 발생", error });
    }
  }
}
