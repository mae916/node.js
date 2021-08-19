const { sequelize, Sequelize : { QueryTypes } } = require('./index')

//member model

const member = {
  //회원가입 처리
  async join(data) {
    /*
    sequelize.query(sql, {
      replacements : sql 바인딩 데이터,
      type : QueryTypes.SELECT | INSERT | UPDATE | DELETE
    });
    */
   try {
      const sql = `INSERT INTO member (memId, memPw, memNm)
                  VALUES(?,?,?)`;

      const result = await sequelize.query(sql, {
                      replcements : [data.memId, data.memPw, data.memNm],
                      type : QueryTypes.INSERT,

    });
    console.log("result",result);
  } catch(err) {
    console.error(err);
  }
  }
};




module.exports = member;




/*
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