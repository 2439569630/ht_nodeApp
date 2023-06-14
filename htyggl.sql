/*
 Navicat Premium Data Transfer

 Source Server         : 本地root
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : htyggl

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 14/06/2023 23:19:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for body
-- ----------------------------
DROP TABLE IF EXISTS `body`;
CREATE TABLE `body`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs NOT NULL COMMENT '大部门',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id`, `name`) USING BTREE,
  INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_as_cs ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of body
-- ----------------------------
INSERT INTO `body` VALUES (4, '产品部');
INSERT INTO `body` VALUES (1, '财务部');
INSERT INTO `body` VALUES (5, '销售部');

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES (1, '销售');
INSERT INTO `post` VALUES (2, '程序员');
INSERT INTO `post` VALUES (3, '会计');
INSERT INTO `post` VALUES (4, '实习生');
INSERT INTO `post` VALUES (5, '前端');
INSERT INTO `post` VALUES (6, '后端');

-- ----------------------------
-- Table structure for section
-- ----------------------------
DROP TABLE IF EXISTS `section`;
CREATE TABLE `section`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `super` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1010 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of section
-- ----------------------------
INSERT INTO `section` VALUES (1000, '武汉财务部', 1);
INSERT INTO `section` VALUES (1001, '徐州财务部', 1);
INSERT INTO `section` VALUES (1002, '北京财务部', 1);
INSERT INTO `section` VALUES (1003, '南昌产品部', 4);
INSERT INTO `section` VALUES (1004, '西凉产品部', 4);
INSERT INTO `section` VALUES (1005, '深圳销售部', 5);
INSERT INTO `section` VALUES (1006, '广州销售部', 5);
INSERT INTO `section` VALUES (1007, '上海销售部', 5);

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `birthday` date NULL DEFAULT NULL,
  `other` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `seid` int(0) NULL DEFAULT NULL,
  `poid` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 200529928 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES (200529034, '马化腾', '男', '2014-05-12', '老板', 1002, 4);
INSERT INTO `staff` VALUES (200529032, '貂蝉', '女', '2015-06-02', '123', 1003, 2);
INSERT INTO `staff` VALUES (200529007, '曹操', '男', '1987-01-06', '1', 1005, 2);
INSERT INTO `staff` VALUES (200529008, '小乔', '女', '1988-10-26', NULL, 1006, 2);
INSERT INTO `staff` VALUES (200529009, '大乔', '女', '1999-11-04', NULL, 1007, 1);
INSERT INTO `staff` VALUES (200529010, '孙尚香', '女', '2008-08-08', NULL, 1007, 4);
INSERT INTO `staff` VALUES (200529011, '貂蝉', '女', '2015-07-24', NULL, 1006, 1);
INSERT INTO `staff` VALUES (200529012, '孙万青', '男', '2020-05-05', 'qdadad a', 1005, 4);
INSERT INTO `staff` VALUES (200529013, '鲁迅213', '女', '2020-05-25', '123', 1004, 2);
INSERT INTO `staff` VALUES (200529014, '庞统', '男', '2013-03-19', '凤雏', 1003, 3);
INSERT INTO `staff` VALUES (200529015, '周瑜', '女', '2009-05-11', '东风不与周郎便，铜雀春深锁二乔', 1002, 4);
INSERT INTO `staff` VALUES (200529017, '我没收到切切', '男', '1981-05-13', 'w付完款请点击清空弹夹空气大家哦q\n\n请点击全文\n\n\n秋冬款悄悄', 1000, 1);
INSERT INTO `staff` VALUES (200529018, '免税店你', '男', '2020-05-05', '123', 1001, 2);
INSERT INTO `staff` VALUES (200529019, '123213', '男', '2020-05-13', '123', 1002, 2);
INSERT INTO `staff` VALUES (200529020, '什么大气', '男', '2020-05-05', '123', 1003, 2);
INSERT INTO `staff` VALUES (200529021, '打磨按上面的', '女', '2020-05-04', '', 1004, 2);
INSERT INTO `staff` VALUES (200529022, '打磨按上面的', '女', '2020-05-04', '', 1005, 2);
INSERT INTO `staff` VALUES (200529023, '请问', '女', '2020-05-05', '', 1006, 2);
INSERT INTO `staff` VALUES (200529918, '微服务', ' 男', '2014-11-20', NULL, 1007, 2);
INSERT INTO `staff` VALUES (200529026, '年末文', '男', '2020-05-05', '123', 1006, 1);
INSERT INTO `staff` VALUES (200529029, '马而我却二', '男', '2020-04-28', '', 1003, 2);
INSERT INTO `staff` VALUES (200529033, '周杰伦', '女', '2020-05-05', '稻香', 1002, 2);
INSERT INTO `staff` VALUES (200529736, '阿大环境', '女', '1984-05-22', '', 1000, 3);
INSERT INTO `staff` VALUES (200529927, '1313', ' 男', '2023-06-06', '多大', 1000, 4);
INSERT INTO `staff` VALUES (200529906, '3131', ' 男', '2023-05-03', NULL, 1000, 3);

SET FOREIGN_KEY_CHECKS = 1;
