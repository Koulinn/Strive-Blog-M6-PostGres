
import { saveAuthors, getAuthorsList } from "../lib/services-aux.js";

export const createAvatar = async (req, res, next) => {
    try {
        const authors = await getAuthorsList()
        const author = authors.find(author => author.id === req.params.id)
        const filteredAuthors = authors.filter(author => author.id !== req.params.id)
        if(!author){
            res.status(404).send({message: `Author with ${req.params.id} is not found`})
        } else {
            const avatarAddedAuthor = {
                ...author,
                avatar: req.file.path
            }

            filteredAuthors.push(avatarAddedAuthor)
            await saveAuthors(filteredAuthors)
        
            res.status(201).send({added: true, body: avatarAddedAuthor})
        }
    } catch (error) {
        res.status(500).send({ message: error.message })

    }
}


const authorHandlers = {
    addAvatar : createAvatar
}

export default authorHandlers

