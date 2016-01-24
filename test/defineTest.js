require('should')
var define = require('../lib/define.js')

var model = require('./model')

describe('define', function () {
  it('should create correct sql define object', function () {
    var def = define(model, 'mssql', '')

    var table = def[0]
    table.should.have.property('columns')
    table.columns.should.have.length(5)

    table.columns[0].name.should.be.eql('_id')
    table.columns[0].dataType.should.be.eql('varchar(max)')

    table.columns[1].name.should.be.eql('date')
    table.columns[1].dataType.should.be.eql('datetime')

    table.columns[2].name.should.be.eql('int')
    table.columns[2].dataType.should.be.eql('integer')

    table.columns[3].name.should.be.eql('bool')
    table.columns[3].dataType.should.be.eql('bit')

    table.columns[4].name.should.be.eql('address_street')
    table.columns[4].dataType.should.be.eql('varchar(max)')
  })

  it('foo', function () {
    var def = define(model, 'mssql', '')
    var sql = require('sql')
    sql.setDialect('mssql')

    sql.define(def[0]).create().toQuery().text.should.be.eql('CREATE TABLE [UserType] ([_id] varchar(max), [date] datetime, [int] integer, [bool] bit, [address_street] varchar(max))')
  })
})