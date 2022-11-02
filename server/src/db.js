const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    // 몽고 드라이버의 업데이트된 URL 스트링 파서 사용
    mongoose.set('useNewUrlParser', true);
    // findAndModify() 대신 findOneAndUpdate() 사용
    mongoose.set('useFindAndModify', false);
    // ensureIndex() 대신 createIndex() 사용
    mongoose.set('useCreateIndex', true);
    // 새로운 서버 디스커버리 및 모니터링 엔진 사용
    mongoose.set('useUnifiedTopology', true);
    // DB 연결
    mongoose.connect(DB_HOST);
    // 연결 실패시 에러 로깅
    mongoose.connection.on('error', err => {
      console.erroe(err);
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.'
      );
      process.exit();
    });
  },

  close: () => {
    mongoose.connection.close();
  }
};
