const jwt = require("jsonwebtoken");

const checkToken = async (token, id, key) => jwt.verify(token, key, (err, decoded) =>{
		if(decoded){
			if(decoded.id==id){
				return true;
			}else{
				return false;
			}
		}
		return false;
	});

const setToken = async (id,key) => {
	console.log(id);
	if (id) {
		return jwt.sign({id }, key, { expiresIn: 28800});
	}
	return false;
};

module.exports = {checkToken, setToken};