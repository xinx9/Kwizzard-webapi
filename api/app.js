const mariadb = require('mariadb/callback');
const express = require('express');
const bodyparser = require('body-parser');
var app = express(bodyparser.json());
const conn = mariadb.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'kwizzard',
	multipleStatements: true
});

conn.connect(err => {
	if (err)
		console.log("not connected due to error: " + err);
	else
		console.log("connected");
});

app.listen(3000, () => console.log("express server is running on port 3000"));



//##########################################################################
// COURSE CONNECTION
//##########################################################################

//############################################
// COURSE GET ALL COURSES
//############################################
app.get('/course', (req, res) => {
	conn.query("SELECT * FROM course", (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// COURSE GET A SINGLE COURSE
//############################################
app.get('/course/:id', (req, res) => {
	conn.query("SELECT * FROM course WHERE ID = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// COURSE DELETE COURSE
//############################################
app.get('/course/:id', (req, res) => {
	conn.query("DELETE * FROM course WHERE ID = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send("DELETED COURSE");
		else
			console.log(err);
	})
});


//############################################
// COURSE PUT
//############################################
app.put('/course', (req, res) => {
	let course = req.body;
	var sqlcmd = "SET @ID=?; SET @title;CALL courseAddOrUpdate(@ID,@title);";
		conn.query(sqlcmd, [course.title], (err, rows, meta) => {
			if (!err)
				rows.forEach(element => {
					if (element.constructor == Array)
						res.send('Inserted ID: ' + element[0].ID);
				});
			else
				console.log(err);
		})
});


//############################################
// COURSE UPDATE
//############################################
app.put('/course', (req, res) => {
	let course = req.body;
	var sqlcmd = "SET @ID=?; SET @title;CALL courseAddOrUpdate(@ID,@title);";
		conn.query(sqlcmd, [course.title], (err, rows, meta) => {
			if (!err)
				res.send('Update successfully');
			else
				console.log(err);
		})
});


//##########################################################################
// INSTRUCTOR CONNECTION
//##########################################################################

//############################################
// INSTRUCTOR GET ALL INSTRUCTORS
//############################################
app.get('/instructor', (req, res) => {
	conn.query("SELECT * FROM instructor", (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// INSTRUCTOR GET A SINGLE INSTRUCTORS
//############################################
app.get('/instructor/:id', (req, res) => {
	conn.query("SELECT * FROM instructor WHERE ID = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// INSTRUCTOR DELETE INSTRUCTOR
//############################################
app.delete('/instructor/:id', (req, res) => {
	conn.query("DELETE * FROM instructor WHERE iD = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// INSTRUCTOR PUT INSTRUCTORS
//############################################
app.put('/instructor', (req, res) => {
	let instr = req.body;
	var sqlcmd = "SET @ID=?;SET uID=?;SET @password=?;SET @name=?, SET @email=?;\
	CALL instructorAddOrUpdate(@ID,@uID,@password,@name,@email)";
		conn.query(sqlcmd, [instr.ID, instr.uID, instr.password, instr.name, instr.email], (err, rows, meta) => {
			if (!err)
				rows.forEach(element => {
					if (element.constructor == Array)
						res.send('Inserted ID: ' + element[0].ID);
				});
			else
				console.log(err);
		})
});


//############################################
// INSTRUCTOR UPDATE
//############################################
app.put('/instructor', (req, res) => {
	let instr = req.body;
	var sqlcmd = "SET @ID=?;SET uID=?;SET @password=?;SET @name=?, SET @email=?;\
	CALL instructorAddOrUpdate(@ID,@uID,@password,@name,@email)";
		conn.query(sqlcmd, [instr.ID, instr.uID, instr.password, instr.name, instr.email], (err, rows, meta) => {
			if (!err)
				res.send('Update successfully');
			else
				console.log(err);
		})
});


//##########################################################################
// INSTRUCTS CONNECTION
//##########################################################################

//############################################
// INSTRUCTS GET ALL INSTRUCTSS
//############################################
app.get('/instructs', (req, res) => {
	conn.query("SELECT * FROM instructs", (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// INSTRUCTS GET A SINGLE INSTRUCTSS
//############################################
app.get('/instructs/:id', (req, res) => {
	conn.query("SELECT * FROM instructs WHERE ID = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// INSTRUCTS DELETE INSTRUCTS
//############################################
app.delete('/instructs/:id', (req, res) => {
	conn.query("DELETE * FROM instructs WHERE iD = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// INSTRUCTS PUT INSTRUCTSS
//############################################
app.put('/instructs', (req, res) => {
	let instruct = req.body;
	var sqlcmd = "SET @course_ID=?;SET @section=?;SET instructor_ID;\
	CALL instructsAddOrUpdate(@course_ID,@section,@instructor_ID);";
		conn.query(sqlcmd, [instruct.course_ID, instruct.section, instruct.instructor_ID], (err, rows, meta) => {
			if (!err)
				rows.forEach(element => {
					if (element.constructor == Array)
						res.send('Inserted ID: ' + element[0].ID);
				});
			else
				console.log(err);
		})
});


//############################################
// INSTRUCTS UPDATE
//############################################
app.put('/instructs', (req, res) => {
	let instruct = req.body;
	var sqlcmd = "SET @course_ID=?;SET @section=?;SET instructor_ID;\
	CALL instructsAddOrUpdate(@course_ID,@section,@instructor_ID);";
		conn.query(sqlcmd, [instruct.course_ID, instruct.section, instruct.instructor_ID], (err, rows, meta) => {
			if (!err)
				res.send('Update successfully');
			else
				console.log(err);
		})
});


//##########################################################################
// PARTICIPANTS CONNECTION
//##########################################################################

//############################################
// PARTICIPANTS GET ALL PARTICIPANTSS
//############################################
app.get('/participant', (req, res) => {
	conn.query("SELECT * FROM participant", (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// PARTICIPANTS GET A SINGLE PARTICIPANTSS
//############################################
app.get('/participant/:id', (req, res) => {
	conn.query("SELECT * FROM participant WHERE ID = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// PARTICIPANTS DELETE PARTICIPANTS
//############################################
app.delete('/participant/:id', (req, res) => {
	conn.query("DELETE * FROM participant WHERE iD = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// PARTICIPANTS PUT PARTICIPANTSS
//############################################
app.put('/participant', (req, res) => {
	let pit = req.body;
	var sqlcmd = "SET @ID=?;SET @uID=?;SET @course=?;SET @section=?; \
	CALL participantAddOrUpdate(@ID,@uID,@course,@section,@score);";
		conn.query(sqlcmd, [pit.ID, pit.uID, pit.course, pit.section], (err, rows, meta) => {
			if (!err)
				rows.forEach(element => {
					if (element.constructor == Array)
						res.send('Inserted ID: ' + element[0].ID);
				});
			else
				console.log(err);
		})
});


//############################################
// PARTICIPANTS UPDATE
//############################################
app.put('/participant', (req, res) => {
	let pit = req.body;
	var sqlcmd = "SET @ID=?;SET @uID=?;SET @course=?;SET @section=?;\
	CALL participantAddOrUpdate(@ID,@uID,@course,@section,@score);";
		conn.query(sqlcmd, [pit.ID, pit.uID, pit.course, pit.section], (err, rows, meta) => {
			if (!err)
				res.send('Update successfully');
			else
				console.log(err);
		})
});


//##########################################################################
// QUESTION CONNECTION
//##########################################################################

//############################################
// QUESTION GET ALL QUESTIONS
//############################################
app.get('/question', (req, res) => {
	conn.query("SELECT * FROM question", (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// QUESTION GET A SINGLE QUESTIONS
//############################################
app.get('/question/:id', (req, res) => {
	conn.query("SELECT * FROM question WHERE ID = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// QUESTION DELETE QUESTION
//############################################
app.delete('/question/:id', (req, res) => {
	conn.query("DELETE * FROM question WHERE iD = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// QUESTION PUT QUESTIONS
//############################################
app.put('/question', (req, res) => {
	let quest = req.body;
	var sqlcmd = "SET @ID=?;SET @course=?;SET @question=?;SET @choice1=?;SET @choice2=?;SET @choice3=?;\
	SET @choice4=?;SET @answer=?;SET @asked=?;SET @difficulty=?;SET @time=?;SET @dateToRelease=?;\
	CALL questionAddOrUpdate(@ID,@course,@question,@choice1,@choice2,@choice3,@choice4,@answer,@asked,@difficulty,@time,@dateToRelease);";
		conn.query(sqlcmd, [quest.ID, quest.course, quest.question, quest.choice1, quest.choice2, quest.choice3, 
			quest.choice4, quest.answer, quest.asked, quest.difficulty, quest.time, quest.dateToRelease], (err, rows, meta) => {
			if (!err)
				rows.forEach(element => {
					if (element.constructor == Array)
						res.send('Inserted ID: ' + element[0].ID);
				});
			else
				console.log(err);
		})
});


//############################################
// QUESTION UPDATE
//############################################
app.put('/question', (req, res) => {
	let quest = req.body;
	var sqlcmd = "SET @ID=?;SET @course=?;SET @question=?;SET @choice1=?;SET @choice2=?;SET @choice3=?;\
	SET @choice4=?;SET @answer=?;SET @asked=?;SET @difficulty=?;SET @time=?;SET @dateToRelease=?;\
	CALL questionAddOrUpdate(@ID,@course,@question,@choice1,@choice2,@choice3,@choice4,@answer,@asked,@difficulty,@time,@dateToRelease);";
		conn.query(sqlcmd, [quest.ID, quest.course, quest.question, quest.choice1, quest.choice2, quest.choice3, 
			quest.choice4, quest.answer, quest.asked, quest.difficulty, quest.time, quest.dateToRelease], (err, rows, meta) => {
			if (!err)
				res.send('Update successfully');
			else
				console.log(err);
		})
});


//##########################################################################
// SETTINGS CONNECTION
//##########################################################################

//############################################
// SETTINGS GET ALL SETTINGS
//############################################
app.get('/settings', (req, res) => {
	conn.query("SELECT * FROM settings", (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// SETTINGS GET SINGLE SETTINGS
//############################################
app.get('/settings/:id', (req, res) => {
	conn.query("SELECT * FROM settings WHERE ID = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// SETTINGS DELETE
//############################################
app.delete('/settings/del/:id', (req, res) => {
	conn.query('DELETE FROM settings WHERE ID = ?', [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send('Delete successful');
		else
			console.log(err);
	})
});


//############################################
// SETTINGS POST
//############################################
app.put('/settings', (req, res) => {
	let setting = req.body;
	var sqlcmd = "SET @uID=?;SET @textNotif=?;SET @emailNotif=?;SET @vidDisp=?;SET imageDisp=?;\
	CALL settingsUpdate(@uID,@textNotif,@emailNotif,@vidDisp,@imageDisp);";
		conn.query(sqlcmd, [setting.uID, setting.textNotif, setting.emailNotif, setting.vidDisp, setting.imageDisp], (err, rows, meta) => {
			if (!err)
				rows.forEach(element => {
					if (element.constructor == Array)
						res.send('Inserted ID: ' + element[0].ID);
				});
			else
				console.log(err);
		})
});


//############################################
// SETTINGS UPDATE
//############################################
app.put('/settings', (req, res) => {
	let setting = req.body;
	var sqlcmd = "SET @uID=?;SET @textNotif=?;SET @emailNotif=?;SET @vidDisp=?;SET imageDisp=?;\
	CALL settingsUpdate(@uID,@textNotif,@emailNotif,@vidDisp,@imageDisp);";
		conn.query(sqlcmd, [setting.uID, setting.textNotif, setting.emailNotif, setting.vidDisp, setting.imageDisp], (err, rows, meta) => {
			if (!err)
				res.send('Update successfully');
			else
				console.log(err);
		})
});


//##########################################################################
// USER CONNECTION
//##########################################################################

//############################################
// USER GET ALL USER
//############################################
app.get('/user', (req, res) => {
	conn.query("SELECT * FROM user", (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// USER GET SINGLE USER
//############################################
app.get('/user/:id', (req, res) => {
	conn.query("SELECT * FROM user WHERE ID = ?", [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send(rows);
		else
			console.log(err);
	})
});


//############################################
// USER DELETE
//############################################
app.delete('/user/del/:id', (req, res) => {
	conn.query('DELETE FROM user WHERE ID = ?', [req.params.id], (err, rows, meta) => {
		if (!err)
			res.send('Delete successful');
		else
			console.log(err);
	})
});


//############################################
// USER POST
//############################################
app.put('/user', (req, res) => {
	let usr = req.body;
	var sqlcmd = "SET @ID=?;SET @eID=?;SET @password=?;SET @name=?;SET @email=?;SET @phone=?;SET @year=?;\
	CALL userAddOrEdit(@ID,@eID,@password,@name,@email,@phone,@year);";
		conn.query(sqlcmd, [usr.ID, usr.eID, usr.password, usr.name, usr.email, usr.phone, usr.year], (err, rows, meta) => {
			if (!err)
				rows.forEach(element => {
					if (element.constructor == Array)
						res.send('Inserted ID: ' + element[0].ID);
				});
			else
				console.log(err);
		})
});


//############################################
// USER UPDATE
//############################################
app.put('/user', (req, res) => {
	let usr = req.body;
	var sqlcmd = "SET @ID=?;SET @eID=?;SET @password=?;SET @name=?;SET @email=?;SET @phone=?;SET @year=?;\
	CALL userAddOrEdit(@ID,@eID,@password,@name,@email,@phone,@year);";
		conn.query(sqlcmd, [usr.ID, usr.eID, usr.password, usr.name, usr.email, usr.phone, usr.year], (err, rows, meta) => {
			if (!err)
				res.send('Update successfully');
			else
				console.log(err);
		})
});
