// srcs/user/user.controller.js
import { UserService } from "./user.service.js";
import { UserDTO } from "./user.dto.js";
import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js"; // Import the response utility function

export class UserController {
  static async signUp(req, res) {
    try {
      const { email, password } = req.body;
      const userDTO = new UserDTO(email, password);
      const user = await UserService.signUp(userDTO.email, userDTO.password);
      
      // Use the response function to format the response
      res.status(status.SIGNUP_SUCCESS.status).json(
        response({
          isSuccess: status.SIGNUP_SUCCESS.isSuccess,
          code: status.SIGNUP_SUCCESS.code,
          message: status.SIGNUP_SUCCESS.message
        }, user) // Pass 'user' as the result
      );
    } catch (error) {
      res.status(400).json(
        response({
          isSuccess: false,
          code: null,
          message: error.message
        }, null) // Pass 'null' as the result in case of error
      );
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const userDTO = new UserDTO(email, password);
      const { user, token } = await UserService.login(userDTO.email, userDTO.password);

      // Set access token in the header
      res.setHeader('Authorization', `Bearer ${token}`);

      // Use the response function to format the response
      res.status(status.LOGIN_SUCCESS.status).json(
        response({
          isSuccess: status.LOGIN_SUCCESS.isSuccess,
          code: status.LOGIN_SUCCESS.code,
          message: status.LOGIN_SUCCESS.message
        }, user) 
      );
    } catch (error) {
      res.status(401).json(
        response({
          isSuccess: false,
          code: null,
          message: error.message
        }, null) 
      );
    }
  }
}
