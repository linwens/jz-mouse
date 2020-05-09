<template>
  <div>
    <main-box class="experiment__list">
      <div>
        <div class="df s-jcsb s-aic mt8 mb8">
          <span>实验管理</span>
          <el-button type="primary" @click="goAdd()">新增实验组</el-button>
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
            <template slot="operation_check" slot-scope="scope">
              <el-button type="text" @click="showOperList(scope.scope.row)">查看</el-button>
            </template>
            <template slot="module_rslt" slot-scope="scope">
              <el-button type="text" @click="setPregTime(scope.scope.row)">查看</el-button>
              <el-button
                type="text"
                class="btn-text--black"
                @click="setPregTime(scope.scope.row)"
              >上传</el-button>
            </template>
            <template slot="menu" slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="goEdit()"
              >
                设置时间
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="goEdit(scope.scope.row)"
              >
                详情
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="goEdit()"
              >
                手动结束
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
    <!-- 实验记录 -->
    <el-dialog title="实验记录" :visible.sync="exptRecordVisible">
      <merge-table
        ref="crud"
        :page="exptPage"
        :data="exptData"
        :table-option="exptOption"
        :table-loading="exptLoading"
        @on-load="getList"
        @refresh-change="handleRefreshChange"
      >
        <template slot="menu" slot-scope="scope">
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
    </el-dialog>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import { tableOption } from './table'
import { exptOption } from './exptTable'
import { addItemObj, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj } from '@/api/experiment'

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
        name: 111,
        num: 1,
        sum: 1,
        start_time: 1587277449395,
        end_time: 1587277449395,
        check_time: 1587277449395,
        handle_time: 1587277449395
      }, {
        name: 111,
        num: 1,
        sum: 1,
        start_time: 1587277449395,
        end_time: 1587277449395,
        check_time: 1587277449395,
        handle_time: 1587277449395
      }],
      // 实验记录表格
      exptRecordVisible: false,
      exptOption,
      exptLoading: false,
      exptPage: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      exptData: [{
        type: 111,
        handle_time: 1587277449395,
        opr_time: 1587277449395,
        man: '操作人'
      }, {
        type: 111,
        handle_time: 1587277449395,
        opr_time: 1587277449395,
        man: '操作人'
      }]
    }
  },
  created() {

  },
  methods: {
    goAdd() {
      this.goPage('experimentAdd', { type: 'add' })
    },
    goEdit(row) {
      this.goPage('experimentEdit', { id: 1, type: 'edit' })
    },
    goPage(r, obj) {
      this.$router.push({ name: r, params: obj })
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
    },
    // 查看操作记录
    showOperList() {
      this.exptRecordVisible = true
    }
  }
}
</script>

<style lang="scss">
  .experiment__list{
    .el-button+.el-button{
      margin-left: 0;
    }
  }
</style>
