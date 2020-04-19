<template>
  <div>
    <el-table
      v-loading="loading"
      :data="data"
      style="width: 100%"
      :stripe="tableOption.stripe"
      :border="tableOption.border"
    >
      <el-table-column
        v-if="!tableOption.noIndex"
        type="index"
        label="序号"
        :align="tableOption.align"
        width="50"
        fixed
      />
      <el-table-column
        v-for="(item, index) in option"
        :key="index"
        :prop="item['prop']"
        :label="item['label']"
        :width="item['width']"
        :fixed="item['fixed']"
        :align="item['align'] || tableOption.align"
      >
        <template slot-scope="scope">
          <slot v-if="item['slot']" :name="item['prop']" :scope="scope" />
          <div v-else>
            <span v-if="item['format']">
              {{ scope.row[item['prop']] | timeFormat(item['format']) }}
            </span>
            <span v-else-if="item['dicData'] && item['dicData'].length > 0">
              {{ scope.row[item['prop']] | dicLabel(item['dicData']) }}
            </span>
            <span v-else>
              {{ scope.row[item['prop']] }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableOption.menu"
        label="操作"
        :align="tableOption.align || 'center'"
        fixed="right"
      >
        <template slot-scope="scope">
          <slot :name="'menu'" :scope="scope" />
        </template>
      </el-table-column>
    </el-table>
    <div class="df" :style="{'justify-content': pagPos}">
      <pagination v-show="pageInfo.total>0" :total="pageInfo.total" :page.sync="pageInfo.page" :limit.sync="pageInfo.limit" @pagination="getData" />
    </div>
  </div>
</template>

<script>
import { dateTimeFormatter } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  filters: {
    timeFormat: function(val, cForm) {
      return dateTimeFormatter(val, cForm)
    },
    dicLabel: function(val, dicData) { // 字典值转化
      const rslt = dicData.filter(el => el.value === val)
      return rslt[0].label
    }
  },
  components: {
    Pagination
  },
  props: {
    // 表格数据
    data: {
      type: Array,
      default() {
        return [{
          createTime: 1581929792000,
          roleName: '王小虎',
          roleDesc: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    // 表格配置
    tableOption: {
      type: Object,
      default() {
        return {}
      }
    },
    // 分页信息
    page: {
      type: Object,
      default() {
        return {
          total: 0,
          page: 1,
          limit: 20
        }
      }
    },
    // 进度条
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageInfo: this.page,
      tableOptionMock: {
        stripe: true,
        column: [{
          prop: 'date',
          label: '日期',
          width: '180',
          fixed: '',
          format: 'yyyy-MM-dd hh:mm' // 界面展示的格式
        }, {
          prop: 'name',
          label: '姓名',
          slot: true
        }, {
          prop: 'address',
          label: '地址'
        }]
      },
      tableDataMock: [{
        date: 1581929792000,
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: 1581728614000,
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: 1581628614000,
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: 1581528614000,
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {
    pagPos: { // 分页器的对齐位置
      get() {
        const posObj = {
          'left': 'flex-start',
          'center': 'center',
          'right': 'flex-end'
        }
        return this.tableOption.pagePos ? posObj[this.tableOption.pagePos] : posObj['right'] // 默认右对齐
      }
    },
    option: {
      get() {
        let newOpt = null
        try {
          newOpt = this.tableOption.column.filter(el => !el.hide)
        } catch (err) {
          console.log('tableOption---err->', err)
        }
        return newOpt
      }
    }
  },
  created() {
    this.$emit('on-load') // 初始化请求
  },
  methods: {
    getData() { // 修改分页数据时
      this.$emit('refresh-change')
    }
  }
}
</script>

<style lang="scss">

</style>
