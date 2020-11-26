CREATE TABLE IF NOT EXISTS `datasources` (
  `sourceID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `website` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`sourceID`));

CREATE TABLE IF NOT EXISTS `admins` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NULL DEFAULT NULL UNIQUE,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`userID`));


CREATE TABLE IF NOT EXISTS `disastertypes` (
  `disasterTypeName` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`disasterTypeName`),
  UNIQUE INDEX `disasterTypeName_UNIQUE` (`disasterTypeName` ASC) VISIBLE);


CREATE TABLE IF NOT EXISTS `districts` (
  `provinceNumber` INT NOT NULL,
  `districtName` VARCHAR(45) NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  PRIMARY KEY (`districtName`));


CREATE TABLE IF NOT EXISTS `vms` (
  `vmID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `districtName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`vmID`),
  INDEX `districtName_idx` (`districtName` ASC) VISIBLE,
  CONSTRAINT `districtName`
    FOREIGN KEY (`districtName`)
    REFERENCES `districts` (`districtName`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `images` (
  `imageID` INT NOT NULL AUTO_INCREMENT,
  `incidentID` INT NOT NULL,
  `path` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`imageID`),
  CONSTRAINT `incidentID`
    FOREIGN KEY (`incidentID`)
    REFERENCES `incidents` (`incidentID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS `incidents` (
  `incidentID` INT NOT NULL AUTO_INCREMENT,
  `incidentDate` DATETIME NOT NULL,
  `totalDeath` INT NULL DEFAULT NULL,
  `missingPeople` INT NULL DEFAULT NULL,
  `affectedFamily` INT NULL DEFAULT NULL,
  `estimatedLoss` INT NULL DEFAULT NULL,
  `injured` INT NULL DEFAULT NULL,
  `damagedHouses` FLOAT NULL DEFAULT NULL,
  `disasterTypeName` VARCHAR(45) NULL DEFAULT NULL,
  `locationID` INT NULL DEFAULT NULL,
  `sourceID` INT NULL DEFAULT NULL,
  `comment` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`incidentID`),
  INDEX `locationID_idx` (`locationID` ASC) VISIBLE,
  INDEX `sourceID_idx` (`sourceID` ASC) VISIBLE,
  INDEX `disasterTypeName_idx` (`disasterTypeName` ASC) VISIBLE,
  CONSTRAINT `disasterTypeName`
    FOREIGN KEY (`disasterTypeName`)
    REFERENCES `disastertypes` (`disasterTypeName`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `locationID`
    FOREIGN KEY (`locationID`)
    REFERENCES `vms` (`vmID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `sourceID`
    FOREIGN KEY (`sourceID`)
    REFERENCES `datasources` (`sourceID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS `earthquakes` (
  `earthquakeID` INT NOT NULL,
  `richterMagnitude` FLOAT UNSIGNED NULL DEFAULT NULL,
  `epicenter` VARCHAR(45) NULL DEFAULT NULL,
  UNIQUE INDEX `earthquakeID_UNIQUE` (`earthquakeID` ASC),
  CONSTRAINT `earthquakeID`
    FOREIGN KEY (`earthquakeID`)
    REFERENCES `incidents` (`incidentID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS `fires` (
  `fireID` INT NOT NULL,
  `cause` VARCHAR(45) NULL DEFAULT NULL,
  UNIQUE INDEX `fireID_UNIQUE` (`fireID` ASC),
  CONSTRAINT `fireID`
    FOREIGN KEY (`fireID`)
    REFERENCES `incidents` (`incidentID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS `floods` (
  `floodID` INT NOT NULL,
  `origin` VARCHAR(45) NULL DEFAULT NULL,
  `height` VARCHAR(45) NULL DEFAULT NULL,
  `cattleLoss` INT NULL DEFAULT NULL,
  UNIQUE INDEX `floodID_UNIQUE` (`floodID` ASC),
  CONSTRAINT `floodID`
    FOREIGN KEY (`floodID`)
    REFERENCES `incidents` (`incidentID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);