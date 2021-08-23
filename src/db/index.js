import  pkg from 'pg'
const {Client} = pkg
export const client = new Client ()
// await client.connect()
// const res = await client.query('SELECT * FROM public.authors')
// await client.query(`INSERT INTO strive_blog.authors(
// 	id, name, surname, birthday, avatar, email, password)
// 	VALUES ('sadsadasd', 'Rafa', 'Lima', '1987-11-03', 'random.url', 'drdverzola@gmail.com', '???????');
// `)

// console.log (res)
// await client.end()