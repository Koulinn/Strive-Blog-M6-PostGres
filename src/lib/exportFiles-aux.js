import { Transform } from "json2csv";
import { pipeline } from "stream";
import {getAuthorsListAsReadableStream} from './services-aux.js'




export const sendAuthorCSVFile = (req, res, next) =>{
    try {
        res.setHeader("Content-Disposition", `attachment; filename=currentAuthorsList.csv`)
        const source = getAuthorsListAsReadableStream()
        const transform = new Transform({ fields: ['name', 'surname', 'email', 'birthday', 'avatar', 'id']})
        const destination = res
        pipeline(source, transform, destination, err=> {
            if(err) next(err)
        })
    } catch (error) {
        console.log(error)
        next(err)
    }
}