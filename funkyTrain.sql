-- MySQL dump 10.13  Distrib 5.1.41, for debian-linux-gnu (i486)
--
-- Host: localhost    Database: funkyTrain
-- ------------------------------------------------------
-- Server version	5.1.41-3ubuntu12.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;dif
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `beginEnd`
--

DROP TABLE IF EXISTS `beginEnd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `beginEnd` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game` set('satDef','animalFeederA','animalFeederB','wireTap','Concentration') COLLATE utf8_unicode_ci DEFAULT NULL,
  `highScore` int(11) DEFAULT NULL,
  `diffLevel` int(11) DEFAULT NULL,
  `trainingDay` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `levelsCompleted` int(11) DEFAULT NULL,
  `event` set('begin','end') COLLATE utf8_unicode_ci DEFAULT NULL,
  `user` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `completed`
--

DROP TABLE IF EXISTS `completed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `completed` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) DEFAULT NULL,
  `gid` int(11) DEFAULT NULL,
  `day` int(1) DEFAULT NULL,
  `servertime` timestamp NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `difficulty`
--

DROP TABLE IF EXISTS `difficulty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `difficulty` (
  `game` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `trials` int(11) NOT NULL,
  `fac1` int(11) NOT NULL,
  `fac2` int(11) NOT NULL,
  `fac3` int(11) NOT NULL,
  `minscore` int(11) NOT NULL,
  `maxscore` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `difficulty`
--

LOCK TABLES `difficulty` WRITE;
/*!40000 ALTER TABLE `difficulty` DISABLE KEYS */;
INSERT INTO `difficulty` (`game`, `level`, `trials`, `fac1`, `fac2`, `fac3`, `minscore`, `maxscore`) VALUES
(2, 1, 48, 1, 3, 6, 0, 250),
(2, 2, 48, 2, 3, 6, 250, 500),
(2, 3, 48, 3, 3, 6, 500, 750),
(2, 4, 48, 4, 3, 6, 750, 1000),
(2, 5, 48, 5, 3, 6, 1250, 1500),
(2, 6, 48, 6, 3, 6, 1500, 1750),
(1, 6, 48, 7, 25, 0, 1500, 1750),
(1, 1, 48, 2, 25, 0, 0, 300),
(1, 2, 48, 3, 25, 0, 300, 600),
(1, 3, 48, 4, 25, 0, 600, 900),
(1, 4, 48, 5, 25, 0, 900, 1200),
(1, 5, 48, 6, 25, 0, 1200, 1500),
(3, 1, 48, 1, 3, 6, 0, 250),
(3, 2, 48, 2, 3, 6, 250, 500),
(3, 3, 48, 3, 3, 6, 500, 750),
(3, 4, 48, 4, 3, 6, 750, 1000),
(3, 5, 48, 5, 3, 6, 1250, 1500),
(3, 6, 48, 6, 3, 6, 1500, 1750);
/*!40000 ALTER TABLE `difficulty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `gid` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `url` text COLLATE utf8_unicode_ci NOT NULL,
  `notes` longtext COLLATE utf8_unicode_ci NOT NULL,
  `levels` int(11) DEFAULT NULL,
  `controls` text COLLATE utf8_unicode_ci,
  `filename` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`gid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` (`gid`, `name`, `url`, `notes`, `levels`, `controls`, `filename`) VALUES
(1, 'Satellite Defender', 'games/gonogo.html', '<p>\r\nIn this game you will defend your city from bombs being dropped by invaders.  You can use your city''s satellite defense system to blow up dropping objects, but be careful because some of the objects are actually care packages from your allies.  But, because the invaders are tricky and just plain evil, they''ve disguised their bombs as care packages as well.  The only way to tell the difference is to wait until the package drops into range of your x-ray binoculars so that you can see inside.  You need to destroy all the bombs and keep all the care packages, otherwise your health points will go down.  To increase health, you need to get a care package.</p>\r\n<p>\r\nPress ''b'' to fire your weapon. You can only blow the package up while it''s inside the binoculars before making your decision</p>\r\n<p>The more points you score, the faster the game will go!  You can only score points while you''re at full health.</p>\r\n\r\nYou get points for:<br/>\r\nBlowing up bombs before they reach your city<br/>\r\nAllowing care packages to reach your city<br/>\r\n<br/>\r\nYou lose health for:<br/>\r\nBlowing up care packages before they reach your city<br/>\r\nAllowing bombs to reach your city<br/>', 5, 'Press the spacebar or ''b'' to fire your weapon. Wait until the package is inside the binoculars before making your decision', 'gonogo'),
(2, 'Alien Zookeeper 1', 'games/taskswitch.html', '<p>In this game you are a rookie zookeeper at the world''s first Alien Zoo.  You are caring for some Triangeloids and some Circlelidians.  Triangeloids and Circleidians are very fussy about what they eat.  Sometimes they only want to eat food that is the same shape as they are, and other times they only want to eat food that is the same colour as they are.  The cue at the top of their cage (the white letter) will tell you how to sort the food.  If the cue is a ''C'' then sort by colour, if the cue is a ''S'' then sort by shape.</p>\r\n\r\n<p>Press ''a'' to move the paddle left, ''k'' to move the paddle right</p>\r\n\r\n<p>The more points you score, the faster the game will go!  You can only score points while you''re at full health.</p>\r\n\r\nYou get points by:<br/>\r\nCorrectly sorting food<br/>\r\n<br/>\r\nYou lose health for:<br/>\r\nIncorrectly sorting food<br/>\r\nFailing to sort food at all<br/>', 5, 'Press ''a'' to move the paddle left, ''k'' to move the paddle right', 'taskswitch'),
(3, 'Alien Zookeeper 2', 'games/taskswitch2.html', '<p>In this game you are a rookie zookeeper at the world''s first Alien Zoo.  You are caring for some Big Squareons and some Small Squareons.  Both Big and Small Squareons are very fussy about what they eat.  Sometimes they only want to eat food that is the same size as they are, and other times they only want to eat food that has the same texture as they do.  The cue at the top of their cage (the white letter) will tell you how to sort the food.  If the cue is a ''T'' then sort by texture, if the cue is an ''S'' then sort by size.</p>\r\n\r\n<p>Press ''a'' to move the paddle left, ''k'' to move the paddle right</p>\r\n\r\n<p>The more points you score, the faster the game will go!  You can only score points while you''re at full health.</p>\r\n\r\nYou get points by:<br/>\r\nCorrectly sorting food<br/>\r\n<br/>\r\nYou lose health for:<br/>\r\nIncorrectly sorting food<br/>\r\nFailing to sort food at all<br/>', 5, 'Press ''a'' to move the paddle left, ''k'' to move the paddle right', 'taskswitch2'),
(4, 'Task Switch', 'games/simple_taskswitch.html', '<p>If the cue is an ''S'' then sort by shape, if the cue is a ''C'' then sort by colour.</p><p>Press ''a'' to sort left, ''k'' to sort right</p>', 5, 'Press ''a'' to sort left, ''k'' to sort right', 'taskswitch2');

/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `hid` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) DEFAULT NULL,
  `trainingTime` int(11) DEFAULT NULL,
  `trainingDay` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `gid` int(11) DEFAULT NULL,
  `highScore` int(11) DEFAULT NULL,
  `diffLevel` int(11) DEFAULT NULL,
  PRIMARY KEY (`hid`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `leveInfo`
--

DROP TABLE IF EXISTS `leveInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `leveInfo` (
  `game` set('ts','ri','wt','cc','zk') COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `speed` int(11) DEFAULT NULL,
  `stimList` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leveInfo`
--

LOCK TABLES `leveInfo` WRITE;
/*!40000 ALTER TABLE `leveInfo` DISABLE KEYS */;
INSERT INTO `leveInfo` VALUES ('',1,1,NULL),('',2,1,NULL),('',3,2,NULL),('',4,2,NULL),('wt',1,20,NULL),('wt',2,18,NULL),('wt',3,16,NULL),('wt',4,14,NULL);
/*!40000 ALTER TABLE `leveInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level`
--

DROP TABLE IF EXISTS `level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `level` (
  `user` int(11) DEFAULT NULL,
  `game` int(11) DEFAULT NULL,
  `day` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `results` (
  `uid` int(11) NOT NULL,
  `game` int(11) NOT NULL,
  `trial` int(11) NOT NULL,
  `value` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `score` varchar(20) COLLATE utf8_unicodeci DEFAULT NULL,
  `ts` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `training`
--

DROP TABLE IF EXISTS `training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `training` (
  `tpid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `end` int(11) NOT NULL,
  `start` int(11) NOT NULL,
  `pre` int(11) NOT NULL,
  `post` int(11) NOT NULL,
  `preGames` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `postGames` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `trainingGames` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `training` varchar(22) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`tpid`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training`
--

LOCK TABLES `training` WRITE;
/*!40000 ALTER TABLE `training` DISABLE KEYS */;
INSERT INTO `training` VALUES (4,'Task Switch Training',7,1,1,7,'1,2','1,2','2','2,3,4,5,6'),
(5,'Go/Nogo Training',7,1,1,7,'1,2','1,2','1','2,3,4,5,6'),
(6,'funkyPilot',21,1,1,21,'1,2','1,2','3','4,7,10,13,16,19');
/*!40000 ALTER TABLE `training` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(44) COLLATE utf8_unicode_ci NOT NULL,
  `currentTraining` int(11) NOT NULL,
  `pastTraining` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `lastLogin` datetime NOT NULL,
  `start` date NOT NULL,
  `consented` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test1','test1',6,'','0000-00-00 00:00:00','0000-00-00',NULL),(2,'test2','test2',6,'','0000-00-00 00:00:00','0000-00-00',NULL),(3,'ricky','ricky',6,'','0000-00-00 00:00:00','0000-00-00',NULL),(4,'katie','katie',6,'','0000-00-00 00:00:00','0000-00-00',NULL),(5,'xian','xian',6,'','0000-00-00 00:00:00','0000-00-00',NULL),(6,'bruce','bruce',6,'','0000-00-00 00:00:00','0000-00-00',NULL),(0,'admin','admin',6,'','0000-00-00 00:00:00','0000-00-00',NULL),(8,'keegan','keegan',6,'0','0000-00-00 00:00:00','0000-00-00',NULL),(9,'coffee','coffee',6,'0','0000-00-00 00:00:00','0000-00-00',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-10-11 15:21:14
