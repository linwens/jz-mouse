<template>
  <div>
    <main-box>
      <div>
        <div class="df s-jcsb s-aic mt8 mb8">
          <span>繁育管理</span>
          <el-button type="primary" @click="goAdd()">新增繁育组</el-button>
        </div>
        <div class="bd-gray">
          <merge-table
            ref="crud"
            :page="page"
            :data="tableData"
            :table-option="tableOption"
            :table-loading="tableLoading"
            @on-load="getList"
            @refresh-change="handleRefreshChange"
          >
            <template slot="menu" slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="goEdit()"
              >
                查看详情
              </el-button>
              <el-button
                type="text"
                size="mini"
                class="btn-text--danger"
                @click="rowItemDel(scope.scope.row)"
              >
                删除
              </el-button>
            </template>
          </merge-table>
        </div>
      </div>
    </main-box>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import { tableOption } from './table'
import { addItemObj, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj } from '@/api/breed'

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
      tableData: [{
        num: 0,
        sex: 1,
        borth_time: 1587277449395,
        weight: '180kg',
        class_type: '繁育组XX-XX到了繁育时间',
        基因型: '基因型xxx',
        fur: '红色',
        health_status: 1,
        type: 2
      }, {
        num: 0,
        sex: 1,
        borth_time: 1587277449395,
        weight: '180kg',
        class_type: '繁育组XX-XX到了繁育时间',
        基因型: '基因型xxx',
        fur: '红色',
        health_status: 1,
        type: 2
      }]
    }
  },
  created() {

  },
  methods: {
    goAdd() {
      this.goPage({ type: 'add' })
    },
    goEdit(row) {
      this.goPage({ id: 1, type: 'edit' })
    },
    goPage(obj) {
      this.$router.push({ name: 'breedEdit', params: obj })
    },
    handleRefreshChange() {
      this.getList()
    },
    // 删除
    rowItemDel: function(row) {
      const _this = this
      this.$confirm('是否确认删除数据为"' + row.label + '"的数据项?', '警告', {
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

</style>
