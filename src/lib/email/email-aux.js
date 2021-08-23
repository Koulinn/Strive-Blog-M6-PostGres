import sgMail from '@sendgrid/mail'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { pipeline } from 'stream'
import fs from "fs-extra"
import { createPDFReadableStream } from '../../services/blogPosts/pdf-utils.js'
import { promisify } from "util"
import pkg from 'base64topdf'
const dirPath = dirname(fileURLToPath(import.meta.url))
const filePath = join(dirPath, "../../data/authorsFile.json")

const apiKey = `SG.${process.env.SENDGRID_API_KEY}`
sgMail.setApiKey(apiKey)

export const createPDFOnDisk = async (postData) => {
    const createSyncPipeline = promisify(pipeline)
    const path = join(dirname(fileURLToPath(import.meta.url)), `${postData.title}.pdf`)
    const pdfStream = await createPDFReadableStream(postData)
    await createSyncPipeline(pdfStream, fs.createWriteStream(path))
    return path
}



export const sendBlogConfirmationEmail = async (blogData) => {
    // console.log(pkg)
    try {
        const pdfPath = await createPDFOnDisk(blogData)
        const data = await pkg.base64Encode(pdfPath)
        const authors = JSON.parse(fs.readFileSync(filePath))
        console.log(authors, '<<authors')
        const author = authors.find(author => author.avatar === blogData.author.avatar)
        const msg = {
            to: author.email,
            from: process.env.SENDGRID_EMAIL,
            subject: `New Blog post created!!!`,
            text: `Your post ${blogData.title} was successfully created at ${blogData.createdAt}`,
            html: `Your post ${blogData.title} was successfully created at ${blogData.createdAt}`,
            attachments: [
                {
                    content: data.toString('base64'),
                    filename: `${blogData.title}.pdf`,
                    type: 'application/pdf',
                    disposition: 'attachment',
                    content_id: `${blogData._id}`,
                }]
        }

        await sgMail.send(msg)
    } catch (error) {
        console.log(error)
    }
}

