import * as echarts from 'echarts/core'

import { BarChart, LineChart, PieChart, RadarChart, PictorialBarChart } from 'echarts/charts'

import { SVGRenderer } from 'echarts/renderers'

import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  PictorialBarChart,
  SVGRenderer,
  TooltipComponent,
  GridComponent,
  LegendComponent,
])

export default echarts
