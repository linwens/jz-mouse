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
            <template slot="operation_check" slot-scope="{scope}">
              <expt-record :id="scope.row.id" btn-text="查看" type="text" size="medium" />
            </template>
            <template slot="module_rslt" slot-scope="{scope}">
              <view-files :id="scope.row.id" biz-type="experiment" />
              <upload-btn :id="scope.row.id" biz-type="experiment" class="dib" btn-text="上传" />
            </template>
            <template slot="menu" slot-scope="{scope}">
              <set-time :id="scope.row.id" btn-text="设置时间" type="text" class="dib" />
              <el-button
                type="text"
                size="mini"
                @click="goEdit(scope.row)"
              >
                详情
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="doEnd(scope.row.id)"
              >
                手动结束
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
import ExptRecord from '@/components/Dialogs/ExptRecord'
import ViewFiles from '@/components/Dialogs/ViewFiles'
import SetTime from '@/components/Dialogs/cpt_set_time'
import UploadBtn from '@/components/Dialogs/cpt_upload'
import { tableOption } from './table'
import { addItemObj, addObj, delExptObj, delObj, fetchItemList, fetchList, putItemObj, endExpt } from '@/api/experiment'

export default {
  name: 'DelList',
  components: {
    MergeTable,
    ExptRecord,
    ViewFiles,
    UploadBtn,
    SetTime
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
    goAdd() {
      this.goPage('experimentAdd', { type: 'add' })
    },
    goEdit(row) {
      const id = row.id
      this.$router.push({ name: 'experimentEdit', params: { id }})
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
      this.$confirm(`是否确认删除实验组: ${row.name}吗?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delExptObj(row.id)
      }).then(() => {
        this.getList()
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
    // 手动结束
    doEnd(id) {
      const _self = this
      this.$confirm('是否确认结束当前实验组', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getList()
        endExpt({
          experimentId: id
        }).then((res) => {
          _self.$message.success('手动结束实验成功')
        })
      }).catch(function() {
      })
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
