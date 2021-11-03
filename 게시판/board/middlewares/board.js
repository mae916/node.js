const { alert } = required("../lib/common");

/**
 * 게시판 관련 유효성 검사
 */

const board = {
    /**
     * 게시판 작성 데이터 유효성 검사
     * 
     */
    writeValidator(req, res, next) {
        try {
        /** 필수 데이터 항목 S */
        //게시판 아이디 체크
        if (!req.params.id) {
            throw new Error("잘못된 접근 입니다."); //사용자가 알지 못하는 경로
        }
        const required = {
            gid : "잘못된 접근 입니다.", //사용자가 알지 못하는 경로
            poster : "작성자명을 입력하세요.",
            subject : "제목을 입력하세요.",
            content: "내용을 입력하세요.",
        };

        /**비회원 인경우 -> 게시글 수정 비밀번호 체크 */
        if (!req.isLogin) { //로그인 하지 않은 경우
            required.password = "글 수정 비밀번호를 입력하세요.";
        }

        for(key in required) { //키 값 필수
            if (!req.body[key]) { //키 값 없을 경우
                throw new Error(required[key]);
            }
        }

        /** 필수 데이터 항목 E */
    } catch (err) {
        return alert(err.message, res);
    }
        next();
    }
};

module.exports = board;