CREATE TABLE IF NOT EXISTS `DataSource` (
  `sourceID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `website` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`sourceID`));

CREATE TABLE IF NOT EXISTS `Admin` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NULL DEFAULT NULL UNIQUE,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`userID`));


CREATE TABLE IF NOT EXISTS `DisasterType` (
  `disasterTypeName` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`disasterTypeName`),
  UNIQUE INDEX `disasterTypeName_UNIQUE` (`disasterTypeName` ASC) VISIBLE);


CREATE TABLE IF NOT EXISTS `District` (
  `provinceNumber` INT NOT NULL,
  `districtName` VARCHAR(45) NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  PRIMARY KEY (`districtName`));


CREATE TABLE IF NOT EXISTS `VDC_or_Municipality` (
  `vmID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `districtName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`vmID`),
  INDEX `districtName_idx` (`districtName` ASC) VISIBLE,
  CONSTRAINT `districtName`
    FOREIGN KEY (`districtName`)
    REFERENCES `District` (`districtName`));


CREATE TABLE IF NOT EXISTS `Incident` (
  `incidentID` INT NOT NULL AUTO_INCREMENT,
  `incidentDate` DATETIME NOT NULL,
  `totalDeath` INT NULL DEFAULT NULL,
  `missingPeople` INT NULL DEFAULT NULL,
  `affectedFamily` INT NULL DEFAULT NULL,
  `estimatedLoss` INT NULL DEFAULT NULL,
  `injured` INT NULL DEFAULT NULL,
  `propertyLoss` INT NULL DEFAULT NULL,
  `damagedHouses` FLOAT NULL DEFAULT NULL,
  `disasterTypeName` VARCHAR(45) NULL DEFAULT NULL,
  `locationID` INT NULL DEFAULT NULL,
  `sourceID` INT NULL DEFAULT NULL,
  PRIMARY KEY (`incidentID`),
  INDEX `locationID_idx` (`locationID` ASC) VISIBLE,
  INDEX `sourceID_idx` (`sourceID` ASC) VISIBLE,
  INDEX `disasterTypeName_idx` (`disasterTypeName` ASC) VISIBLE,
  CONSTRAINT `disasterTypeName`
    FOREIGN KEY (`disasterTypeName`)
    REFERENCES `DisasterType` (`disasterTypeName`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `locationID`
    FOREIGN KEY (`locationID`)
    REFERENCES `VDC_or_Municipality` (`vmID`),
  CONSTRAINT `sourceID`
    FOREIGN KEY (`sourceID`)
    REFERENCES `DataSource` (`sourceID`));


CREATE TABLE IF NOT EXISTS `Earthquake` (
  `earthquakeID` INT NOT NULL,
  `richterMagnitude` FLOAT UNSIGNED NULL DEFAULT NULL,
  `epicenter` VARCHAR(45) NULL DEFAULT NULL,
  UNIQUE INDEX `earthquakeID_UNIQUE` (`earthquakeID` ASC),
  CONSTRAINT `earthquakeID`
    FOREIGN KEY (`earthquakeID`)
    REFERENCES `Incident` (`incidentID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS `Fire` (
  `fireID` INT NOT NULL,
  `cause` VARCHAR(45) NULL DEFAULT NULL,
  UNIQUE INDEX `fireID_UNIQUE` (`fireID` ASC),
  CONSTRAINT `fireID`
    FOREIGN KEY (`fireID`)
    REFERENCES `Incident` (`incidentID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS `Flood` (
  `floodID` INT NOT NULL,
  `origin` VARCHAR(45) NULL DEFAULT NULL,
  `height` VARCHAR(45) NULL DEFAULT NULL,
  `cattleLoss` INT NULL DEFAULT NULL,
  UNIQUE INDEX `floodID_UNIQUE` (`floodID` ASC),
  CONSTRAINT `floodID`
    FOREIGN KEY (`floodID`)
    REFERENCES `Incident` (`incidentID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);