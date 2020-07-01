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
    samplepackcontents spc
    inner join samples s on spc.sample_id = s.id
    inner join genre g on s.genre_id = g.id
    inner join instrument i on s.instrument = i.id
    inner join users u on s.sample_author = u.id
    inner join sample_type samp on s.sample_type_id = samp.id
    inner join samplepack on samplepack.id = spc.sample_pack_id
where spc.sample_pack_id = $1