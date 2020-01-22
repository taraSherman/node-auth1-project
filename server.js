const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const morgan = require("morgan")
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)

const dbConfig = require('./database/db-config');
const authRouter = require("./auth/auth-router.js")
const usersRouter = require("./users/users-router.js")

const server = express()

server.use(helmet())
server.use(cors())
server.use(morgan('dev'))
server.use(express.json())
server.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'how secret can it really be when it is listed as the secret, anyway?',
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // in production, this should be true so the cookie header is encrypted
    secure: false
  },
  store: new KnexSessionStore({
    knex: dbConfig,
    createTable: true
  })
}))

server.use("/auth", authRouter)
server.use("/users", usersRouter)

server.get("/", (req, res, next) => {
  res.json({
    message: "Node Auth I Project",
  })
})

server.use((err, req, res, next) => {
  console.log('Error:', err)
  res.status(500).json({
    message: 'Something went wrong...'
  })
});

module.exports = server