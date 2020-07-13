## @superset-ui/plugin-chart-echarts-pie

[![Version](https://img.shields.io/npm/v/@superset-ui/plugin-chart-echarts-pie.svg?style=flat-square)](https://img.shields.io/npm/v/@superset-ui/plugin-chart-echarts-pie.svg?style=flat-square)
[![David (path)](https://img.shields.io/david/apache-superset/superset-ui.svg?path=packages%2Fsuperset-ui-plugin-chart-echarts-pie&style=flat-square)](https://david-dm.org/apache-superset/superset-ui?path=packages/superset-ui-plugin-chart-echarts-pie)

This plugin provides Pie chart using ECharts for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to lookup this chart throughout the app.

```js
import EchartsPieChartPlugin from '@superset-ui/plugin-chart-echarts-pie';

new EchartsPieChartPlugin()
  .configure({ key: 'echarts-pie' })
  .register();
```

Then use it via `SuperChart`. See [storybook](https://apache-superset.github.io/superset-ui/?selectedKind=plugin-chart-echarts-pie) for more details.

```js
<SuperChart
  chartType="echarts-pie"
  width={600}
  height={600}
  formData={...}
  queryData={{
    data: {...},
  }}
/>
```

### File structure generated

```
├── README.md
├── package.json
├── src
│   ├── EchartsPie.tsx
│   ├── images
│   │   └── thumbnail.png
│   ├── index.ts
│   ├── plugin
│   │   ├── buildQuery.ts
│   │   ├── controlPanel.ts
│   │   ├── index.ts
│   │   └── transformProps.ts
│   └── types.ts
├── test
│   └── index.test.ts
└── types
    └── external.d.ts
```