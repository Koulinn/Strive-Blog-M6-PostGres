import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary} from 'cloudinary'



export const cloudinaryStorageBlogCover = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "Strive-Blog-Covers",
    },
})

export const cloudinaryStorageBlogAuthorAvatar = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "Strive-Blog-Avatar",
    },
})