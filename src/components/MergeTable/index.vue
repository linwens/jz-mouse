<template>
  <div>
    <el-table
      v-loading="loading"
      :data="data"
      style="width: 100%"
      :stripe="tableOption.stripe"
      :border="tableOption.border"
      :header-cell-style="tableOption.headerCellStyle"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        v-if="!tableOption.noIndex"
        type="index"
        label="序号"
        :align="tableOption.align"
        :index="formatIndex"
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
        :show-overflow-tooltip="item['overHidden']"
        :class-name="item['className']"
        :label-class-name="item['labelClassName']"
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
        :width="tableOption.menuWidth"
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
import axios from 'axios'

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
        return []
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
      pageInfo: this.page
    }
  },
  asyncComputed: {
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
        const dictPromises = []
        try {
          newOpt = this.tableOption.column.filter(el => !el.hide)
          // 获取动态数据字典值
          newOpt.forEach(ele => {
            if (ele.dicUrl) {
              const dictReq = () => {
                return axios({
                  url: process.env.VUE_APP_BASE_API + ele.dicUrl,
                  method: ele.dicMethod || 'get'
                })
              }
              const promise = new Promise((reslove, reject) => {
                dictReq().then(res => {
                  ele['dicData'] = res.data.data || []
                  reslove()
                }).catch((err) => {
                  console.log(`[ERROR::]字典值获取失败!\n${err}`)
                })
              })
              dictPromises.push(promise)
            }
          })
          Promise.all(dictPromises).then(res => {
            this.$emit('on-load') // 初始化请求
          })
        } catch (err) {
          console.log(err)
        }
        return newOpt
      }
    },
    indexBaseNum: {
      get() {
        if (this.pageInfo.page < 2) {
          return 1
        } else {
          return (this.pageInfo.page - 1) * this.pageInfo.limit + 1
        }
      }
    }
  },
  created() {
    // this.$emit('on-load') // 初始化请求
  },
  methods: {
    getData() { // 修改分页数据时
      this.$emit('refresh-change')
    },
    formatIndex(index) {
      index = index + this.indexBaseNum
      return index < 10 ? '0' + index : index
    },
    tableRowClassName({ row, rowIndex }) {
      if (this.tableOption.rowClassName) {
        this.tableOption.stripe = false
        if (rowIndex % 2 !== 0) {
          return this.tableOption.rowClassName
        }
      }
    }
  }
}
</script>

<style lang="scss">
</style>
