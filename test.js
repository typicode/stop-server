var request = require('supertest')
var server = require('./')

request('http://localhost:5709').get('/').expect(200, function(err){
  if (err) throw err
  process.exit()
})
