select
    sp.id,
    sp.name,
    sp.img,
    u.username
from samplepack sp
    join users u on sp.author = u.id
order by id ASC;