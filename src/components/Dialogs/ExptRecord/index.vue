<template>
  <div>
    <el-button :type="type" :size="size" @click="showList()">{{ btnText }}</el-button>
    <!-- 文件列表弹窗 -->
    <el-dialog
      title="查看记录"
      :visible.sync="recordDialog"
      width="850px"
    >
      <merge-table
        ref="crud"
        :page="page"
        :data="recordList"
        :table-option="recordOption"
        :table-loading="recordLoading"
      >
        <template slot="menu" slot-scope="{scope}">
          <el-button
            type="text"
            size="mini"
            class="btn-text--danger"
            @click="rowItemDel(scope.row)"
          >
            删除
          </el-button>
        </template>
      </merge-table>
    </el-dialog>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import { recordOption } from './table'
import { getExptRecord, delExptRecord } from '@/api/experiment'

export default {
  name: 'ExptRecord',
  components: {
    MergeTable
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    btnText: {
      type: String,
      default: '查看记录'
    },
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      // 基因型列表
      recordDialog: false,
      recordOption,
      recordLoading: false,
      recordList: [],
      page: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      }
    }
  },
  methods: {
    // 展示列表
    showList() {
      this.getList()
      this.recordDialog = true
    },
    // 获取列表
    getList() {
      this.recordLoading = true
      getExptRecord({
        experimentId: this.id,
        current: this.page.page,
        size: this.page.limit
      }).then(res => {
        this.recordList = res.data.records
        console.log(this.recordList)
      }).finally(() => {
        this.recordLoading = false
      })
    },
    handleRefreshChange() {
      this.getList()
    },
    // 删除
    rowItemDel: function(row) {
      const _this = this
      this.$confirm('是否确认删除实验记录' + row.id + '?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delExptRecord(row.id)
      }).then(() => {
        this.getDictItemList()
        _this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      }).catch(function() {
      })
    }
  }
}
</script>

<style lang="scss">

</style>
