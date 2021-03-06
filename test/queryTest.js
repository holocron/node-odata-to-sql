require('should')
var define = require('../lib/define.js')
var query = require('../lib/query.js')
var model = require('./model')
var sql = require('sql')

describe('query', function () {
  var table

  beforeEach(function () {
    var tables = define(model, 'mssql', '')
    table = sql.define(tables[0])
  })

  it('should create plain one', function () {
    query(table, {}, 'users', model).text.should.be.eql('SELECT [UserType].* FROM [UserType]')
  })

  it('should support paging', function () {
    query(table, {
      $skip: 5,
      $limit: 10,
      $sort: {_id: 1}
    }, 'users', model).text.should.be.eql('SELECT [UserType].* FROM [UserType] ORDER BY [UserType].[_id] OFFSET 5 ROWS FETCH NEXT 10 ROWS ONLY')
  })

  it('should support filtering', function () {
    query(table, {
      $filter: {'_id': 'foo'}
    }, 'users', model).text.should.be.eql('SELECT [UserType].* FROM [UserType] WHERE ([UserType].[_id] = @1)')
  })

  it('should support projection', function () {
    query(table, {
      $select: {'_id': 1}
    }, 'users', model).text.should.be.eql('SELECT [UserType].[_id] FROM [UserType]')
  })
})
