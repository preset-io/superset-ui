import React, { Component } from 'react';
// @ts-ignore
import { Runtime, Inspector, Library } from '@observablehq/runtime';

interface Props {
  observableUrl: string;
  data: any;
  displayedCells: string[];
  dataInjectionCell: string;
  width: number;
  height: number;
}

interface State {
  cellNames: string[];
}

export default class ObservableLoader extends Component<Props, State> {
  state = { cellNames: [] };
  notebookWrapperRef = React.createRef<HTMLDivElement>();
  displayRefs: { [key: string]: HTMLDivElement | null } = {};
  notebook = null;
  dataCell = {
    value: null,
  };

  get notebookURL() {
    const notebookName = this.props.observableUrl.replace(/.*:\/\/observablehq.com\//gim, '');
    return `https://api.observablehq.com/${notebookName}.js?v=3`;
  }

  componentDidMount() {
    import(/* webpackIgnore: true */ this.notebookURL).then(module => {
      this.notebook = module.default;
      const runtime = new Runtime();
      let cellNames: string[] = [];
      let module_ = null;
      /*
       */
      if (!this.props.displayedCells.length) {
        console.log('!this.props.displayedCells');
        module_ = runtime.module(this.notebook, Inspector.into(this.notebookWrapperRef.current));
        document.dispatchEvent(event);
      } else {
        document.dispatchEvent(event);
        console.log('ELSE there is length');
        module_ = runtime.module(this.notebook, (name: string) => {
          if (name) cellNames.push(name);
          const event = new CustomEvent('change_select_options', {
            detail: {
              name: 'displayed_cells',
              options: this.props.cellNames,
            },
          });
          if (this.props.displayedCells.includes(name) && this.displayRefs[name] !== null) {
            return new Inspector(this.displayRefs[name]);
          }
        });
      }
      module_.redefine(this.props.dataInjectionCell, [], this.props.data);
      module_.redefine('width', [], this.props.width);
      module_.redefine('height', [], this.props.height);
      console.log('----CELNAMES---');
      console.log('cellnames', this.state.cellNames);
      this.setState({ cellNames });
      const event = new CustomEvent('change_select_options', {
        detail: {
          name: 'displayed_cells',
          options: this.props.cellNames,
        },
      });
    });
  }

  render() {
    const wrapperStyles = {
      overflow: 'auto',
      width: this.props.width,
      height: this.props.height,
    };
    return (
      <div style={wrapperStyles}>
        <div className="notebook-wrapper" ref={this.notebookWrapperRef}>
          {this.props.displayedCells.map(name => (
            <div
              key={name}
              id={`cell-${name}`}
              ref={ref => {
                this.displayRefs[name] = ref;
              }}
            />
          ))}
        </div>
        {this.props.children}
      </div>
    );
  }
}
