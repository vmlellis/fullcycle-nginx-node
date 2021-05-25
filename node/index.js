const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createSql = `CREATE TABLE IF NOT EXISTS people(
  id int not null auto_increment, name VARCHAR(255), primary key(id))`
console.log(createSql)
connection.query(createSql)

app.get('/', (req, res) => {
  html = '<h1>Full Cycle</h1>'

  const faker = require('faker')
  const firstName = faker.name.firstName();

  const sql = `INSERT INTO people(name) VALUES('` + firstName + `')`
  connection.query(sql)

  connection.query('SELECT name FROM people', function(err, rows, fields) {
    if (rows.length > 0) {
      html += '<div>Nomes cadastrados:</div>'
      html += '<ul>'
      for(i = 0; i < rows.length; i++) {
        html += '<li>' + rows[i]['name'] + '</li>'
      }
      html += '</ul>'
    }

    res.send(html)
  })
})

app.listen(port, ()=> {
  console.log('Rodando na porta ' + port)
})
