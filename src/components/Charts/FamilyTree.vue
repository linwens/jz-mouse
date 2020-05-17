<template>
  <div>
    <el-button size="mini" icon="el-icon-search">查看详情</el-button>
    <span>{{ curMouse }}</span>
    <div :id="miceId" :class="className" :style="{height:height,width:width, 'min-height': '500px'}" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { getMouseTree } from '@/api/mouse'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'fTree'
    },
    miceId: {
      type: Number,
      default: 0
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null,
      curMouse: ''
    }
  },
  watch: {
    miceId(n, o) {
      this.initChart()
    }
  },
  mounted() {
    if (this.miceId) {
      getMouseTree({
        descendant: this.miceId
      }).then((res) => {
        console.log(res)
        this.initChart()
      })
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.miceId))
      this.chart.showLoading()
      const data = {
        'name': '小鼠',
        'value': 'ee444',
        'children': [
          {
            'name': '父鼠A',
            'value': 'fds333',
            'children': [{
              'name': '父鼠B',
              'value': 'fds333',
              'children': [{
                'name': '父鼠C',
                'value': 'fds333'
              }, {
                'name': '母鼠C',
                'value': 'fds333'
              }]
            }, {
              'name': '母鼠B',
              'value': 'fds333',
              'children': [{
                'name': '父鼠C',
                'value': 'fds333'
              }, {
                'name': '母鼠C',
                'value': 'fds333'
              }]
            }]
          }, {
            'name': '母鼠A',
            'value': 'fds333',
            'children': [{
              'name': '父鼠B',
              'value': 'fds333',
              'children': [{
                'name': '父鼠C',
                'value': 'fds333'
              }, {
                'name': '母鼠C',
                'value': 'fds333'
              }]
            }, {
              'name': '母鼠B',
              'value': 'fds333',
              'children': [{
                'name': '父鼠C',
                'value': 'fds333'
              }, {
                'name': '母鼠C',
                'value': 'fds333'
              }]
            }]
          }]
      }
      this.chart.hideLoading()
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: '{c}' // 控制标签展示的内容：{b}数据名；{c}数据值
        },
        series: [
          {
            type: 'tree',
            name: 'familyTree',
            data: [data],

            top: 'middle',
            left: 'center',
            bottom: '2%',
            right: '10%',
            width: '80%',
            height: '80%',
            roam: true, // 开启鼠标拖动和缩放

            symbolSize: 8, // 圈圈大小
            orient: 'TB', // 布局方向：上到下
            initialTreeDepth: 0, // 初始展开的层级深度：0只展示根节点
            label: {
              normal: {
                position: 'top',
                verticalAlign: 'middle',
                align: 'left',
                distance: 8
                // rotate: -90,
              }
            },
            lineStyle: {
              curveness: 0.5 // 连线的曲率
            },
            leaves: {
              label: {
                normal: {
                  position: 'bottom',
                  verticalAlign: 'middle',
                  align: 'center'
                  // rotate: -90,
                }
              }
            },

            expandAndCollapse: true,

            animationDuration: 550, // 初始动画的时长
            animationDurationUpdate: 750 // 数据更新动画的时长
          }
        ]
      })
      // 绑定点击事件
      const self = this
      this.chart.on('click', {
        seriesName: 'familyTree'
      }, function(e) {
        console.log(e, e.name)
        self.curMouse = e.name
      })
    }
  }
}
</script>

<style lang="scss">

</style>
