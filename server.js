/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-11 20:26:59
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-11 20:37:12
 */


/*
npm i nodemon -g
nodemon server.js
node server.js
*/
const express = require('express')

const app = express()

app.use(express.static('build', { maxAge: 1000 * 3600 }))

app.listen(4000)