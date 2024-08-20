// srcs/video/video.model.js
import { pool } from "../../config/db.js";
import { BaseError } from "../../config/error.js";
import { videoUpload } from "./video.sql.js";

export class VideoModel {
    static async createUpload(user_id, upload_id, uploadTime) {
        try {
            const [result] = await pool.query(videoUpload.INSERT_UPLOAD, [user_id, uploadTime]);
            return {
                upload_id,
                uploadTime
            };
        } catch (error) {
            console.log(error);
            throw new BaseError({ message: "영상 업로드 중 오류 발생", error });
        }
    }

    static async getVideoPaths(upload_id) {
        try {
            const [rows] = await pool.query(videoUpload.FIND_VIDEO_PATHS, [upload_id]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            throw new BaseError({ message: "비디오 경로 조회 중 오류 발생", error });
        }
    }

    static async findDetectionPoints(upload_id) {
        try {
            const [rows] = await pool.query(videoUpload.FIND_DETECTION_POINTS, [upload_id]);
            return rows;
        } catch (error) {
            console.log(error);
            throw new BaseError({ message: "탐지 지점 조회 중 오류 발생", error });
        }
    }

    static async findVideoInfo(upload_id) {
        try {
            const [rows] = await pool.query(videoUpload.FIND_VIDEO_INFO, [upload_id]);
            return rows[0];
        } catch (error) {
            console.log(error);
            throw new BaseError({ message: "영상 정보 조회 중 오류 발생", error });
        }
    }
}
