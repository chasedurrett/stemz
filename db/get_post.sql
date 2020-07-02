select
    p.id,
    p.title,
    p.content,
    u.username,
    p.author_id
from posts p
    join users u on p.author_id = u.id
where p.id = $1