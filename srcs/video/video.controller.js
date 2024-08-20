// srcs/video/video.controller.js
import { VideoService } from "./video.service.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

export class VideoController {
    static async upload(req, res) {
        try {
            const userId = req.userId;
            const uploadTime = new Date().toISOString(); 
            const result = await VideoService.uploadVideo(userId, uploadTime);

            res.status(status.UPLOAD_VIDEO_SUCCESS.status).json(
                response({
                    isSuccess: status.UPLOAD_VIDEO_SUCCESS.isSuccess,
                    code: status.UPLOAD_VIDEO_SUCCESS.code,
                    message: status.UPLOAD_VIDEO_SUCCESS.message
                }, result)
            );
        } catch (error) {
            res.status(500).json(
                response({
                    isSuccess: false,
                    code: 500,
                    message: `서버 오류: ${error.message}`
                }, null)
            );
        }
    }

    static async downloadMaskVideo(req, res) {
        try {
            const { upload_id } = req.query;
            const result = await VideoService.getMaskedVideo(req.userId, upload_id);

            res.status(status.DOWNLOAD_VIDEO_SUCCESS.status).json(
                response({
                    isSuccess: status.DOWNLOAD_VIDEO_SUCCESS.isSuccess,
                    code: status.DOWNLOAD_VIDEO_SUCCESS.code,
                    message: "전체 마스킹 비디오 다운로드 완료되었습니다."
                }, result)
            );
        } catch (error) {
            res.status(500).json(
                response({
                    isSuccess: false,
                    code: 500,
                    message: `서버 오류: ${error.message}`
                }, null)
            );
        }
    }

    static async downloadSubjectVideo(req, res) {
        try {
            const { upload_id } = req.query;
            const result = await VideoService.getSubjectVideo(req.userId, upload_id);

            res.status(status.DOWNLOAD_VIDEO_SUCCESS.status).json(
                response({
                    isSuccess: status.DOWNLOAD_VIDEO_SUCCESS.isSuccess,
                    code: status.DOWNLOAD_VIDEO_SUCCESS.code,
                    message: "일부 마스킹 비디오 다운로드 완료되었습니다."
                }, result)
            );
        } catch (error) {
            res.status(500).json(
                response({
                    isSuccess: false,
                    code: 500,
                    message: `서버 오류: ${error.message}`
                }, null)
            );
        }
    }

    static async getDetectionResults(req, res) {
        try {
            const { upload_id } = req.query;
            const results = await VideoService.getDetectionPoints(req.userId, upload_id);

            res.status(status.VIDEO_INFO_SUCCESS.status).json(
                response({
                    isSuccess: status.VIDEO_INFO_SUCCESS.isSuccess,
                    code: status.VIDEO_INFO_SUCCESS.code,
                    message: "탐지 결과입니다."
                }, results)
            );
        } catch (error) {
            res.status(500).json(
                response({
                    isSuccess: false,
                    code: 500,
                    message: `서버 오류: ${error.message}`
                }, null)
            );
        }
    }

    static async getVideoInfo(req, res) {
        try {
            const { upload_id } = req.query;
            const result = await VideoService.getVideoInfo(req.userId, upload_id);

            if (result) {
                res.status(status.VIDEO_INFO_SUCCESS.status).json(
                    response({
                        isSuccess: true,
                        code: status.VIDEO_INFO_SUCCESS.code,
                        message: "영상 정보 조회 성공"
                    }, result)
                );
            } else {
                res.status(404).json(
                    response({
                        isSuccess: false,
                        code: 404,
                        message: "영상 정보 조회 실패: 정보가 없습니다."
                    }, {})
                );
            }
        } catch (error) {
            res.status(500).json(
                response({
                    isSuccess: false,
                    code: 500,
                    message: `서버 오류: ${error.message}`
                }, null)
            );
        }
    }
}
