-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for kwizzard
CREATE DATABASE IF NOT EXISTS `kwizzard` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `kwizzard`;

-- Dumping structure for table kwizzard.course
CREATE TABLE IF NOT EXISTS `course` (
  `ID` varchar(7) NOT NULL,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table kwizzard.course: ~5 rows (approximately)
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` (`ID`, `title`) VALUES
	('CS111', 'Intro to Computing I'),
	('CS234', 'Intro to Database and Web Dev'),
	('CS314', 'Operating Systems'),
	('CS438', 'Artificial Intelligence'),
	('CS499', 'Software Development');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;

-- Dumping structure for table kwizzard.instructor
CREATE TABLE IF NOT EXISTS `instructor` (
  `ID` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `uID` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table kwizzard.instructor: ~2 rows (approximately)
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` (`ID`, `uID`, `password`, `name`, `email`) VALUES
	(0000000001, 'instruct1', 'abc123', 'Instructor 1', 'instruct1@siue.edu'),
	(0000000002, 'instruct2', 'def456', 'Instructor 2', 'instruct2@siue.edu');
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;

-- Dumping structure for table kwizzard.instructs
CREATE TABLE IF NOT EXISTS `instructs` (
  `course_ID` varchar(7) NOT NULL,
  `section` int(10) unsigned NOT NULL,
  `instructor_ID` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`course_ID`,`section`),
  KEY `FK_instructs_instructor` (`instructor_ID`),
  CONSTRAINT `FK_instructs_course` FOREIGN KEY (`course_ID`) REFERENCES `course` (`ID`),
  CONSTRAINT `FK_instructs_instructor` FOREIGN KEY (`instructor_ID`) REFERENCES `instructor` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table kwizzard.instructs: ~6 rows (approximately)
/*!40000 ALTER TABLE `instructs` DISABLE KEYS */;
INSERT INTO `instructs` (`course_ID`, `section`, `instructor_ID`) VALUES
	('CS111', 1, 0000000001),
	('CS314', 1, 0000000001),
	('CS499', 1, 0000000001),
	('CS234', 1, 0000000002),
	('CS234', 2, 0000000002),
	('CS438', 1, 0000000002);
/*!40000 ALTER TABLE `instructs` ENABLE KEYS */;

-- Dumping structure for table kwizzard.participant
CREATE TABLE IF NOT EXISTS `participant` (
  `ID` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `uID` int(10) unsigned zerofill NOT NULL,
  `course` varchar(7) NOT NULL,
  `section` int(11) unsigned NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_participant_user` (`uID`),
  KEY `FK_participant_instructs` (`course`,`section`),
  CONSTRAINT `FK_participant_instructs` FOREIGN KEY (`course`, `section`) REFERENCES `instructs` (`course_ID`, `section`),
  CONSTRAINT `FK_participant_user` FOREIGN KEY (`uID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table kwizzard.participant: ~8 rows (approximately)
/*!40000 ALTER TABLE `participant` DISABLE KEYS */;
INSERT INTO `participant` (`ID`, `uID`, `course`, `section`, `score`) VALUES
	(0000000003, 0000000001, 'CS499', 1, 10),
	(0000000004, 0000000002, 'CS234', 2, 15),
	(0000000005, 0000000003, 'CS438', 1, 20),
	(0000000006, 0000000004, 'CS111', 1, 19),
	(0000000007, 0000000004, 'CS234', 1, 17),
	(0000000008, 0000000003, 'CS499', 1, 14),
	(0000000009, 0000000002, 'CS314', 1, 12),
	(0000000010, 0000000001, 'CS111', 1, 8);
/*!40000 ALTER TABLE `participant` ENABLE KEYS */;

-- Dumping structure for table kwizzard.question
CREATE TABLE IF NOT EXISTS `question` (
  `ID` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `course` varchar(7) NOT NULL,
  `question` text NOT NULL,
  `choice1` varchar(255) NOT NULL,
  `choice2` varchar(255) NOT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `answer` int(11) NOT NULL,
  `asked` tinyint(4) NOT NULL,
  `difficulty` int(11) NOT NULL,
  `time` int(11) DEFAULT NULL,
  `dateToRelease` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_question_course` (`course`),
  CONSTRAINT `FK_question_course` FOREIGN KEY (`course`) REFERENCES `course` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;

-- Dumping data for table kwizzard.question: ~8 rows (approximately)
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` (`ID`, `course`, `question`, `choice1`, `choice2`, `choice3`, `choice4`, `answer`, `asked`, `difficulty`, `time`, `dateToRelease`) VALUES
	(0000000061, 'CS438', 'What is the first letter of the alphabet?', 'b', 'c', 'a', 'd', 3, 1, 4, 1, NULL),
	(0000000062, 'CS111', 'This database test is great', 'TRUE', 'FALSE', '', '', 1, 1, 1, 2, NULL),
	(0000000063, 'CS499', 'Can you do a flip?', 'Yes', 'No', 'Haven\'t tried', '', 2, 0, 4, 4, NULL),
	(0000000064, 'CS234', 'How should patients take their nitroglycerin sublingual tablet?', 'Under tongue', 'Nasal spray', 'Absorb through skin', 'Wrap it in a piece of cheese and eat it', 1, 1, 2, 4, NULL),
	(0000000065, 'CS314', 'Which is the best iterator variable name?', 'iter', 'iterator', 'myIterator', 'i', 4, 0, 3, 3, NULL),
	(0000000066, 'CS234', 'That last question was just a test', 'Okay', 'Really?', 'Of course!', 'I don\'t believe it', 3, 0, 2, 2, NULL),
	(0000000067, 'CS111', 'What should I have for lunch?', 'Soup', 'Sandwich', 'Pizza', 'No thanks I already ate', 2, 0, 1, 2, NULL),
	(0000000068, 'CS438', 'The toe bone\'s connected to the?', 'leg bone', 'ankle bone', 'knee bone', 'foot bone', 4, 0, 4, 1, NULL);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;

-- Dumping structure for table kwizzard.settings
CREATE TABLE IF NOT EXISTS `settings` (
  `uID` int(10) unsigned zerofill NOT NULL,
  `textNotif` tinyint(4) DEFAULT NULL,
  `emailNotif` tinyint(4) DEFAULT NULL,
  `vidDisp` tinyint(4) DEFAULT NULL,
  `imageDisp` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`uID`),
  CONSTRAINT `FK_settings_user` FOREIGN KEY (`uID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table kwizzard.settings: ~4 rows (approximately)
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` (`uID`, `textNotif`, `emailNotif`, `vidDisp`, `imageDisp`) VALUES
	(0000000001, 1, 1, 1, 1),
	(0000000002, 1, 1, 0, 1),
	(0000000003, 1, 0, 1, 1),
	(0000000004, 0, 0, 0, 0);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;

-- Dumping structure for table kwizzard.user
CREATE TABLE IF NOT EXISTS `user` (
  `ID` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `eID` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table kwizzard.user: ~4 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`ID`, `eID`, `password`, `name`, `email`, `phone`, `year`) VALUES
	(00000000001, 'braburk', 'def456', 'Brandon Burke', 'braburk@siue.edu', '111-111-1111', 1),
	(00000000002, 'nlayfie', 'ghi789', 'Nathan Layfield', 'nlayfie@siue.edu', '111-111-1112', 2),
	(00000000003, 'dbenke', 'jkl098', 'Daniel Benke', 'dbenke@siue.edu', '111-111-1113', 3),
	(00000000004, 'rfrohoc', 'mno765', 'Ryker Frohock', 'rfrohoc@siue.edu', '111-111-1114', 4);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
