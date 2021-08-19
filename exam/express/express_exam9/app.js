const express = require('express');
const nunjucks = require('nunjucks');
const multer = require('multer');
const path = require('path');
const { sequelize } = require('./models');

const app = express();

app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "views"), {
	express : app,
	watch : true,
});

sequelize.sync({force : false})
	.then(() => {
		console.log("데이터 연결 성공");
	})
	.catch((err) => {
		//만약 로거 있으면 로거에 기록
		console.error(err);
	});


const upload = multer({
	storage : multer.diskStorage({
		destination(req, file, done) { // 파일이 저장될 폴더명 
			// upload
			done(null, path.join(__dirname, "upload"));
		},
		filename(req, file, done) { // 파일이 저장되는 파일명 관련 설정
			/**
				file 객체 - 업로드된 파일 정보
						   - file.originalname - 원 파일 명
						   
						   - 파일 중복 방지
						   - timestamp -> 숫자 -> 1970.1.1 자정 -> 밀리초 단위로 센 숫자 
						   파일명_timesamp.확장자
						   new Date().getTime() 
						   Date.now() 
						   
						   path.basename() -> 파일명(확장자 포함)
						   path.basename("파일 경로", "확장자") -> 파일명(확장자 없는)
						   path.extname("파일 경로") -> 확장자
			*/
			const ext = path.extname(file.originalname);
			const filename = path.basename(file.originalname, ext);
			const newFileName = `${filename}_${Date.now()}${ext}`;
			done(null, newFileName);			
		}
	}),
	limits : { fileSize : 10 * 1024 * 1204 }, // 10MB 최대 업로드 용량
});

/**
	upload
		.single("name 명") - 단일 파일 업로드 
		.array("name 명") - 복수 파일 업로드( multiple 속성으로 여러개 업로드 하는 경우)
		.fields([{ name : "name명"}, { name : "name명" }]) - 복수 파일 업로드(각각의 name별로 업로드 하는 경우)
*/

app.post("/file1", upload.single("image"), (req, res) => {
	// 파일 정보 - 단일 파일 - req.file 
	console.log(req.file);
	return res.send("");
});

app.get("/file2", (req, res) => {
	return res.render("file2");
});

app.post("/file2", upload.array("images"), (req, res) => {
	// 복수개 파일 업로드 -> req.files 
	console.log(req.files);
	return res.send("");
});

app.get("/file3", (req, res) => {
	return res.render("file3");
});

app.post("/file3", upload.fields([{ name : "image1"}, { name : "image2" }]), (req, res) => {
	/** 복수개 파일 -> req.files */
	console.log(req.files);
	return res.send("");
});

app.get("/", (req,res) => {
	const list = [
		{ city :'인천', sigugun : '계양구' },
		{ city :'인천', sigugun : '서구' },
		{ city :'인천', sigugun : '미추홀구' }
	];
})

app.listen(3000, () => {
	console.log("서버 대기중...");
});