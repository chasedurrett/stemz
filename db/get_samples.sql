select 
    s.id,
    s.name,
    s.sample_key,
    g.genre,
    i.instrument,
    s.sample_url,
    u.username,
    samp.sample_type
from 
    samples s
inner join genre g on s.genre_id = g.id
inner join instrument i on s.instrument = i.id 
inner join users u on s.sample_author = u.id 
inner join sample_type samp on s.sample_type_id = samp.id

