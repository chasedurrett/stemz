UPDATE
  posts
SET
  title = $1,
  content = $2
WHERE
  id = $3;