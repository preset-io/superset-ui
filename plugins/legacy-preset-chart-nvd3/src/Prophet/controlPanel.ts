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
import { legacyValidateInteger, legacyValidateNumber } from '@superset-ui/validator';
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
            name: 'periods',
            config: {
              type: 'TextControl',
              label: t('Forecast periods'),
              validators: [legacyValidateInteger],
              default: 10,
              description: t('How many periods into the future do we want to predict'),
            },
          },
        ],
        ['metric'],
        ['adhoc_filters'],
        ['row_limit', null],
      ],
    },
    {
      label: t('Model parameters'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'interval',
            config: {
              type: 'TextControl',
              label: t('Confidence interval'),
              validators: [legacyValidateNumber],
              default: 0.8,
              description: t('Width of the confidence interval. Should be between 0 and 1'),
            },
          },
          null,
        ],
        [
          {
            name: 'seasonality_yearly',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: 'Yearly seasonality',
              choices: [
                [null, 'default'],
                [true, 'Yes'],
                [false, 'No'],
              ],
              default: null,
              description: t(
                'Should yearly seasonality be applied. An integer value will specify Fourier order of seasonality.',
              ),
            },
          },
          {
            name: 'seasonality_weekly',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: 'Weekly seasonality',
              choices: [
                [null, 'default'],
                [true, 'Yes'],
                [false, 'No'],
              ],
              default: null,
              description: t(
                'Should weekly seasonality be applied. An integer value will specify Fourier order of seasonality.',
              ),
            },
          },
        ],
        [
          {
            name: 'seasonality_daily',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: 'Daily seasonality',
              choices: [
                [null, 'default'],
                [true, 'Yes'],
                [false, 'No'],
              ],
              default: null,
              description: t(
                'Should daily seasonality be applied. An integer value will specify Fourier order of seasonality.',
              ),
            },
          },
          null,
        ],
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
