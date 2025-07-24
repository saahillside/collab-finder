CREATE DATABASE collab_finder;
USE collab_finder;

SET SQL_SAFE_UPDATES = 0;

-- creating tables

CREATE TABLE profiles (
    id VARCHAR(255) PRIMARY KEY,  -- "Saahil"
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    displayName VARCHAR(255),
    bio TEXT,
    profilePicture VARCHAR(512),
    genres JSON,
    roles JSON,
    socialLinks JSON
);

CREATE TABLE collabs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    genre VARCHAR(100),
    description TEXT,
    link VARCHAR(512),
    postedBy VARCHAR(255),
    postedOn DATETIME,
    FOREIGN KEY (postedBy) REFERENCES profiles(id)
);


CREATE TABLE responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    soundcloud VARCHAR(512),
    instagram VARCHAR(512),
    responseTo INT, -- which collab is this reponse to
    responseBy VARCHAR(255), -- who is responding
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (responseTo) REFERENCES collabs(id) ON DELETE CASCADE,
    FOREIGN KEY (responseBy) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  notifTo VARCHAR(255) NOT NULL,        -- who receives the notif
  notifBy VARCHAR(255),                 -- who triggered the notif (nullable for system messages if needed)
  type ENUM('response', 'follow') NOT NULL,
  message TEXT NOT NULL,
  relatedID INT,                        -- e.g., collabID (for response), userID (for follow)
  isRead BOOLEAN DEFAULT FALSE,         -- helpful for UX
  created_at TIMESTAMP DEFAULT CURRENT_TIMcollabsprofilesESTAMP,
  
  FOREIGN KEY (notifTo) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (notifBy) REFERENCES profiles(id) ON DELETE SET NULL
);


-- profiles table
ALTER TABLE profiles
MODIFY id VARCHAR(255) NOT NULL,
MODIFY username VARCHAR(255) NOT NULL,
MODIFY password VARCHAR(255) NOT NULL,
MODIFY displayName VARCHAR(255) NOT NULL,
MODIFY bio TEXT NOT NULL,
MODIFY profilePicture VARCHAR(512) NOT NULL,
MODIFY genres JSON NOT NULL,
MODIFY roles JSON NOT NULL,
MODIFY socialLinks JSON NOT NULL;

-- collabs table
ALTER TABLE collabs
MODIFY id INT NOT NULL AUTO_INCREMENT,
MODIFY title VARCHAR(255) NOT NULL,
MODIFY role VARCHAR(100) NOT NULL,
MODIFY genre VARCHAR(100) NOT NULL,
MODIFY description TEXT NOT NULL,
MODIFY link VARCHAR(512) NOT NULL,
MODIFY postedBy VARCHAR(255) NOT NULL,
MODIFY postedOn DATETIME NOT NULL;

-- responses table
ALTER TABLE responses
MODIFY id INT NOT NULL AUTO_INCREMENT,
MODIFY message TEXT NOT NULL,
MODIFY soundcloud VARCHAR(512) NOT NULL,
MODIFY instagram VARCHAR(512) NOT NULL,
MODIFY responseTo INT NOT NULL,
MODIFY responseBy VARCHAR(255) NOT NULL,
MODIFY created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

SELECT * FROM RESPONSES;

UPDATE notifications
SET isRead = false
WHERE id = 1;

SELECT * FROM PROFILES WHERE username = 'Mitosis';
select * from collabs;
