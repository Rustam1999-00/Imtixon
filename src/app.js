
const http = require('http')
const Io = require('./utls/Io.js')
const Users = new Io("./db/todo.json")
const person = require('./utls/person')
const Todo = require('./model/Todo')
const fs = require('fs')



const reqvests = async (req, res) => {

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')


    //post
    if (req.url === '/todo' && req.method === "POST") {
        try {

            req.body = await person(req)
            const { text, title } = req.body
            const users = await Users.read()
            console.log(person);

            // const findUser = await  users.find((el)=> el.text === text)
            // if (!findUser) return ("User not found")

            const id = (users[users.length - 1]?.id || 0) + 1

            const date = new Date()

            const newUser = new Todo(id, text, title, date)

            const data = users.length ? [...users, newUser] : [newUser]


            Users.write(data)

            res.writeHead(200)
            res.end(JSON.stringify({ massage: "Saccesssfull" }))
        } catch (error) {
            console.log(error);
        }
    }

    else if (req.url === "/get" && req.method === "GET") {
        const users = await Users.read()
        res.writeHead(200)
        res.end(JSON.stringify(users));
    }

    // delete
    else if (req.url === "/todo" && req.method === "DELETE") {
        try {
            req.body = await person(req)
            const { id } = req.body
            const users = await Users.read()
            const db = []

             users.map((el) => {
                if (el.id !== id) {
                    db.push(el)
                }
            })
            Users.write(db)
            res.writeHead(200)
            res.end(JSON.stringify({ massaged: true }))
        } catch (error) {
            console.log(error);
        }




    }

    // title o'zgartirish
    else if (req.url === "/todo" && req.method === "PUT") {
        const users = await Users.read()
        res.body = await person(req)
        const { id, text, title } = res.body
        const findUser = users.find((el) => el.id === id)

        if (!findUser) {
            res.writeHead(403)
            res.end(JSON.stringify({ massage: "User not found" }))
        }

        const db = []
        users.find((el) => {
            if (el.id === id) {
                el.text = text,
                    el.title = title
                    db.push(el)
            }
        })
        Users.write(db)
        res.writeHead(200)
        res.end(JSON.stringify({ massaged: true }))
    }

    // id ko'rish
    else if (req.url === "/id" && req.method === "GET") {
        const users = await Users.read()
        res.body = await person(req)
        const { id, text, title } = res.body
        const db = []
        users.find((el) => {
            if (el.id === id) {
                
                    db.push(el)
            }
        })
        res.end(JSON.stringify(db))
    }
}



http.createServer(reqvests).listen(3500)