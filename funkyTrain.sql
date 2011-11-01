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
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
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
-- Dumping data for table `beginEnd`
--

LOCK TABLES `beginEnd` WRITE;
/*!40000 ALTER TABLE `beginEnd` DISABLE KEYS */;
/*!40000 ALTER TABLE `beginEnd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `completed`
--

DROP TABLE IF EXISTS `completed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `completed` (
  `sid` int(11) DEFAULT NULL,
  `gid` int(11) DEFAULT NULL,
  `day` int(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `completed`
--

LOCK TABLES `completed` WRITE;
/*!40000 ALTER TABLE `completed` DISABLE KEYS */;
INSERT INTO `completed` VALUES (5,2,1),(2,2,1),(0,1,9),(0,1,16);
/*!40000 ALTER TABLE `completed` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `difficulty` VALUES (2,1,48,2,3,6,0,350),(2,2,48,3,3,6,350,700),(2,3,48,4,3,6,700,1050),(2,4,48,5,3,6,1050,1400),(2,5,48,6,3,6,1750,2100),(2,6,48,7,3,6,2100,2450),(2,7,48,8,3,6,2450,2800),(2,8,48,9,3,6,2800,3150),(2,9,48,10,3,6,3150,3500),(2,10,48,11,3,6,3850,4200),(1,1,48,2,25,0,0,350),(1,2,48,6,25,0,350,700),(1,3,48,8,30,0,700,1050),(1,4,48,12,30,0,1050,1400);
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
INSERT INTO `games` VALUES (1,'Satellite Defender','games/gonogo.html','In this game you will defend your city from bombs being dropped by invaders.  You can use your city\'s satellite defense system to blow up dropping objects, but be careful because some of the objects are actually care packages from your allies.  But, because the invaders are tricky and just plain evil, they\'ve disguised their bombs as care packages as well.  The only way to tell the difference is to wait until the package drops into range of your x-ray binoculars so that you can see inside.\r\n\r\nYou get points for:\r\nBlowing up bombs before they reach your city\r\nAllowing care packages to reach your city\r\n\r\nYou lose points for:\r\nBlowing up care packages before they reach your city\r\nAllowing bombs to reach your city',5,'Press the spacebar or \'b\' to fire your weapon. Wait until the package is inside the binoculars before making your decision','gonogo'),(2,'Alien Zookeeper','games/taskswitch.html','In this game you are a rookie zookeeper at the world\'s first Alien Zoo.  You are caring for some Triangeloids and some Circlelidians.  Triangeloids and Circleidians are very fussy about what they eat.  Sometimes they only want to eat food that is the same shape as they are, and other times they only want to eat food that is the same colour as they are.  The cue at the top of their cage (the white letter) will tell you how to sort the food.  If the cue is a \'C\' then sort by colour, if the cue is a \'S\' then sort by shape.\r\n\r\nYou get points by...\r\nCorrectly sorting food\r\n\r\nYou lost points by...\r\nIncorrectly sorting food\r\nFailing to sort food at all',2,' Press \'a\' to move the paddle left, \'k\' to move the paddle right','taskswitch');
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
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,1,NULL,1,NULL,2,100,1),(2,1,NULL,2,NULL,2,200,2),(3,1,NULL,1,NULL,1,400,1),(4,2,NULL,1,NULL,1,400,1),(5,2,NULL,2,NULL,1,300,1),(6,6,NULL,2,NULL,1,300,1);
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (3,2,0,74,2),(3,2,0,74,3),(3,2,0,74,4),(3,2,0,74,2),(3,2,0,74,3),(3,2,0,74,4),(3,2,0,159,5),(3,2,0,74,2),(3,2,0,74,3),(3,2,0,74,4),(3,2,0,159,5),(3,2,0,321,6),(3,2,0,162,2),(3,2,0,162,2),(3,2,0,246,3),(3,2,0,162,2),(3,2,0,246,3),(3,2,0,246,4),(3,2,0,162,2),(3,2,0,246,3),(3,2,0,246,4),(3,2,0,328,5),(3,2,0,162,2),(3,2,0,246,3),(3,2,0,246,4),(3,2,0,328,5),(3,2,0,405,6),(3,2,0,168,2),(3,2,0,168,2),(3,2,0,168,3),(3,2,0,168,2),(3,2,0,168,3),(3,2,0,168,4),(3,2,0,168,2),(3,2,0,168,3),(3,2,0,168,4),(3,2,0,168,5),(3,2,0,82,2),(3,2,0,82,2),(3,2,0,82,3),(3,2,0,259,2),(3,2,0,259,2),(3,2,0,345,3),(3,2,0,0,1),(3,2,0,0,1),(3,2,0,0,2),(3,2,0,0,1),(3,2,0,0,2),(3,2,0,0,3),(3,2,0,95,1),(3,2,0,95,1),(3,2,0,262,2),(3,2,0,78,1),(3,2,0,78,1),(3,2,0,78,2),(3,2,0,162,1),(3,2,0,162,1),(3,2,0,162,2),(3,2,0,162,1),(3,2,0,162,2),(3,2,0,256,3),(3,2,0,0,1),(3,2,0,0,1),(3,2,0,0,1),(3,2,0,165,2),(3,2,0,0,1),(3,2,0,165,2),(3,2,0,165,3),(3,2,0,0,1),(3,2,0,168,1),(3,2,0,168,1),(3,2,0,244,2),(3,2,0,0,1),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,84,13),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,84,13),(3,2,0,84,14),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,84,13),(3,2,0,84,14),(3,2,0,84,15),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,84,13),(3,2,0,84,14),(3,2,0,84,15),(3,2,0,84,16),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,84,13),(3,2,0,84,14),(3,2,0,84,15),(3,2,0,84,16),(3,2,0,84,17),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,84,13),(3,2,0,84,14),(3,2,0,84,15),(3,2,0,84,16),(3,2,0,84,17),(3,2,0,84,18),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,84,13),(3,2,0,84,14),(3,2,0,84,15),(3,2,0,84,16),(3,2,0,84,17),(3,2,0,84,18),(3,2,0,84,19),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,84,13),(3,2,0,84,14),(3,2,0,84,15),(3,2,0,84,16),(3,2,0,84,17),(3,2,0,84,18),(3,2,0,84,19),(3,2,0,84,20),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,84,13),(3,2,0,84,14),(3,2,0,84,15),(3,2,0,84,16),(3,2,0,84,17),(3,2,0,84,18),(3,2,0,84,19),(3,2,0,84,20),(3,2,0,84,21),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,84,13),(3,2,0,84,14),(3,2,0,84,15),(3,2,0,84,16),(3,2,0,84,17),(3,2,0,84,18),(3,2,0,84,19),(3,2,0,84,20),(3,2,0,84,21),(3,2,0,84,22),(3,2,0,0,1),(3,2,0,84,2),(3,2,0,84,3),(3,2,0,84,4),(3,2,0,84,5),(3,2,0,84,6),(3,2,0,84,7),(3,2,0,84,8),(3,2,0,84,9),(3,2,0,84,10),(3,2,0,84,11),(3,2,0,84,12),(3,2,0,84,13),(3,2,0,84,14),(3,2,0,84,15),(3,2,0,84,16),(3,2,0,84,17),(3,2,0,84,18),(3,2,0,84,19),(3,2,0,84,20),(3,2,0,84,21),(3,2,0,84,22),(3,2,0,84,23),(3,2,0,161,1),(3,2,0,161,1),(3,2,0,243,2),(3,2,0,83,1),(3,2,0,83,1),(3,2,0,83,2),(3,2,0,83,1),(3,2,0,83,2),(3,2,0,83,3),(3,2,0,83,1),(3,2,0,83,2),(3,2,0,83,3),(3,2,0,83,4),(4,2,0,242,1),(4,2,0,242,1),(4,2,0,242,2),(4,2,0,242,1),(4,2,0,242,2),(4,2,0,327,3),(4,2,0,242,1),(4,2,0,242,2),(4,2,0,327,3),(4,2,0,327,4),(4,2,0,161,1),(4,2,0,161,1),(4,2,0,392,2),(4,2,0,162,1),(4,2,0,162,1),(4,2,0,322,2),(4,2,0,92,1),(4,2,0,92,1),(4,2,0,178,2),(4,2,0,92,1),(4,2,0,178,2),(4,2,0,178,2),(4,2,0,0,1),(4,2,0,0,1),(4,2,0,86,2),(4,2,0,0,0),(4,2,0,0,0),(4,2,0,0,0),(4,2,0,0,0),(4,2,0,0,0),(4,2,0,0,0),(4,2,1,0,0),(4,2,1,0,0),(4,2,1,0,0),(4,2,1,0,0),(4,2,1,0,0),(6,2,1,0,0),(4,2,1,84,1),(4,2,1,84,1),(4,2,1,247,2),(3,2,1,-51,1),(3,2,1,-51,1),(3,2,1,-51,2),(4,2,1,-10,1),(4,2,1,-10,1),(4,2,1,-10,2),(4,2,1,100,1),(8,1,3,114,1),(8,1,3,195,1),(8,1,3,195,1),(8,1,3,345,2),(8,1,4,145,1),(6,2,1,2,1),(6,2,1,4,1),(6,1,2,145,1),(5,2,1,23,1),(5,2,1,17,1),(5,2,1,4,1),(5,2,1,4,1),(5,2,1,8,2),(2,2,1,0,1),(2,2,1,0,1),(2,2,1,2,2),(6,2,3,0,1),(6,2,3,0,1),(6,2,20,23,1),(6,1,21,60,1),(6,1,21,60,1),(6,1,21,81,2),(6,1,26,42,1),(6,1,26,84,1),(6,2,33,0,1),(6,2,33,0,1),(6,1,78,3693,1),(6,1,78,3693,1),(6,1,92,4125,1),(6,1,92,4145,1);
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;

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
  `score` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
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
INSERT INTO `training` VALUES (4,'Task Switch Training',7,1,1,7,'1,2','1,2','2','2,3,4,5,6'),(5,'Go/Nogo Training',7,1,1,7,'1,2','1,2','1','2,3,4,5,6'),(6,'funkyPilot',42,1,1,42,'1,2','1,2','1','8,15,22,29,36');
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
INSERT INTO `users` VALUES (1,'test1','test1',0,'','0000-00-00 00:00:00','0000-00-00',NULL),(2,'test2','test2',0,'','0000-00-00 00:00:00','0000-00-00',NULL),(3,'ricky','ricky',4,'','0000-00-00 00:00:00','0000-00-00',NULL),(4,'katie','katie',4,'','0000-00-00 00:00:00','0000-00-00',NULL),(5,'xian','xian',5,'','0000-00-00 00:00:00','0000-00-00',NULL),(6,'bruce','bruce',5,'','0000-00-00 00:00:00','0000-00-00',NULL),(0,'admin','admin',5,'','0000-00-00 00:00:00','0000-00-00',NULL),(8,'keegan','keegan',5,'0','0000-00-00 00:00:00','0000-00-00',NULL),(9,'coffee','coffee',4,'0','0000-00-00 00:00:00','0000-00-00',NULL);
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
