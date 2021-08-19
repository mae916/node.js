const Sequelize = require('sequelize'); // Sequelize 생성자, 생정자와 함수를 구분하기 위해 생성자는 맨 앞글자를 대문자씀
const env = process.env.NODE_ENV||'development' //서비스중(production) 또는 개발중(development) 인지 명시

const config = require("../config/config.json")[env]; //.json 생략 가능 - DB 접속 정보 설정을 가져옴([env])

// DB 접속을 하기 위한 sequelize 인스턴스를 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);

//sequelize 인스턴스 -> DB 연결, SQL 실행
//Sequelize 생성자 속성 QueryTypes는 SQL 실행시 SQl 종류를 명시하는 상수
//외부에서는 sequelize 인스턴스, Sequelize 생성자 둘다 모두 사용
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; //밖으로 내보내는 작업


/*
위의 코드는 아래 코드를 단순화 한것

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
*/
