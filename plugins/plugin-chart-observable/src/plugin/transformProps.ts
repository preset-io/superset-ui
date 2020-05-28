import { ChartProps } from '@superset-ui/chart';
import { ObservableProps } from '../chart/Observable';
import { ObservableFormData } from '../types';

export default function transformProps(chartProps: ChartProps): ObservableProps {
  const { width, height, formData, queryData } = chartProps;
<<<<<<< Updated upstream
  const {
    observableUrl,
    displayedCells,
    dataInjectionCell,
    showDebug,
  } = formData as ObservableFormData;

=======
  const { observableUrl, displayedCells, showDebug } = formData as ObservableFormData;
  console.log('displayedCells', displayedCells)
>>>>>>> Stashed changes
  // console.warn('formData!!!!!!!!!!!', formData);
  console.log('------------------')
  console.log('------------------')
  return {
    data: queryData.data,
    height,
<<<<<<< Updated upstream
    observableUrl: observableUrl || 'no workbook url selected',
    displayedCells: displayedCells || [],
    dataInjectionCell: dataInjectionCell || '',
=======
    observableUrl: observableUrl || 'nada',
    displayedCells,
>>>>>>> Stashed changes
    showDebug: showDebug || false,
    width,
  };
}
