import { ColumnType } from '../src';
import processMetrics from '../src/processMetrics';

describe('processMetrics', () => {
  it('should handle an array of metrics', () => {
    const metrics = processMetrics(['sum__num']);
    expect(metrics).toEqual([{ label: 'sum__num' }]);
  });

  it('should handle multiple types of metrics', () => {
    const metrics = processMetrics([
      'sum__num',
      {
        aggregate: 'AVG',
        column: {
          columnName: 'sum_girls',
          id: 5,
          type: ColumnType.BIGINT,
        },
        expressionType: 'SIMPLE',
      },
      {
        expressionType: 'SQL',
        sqlExpression: 'COUNT(sum_girls)',
      },
    ]);
    expect(metrics).toEqual([
      { label: 'sum__num' },
      {
        aggregate: 'AVG',
        column: {
          columnName: 'sum_girls',
          id: 5,
          type: ColumnType.BIGINT,
        },
        expressionType: 'SIMPLE',
        label: 'AVG(sum_girls)',
      },
      {
        expressionType: 'SQL',
        label: 'COUNT(sum_girls)',
        sqlExpression: 'COUNT(sum_girls)',
      },
    ]);
  });
});
