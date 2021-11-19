const {
  sequelize,
  Article,
  User,
  Bookmark,
  History,
  Message
} = require('../src/models')

// on installe bluebird pour d'abord installer users et articles avant de pouvoir faire quoique ce soit
const Promise = require('bluebird')
const articles = require('./articles.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')
const histories = require('./histories.json')
const messages = require('./messages.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      articles.map(article => {
        Article.create(article)
      })
    )

    await Promise.all(
      bookmarks.map(bookmark => {
        Bookmark.create(bookmark)
      })
    )

    await Promise.all(
      histories.map(history => {
        History.create(history)
      })
    )

     await Promise.all(
      messages.map(message => {
        Message.create(message)
      })
    )
  })
