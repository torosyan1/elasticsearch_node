import { elasticSearchClient } from '../server';

export const searchUsers = async (data) =>
    elasticSearchClient
        .search({
            index: 'users',
            body: {
                query: {
                    match: {
                        name: data?.value,
                    },
                },
            },
        })
        .then((res) => res.body.hits.hits);
