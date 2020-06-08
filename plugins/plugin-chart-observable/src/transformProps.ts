import { ChartProps } from '@superset-ui/chart';
import { ObservableProps } from './chart/Observable';
import { ObservableFormData } from './types';

export default function transformProps(chartProps: ChartProps): ObservableProps {
  const { width, height, formData, queryData } = chartProps;
  const {
    observableUrl,
    displayedCells,
    dataInjectionCell,
    showDebug,
  } = formData as ObservableFormData;

  return {
    data: queryData.data,
    height,
    observableUrl: observableUrl || 'no workbook url selected',
    displayedCells: displayedCells || [],
    dataInjectionCell: dataInjectionCell || '',
    showDebug: showDebug || false,
    width,
  };
}