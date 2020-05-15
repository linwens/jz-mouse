<template>
  <div>
    <main-box>
      <div class="delList__sum fs14">总计：{{ page.total }}条数据</div>
      <div class="bd-gray">
        <merge-table
          ref="crud"
          :page="page"
          :data="tableData"
          :table-option="tableOption"
          :table-loading="tableLoading"
        >
          <template slot="menu" slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              class="btn-text--danger"
              @click="rowItemDel(scope.scope.row)"
            >
              移除
            </el-button>
          </template>
        </merge-table>
      </div>
    </main-box>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import { tableOption } from './table'
import { delItemObj, fetchList } from '@/api/delList'

export default {
  name: 'DelList',
  components: {
    MergeTable
  },
  data() {
    return {
      tableOption,
      tableLoading: false,
      page: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleRefreshChange() {
      this.getList()
    },
    // 删除
    rowItemDel: function(row) {
      const _this = this
      this.$confirm('是否确认删除"' + row.miceId + '"小鼠的数据?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delItemObj(row.id)
      }).then(() => {
        this.getDictItemList()
        _this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      }).catch(function() {
      })
    },
    // 获取列表
    getList() {
      this.tableLoading = true
      fetchList(Object.assign({
        current: this.page.page,
        size: this.page.limit
      })).then(response => {
        this.tableData = response.data.records
        this.page.total = response.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
  .delList__sum{
    margin: 18px 0;
  }
</style>
