import { v2 as cloudinary } from 'cloudinary';
import { UPLOAD_API_KEY, UPLOAD_API_SECRET, UPLOAD_CLOUD_NAME } from '@/config';

cloudinary.config({
  cloud_name: UPLOAD_CLOUD_NAME,
  api_key: UPLOAD_API_KEY,
  api_secret: UPLOAD_API_SECRET,
});

export const uploadFile = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'dumbways-be-task-2',
  });
};

export const deleteFile = async (fileURL: string) => {
  return await cloudinary.api.delete_resources([fileURL], {
    type: 'upload',
  });
};
