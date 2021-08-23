import express from 'express'
import cors from 'cors'
import authorsRouter from './src/services/authors/index.js'
import blogPostRouter from './src/services/blogPosts/index.js'
import exportFilesRouter from './src/services/exportFiles/index.js'
import { notFoundErrorHandler, badRequestErrorHandler, serverErrorHandler } from './errorHandlers.js'
import { authorsImgFdrPath, blogPostsImgFdrPath } from './src/lib/server-aux.js'
import { client } from './src/db/index.js'



const server = express()

const port = process.env.PORT
// Middlewares that are called for every request

// Set trustable origin
const listTrustableOrigins = [process.env.FE_DEV_TRUST_URL, process.env.FE_PROD_TRUST_URL]

const setCorsConfig = {
    origin: function(origin, callback){
        if(!origin || listTrustableOrigins.includes(origin)){
            callback(null, true)
        } else{
            callback(new Error('Origin not allowed'))
        }
    }
}

await client.connect()
const res = await client.query('SELECT * FROM strive_blog.authors')
await client.query(`INSERT INTO strive_blog.authors(
	name, surname, birthday, avatar, email, password)
	VALUES ('Rafa', 'Lima', '1987-11-03', 'random.url', 'drdverzola@gmail.com', 'random')
`)

console.log (res)
await client.end()


server.use(express.static(authorsImgFdrPath))
server.use(express.static(blogPostsImgFdrPath))
server.use(cors(setCorsConfig)) // to connect with the front-end
server.use(express.json({limit:"50mb"})) // to allow body being read


// router
server.use('/authors', authorsRouter)
server.use('/blogPost', blogPostRouter)
server.use('/exportFiles', exportFilesRouter)

// Middlewares that are called for errors (status code 400, 500, 300)
server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(serverErrorHandler)


server.listen(port, ()=>{
    console.log('Server running =D port ' + port)
}) // to make the server listen at the specified port

// add error

// console.table(listEndpoints(server)) // to check endpoints
server.on("error", (error)=>
    console.log('Error due' + error))