var expect = require('chai').expect;
var manual = require('../..');

describe('manual:', function() {
  it('should sanitize value (escape hyphens)', function(done) {
    expect(manual.sanitize('-')).to.eql('\\-');
    done();
  });
  it('should strip file extension', function(done) {
    expect(manual.strip('program.1')).to.eql('program');
    done();
  });
  it('should strip parentheses', function(done) {
    expect(manual.strip('program(1)')).to.eql('program');
    done();
  });
  it('should return invalid value', function(done) {
    expect(manual.strip(undefined)).to.eql(undefined);
    done();
  });
  it('should end with man section', function(done) {
    expect(manual.ends('program.1')).to.eql(true);
    done();
  });
  it('should not end with man section', function(done) {
    expect(manual.ends('program.10')).to.eql(false);
    done();
  });
  it('should match man section', function(done) {
    expect(manual.match('1')).to.eql(true);
    done();
  });
  it('should not match man section', function(done) {
    expect(manual.match('txt')).to.eql(false);
    done();
  });
  it('should get header by key', function(done) {
    expect(manual.header(manual.NAME)).to.eql('NAME');
    done();
  });
  it('should get header alias by key', function(done) {
    expect(manual.header(manual.SEE)).to.eql('SEE ALSO');
    done();
  });
  it('should return invalid key', function(done) {
    expect(manual.header('invalid')).to.eql('invalid');
    done();
  });
  it('should get section title', function(done) {
    expect(manual.section('1')).to.eql(manual.sections[0]);
    done();
  });
  it('should return default section title', function(done) {
    expect(manual.section('xxx')).to.eql(manual.sections[0]);
    done();
  });
  it('should throw error on invalid options', function(done) {
    function fn() {
      manual.preamble({});
    }
    expect(fn).throws(TypeError);
    done();
  });
  it('should get document preamble (title)', function(done) {
    var date = new Date().toISOString();
    var expected ='.TH \"PROGRAM\" \"1\" \"'
      + date
      + '\" \"program 1.0\" \"User Commands\"\n';
    expect(manual.preamble({title: 'program(1)', date: date})).to.eql(expected);
    done();
  });
  it('should get document preamble (name)', function(done) {
    var date = new Date().toISOString();
    var expected ='.TH \"PROGRAM\" \"1\" \"'
      + date
      + '\" \"program 1.0\" \"User Commands\"\n.SH \"NAME\"\nprogram\n';
    expect(manual.preamble({name: 'program(1)', date: date})).to.eql(expected);
    done();
  });
  it('should get document preamble (comment)', function(done) {
    var comment = 'DO NOT MODIFY THIS FILE';
    var date = new Date().toISOString();
    var expected = '.\\" DO NOT MODIFY THIS FILE\n'
      + '.TH \"PROGRAM\" \"1\" \"'
      + date
      + '\" \"program 1.0\" \"User Commands\"\n';
    expect(
      manual.preamble({title: 'program(1)', date: date, comment: comment}))
      .to.eql(expected);
    done();
  });
  it('should get document preamble (name and title)', function(done) {
    var date = new Date().toISOString();
    var expected ='.TH \"MY PROGRAM\" \"1\" \"'
      + date
      + '\" \"program 0.0.1\" \"User Commands\"\n.SH \"NAME\"\nprogram\n';
    expect(
      manual.preamble(
        {name: 'program(1)', title:'My Program', version: '0.0.1', date: date}
      )).to.eql(expected);
    done();
  });
  it('should include description)', function(done) {
    var date = new Date().toISOString();
    var expected ='.TH \"MY PROGRAM\" \"1\" \"'
      + date
      + '\" \"program 0.0.1\" \"User Commands\"\n.SH \"NAME\"\nprogram \\- '
      + 'My program description\n';
    expect(
      manual.preamble(
        {
          name: 'program(1)',
          title:'My Program',
          version: '0.0.1',
          description: 'My program description',
          date: date}
      )).to.eql(expected);
    done();
  });
})
