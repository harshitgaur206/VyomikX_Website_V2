-- Contact Submissions SQL Database File
CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT NOT NULL,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contact_submissions (id, name, email, organization, type, message, created_at) VALUES ('1784885840371-59x2w7a', 'hjuy', 'hgaur9368@gmail.com', 'ece', 'School Visit Request', '2ed', '2026-07-24T09:37:20.371Z');
INSERT INTO contact_submissions (id, name, email, organization, type, message, created_at) VALUES ('1784886354156-zl4kivv', 'Harshit Gaur', 'hgaur9368@gmail.com', 'AMU', 'Donate Spare Parts', 'I would like to connect', '2026-07-24T09:45:54.156Z');
INSERT INTO contact_submissions (id, name, email, organization, type, message, created_at) VALUES ('1784886358365-165t6wf', 'Harshit Gaur', 'hgaur9368@gmail.com', 'AMU', 'Donate Spare Parts', 'I would like to connect', '2026-07-24T09:45:58.365Z');
INSERT INTO contact_submissions (id, name, email, organization, type, message, created_at) VALUES ('1784888503727-m16k361', 'Harshit Gaur', 'hgaur9368@gmail.com', 'AMU', 'School Visit Request', 'cewvr', '2026-07-24T10:21:43.727Z');
INSERT INTO contact_submissions (id, name, email, organization, type, message, created_at) VALUES ('1784888505761-voec29w', 'Harshit Gaur', 'hgaur9368@gmail.com', 'AMU', 'School Visit Request', 'cewvr', '2026-07-24T10:21:45.761Z');
INSERT INTO contact_submissions (id, name, email, organization, type, message, created_at) VALUES ('1784888506645-ghlf2xi', 'Harshit Gaur', 'hgaur9368@gmail.com', 'AMU', 'School Visit Request', 'cewvr', '2026-07-24T10:21:46.645Z');
INSERT INTO contact_submissions (id, name, email, organization, type, message, created_at) VALUES ('1784888507408-k8dw4gv', 'Harshit Gaur', 'hgaur9368@gmail.com', 'AMU', 'School Visit Request', 'cewvr', '2026-07-24T10:21:47.408Z');
INSERT INTO contact_submissions (id, name, email, organization, type, message, created_at) VALUES ('1784888508156-y7gq9vy', 'Harshit Gaur', 'hgaur9368@gmail.com', 'AMU', 'School Visit Request', 'cewvr', '2026-07-24T10:21:48.156Z');
