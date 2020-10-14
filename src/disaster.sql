CREATE TABLE IF NOT EXISTS `District` (
  `District_Name` VARCHAR(45) NOT NULL,
  `Province_Number` INT NOT NULL,
  PRIMARY KEY (`District_Name`));

CREATE TABLE IF NOT EXISTS `VDC_or_Municipality` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(40) NOT NULL,
  `Latitude` FLOAT NOT NULL,
  `Longitude` FLOAT NOT NULL,
  `District_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `District_Name_idx` (`District_Name` ASC) VISIBLE,
  CONSTRAINT `District_Name`
    FOREIGN KEY (`District_Name`)
    REFERENCES `District` (`District_Name`)
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
  `DisasterSubGroupName` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  `DisasterSubGroupcol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`DisasterSubGroupName`),
  CONSTRAINT `disasterGroupName`
    FOREIGN KEY (`DisasterSubGroupName`)
    REFERENCES `DisasterGroup` (`disasterGroupName`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `DisasterType` (
  `disasterTypeName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`disasterTypeName`),
  CONSTRAINT `disasterSubgroupName`
    FOREIGN KEY (`disasterTypeName`)
    REFERENCES `DisasterSubGroup` (`DisasterSubGroupName`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `Incident` (
  `incidentID` INT NOT NULL AUTO_INCREMENT,
  `locationId` INT NULL DEFAULT NULL,
  `disasterTypeName` VARCHAR(45) NULL DEFAULT NULL,
  `sourceId` INT NULL DEFAULT NULL,
  `IncidentDate` DATETIME NOT NULL,
  `DeathMale` INT NULL DEFAULT NULL,
  `DeathFemale` INT NULL DEFAULT NULL,
  `Total Death` INT NULL DEFAULT NULL,
  `Missing People` INT NULL DEFAULT NULL,
  `Affected Family` INT NULL DEFAULT NULL,
  `Estimated Loss` INT NULL DEFAULT NULL,
  `Injured` INT NULL DEFAULT NULL,
  `Govt. Houses Fully Damaged` INT NULL DEFAULT NULL,
  `Govt. Houses Partially Damaged` INT NULL DEFAULT NULL,
  `Private House Fully Damaged` INT NULL DEFAULT NULL,
  `Private House Partially Damaged` INT NULL DEFAULT NULL,
  `Displaced Male` INT NULL DEFAULT NULL,
  `Displaced Female` INT NULL DEFAULT NULL,
  `Property Loss` INT NULL DEFAULT NULL,
  `Damaged Houses(%)` FLOAT NULL DEFAULT NULL,
  `Cattles Loss` INT NULL DEFAULT NULL,
  `No. of Displaced Family` INT NULL DEFAULT NULL,
  `Displaced Shed` INT NULL DEFAULT NULL,
  `Office` VARCHAR(45) NULL DEFAULT 'Nepal Police',
  `Remarks` LONGTEXT NULL DEFAULT NULL,
  `Incidentcol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`incidentID`),
  INDEX `locationId_idx` (`locationId` ASC) VISIBLE,
  INDEX `disasterTypeName_idx` (`disasterTypeName` ASC) VISIBLE,
  INDEX `sourceId_idx` (`sourceId` ASC) VISIBLE,
  CONSTRAINT `locationId`
    FOREIGN KEY (`locationId`)
    REFERENCES `VDC_or_Municipality` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `disasterTypeName`
    FOREIGN KEY (`disasterTypeName`)
    REFERENCES `DisasterType` (`disasterTypeName`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `sourceId`
    FOREIGN KEY (`sourceId`)
    REFERENCES `DataSource` (`sourceId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
