select
    sp.id,
    sp.name,
    sp.img,
    u.username as author
from samplepackcontents spc
    inner join samplepack sp on spc.sample_pack_id = sp.id
    inner join users u on sp.author = u.id
where spc.sample_pack_id = $1