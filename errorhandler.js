const errorhandler = (err, req, res, next) => {
        console.error("오류 발생:", err);
        res.status(err.status || 500);
        res.json({message: err.message || "서버 오류 발생",});
};
        
module.exports = errorhandler;
