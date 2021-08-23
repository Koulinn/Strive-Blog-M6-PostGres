import express from "express";
import {sendAuthorCSVFile} from '../../lib/exportFiles-aux.js'

const exportFilesRouter = express.Router()

exportFilesRouter.get('/authors/download', sendAuthorCSVFile)

export default exportFilesRouter