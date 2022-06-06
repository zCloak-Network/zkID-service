/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50737
 Source Host           : localhost:3306
 Source Schema         : zkID-service2

 Target Server Type    : MySQL
 Target Server Version : 50737
 File Encoding         : 65001

 Date: 06/06/2022 13:15:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contract_config
-- ----------------------------
DROP TABLE IF EXISTS `contract_config`;
CREATE TABLE `contract_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chain_id` int(11) NOT NULL,
  `contract_address` varchar(255) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for ctype
-- ----------------------------
DROP TABLE IF EXISTS `ctype`;
CREATE TABLE `ctype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `metadata` json NOT NULL,
  `ctype_hash` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for program
-- ----------------------------
DROP TABLE IF EXISTS `program`;
CREATE TABLE `program` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `program_hash` varchar(255) NOT NULL,
  `program_field_name` varchar(255) NOT NULL,
  `program_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for raw_scan_canonical
-- ----------------------------
DROP TABLE IF EXISTS `raw_scan_canonical`;
CREATE TABLE `raw_scan_canonical` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block_number` int(11) NOT NULL,
  `block_hash` varchar(255) NOT NULL,
  `block_time` int(11) NOT NULL,
  `transaction_hash` varchar(255) NOT NULL,
  `version_id` int(11) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `data_owner` varchar(255) NOT NULL,
  `request_hash` varchar(255) NOT NULL,
  `output_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for raw_scan_poap
-- ----------------------------
DROP TABLE IF EXISTS `raw_scan_poap`;
CREATE TABLE `raw_scan_poap` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block_number` int(11) NOT NULL,
  `block_hash` varchar(255) NOT NULL,
  `block_time` int(11) NOT NULL,
  `transaction_hash` varchar(255) NOT NULL,
  `version_id` int(11) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `poap_id` varchar(255) NOT NULL,
  `who` varchar(255) NOT NULL,
  `nft_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for raw_scan_proof
-- ----------------------------
DROP TABLE IF EXISTS `raw_scan_proof`;
CREATE TABLE `raw_scan_proof` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block_number` int(11) NOT NULL,
  `block_hash` varchar(255) NOT NULL,
  `block_time` int(11) NOT NULL,
  `transaction_hash` varchar(255) NOT NULL,
  `version_id` int(11) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `data_owner` varchar(255) NOT NULL,
  `attester` varchar(255) NOT NULL,
  `ctype_hash` varchar(255) NOT NULL,
  `program_hash` varchar(255) NOT NULL,
  `field_names` json NOT NULL,
  `proof_cid` varchar(255) NOT NULL,
  `request_hash` varchar(255) NOT NULL,
  `root_hash` varchar(255) NOT NULL,
  `expect_result` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for raw_scan_verifying
-- ----------------------------
DROP TABLE IF EXISTS `raw_scan_verifying`;
CREATE TABLE `raw_scan_verifying` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block_number` int(11) NOT NULL,
  `block_hash` varchar(255) NOT NULL,
  `block_time` int(11) NOT NULL,
  `transaction_hash` varchar(255) NOT NULL,
  `version_id` int(11) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `data_owner` varchar(255) NOT NULL,
  `request_hash` varchar(255) NOT NULL,
  `worker` varchar(255) NOT NULL,
  `output_hash` varchar(255) NOT NULL,
  `root_hash` varchar(255) NOT NULL,
  `attester` varchar(255) NOT NULL,
  `is_passed` tinyint(4) NOT NULL,
  `calc_result` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;


INSERT INTO `ctype` (`id`, `createTime`, `updateTime`, `metadata`, `ctype_hash`, `owner`) VALUES (1, '2022-05-20 13:49:24.345198', '2022-05-20 13:49:24.345198', '{\"$id\": \"kilt:ctype:0xe21c5f437332f33db0e6f9cef958f2ff3fedfbcdeb60d4ff24db978b487aad1a\", \"type\": \"object\", \"title\": \"credential_test0412\", \"$schema\": \"http://kilt-protocol.org/draft-01/ctype#\", \"properties\": {\"age\": {\"type\": \"integer\"}, \"name\": {\"type\": \"string\"}, \"class\": {\"type\": \"integer\"}, \"chest_rarity\": {\"type\": \"integer\"}, \"helmet_rarity\": {\"type\": \"integer\"}, \"weapon_rarity\": {\"type\": \"integer\"}}}', '0xe21c5f437332f33db0e6f9cef958f2ff3fedfbcdeb60d4ff24db978b487aad1a', 'did:kilt:4rdUX21mgJYGPpU3PmmjSMDkthg9yD2eFeRXyh84tD6ssvS4');

INSERT INTO `program` (`id`, `createTime`, `updateTime`, `program_hash`, `program_field_name`, `program_name`) VALUES (1, '2022-05-20 13:49:24.320247', '2022-05-20 13:49:24.320247', '0x5bf2b53b6831c372efcbd0ed2f7149c2997609141b8ff3bdbf692335df0d2e06', 'age, class, helmet_rarity, chest_rarity, weapon_rarity', 'POAP Issuance Rule');
