import React from 'react';
import { PlainObject } from 'encodable';
import { SupersetThemeProps } from '@superset-ui/style';
import ObservableLoader from './ObservableLoader';

/**
 * These props should be stored when saving the chart.
 */
export interface ObservableVisualProps {
  observableUrl: string;
  displayedCells: string[];
  dataInjectionCell: string;
  showDebug: boolean;
}

export interface ObservableProps extends ObservableVisualProps {
  data: PlainObject[];
  height: number;
  width: number;
}

class Observable extends React.PureComponent<ObservableProps & SupersetThemeProps> {
  render() {
    const {
      width,
      height,
      data,
      observableUrl,
      displayedCells,
      dataInjectionCell,
      showDebug,
    } = this.props;

    return (
      <div>
        <ObservableLoader
          observableUrl={observableUrl}
          data={data}
          displayedCells={displayedCells}
          dataInjectionCell={dataInjectionCell}
          width={width}
          height={height}
        >
          {showDebug && (
            <div>
              <h2>Data</h2>
              <pre>{JSON.stringify(data, undefined, 2)}</pre>
            </div>
          )}
        </ObservableLoader>
      </div>
    );
  }
}

export default Observable;