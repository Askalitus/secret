
CREATE TABLE IF NOT EXISTS links (
  id SERIAL NOT NULL PRIMARY KEY,
  link TEXT NOT NULL,
  message TEXT NOT NULL,
  days INT NOT NULL,
  watching INT NOT NULL
);


INSERT INTO links VALUES
(1, 'http://localhost/ne21ne1o', 'hello', 3, 3);

