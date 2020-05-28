/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { t } from '@superset-ui/translation';
import { sections } from '@superset-ui/control-utils';
import {
  lineInterpolation,
  showBrush,
  showLegend,
  xAxisLabel,
  bottomMargin,
  xTicksLayout,
  xAxisFormat,
  yLogScale,
  yAxisBounds,
  yAxisLabel,
  xAxisShowMinmax,
  yAxisShowMinmax,
  richTooltip,
  leftMargin,
  showMarkers,
  timeSeriesSection,
} from '../NVD3Controls';

export default {
  requiresTime: true,
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'training',
            config: {
              type: 'TextControl',
              label: t('Training Period'),
              default: '',
              description: t('FOr what time period should the model be trained'),
            },
          },
          {
            name: 'periods',
            config: {
              type: 'TextControl',
              label: t('Forecast periods'),
              default: '',
              description: t('How many periods into the future do we want to predict'),
            },
          },
        ],
        ['metric'],
        ['adhoc_filters'],
        ['limit', 'timeseries_limit_metric'],
        [
          {
            name: 'order_desc',
            config: {
              type: 'CheckboxControl',
              label: t('Sort Descending'),
              default: true,
              description: t('Whether to sort descending or ascending'),
            },
          },
          {
            name: 'contribution',
            config: {
              type: 'CheckboxControl',
              label: t('Contribution'),
              default: false,
              description: t('Compute the contribution to the total'),
            },
          },
        ],
        ['row_limit', null],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ['color_scheme', 'label_colors'],
        [
          showBrush,
          {
            name: 'send_time_range',
            config: {
              type: 'CheckboxControl',
              label: t('Propagate'),
              renderTrigger: true,
              default: false,
              description: t('Send range filter events to other charts'),
            },
          },
          showLegend,
        ],
        [richTooltip, showMarkers],
        [lineInterpolation],
      ],
    },
    {
      label: t('X Axis'),
      expanded: true,
      controlSetRows: [
        [xAxisLabel, bottomMargin],
        [xTicksLayout, xAxisFormat],
        [xAxisShowMinmax, null],
      ],
    },
    {
      label: t('Y Axis'),
      expanded: true,
      controlSetRows: [
        [yAxisLabel, leftMargin],
        [yAxisShowMinmax, yLogScale],
        ['y_axis_format', yAxisBounds],
      ],
    },
    timeSeriesSection[1],
    sections.annotations,
  ],
  controlOverrides: {
    row_limit: {
      default: 50000,
    },
  },
  sectionOverrides: {
    druidTimeSeries: {
      controlSetRows: [['granularity', 'druid_time_origin'], ['time_range']],
    },
    sqlaTimeSeries: {
      controlSetRows: [['granularity_sqla', 'time_grain_sqla'], ['time_range']],
    },
  },
};
