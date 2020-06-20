insert into samples
    (
    name,
    sample_key,
    sample_type_id,
    genre_id,
    instrument,
    sample_url,
    sample_author
    )
values
    (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
)
returning *;