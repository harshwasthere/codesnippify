import imageCompression from "browser-image-compression";
import { createClient } from "../client";
import { v4 as uuidv4 } from "uuid";

interface UploadImgToStorageProps {
    file: File;
    bucket: string;
    folder?: string;
}

export async function uploadImgToStorage({ file, bucket, folder }: UploadImgToStorageProps) {
    const fileName = file.name;
    const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
    const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`;

    try {
        file = await imageCompression(file, {
            maxSizeMB: 1,
        });
    } catch (error) {
        return { image_url: null, error };
    }

    const { storage } = createClient();

    const { data, error } = await storage.from(bucket).upload(path, file);
    if (error) return { image_url: null, error };

    const image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data?.path}`;
    return { image_url, error: null };
}

export async function deleteImgFromStorage(image_url: string) {
    const bucketAndPathString = image_url.split("/storage/v1/object/public/")[1];
    const firstSlashIndex = bucketAndPathString.indexOf("/");

    const bucket = bucketAndPathString.slice(0, firstSlashIndex);
    const path = bucketAndPathString.slice(firstSlashIndex + 1);

    const { storage } = createClient();

    const { data, error } = await storage.from(bucket).remove([path]);

    if (error) {
        return { data: null, error };
    }

    return { data, error: null };
}
