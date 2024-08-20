// srcs/video/video.service.js
import { VideoModel } from "./video.model.js";
import { BaseError } from "../../config/error.js";

export class VideoService {
    static async uploadVideo(userId, uploadTime) {
        try {
            const result = await VideoModel.createUpload(userId, uploadTime);
            return result;
        } catch (error) {
            throw new BaseError({ message: "영상 업로드 서비스 오류", error });
        }
    }


  static async getMaskedVideo(userId, video_id) {
    try {
      const result = await VideoModel.getVideoPaths(video_id);
      if (result) {
        return {
          vid_id: result.vid_id,
          mask_video_path: result.masked_video_path,
          isDeleted: result.isDeleted,
          createdAt: result.createdAt
        };
      } else {
        return null;
      }
    } catch (error) {
      throw new BaseError({ message: "전체 마스킹 비디오 조회 오류", error });
    }
  }

  static async getSubjectVideo(userId, video_id) {
    try {
      const result = await VideoModel.getVideoPaths(video_id);
      if (result) {
        return {
          vid_id: result.vid_id,
          subject_video_path: result.subject_video_path,
          isDeleted: result.isDeleted,
          createdAt: result.createdAt
        };
      } else {
        return null;
      }
    } catch (error) {
      throw new BaseError({ message: "일부 마스킹 비디오 조회 오류", error });
    }
  }

  static async getDetectionPoints(userId, video_id) {
    try {
      const result = await VideoModel.findDetectionPoints(video_id);
      return result;
    } catch (error) {
      throw new BaseError({ message: "탐지 지점 조회 오류", error });
    }
  }

  static async getVideoInfo(user_id, video_id) {
    try {
      const result = await VideoModel.findVideoInfo(video_id);
      return result;
    } catch (error) {
      throw new BaseError({ message: "영상 정보 조회 서비스 오류", error });
    }
  }
}
