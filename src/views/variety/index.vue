<template>
  <div>
    <main-box>
      <div>
        <div class="df s-jcsb s-aic mt8 mb8">
          <span>品系管理</span>
          <div>
            <add-variety-btn @done="getList" />
            <el-button type="primary" class="ml10" @click="goGenes()">新增基因型</el-button>
            <el-button type="primary" @click="goList()">查看品系列表</el-button>
          </div>
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
            <template slot="menu" slot-scope="{scope}">
              <el-button
                type="text"
                size="mini"
                @click="goEdit(scope.row)"
              >
                编辑
              </el-button>
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
        </div>
      </div>
    </main-box>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import AddVarietyBtn from '@/components/Dialogs/cpt_add_variety'
import { tableOption } from './table'
import { addItemObj, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj } from '@/api/variety'

export default {
  name: 'DelList',
  components: {
    MergeTable,
    AddVarietyBtn
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

  },
  methods: {
    goGenes() {
      this.goPage('varietyEdit', { type: 'add' })
    },
    goList() {
      this.goPage('varietyList', { type: 'list' })
    },
    goEdit(row) {
      this.goPage('varietyEdit', row)
    },
    goPage(r, obj) {
      this.$router.push({ name: r, params: obj })
    },
    handleRefreshChange() {
      this.getList()
    },
    // 新增品系
    addVariety() {},
    // 删除
    rowItemDel: function(row) {
      console.log(row)
      const _this = this
      this.$confirm('是否确认删除品系："' + row.varietiesName + '"?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return delItemObj(row.id)
      }).then(() => {
        this.getList()
        _this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      }).catch(() => {
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
