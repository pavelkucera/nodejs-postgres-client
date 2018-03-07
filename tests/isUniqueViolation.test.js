import isUniqueViolation from '../src/isUniqueViolation';
import QueryError from '../src/errors/QueryError';

describe('isUniqueViolation', () => {
    it('returns false for an error without code', () => {
        const error = new Error();

        const result = isUniqueViolation(error);
        expect(result).toBe(false);
    });

    it('returns false for a non-unique violation error', () => {
        const error = new Error();
        error.code = '42';

        const result = isUniqueViolation(error);
        expect(result).toBe(false);
    });

    it('returns true for a unique violation error', () => {
        const error = new Error();
        error.code = '23505';

        const result = isUniqueViolation(error);
        expect(result).toBe(true);
    });

    it('returns false for an error without code in QueryError', () => {
        const error = new Error();

        const queryError = new QueryError('', []);
        queryError.causedBy = error;

        const result = isUniqueViolation(queryError);
        expect(result).toBe(false);
    });

    it('returns false for a non-unique violation error in QueryError', () => {
        const error = new Error();
        error.code = '42';

        const queryError = new QueryError('', []);
        queryError.causedBy = error;

        const result = isUniqueViolation(queryError);
        expect(result).toBe(false);
    });

    it('returns true for a unique violation error in QueryError', () => {
        const error = new Error();
        error.code = '23505';

        const queryError = new QueryError('', []);
        queryError.causedBy = error;

        const result = isUniqueViolation(queryError);
        expect(result).toBe(true);
    });

    it('returns false for a QueryError without caused by error without code', () => {
        const queryError = new QueryError('', []);

        const result = isUniqueViolation(queryError);
        expect(result).toBe(false);
    });

    it('returns false for a QueryError without caused by error with a non-unique violation code', () => {
        const queryError = new QueryError('', []);
        queryError.code = '42';

        const result = isUniqueViolation(queryError);
        expect(result).toBe(false);
    });

    it('returns true for a QueryError without caused by error with a unique violation code', () => {
        const queryError = new QueryError('', []);
        queryError.code = '23505';

        const result = isUniqueViolation(queryError);
        expect(result).toBe(true);
    });
});