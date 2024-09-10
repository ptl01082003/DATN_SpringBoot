-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: datn
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `addressId` int NOT NULL AUTO_INCREMENT,
  `cityCode` int DEFAULT NULL,
  `wardCode` int DEFAULT NULL,
  `districtCode` int DEFAULT NULL,
  `cityName` varchar(255) DEFAULT NULL,
  `wardName` varchar(255) DEFAULT NULL,
  `districtName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneNumber` int DEFAULT NULL,
  `recipientName` varchar(255) DEFAULT NULL,
  `defaults` varchar(255) DEFAULT NULL,
  `customerID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`addressId`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `users` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `brandId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`brandId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'MLB','2024-07-26 14:37:41','2024-07-26 14:37:47'),(2,'Nike','2024-07-26 14:38:47','2024-07-26 14:38:47'),(3,'Balenciaga','2024-07-26 14:40:16','2024-07-26 14:40:16'),(4,'Adidas','2024-07-26 14:40:36','2024-07-26 14:40:36'),(5,'Puma','2024-07-26 14:41:12','2024-07-26 14:41:12'),(6,'Vans','2024-07-26 14:41:29','2024-07-26 14:41:29'),(7,'Converse','2024-07-26 14:41:50','2024-07-26 14:41:50');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cartItemId` int NOT NULL AUTO_INCREMENT,
  `productDetailId` int DEFAULT NULL,
  `cartId` int DEFAULT NULL,
  `quanity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`cartItemId`),
  KEY `productDetailId` (`productDetailId`),
  KEY `cartId` (`cartId`),
  CONSTRAINT `cart_items_ibfk_337` FOREIGN KEY (`productDetailId`) REFERENCES `product_details` (`productDetailId`) ON UPDATE CASCADE,
  CONSTRAINT `cart_items_ibfk_338` FOREIGN KEY (`cartId`) REFERENCES `shopping_carts` (`cartId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `conversationId` int NOT NULL AUTO_INCREMENT,
  `senderId` int DEFAULT NULL,
  `receiverId` int DEFAULT NULL,
  `lastMessageId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`conversationId`),
  KEY `senderId` (`senderId`),
  KEY `receiverId` (`receiverId`),
  KEY `lastMessageId` (`lastMessageId`),
  CONSTRAINT `conversations_ibfk_127` FOREIGN KEY (`senderId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_128` FOREIGN KEY (`receiverId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE,
  CONSTRAINT `conversations_ibfk_129` FOREIGN KEY (`lastMessageId`) REFERENCES `messages` (`messagesId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites_list`
--

DROP TABLE IF EXISTS `favorites_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `favorites_list_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites_list`
--

LOCK TABLES `favorites_list` WRITE;
/*!40000 ALTER TABLE `favorites_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `imageId` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`imageId`),
  KEY `productId` (`productId`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (162,'public/Uploads/image-102367061241.png',180334,'2024-07-30 11:43:28','2024-07-30 11:43:28'),(163,'public/Uploads/image-102090354840.png',180334,'2024-07-30 11:43:28','2024-07-30 11:43:28'),(164,'public/Uploads/image-101673276163.png',180334,'2024-07-30 11:43:28','2024-07-30 11:43:28'),(165,'public/Uploads/image-103952440163.png',180334,'2024-07-30 11:43:28','2024-07-30 11:43:28'),(166,'public/Uploads/image-103626869852.png',180334,'2024-07-30 11:43:28','2024-07-30 11:43:28'),(167,'public/Uploads/image-100384781114.png',185894,'2024-07-30 11:43:37','2024-07-30 11:43:37'),(168,'public/Uploads/image-101904756198.png',185894,'2024-07-30 11:43:37','2024-07-30 11:43:37'),(169,'public/Uploads/image-104145147323.png',185894,'2024-07-30 11:43:37','2024-07-30 11:43:37'),(170,'public/Uploads/image-103598595347.png',185894,'2024-07-30 11:43:37','2024-07-30 11:43:37'),(171,'public/Uploads/image-100361604785.png',185894,'2024-07-30 11:43:37','2024-07-30 11:43:37'),(182,'public/Uploads/image-104037228412.webp',108523,'2024-08-06 15:27:26','2024-08-06 15:27:26'),(183,'public/Uploads/image-100437342011.webp',108523,'2024-08-06 15:27:26','2024-08-06 15:27:26'),(184,'public/Uploads/image-102072053440.webp',108523,'2024-08-06 15:27:26','2024-08-06 15:27:26'),(185,'public/Uploads/image-100061065760.webp',108523,'2024-08-06 15:27:26','2024-08-06 15:27:26'),(186,'public/Uploads/image-102498368614.png',108523,'2024-08-06 15:27:26','2024-08-06 15:27:26'),(192,'public/Uploads/image-100335694452.webp',111141,'2024-08-06 15:35:07','2024-08-06 15:35:07'),(193,'public/Uploads/image-102704239177.webp',111141,'2024-08-06 15:35:07','2024-08-06 15:35:07'),(194,'public/Uploads/image-104066459705.webp',111141,'2024-08-06 15:35:07','2024-08-06 15:35:07'),(195,'public/Uploads/image-102203844807.webp',111141,'2024-08-06 15:35:07','2024-08-06 15:35:07'),(196,'public/Uploads/image-101107837578.webp',111141,'2024-08-06 15:35:07','2024-08-06 15:35:07'),(202,'public/Uploads/image-101544315659.webp',127775,'2024-08-06 16:53:07','2024-08-06 16:53:07'),(203,'public/Uploads/image-102913569507.webp',127775,'2024-08-06 16:53:07','2024-08-06 16:53:07'),(204,'public/Uploads/image-103640349612.webp',127775,'2024-08-06 16:53:07','2024-08-06 16:53:07'),(205,'public/Uploads/image-102929938495.webp',127775,'2024-08-06 16:53:07','2024-08-06 16:53:07'),(206,'public/Uploads/image-100075382203.webp',127775,'2024-08-06 16:53:07','2024-08-06 16:53:07'),(211,'public/Uploads/image-100705605760.webp',128185,'2024-08-06 16:59:19','2024-08-06 16:59:19'),(212,'public/Uploads/image-101278673554.webp',128185,'2024-08-06 16:59:19','2024-08-06 16:59:19'),(213,'public/Uploads/image-102045966942.webp',128185,'2024-08-06 16:59:19','2024-08-06 16:59:19'),(214,'public/Uploads/image-103465352431.webp',128185,'2024-08-06 16:59:19','2024-08-06 16:59:19'),(215,'public/Uploads/image-103760357034.webp',128185,'2024-08-06 16:59:19','2024-08-06 16:59:19'),(216,'public/Uploads/image-100894265307.avif',144899,'2024-08-06 17:03:11','2024-08-06 17:03:11'),(217,'public/Uploads/image-103462588707.avif',144899,'2024-08-06 17:03:11','2024-08-06 17:03:11'),(218,'public/Uploads/image-102913325159.avif',144899,'2024-08-06 17:03:11','2024-08-06 17:03:11'),(219,'public/Uploads/image-103764605083.avif',144899,'2024-08-06 17:03:11','2024-08-06 17:03:11'),(220,'public/Uploads/image-100099728115.avif',144899,'2024-08-06 17:03:11','2024-08-06 17:03:11'),(221,'public/Uploads/image-101278263432.avif',153469,'2024-08-06 17:05:47','2024-08-06 17:05:47'),(222,'public/Uploads/image-102384357269.avif',153469,'2024-08-06 17:05:47','2024-08-06 17:05:47'),(223,'public/Uploads/image-102689275966.avif',153469,'2024-08-06 17:05:47','2024-08-06 17:05:47'),(224,'public/Uploads/image-104040527981.avif',153469,'2024-08-06 17:05:47','2024-08-06 17:05:47'),(225,'public/Uploads/image-101028173663.avif',153469,'2024-08-06 17:05:47','2024-08-06 17:05:47'),(226,'public/Uploads/image-102261122997.webp',160412,'2024-08-06 17:15:03','2024-08-06 17:15:03'),(227,'public/Uploads/image-101568442654.webp',160412,'2024-08-06 17:15:03','2024-08-06 17:15:03'),(228,'public/Uploads/image-102810439073.webp',160412,'2024-08-06 17:15:03','2024-08-06 17:15:03'),(229,'public/Uploads/image-100945877236.webp',160412,'2024-08-06 17:15:03','2024-08-06 17:15:03'),(230,'public/Uploads/image-100417674918.webp',160412,'2024-08-06 17:15:03','2024-08-06 17:15:03'),(231,'public/Uploads/image-102142176716.webp',169105,'2024-08-06 17:17:25','2024-08-06 17:17:25'),(232,'public/Uploads/image-103886709932.webp',169105,'2024-08-06 17:17:25','2024-08-06 17:17:25'),(233,'public/Uploads/image-101574383711.webp',169105,'2024-08-06 17:17:25','2024-08-06 17:17:25'),(234,'public/Uploads/image-104208445839.webp',169105,'2024-08-06 17:17:25','2024-08-06 17:17:25'),(235,'public/Uploads/image-101342141635.webp',169105,'2024-08-06 17:17:25','2024-08-06 17:17:25');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `materialId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`materialId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,'Vải dệt','2024-07-26 14:45:28','2024-07-26 14:45:28'),(2,'Lưới','2024-07-26 14:45:50','2024-07-26 14:45:50'),(3,'Da tự nhiên','2024-07-26 14:46:00','2024-07-26 14:46:00'),(4,'Da tổng hợp','2024-07-26 14:46:11','2024-07-26 14:46:11'),(5,'Da lộn','2024-07-26 14:46:23','2024-07-26 14:46:23'),(6,'Polyester tái chế','2024-07-26 14:46:35','2024-07-26 14:46:35');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `messagesId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `conversationId` int DEFAULT NULL,
  `contents` longtext,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`messagesId`),
  KEY `userId` (`userId`),
  KEY `conversationId` (`conversationId`),
  CONSTRAINT `messages_ibfk_85` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_86` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`conversationId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `orderDetailId` int NOT NULL AUTO_INCREMENT,
  `totals` int DEFAULT NULL,
  `orderCode` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `voucherId` int DEFAULT NULL,
  `refundStatus` varchar(255) DEFAULT NULL,
  `refundAmount` int DEFAULT NULL,
  PRIMARY KEY (`orderDetailId`),
  KEY `userId` (`userId`),
  KEY `order_details_voucherId_foreign_idx` (`voucherId`),
  CONSTRAINT `order_details_ibfk_79` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE,
  CONSTRAINT `order_details_ibfk_80` FOREIGN KEY (`voucherId`) REFERENCES `vouchers` (`voucherId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (17,1,'EFB42C9F',1000,1861694536,'2024-09-09 11:48:20','2024-09-09 15:15:42','test bug 5/8','lbeephamthanhlong@gmail.com','0369232003',NULL,NULL,NULL),(18,2,'4F28528A',2000,1861694536,'2024-09-09 13:39:19','2024-09-09 13:39:29','test bug 5/8','lbeephamthanhlong@gmail.com','0369232003',5,NULL,NULL),(19,1,'F3583EB2',1000,1861694536,'2024-09-09 13:39:55','2024-09-09 14:16:31','test bug 5/8','lbeephamthanhlong@gmail.com','0369232003',5,NULL,NULL),(20,2,'60C4D7E3',2000,1861694536,'2024-09-09 13:40:34','2024-09-09 14:16:31','test bug 5/8','lbeephamthanhlong@gmail.com','0369232003',5,NULL,NULL),(21,1,'B53ECE7E',1000,1861694536,'2024-09-09 13:40:59','2024-09-09 15:16:29','test bug 5/8','lbeephamthanhlong@gmail.com','0369232003',5,NULL,NULL),(22,1,'9AB2B05B',3000,1861694536,'2024-09-09 14:15:07','2024-09-09 14:15:07','test bug 5/8','lbeephamthanhlong@gmail.com','0369232003',NULL,NULL,NULL),(23,1,'5C052D91',1000,1861694536,'2024-09-09 14:18:12','2024-09-09 14:18:12','test bug 5/8','lbeephamthanhlong@gmail.com','0369232003',NULL,NULL,NULL),(24,1,'CA60C18E',3000,1861694536,'2024-09-09 14:20:10','2024-09-09 14:20:10','test bug 5/8','lbeephamthanhlong@gmail.com','0369232003',NULL,NULL,NULL),(25,1,'EBC4D95A',3000,1861694536,'2024-09-09 14:20:32','2024-09-09 14:21:54','test bug 5/8','lbeephamthanhlong@gmail.com','0369232003',5,NULL,NULL),(26,1,'0970B23D',3500,1861694536,'2024-09-09 14:20:55','2024-09-09 14:20:55','test bug 5/8','Giao Nhân Giao Thủy Nam Định','0369232003',5,NULL,NULL);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `orderItemId` int NOT NULL AUTO_INCREMENT,
  `quanity` int DEFAULT NULL,
  `productDetailId` int DEFAULT NULL,
  `orderDetailId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `amount` int DEFAULT NULL,
  `status` varchar(255) DEFAULT 'CHO_THANH_TOAN',
  `userId` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `priceDiscount` int DEFAULT NULL,
  `isReview` tinyint(1) DEFAULT '0',
  `returnStatus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`orderItemId`),
  KEY `productDetailId` (`productDetailId`),
  KEY `orderDetailId` (`orderDetailId`),
  CONSTRAINT `order_items_ibfk_335` FOREIGN KEY (`productDetailId`) REFERENCES `product_details` (`productDetailId`) ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_336` FOREIGN KEY (`orderDetailId`) REFERENCES `order_details` (`orderDetailId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (15,1,12,17,'2024-09-09 11:48:20','2024-09-09 15:16:48',1000,'CHO_THANH_TOAN',1861694536,1000,1000,0,NULL),(16,1,35,18,'2024-09-09 13:39:19','2024-09-09 15:16:48',1000,'CHO_THANH_TOAN',1861694536,2000,1000,0,NULL),(17,1,36,18,'2024-09-09 13:39:19','2024-09-09 15:16:48',1000,'CHO_THANH_TOAN',1861694536,2000,1000,0,NULL),(18,1,12,19,'2024-09-09 13:39:55','2024-09-09 15:16:48',1000,'CHO_THANH_TOAN',1861694536,1000,1000,0,NULL),(19,1,12,20,'2024-09-09 13:40:34','2024-09-09 15:16:48',1000,'CHO_THANH_TOAN',1861694536,1000,1000,0,NULL),(20,1,13,20,'2024-09-09 13:40:34','2024-09-09 15:16:48',1000,'CHO_THANH_TOAN',1861694536,1000,1000,0,NULL),(21,1,12,21,'2024-09-09 13:40:59','2024-09-09 15:16:48',1000,'CHO_THANH_TOAN',1861694536,1000,1000,0,NULL),(22,1,42,22,'2024-09-09 14:15:07','2024-09-09 15:16:48',3000,'CHO_XAC_NHAN',1861694536,3000,3000,0,NULL),(23,1,13,23,'2024-09-09 14:18:12','2024-09-09 14:19:02',1000,'CHO_LAY_HANG',1861694536,1000,1000,0,NULL),(24,1,42,24,'2024-09-09 14:20:10','2024-09-09 15:16:48',3000,'CHO_XAC_NHAN',1861694536,3000,3000,0,NULL),(25,1,42,25,'2024-09-09 14:20:32','2024-09-09 15:16:48',3000,'CHO_XAC_NHAN',1861694536,3000,3000,0,NULL),(26,1,47,26,'2024-09-09 14:20:55','2024-09-09 14:21:15',4500,'CHO_LAY_HANG',1861694536,4500,4500,0,NULL);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `origins`
--

DROP TABLE IF EXISTS `origins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `origins` (
  `originId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`originId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `origins`
--

LOCK TABLES `origins` WRITE;
/*!40000 ALTER TABLE `origins` DISABLE KEYS */;
INSERT INTO `origins` VALUES (1,'Nga','2024-07-26 14:48:00','2024-07-26 14:48:00'),(2,'Đức','2024-07-26 14:48:04','2024-07-26 14:48:04'),(3,'Việt Nam','2024-07-26 14:48:10','2024-07-26 14:48:10'),(4,'Tây Ban Nha','2024-07-26 14:48:16','2024-07-26 14:48:16'),(5,'Anh','2024-07-26 14:48:20','2024-07-26 14:48:20'),(6,'Pháp','2024-07-26 14:48:23','2024-07-26 14:48:23'),(7,'Hàn Quốc','2024-07-26 14:48:29','2024-07-26 14:48:29'),(8,'Nhật Bản','2024-07-26 14:48:35','2024-07-26 14:48:35'),(9,'Trung Quốc','2024-07-26 14:48:40','2024-07-26 14:48:40'),(10,'Mỹ','2024-07-26 14:48:49','2024-07-26 14:48:49');
/*!40000 ALTER TABLE `origins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `palettes`
--

DROP TABLE IF EXISTS `palettes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `palettes` (
  `colorCode` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`colorCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `palettes`
--

LOCK TABLES `palettes` WRITE;
/*!40000 ALTER TABLE `palettes` DISABLE KEYS */;
/*!40000 ALTER TABLE `palettes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_details`
--

DROP TABLE IF EXISTS `payment_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_details` (
  `paymentDetailId` int NOT NULL AUTO_INCREMENT,
  `orderDetailId` int DEFAULT NULL,
  `status` varchar(255) DEFAULT 'IDLE',
  `amount` int DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`paymentDetailId`),
  KEY `orderDetailId` (`orderDetailId`),
  CONSTRAINT `payment_details_ibfk_1` FOREIGN KEY (`orderDetailId`) REFERENCES `order_details` (`orderDetailId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_details`
--

LOCK TABLES `payment_details` WRITE;
/*!40000 ALTER TABLE `payment_details` DISABLE KEYS */;
INSERT INTO `payment_details` VALUES (1,17,'IDLE',1000,'MOMO','2024-09-09 11:48:20','2024-09-09 11:48:20'),(2,18,'IDLE',2000,'MOMO','2024-09-09 13:39:19','2024-09-09 13:39:29'),(3,19,'IDLE',1000,'MOMO','2024-09-09 13:39:55','2024-09-09 14:16:31'),(4,20,'IDLE',2000,'MOMO','2024-09-09 13:40:34','2024-09-09 14:16:31'),(5,21,'IDLE',1000,'MOMO','2024-09-09 13:40:59','2024-09-09 14:16:31'),(6,22,'CASH',3000,'CASH','2024-09-09 14:15:07','2024-09-09 14:15:07'),(7,23,'SUCCESS',1000,'MOMO','2024-09-09 14:18:12','2024-09-09 14:19:02'),(8,24,'CASH',3000,'CASH','2024-09-09 14:20:10','2024-09-09 14:20:10'),(9,25,'CASH',3000,'CASH','2024-09-09 14:20:32','2024-09-09 14:21:54'),(10,26,'SUCCESS',3500,'MOMO','2024-09-09 14:20:55','2024-09-09 14:21:15');
/*!40000 ALTER TABLE `payment_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_details`
--

DROP TABLE IF EXISTS `product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_details` (
  `productDetailId` int NOT NULL AUTO_INCREMENT,
  `sizeId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sellQuanity` int DEFAULT '0',
  `numberStatistics` int DEFAULT '0',
  PRIMARY KEY (`productDetailId`),
  KEY `sizeId` (`sizeId`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_details_ibfk_337` FOREIGN KEY (`sizeId`) REFERENCES `sizes` (`sizeId`) ON UPDATE CASCADE,
  CONSTRAINT `product_details_ibfk_338` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_details`
--

LOCK TABLES `product_details` WRITE;
/*!40000 ALTER TABLE `product_details` DISABLE KEYS */;
INSERT INTO `product_details` VALUES (1,1,144899,10,'2024-07-26 15:03:43','2024-07-26 15:03:43',0,0),(2,9,144899,41,'2024-07-26 15:03:43','2024-07-26 15:03:43',0,0),(3,2,144899,20,'2024-07-26 15:03:43','2024-07-26 15:03:43',0,0),(4,10,144899,56,'2024-07-26 15:03:43','2024-07-26 15:03:43',0,0),(5,3,144899,30,'2024-07-26 15:03:43','2024-07-26 15:03:43',0,0),(6,11,144899,47,'2024-07-26 15:03:43','2024-07-26 15:03:43',0,0),(7,4,144899,85,'2024-07-26 15:03:43','2024-07-26 15:03:43',0,0),(8,5,144899,800,'2024-07-26 15:03:43','2024-07-26 15:03:43',0,0),(9,6,144899,74,'2024-07-26 15:03:43','2024-07-26 15:03:43',0,0),(10,7,144899,83,'2024-07-26 15:03:43','2024-07-26 15:03:43',0,0),(11,8,144899,56,'2024-07-26 15:03:43','2024-07-26 15:03:43',0,0),(12,1,108523,34,'2024-07-26 15:13:17','2024-08-06 19:24:57',6,0),(13,6,108523,39,'2024-07-26 15:13:17','2024-09-09 14:19:02',1,0),(14,2,108523,55,'2024-07-26 15:13:17','2024-08-06 19:24:58',1,0),(15,7,108523,76,'2024-07-26 15:13:17','2024-07-26 15:13:17',0,0),(16,3,108523,86,'2024-07-26 15:13:17','2024-07-26 15:13:17',0,0),(17,8,108523,57,'2024-07-26 15:13:17','2024-07-26 15:13:17',0,0),(18,4,108523,72,'2024-07-26 15:13:17','2024-07-26 15:13:17',0,0),(19,9,108523,94,'2024-07-26 15:13:17','2024-07-26 15:13:17',0,0),(20,5,108523,1000,'2024-07-26 15:13:17','2024-07-26 15:13:17',0,0),(21,10,108523,29,'2024-07-26 15:13:17','2024-07-26 15:13:17',0,0),(22,5,180334,500,'2024-07-26 15:21:08','2024-07-26 15:21:08',0,0),(23,6,180334,60,'2024-07-26 15:21:08','2024-07-26 15:21:08',0,0),(24,4,185894,50,'2024-07-26 15:28:41','2024-07-26 15:28:41',0,0),(25,5,185894,600,'2024-07-26 15:28:41','2024-07-26 15:28:41',0,0),(26,6,185894,574,'2024-07-26 15:28:41','2024-07-26 15:28:41',0,0),(27,7,185894,475,'2024-07-26 15:28:41','2024-07-26 15:28:41',0,0),(28,8,185894,123,'2024-07-26 15:28:41','2024-07-26 15:28:41',0,0),(29,1,169105,20,'2024-07-26 15:34:00','2024-07-26 15:34:00',0,0),(30,2,169105,70,'2024-07-26 15:34:00','2024-07-26 15:34:00',0,0),(31,3,169105,72,'2024-07-26 15:34:00','2024-07-26 15:34:00',0,0),(32,4,169105,98,'2024-07-26 15:34:00','2024-07-26 15:34:00',0,0),(33,5,169105,72,'2024-07-26 15:34:00','2024-07-26 15:34:00',0,0),(34,6,169105,64,'2024-07-26 15:34:00','2024-07-26 15:34:00',0,0),(35,5,111141,32,'2024-07-26 15:42:50','2024-08-08 14:41:18',2,0),(36,1,111141,240,'2024-07-26 15:42:50','2024-08-08 14:41:18',2,0),(37,2,111141,52,'2024-07-26 15:42:50','2024-08-08 14:41:18',2,0),(38,3,111141,24,'2024-07-26 15:42:50','2024-07-26 15:42:50',0,0),(39,4,111141,43,'2024-07-26 15:42:50','2024-07-26 15:42:50',0,0),(40,4,127775,89,'2024-07-26 16:09:00','2024-07-26 16:09:00',0,0),(41,5,127775,98,'2024-07-26 16:09:00','2024-07-26 16:09:00',0,0),(42,5,128185,56,'2024-07-26 16:15:42','2024-07-26 16:15:42',0,0),(43,2,128185,234,'2024-07-26 16:15:42','2024-07-26 16:15:42',0,0),(44,1,128185,42,'2024-07-26 16:15:42','2024-07-26 16:15:42',0,0),(45,3,128185,23,'2024-07-26 16:15:42','2024-07-26 16:15:42',0,0),(46,4,128185,432,'2024-07-26 16:15:42','2024-07-26 16:15:42',0,0),(47,5,160412,799,'2024-07-26 16:24:44','2024-09-09 14:21:15',1,0);
/*!40000 ALTER TABLE `product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_promotion`
--

DROP TABLE IF EXISTS `product_promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_promotion` (
  `productId` int NOT NULL,
  `promotionId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`,`promotionId`),
  KEY `promotionId` (`promotionId`),
  CONSTRAINT `product_promotion_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE,
  CONSTRAINT `product_promotion_ibfk_2` FOREIGN KEY (`promotionId`) REFERENCES `promotions` (`promotionId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_promotion`
--

LOCK TABLES `product_promotion` WRITE;
/*!40000 ALTER TABLE `product_promotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(6) DEFAULT NULL,
  `importPrice` decimal(16,2) DEFAULT NULL,
  `price` decimal(16,2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `display` tinyint(1) DEFAULT NULL,
  `description` longtext,
  `originId` int DEFAULT NULL,
  `styleId` int DEFAULT NULL,
  `materialId` int DEFAULT NULL,
  `brandId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `priceDiscount` decimal(16,2) DEFAULT NULL,
  PRIMARY KEY (`productId`),
  KEY `originId` (`originId`),
  KEY `styleId` (`styleId`),
  KEY `materialId` (`materialId`),
  KEY `brandId` (`brandId`),
  CONSTRAINT `products_ibfk_673` FOREIGN KEY (`originId`) REFERENCES `origins` (`originId`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_674` FOREIGN KEY (`styleId`) REFERENCES `styles` (`styleId`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_675` FOREIGN KEY (`materialId`) REFERENCES `materials` (`materialId`) ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_676` FOREIGN KEY (`brandId`) REFERENCES `brands` (`brandId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=185897 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (108523,'Adidas ultraboost 1.0 \"triple white\" hàng chính hãng','709D93',1990000.00,1000.00,1,NULL,'<h3><strong>Giày Adidas Ultraboost 1.0 \"Triple White\" HQ4202&nbsp;</strong><br><br>Giày Thể Thao Adidas Ultraboost 1.0 \"Triple White\" HQ4202 là một đôi giày chạy bộ được yêu thích bởi sự thoải mái, hiệu suất và phong cách. Với phối màu trắng toàn tập cổ điển, đôi giày này dễ dàng phối hợp với nhiều trang phục khác nhau.</h3><h3><strong>Ưu điểm:</strong></h3><h3>Thiết kế ôm sát,&nbsp;hỗ trợ tốt cho bàn chân</h3><h3>Chất liệu Primeknit nhẹ nhàng và thoáng khí</h3><h3>Đế Boost êm ái cho cảm giác di chuyển nhẹ nhàng và thoải mái</h3><h3>Phù hợp cho cả tập luyện thể thao và đi chơi</h3><h3><a href=\"https://bountysneakers.com/hq4202\">Giày Thể Thao Adidas Ultraboost 1.0 \"Triple White\" HQ4202</a> là một lựa chọn tuyệt vời cho những ai đang tìm kiếm một đôi giày chạy bộ thoải mái, hiệu suất cao và phong cách. Tuy nhiên, giá thành cao có thể là một rào cản đối với một số người.<br><br>&nbsp;</h3><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-101253550207.webp\"></figure><p>&nbsp;</p>',2,1,1,4,'2024-07-26 15:13:17','2024-09-09 13:44:00',1000.00),(111141,'Giày MLB Chunky Liner New York Yankees Off White ','82E878',1050000.00,2000.00,1,NULL,'<h2><br><strong>Giày MLB Chunky Liner New York Yankees Off White&nbsp;</strong><br><br>Chất liệu: Da tổng hợp&nbsp;</h2><ul><li>Kiểu dáng giày sneaker đế cao chunky thời trang</li><li>Thiết kế lấy cảm hứng từ hiệp hội bóng chày MLB</li><li>Cộng hưởng cùng chi tiết chữ logo bóng chày với họa tiết monogram&nbsp;in sắc nét</li><li>Lớp lót êm ái, nâng dáng bước chân</li><li>Đế cao su với độ bền cao, chắc chắn mang lại độ ma sát tốt</li><li>Gam màu hiện đại dễ dàng phối với nhiều trang phục và phụ kiện</li><li>Xuất xứ thương hiệu: Hàn Quốc<br>&nbsp;<img src=\"http://localhost:5500/public/Uploads/image-104246938718.webp\"></li></ul><p>&nbsp;</p>',7,1,5,1,'2024-07-26 15:42:50','2024-09-09 13:44:00',1000.00),(127775,'Giày Balenciaga Speed Recycled Trainers Graffiti \'Green\'','18213F',556100.00,2500.00,1,NULL,'<p><a href=\"https://www.farfetch.com/vn/shopping/men/balenciaga/items.aspx\"><strong>Balenciaga</strong></a></p><p>&nbsp;</p><h2><strong>Giày Balenciaga Speed Recycled Trainers Graffiti \'Green\'</strong></h2><p>&nbsp;</p><p>Một trong những kiểu dáng được thèm muốn nhất của hãng, giày thể thao Triple S đại diện cho phong cách giày dép đầy sáng tạo và lấy cảm hứng từ thời trang dạo phố của Balenciaga. Nằm trên phần đế đúc dễ nhận biết, phiên bản màu trắng kem này được hoàn thiện với các điểm nhấn bằng lưới ở phía trên và nhãn hiệu ở lưỡi giày.<br><br>&nbsp;</p><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-100497974036.webp\"></figure><figure class=\"image image-style-side\"><img src=\"http://localhost:5500/public/Uploads/image-103880809867.jpeg\"></figure>',4,1,4,3,'2024-07-26 16:09:00','2024-08-06 16:52:32',2500.00),(128185,'Giày Converse Run Star Legacy CX ‘Pink White’','99F959',500000.00,3000.00,1,NULL,'<h2><strong>Giày Converse Run Star Legacy CX ‘Pink White’</strong></h2><figure class=\"image image-style-side\"><img src=\"http://localhost:5500/public/Uploads/image-103140096822.jpeg\"></figure><h3><br><br>Nâng tầm diện mạo của bạn chưa bao giờ dễ dàng hơn thế. Lấy cảm hứng từ sự tinh tế thường ngày của áo blazer, những đôi giày cao gót này kết hợp phong cách All Star không thể nhầm lẫn với những cập nhật tinh tế. Chất liệu hỗn hợp sang trọng và các tông màu đa dạng kết hợp với các chi tiết được khâu tinh tế để mang lại vẻ ngoài cao cấp, dễ dàng. Tính năng và lợi ích Thân giày bằng vải dệt bền bỉ, với kiểu dáng Chucks cổ điển Đệm xốp CX giúp mang lại sự thoải mái ở mức độ tiếp theo Da và đường khâu trang trí công phu tạo thêm điểm nhấn tinh tế Cản trước bằng cao su dạng sọc giúp tạo kiểu dáng và chức năng dễ tháo lắp Miếng dán mắt cá chân mang tính biểu tượng của Chuck Taylor và nhãn hiệu ngôi sao ở gót chân 3D 49mm Có thể có chênh lệch 1-2 cm về số đo tùy thuộc vào quá trình phát triển và sản xuất. Tuyên bố từ chối trách nhiệm về màu sắc: Màu sắc thực tế có thể khác nhau. Điều này là do mỗi màn hình máy tính có khả năng hiển thị màu sắc khác nhau, chúng tôi không thể đảm bảo rằng màu sắc bạn nhìn thấy phản ánh chính xác màu sắc thực của sản phẩm.<br><br>&nbsp;</h3><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-101054121322.png\"></figure>',9,3,6,7,'2024-07-26 16:15:41','2024-08-06 16:55:50',3000.00),(144899,'Adidas samba og \"cloud white\" hàng chính hãng','A5A062',1850000.00,4000.00,1,NULL,'<h2><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Giày Adidas Samba OG \"Cloud White\" B75806</strong><br><br><a href=\"https://bountysneakers.com/b75806\">Adidas Samba OG \"Cloud White\" B75806</a> là một đôi giày sneaker cổ điển được yêu thích bởi phong cách đơn giản và linh hoạt. Đôi giày này được làm bằng da cao cấp với phần trên màu trắng và các điểm nhấn màu đen. Nó có đế ngoài bằng cao su màu nâu gum mang lại độ bám và độ bền.&nbsp;<br>Giày Adidas Samba OG \"Cloud White\" B75806 là một lựa chọn tuyệt vời cho trang phục bình thường. Chúng có thể được mang với quần jean, quần short hoặc váy. Chúng cũng đủ thoải mái để mang cả ngày.<br>&nbsp;</h2><h2>&nbsp;</h2><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-102829685523.png\"></figure><p>&nbsp;</p>',2,1,4,4,'2024-07-26 15:03:42','2024-08-06 17:03:11',4000.00),(153469,' Balenciaga Speed ‘Black’ ','C4F878',18000000.00,3500.00,1,NULL,'<p><a href=\"http://www.giaygoo.vn/products/giay-balenciaga-speed-trainer-den-trang\"><strong>GIÀY BALENCIAGA ĐEN&nbsp;TRẮNG SPEED&nbsp;</strong></a><br>Thiết kế theo dạng \"<strong>Giày Vớ</strong>\" <strong>cổ cao</strong>, có form dáng đi khá ôm chân bởi chi tiết thun co giãn phần cổ giày. Trong khi đó, phần đế trắng với những đường rãnh cắt to có nhiệm vụ làm cho đế giày linh hoạt khi bẻ cong và cũng là điểm nhấn ấn tượng khiến đôi giày trong bắt mắt từ xa. Đầu giày thon và gọn tôn lên vẻ đẹp tinh tế nhưng không kém phần năng động so với chính dòng giày sneaker vốn có.Thiết kế&nbsp;<strong>giày balenciaga đen trắng</strong>&nbsp;là mẫu giày khiến cả nam lẫn nữ say mê. \"Con cưng\" của giám đốc sáng tạo Demna Gvasalia nhà Balenciaga có dáng vẻ độc đáo và mạnh mẽ. Thiết kế kết hợp giày thể thao, tất cao cổ và bộ giảm xóc. Balenciaga Speed Trainers có ba phiên bản: đen, trắng và đỏ, nặng 240 gram.<br><br>&nbsp;</p><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-103776340823.jpeg\"></figure>',4,3,1,3,'2024-07-26 15:57:01','2024-07-30 11:43:00',3500.00),(160412,'CLASSIC SK8-HI BLACK/WHITE','A7EC2F',600000.00,4500.00,1,NULL,'<p><i><strong>VANS&nbsp;</strong></i><a href=\"https://vans-news.com/vans-sk8\"><strong>SK8</strong>&nbsp;</a><br>xuất hiện lần đầu năm 1978 với tên gọi <i>\"Style 38\"</i> với thiết kế cao qua mắt cá chân, bảo vệ phần quan trọng nơi mà các vận động viên trượt ván lạm dụng nhiều để có những&nbsp;<i>Tricks</i> độc đáo, và đồng thời&nbsp;<strong>Sk8</strong> cũng mang lại phong cách thời trang đặc biệt điểm màu cho công viên thời bấy giờ.&nbsp;</p><p>Phiên bản <i><strong>VANS&nbsp;Classic Sk8 Black/White</strong></i> là một trong style kinh điển của <strong>VANS</strong> và đã mang lại lợi nhuận khổng lồ cho hãng khi luôn&nbsp;nằm trong mục <i>Best Seller</i> của <strong>VANS</strong>. Tông màu đen đơn giản dễ phối đồ cùng cổ cao kinh điển sẽ là sản phẩm tuyệt vời cho các fan yêu thời trang.<br><br>&nbsp;</p><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-101069823872.png\"></figure><p><br>&nbsp;</p>',3,2,2,6,'2024-07-26 16:24:44','2024-07-30 11:43:09',4500.00),(169105,'Bigball Chunky Pastel \"Hồng\" - chính hãng ','C32CE1',1500000.00,5000.00,1,NULL,'<h2><br><strong>Bigball Chunky Pastel \"Hồng\" - chính hãng&nbsp;</strong><br><br>Đắm chìm trong sự ngọt ngào và cá tính cùng đôi giày sneakers Bigball Chunky Pastel đến từ MLB. Với thiết kế phom dáng đặc trưng nhưng được biến tấu đầy ngọt ngào cùng các gam màu pastel tinh tế, item này sẵn sàng cùng bạn tự tin thể hiện cá tính và phong cách riêng.</h2><p>Thương hiệu: MLB<br>Xuất xứ: Hàn Quốc<br>Giới tính: Unisex<br>Kiểu dáng: Giày sneakers cổ thấp<br>Màu sắc: Pink, Purple<br>Chất liệu: Da tổng hợp<br>Đế: EVA<br>Thiết kế:</p><ul><li>Kiểu dáng giày sneaker đế cao thời trang</li><li>Thiết kế lấy cảm hứng từ hiệp hội bóng chày MLB</li><li>Cộng hưởng cùng chi tiết chữ logo bóng chày nổi bật ở má ngoài</li><li>Đế cao su với độ bền cao, chắc chắn mang lại độ ma sát tốt</li><li>Gam màu hiện đại dễ dàng phối với nhiều trang phục và phụ kiện</li></ul><p>Logo: Được in trên lót trong &nbsp;<br>Mũi giày: Tròn<br>Dây quai: Dây buộc tròn, có thể điều chỉnh dễ dàng &nbsp;&nbsp;<br>Thoáng khí: Có lớp lót thoáng khí &nbsp;<br>Thích hợp dùng trong các dịp: Đi làm, đi chơi,...<br>Xu hướng theo mùa: Sử dụng được tất cả các mùa trong năm<br>&nbsp;</p><p>&nbsp;</p><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-103409143762.png\"></figure><p><br>&nbsp;</p>',7,1,4,1,'2024-07-26 15:34:00','2024-07-30 11:43:17',5000.00),(180334,'J Balvin x Air Jordan 1 High','95E13F',8000000.00,5500.00,1,NULL,'<h2><strong>J Balvin x Air Jordan 1 High</strong><br><br>Ban đầu được ra mắt trong một buổi biểu diễn giữa giờ trên sân khấu lớn nhất của giải bóng bầu dục Mỹ, đôi AJ1 độc quyền này sử dụng sự kết hợp chiết trung của màu sắc, họa tiết và đồ họa để tái hiện hình bóng cổ điển theo hình ảnh của nghệ sĩ thu âm người Colombia J Balvin. Các lớp phủ được may thô làm mờ các đường nét thiết kế sắc nét thường thấy của thiết kế, trong khi quang phổ màu neon thổi vào diện mạo một luồng năng lượng mạnh mẽ. Đồ họa có thể tùy chỉnh (bao gồm cả khuôn mặt cười đặc trưng của Balvin) tạo nên nét độc đáo cho lưỡi gà, với hình ảnh tương tự trang trí đế giày và gót giày. Buộc dây giày và tiến bước theo nhịp trống của riêng bạn trong bộ sưu tập đầy màu sắc và được mong đợi từ lâu này.</h2><p>&nbsp;</p><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-101206975497.png\"></figure><p>&nbsp;</p>',10,3,5,2,'2024-07-26 15:21:08','2024-07-30 11:43:28',5500.00),(185894,'Nike Pegasus 41 Electric ','888555',2000000.00,1500.00,1,NULL,'<h2><br><strong>Nike Pegasus 41 Electric</strong><br><br>Đệm phản hồi trong Pegasus mang đến một chuyến đi tràn đầy năng lượng cho việc chạy bộ trên đường hàng ngày. Trải nghiệm khả năng phục hồi năng lượng nhẹ hơn với hai bộ phận Air Zoom và đế giữa bằng bọt ReactX. Thêm vào đó, lưới kỹ thuật cải tiến ở phần trên giúp giảm trọng lượng và tăng khả năng thoáng khí.</h2><p>Các tính năng chính<br>Phần trên bằng lưới kỹ thuật thoáng khí được nâng cấp<br>Đế giữa bằng bọt ReactX bao quanh các bộ phận Air Zoom ở bàn chân trước và gót chân để mang đến một chuyến đi tràn đầy năng lượng.<br>Đế ngoài bằng cao su lấy cảm hứng từ bánh quế đặc trưng để tạo lực kéo và độ linh hoạt<br>Cổ áo, lưỡi giày và lót giày sang trọng để vừa vặn và thoải mái<br>Có gì mới? Đế giữa bằng bọt ReactX hoàn toàn mới phản hồi nhanh hơn 13% so với công nghệ React trước đây.<br>Được chế tạo để mang lại hiệu suất và bảo vệ môi trường, bọt ReactX được thiết kế để giảm lượng khí thải carbon ít nhất 43% trong một đôi đế giữa do giảm năng lượng trong quá trình sản xuất so với bọt React trước đây. Lượng khí thải carbon của ReactX dựa trên đánh giá từ lúc bắt đầu đến khi ra mắt do PRé Sustainability B.V. và Intertek China xem xét. Các thành phần đế giữa khác như túi khí, tấm đế hoặc các công thức bọt khác không được xem xét.<br>Chi tiết sản phẩm<br>Trọng lượng: Xấp xỉ 297g (cỡ nam 9)<br>Độ chênh lệch từ gót chân đến mũi chân: 10mm<br>MR-10 cuối cùng—vừa vặn nhất và nhất quán nhất của chúng tôi (giống như Pegasus 40)<br>Không dùng làm thiết bị bảo vệ cá nhân (PPE)<br>Chi tiết sản phẩm<br>Màu sắc hiển thị: Nhiều màu/Nhiều màu<br>Kiểu dáng: FV2229-900<br>Quốc gia/Khu vực xuất xứ: Trung Quốc<br><br>&nbsp;</p><figure class=\"image\"><img src=\"http://localhost:5500/public/Uploads/image-102635987475.png\"></figure><p>&nbsp;</p>',10,1,1,2,'2024-07-26 15:28:41','2024-07-30 11:43:37',1500.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `promotionId` int NOT NULL AUTO_INCREMENT,
  `startDay` datetime DEFAULT NULL,
  `endDay` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `discountPrice` decimal(16,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'PRE_START',
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`promotionId`),
  KEY `productId` (`productId`),
  CONSTRAINT `promotions_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (6,'2024-09-09 00:00:00','2024-09-10 00:00:00','2024-09-09 09:04:48','2024-09-09 11:46:01',1000.00,'ACTIVE',111141),(7,'2024-09-09 00:00:00','2024-09-09 00:00:00','2024-09-09 09:11:22','2024-09-09 11:46:00',10000.00,'EXPIRED',108523);
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `return_requests`
--

DROP TABLE IF EXISTS `return_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `return_requests` (
  `returnRequestId` int NOT NULL AUTO_INCREMENT,
  `orderId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `reason` text,
  `status` varchar(255) DEFAULT 'PENDING',
  `requestDate` datetime DEFAULT NULL,
  `processDate` datetime DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`returnRequestId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `return_requests`
--

LOCK TABLES `return_requests` WRITE;
/*!40000 ALTER TABLE `return_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `return_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewer_photo`
--

DROP TABLE IF EXISTS `reviewer_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviewer_photo` (
  `photoId` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `reviewerId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`photoId`),
  KEY `reviewerId` (`reviewerId`),
  CONSTRAINT `reviewer_photo_ibfk_1` FOREIGN KEY (`reviewerId`) REFERENCES `reviewers` (`reviewerId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewer_photo`
--

LOCK TABLES `reviewer_photo` WRITE;
/*!40000 ALTER TABLE `reviewer_photo` DISABLE KEYS */;
INSERT INTO `reviewer_photo` VALUES (1,'public/Uploads/image-101815196469.png',1,'2024-08-08 11:49:59','2024-08-08 11:49:59'),(2,'public/Uploads/image-102650400335.webp',2,'2024-08-08 13:29:07','2024-08-08 13:29:07'),(3,'public/Uploads/image-100984234246.webp',2,'2024-08-08 13:29:07','2024-08-08 13:29:07'),(4,'public/Uploads/image-102373468616.jpeg',2,'2024-08-08 13:29:07','2024-08-08 13:29:07'),(5,'public/Uploads/image-100650997413.jpeg',2,'2024-08-08 13:29:07','2024-08-08 13:29:07'),(6,'public/Uploads/image-102156364228.webp',3,'2024-08-08 13:29:22','2024-08-08 13:29:22'),(7,'public/Uploads/image-101650263067.jpeg',3,'2024-08-08 13:29:22','2024-08-08 13:29:22'),(8,'public/Uploads/image-102031201116.webp',4,'2024-08-08 13:29:38','2024-08-08 13:29:38'),(9,'public/Uploads/image-101084785268.jpeg',4,'2024-08-08 13:29:38','2024-08-08 13:29:38'),(10,'public/Uploads/image-103449507000.webp',5,'2024-08-08 13:29:54','2024-08-08 13:29:54'),(11,'public/Uploads/image-100602942954.jpeg',5,'2024-08-08 13:29:54','2024-08-08 13:29:54'),(12,'public/Uploads/image-102396558210.jpeg',6,'2024-08-08 13:54:51','2024-08-08 13:54:51'),(13,'public/Uploads/image-102498246609.jpeg',6,'2024-08-08 13:54:51','2024-08-08 13:54:51'),(14,'public/Uploads/image-101356965472.webp',6,'2024-08-08 13:54:51','2024-08-08 13:54:51'),(15,'public/Uploads/image-103616992317.jpeg',7,'2024-08-08 13:56:38','2024-08-08 13:56:38'),(16,'public/Uploads/image-103375363411.webp',7,'2024-08-08 13:56:38','2024-08-08 13:56:38'),(17,'public/Uploads/image-102316325040.webp',7,'2024-08-08 13:56:38','2024-08-08 13:56:38'),(18,'public/Uploads/image-101840789609.jpeg',8,'2024-08-08 14:42:50','2024-08-08 14:42:50'),(19,'public/Uploads/image-101099950005.jpeg',8,'2024-08-08 14:42:50','2024-08-08 14:42:50'),(20,'public/Uploads/image-101823469888.webp',9,'2024-08-08 14:43:11','2024-08-08 14:43:11'),(21,'public/Uploads/image-101670730124.webp',9,'2024-08-08 14:43:11','2024-08-08 14:43:11'),(22,'public/Uploads/image-103688737769.jpeg',10,'2024-08-08 14:43:44','2024-08-08 14:43:44'),(23,'public/Uploads/image-101330934995.webp',10,'2024-08-08 14:43:44','2024-08-08 14:43:44');
/*!40000 ALTER TABLE `reviewer_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewers`
--

DROP TABLE IF EXISTS `reviewers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviewers` (
  `reviewerId` int NOT NULL AUTO_INCREMENT,
  `stars` float DEFAULT NULL,
  `contents` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `productDetailId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`reviewerId`),
  KEY `productDetailId` (`productDetailId`),
  KEY `userId` (`userId`),
  CONSTRAINT `reviewers_ibfk_1` FOREIGN KEY (`productDetailId`) REFERENCES `product_details` (`productDetailId`) ON UPDATE CASCADE,
  CONSTRAINT `reviewers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewers`
--

LOCK TABLES `reviewers` WRITE;
/*!40000 ALTER TABLE `reviewers` DISABLE KEYS */;
INSERT INTO `reviewers` VALUES (1,5,'sản phẩm dễ dùng rất tốt',108523,12,'2024-08-08 11:49:59','2024-08-08 11:49:59',1861694536),(2,5,'sản phẩm tốt',108523,19,'2024-08-08 13:29:07','2024-08-08 13:29:07',1861694536),(3,4,'sản phẩm phù hợp',108523,16,'2024-08-08 13:29:22','2024-08-08 13:29:22',1861694536),(4,5,'rất tốt . dáng đẹp',108523,14,'2024-08-08 13:29:38','2024-08-08 13:29:38',1861694536),(5,5,'ngon trong tầm giá',108523,12,'2024-08-08 13:29:54','2024-08-08 13:29:54',1861694536),(6,5,'Sản phẩm hợp túi tiền',108523,12,'2024-08-08 13:54:51','2024-08-08 13:54:51',1289640823),(7,5,'Long ngu đã đánh giá sản phẩm này',108523,13,'2024-08-08 13:56:38','2024-08-08 13:56:38',1289640823),(8,1,'sản phẩm không đúng như mô tả',111141,35,'2024-08-08 14:42:50','2024-08-08 14:42:50',1289640823),(9,3,'giá đặt , form xấu',111141,36,'2024-08-08 14:43:11','2024-08-08 14:43:11',1289640823),(10,4,'quần khá ổn so với tầm giá ',111141,37,'2024-08-08 14:43:44','2024-08-08 14:43:44',1289640823);
/*!40000 ALTER TABLE `reviewers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'USER','2024-07-26 14:36:29','2024-07-26 14:36:29'),(2,'MEMBERSHIP','2024-07-26 14:36:29','2024-07-26 14:36:29'),(3,'ADMIN','2024-07-26 14:36:29','2024-07-26 14:36:29');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_carts`
--

DROP TABLE IF EXISTS `shopping_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_carts` (
  `cartId` int NOT NULL AUTO_INCREMENT,
  `totals` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cartId`),
  KEY `userId` (`userId`),
  CONSTRAINT `shopping_carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_carts`
--

LOCK TABLES `shopping_carts` WRITE;
/*!40000 ALTER TABLE `shopping_carts` DISABLE KEYS */;
INSERT INTO `shopping_carts` VALUES (30,0,0,1861694536,'2024-09-09 15:13:52','2024-09-09 15:13:54');
/*!40000 ALTER TABLE `shopping_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `sizeId` int NOT NULL AUTO_INCREMENT,
  `name` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sizeId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,36,'2024-07-26 14:47:20','2024-07-26 14:47:20'),(2,37,'2024-07-26 14:47:24','2024-07-26 14:47:24'),(3,38,'2024-07-26 14:47:27','2024-07-26 14:47:27'),(4,39,'2024-07-26 14:47:30','2024-07-26 14:47:30'),(5,40,'2024-07-26 14:47:33','2024-07-26 14:47:33'),(6,41,'2024-07-26 14:47:36','2024-07-26 14:47:36'),(7,42,'2024-07-26 14:47:39','2024-07-26 14:47:39'),(8,43,'2024-07-26 14:47:42','2024-07-26 14:47:42'),(9,44,'2024-07-26 14:47:45','2024-07-26 14:47:45'),(10,45,'2024-07-26 14:47:48','2024-07-26 14:47:48'),(11,46,'2024-07-26 14:47:51','2024-07-26 14:47:51');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `styles`
--

DROP TABLE IF EXISTS `styles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `styles` (
  `styleId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`styleId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `styles`
--

LOCK TABLES `styles` WRITE;
/*!40000 ALTER TABLE `styles` DISABLE KEYS */;
INSERT INTO `styles` VALUES (1,'Low-top','2024-07-26 14:43:18','2024-07-26 14:43:18'),(2,'Mid-top','2024-07-26 14:43:30','2024-07-26 14:43:30'),(3,'High-top','2024-07-26 14:43:45','2024-07-26 14:43:45');
/*!40000 ALTER TABLE `styles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_vouchers`
--

DROP TABLE IF EXISTS `user_vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_vouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `voucherId` int DEFAULT NULL,
  `receivedAt` datetime DEFAULT NULL,
  `usedAt` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `voucherId` (`voucherId`),
  CONSTRAINT `user_vouchers_ibfk_85` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_vouchers_ibfk_86` FOREIGN KEY (`voucherId`) REFERENCES `vouchers` (`voucherId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_vouchers`
--

LOCK TABLES `user_vouchers` WRITE;
/*!40000 ALTER TABLE `user_vouchers` DISABLE KEYS */;
INSERT INTO `user_vouchers` VALUES (1,1861694536,5,'2024-09-09 11:49:00',NULL,NULL,'2024-09-09 11:49:00','2024-09-09 11:49:00'),(2,1861694536,5,NULL,NULL,'UNUSED','2024-09-09 13:39:19','2024-09-09 13:39:19'),(3,1861694536,5,NULL,NULL,'UNUSED','2024-09-09 13:39:55','2024-09-09 13:39:55'),(4,1861694536,5,NULL,NULL,'UNUSED','2024-09-09 13:40:34','2024-09-09 13:40:34'),(5,1861694536,5,NULL,NULL,'UNUSED','2024-09-09 13:40:59','2024-09-09 13:40:59'),(6,1861694536,5,NULL,NULL,'UNUSED','2024-09-09 14:20:32','2024-09-09 14:20:32'),(7,1861694536,5,NULL,NULL,'UNUSED','2024-09-09 14:20:55','2024-09-09 14:20:55');
/*!40000 ALTER TABLE `user_vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `roleId` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1160752695,'admin',NULL,NULL,'$2b$10$FU/RW8RcwLg3j.w11HFn7.mSDxyDMpiXCUYVmBU9p.aHwB7k67uAW',NULL,NULL,3,'2024-07-26 14:36:29','2024-07-26 14:36:29'),(1289640823,'long','huongtmph41872@fpt.edu.vn','0358091695','$2b$10$t2Uy3l2uh9akjUnH6KT10uYgYoVAFLkj1NmYNsxP39OmOvmyPc5eW',NULL,'Phạm Thành Long',1,'2024-08-08 13:52:50','2024-08-08 13:52:50'),(1861694536,'tuyen','tuyen@dev.dev','0358091695','$2b$10$ov7ihlGV1MvFpkSbaD4Xf.YWZ5weL3NF9xtI6Jorwmsw7YsZAL1pq',NULL,'PHAM NGOC TUYEN',1,'2024-08-06 19:15:47','2024-08-06 19:15:47');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `voucherId` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `description` longtext,
  `valueOrder` decimal(16,2) DEFAULT NULL,
  `discountMax` decimal(16,2) DEFAULT NULL,
  `startDay` datetime DEFAULT NULL,
  `endDay` datetime DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `status` varchar(255) DEFAULT 'ISACTIVE',
  `typeValue` varchar(255) DEFAULT 'MONEY',
  `ruleType` varchar(255) DEFAULT NULL,
  `minOrderValue` decimal(16,2) DEFAULT NULL,
  `minOrderCount` int DEFAULT NULL,
  `maxOrderCount` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `discountValue` decimal(16,2) DEFAULT NULL,
  PRIMARY KEY (`voucherId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (5,'VOUCHER001','adfasdfa',1000.00,1000.00,'2024-09-09 10:12:24','2024-09-09 23:00:00',993,'ISACTIVE','MONEY','MIN_ORDER_VALUE',1000.00,NULL,NULL,'2024-09-09 10:12:34','2024-09-09 14:20:55',1000.00);
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-09 16:13:01
