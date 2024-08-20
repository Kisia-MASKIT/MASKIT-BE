// srcs/video/video.sql.js
export const videoUpload = {
    INSERT_UPLOAD: "INSERT INTO UPLOAD (user_id, uploadTime) VALUES (?, ?)",
    FIND_VIDEO_PATHS: `
        SELECT upload_id, masked_video_path, subject_video_path, isDeleted, createdAt
        FROM UPLOAD
        WHERE upload_id = ?
    `,
    FIND_DETECTION_POINTS: `
        SELECT event_id, upload_id, start_time, end_time
        FROM EVENT
        WHERE upload_id = ?
    `,
    FIND_VIDEO_INFO: `
        SELECT upload_id, uploadTime, status
        FROM UPLOAD
        WHERE upload_id = ?
    `
};
