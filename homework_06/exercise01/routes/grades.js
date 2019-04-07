var express = require('express');
const createError = require('http-errors');
var router = express.Router();
const grades = {};
let idCounter = 0;
const OK_RESULT= {result:"OK"}
function clone(obj)
{
	return JSON.parse(JSON.stringify(obj));
}
function wrapResult(obj){
	return {result: obj};
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(Object.keys(grades).length===0?204:200).send(wrapResult(grades));
});
router.post('/', function(req, res, next) {
	const newGradeEntity = clone(req.body);
	newGradeEntity.id = ++idCounter;
	grades[newGradeEntity.id]=newGradeEntity;
	res.status(201).send(wrapResult(newGradeEntity))
});
function precheckId(req, res, next){
	const id = req.params.id;
	if(id in grades)
	{
		req.gradeId = id;
		next();
	} else{
		next(createError(404));
	}
}
router.get('/:id', precheckId, function(req, res, next) {
		res.status(200).send({result:grades[req.gradeId]});
});
router.put('/:id', precheckId, function(req, res, next){
	// update data by merging object
	 Object.assign(grades[req.gradeId], clone(req.body));
	res.status(202).send(OK_RESULT)
});
router.delete('/:id', precheckId, function(req, res, next){
	// Delete grade;
	delete grades[req.gradeId];
	res.status(200).send(OK_RESULT)
});

module.exports = router;
