import columnNamesTransformer from '../../src/transformers/columnNamesTransformer';
import multiInsertTransformer from '../../src/transformers/multiInsertTransformer';
import {SQL} from 'pg-async';
import valueListTransformer from '../../src/transformers/valueListTransformer';

SQL.registerTransform('columnNames', columnNamesTransformer);
SQL.registerTransform('values', valueListTransformer);

describe('multi insert transformer', () => {
    it('prepares insert for multiple row', () => {
        const sql = multiInsertTransformer([
            {id: 'id1', name: 'name1', integer: 1},
            {id: 'id2', name: 'name2', integer: 2},
        ]);

        expect(sql.values).toMatchObject([
            'id1', 'name1', 1,
            'id2', 'name2', 2,
        ]);
        expect(sql.text.trim()).toMatch('("id", "name", "integer") VALUES ($1, $2, $3),\n($4, $5, $6)');
    });
});
