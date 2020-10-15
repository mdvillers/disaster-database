CREATE TABLE IF NOT EXISTS `District` (
  `districtName` VARCHAR(45) NOT NULL,
  `provinceNumber` INT NOT NULL,
  PRIMARY KEY (`districtName`));

CREATE TABLE IF NOT EXISTS `VDC_or_Municipality` (
  `vmId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `districtName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`vmId`),
  INDEX `districtName_idx` (`districtName` ASC) VISIBLE,
  CONSTRAINT `districtName`
    FOREIGN KEY (`districtName`)
    REFERENCES `District` (`districtName`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `DataSource` (
  `sourceId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `website` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`sourceId`));

CREATE TABLE IF NOT EXISTS `DisasterGroup` (
  `disasterGroupName` VARCHAR(45) NOT NULL,
  `description` VARCHAR(1000) NULL DEFAULT NULL,
  PRIMARY KEY (`disasterGroupName`));

CREATE TABLE IF NOT EXISTS `DisasterSubGroup` (
  `disasterSubGroupName` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  `disasterGroupName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`disasterSubGroupName`),
  CONSTRAINT `disasterGroupName`
    FOREIGN KEY (`disasterGroupName`)
    REFERENCES `DisasterGroup` (`disasterGroupName`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `DisasterType` (
 `disasterTypeId` INT NOT NULL AUTO_INCREMENT,
  `disasterTypeName` VARCHAR(45) NOT NULL,
  `disasterSubGroupName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`disasterTypeId`),
  CONSTRAINT `disasterSubGroupName`
    FOREIGN KEY (`disasterSubGroupName`)
    REFERENCES `DisasterSubGroup` (`disasterSubGroupName`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `Incident` (
  `incidentID` INT NOT NULL AUTO_INCREMENT,
  `locationId` INT NULL DEFAULT NULL,
  `disasterTypeId` INT NULL DEFAULT NULL,
  `sourceId` INT NULL DEFAULT NULL,
  `incidentDate` DATETIME NOT NULL,
  `deathMale` INT NULL DEFAULT NULL,
  `deathFemale` INT NULL DEFAULT NULL,
  `totalDeath` INT NULL DEFAULT NULL,
  `missingPeople` INT NULL DEFAULT NULL,
  `affectedFamily` INT NULL DEFAULT NULL,
  `estimatedLoss` INT NULL DEFAULT NULL,
  `injured` INT NULL DEFAULT NULL,
  `govtHousesFullyDamaged` INT NULL DEFAULT NULL,
  `govtHousesPartiallyDamaged` INT NULL DEFAULT NULL,
  `privateHouseFullyDamaged` INT NULL DEFAULT NULL,
  `privateHousePartiallyDamaged` INT NULL DEFAULT NULL,
  `displacedMale` INT NULL DEFAULT NULL,
  `displacedFemale` INT NULL DEFAULT NULL,
  `propertyLoss` INT NULL DEFAULT NULL,
  `damagedHousesPercentage` FLOAT NULL DEFAULT NULL,
  `cattlesLoss` INT NULL DEFAULT NULL,
  `numOfDisplacedFamily` INT NULL DEFAULT NULL,
  `displacedShed` INT NULL DEFAULT NULL,
  `office` VARCHAR(45) NULL DEFAULT 'Nepal Police',
  `remarks` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`incidentID`),
  INDEX `locationId_idx` (`locationId` ASC) VISIBLE,
  INDEX `disasterTypeId_idx` (`disasterTypeId` ASC) VISIBLE,
  INDEX `sourceId_idx` (`sourceId` ASC) VISIBLE,
  CONSTRAINT `locationId`
    FOREIGN KEY (`locationId`)
    REFERENCES `VDC_or_Municipality` (`vmId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `disasterTypeId`
    FOREIGN KEY (`disasterTypeId`)
    REFERENCES `DisasterType` (`disasterTypeId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `sourceId`
    FOREIGN KEY (`sourceId`)
    REFERENCES `DataSource` (`sourceId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
