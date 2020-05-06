<template>
  <div>
    <el-button type="text" @click="filesRecordVisible = true">{{ btnText }}</el-button>
    <!-- 文件列表弹窗 -->
    <el-dialog title="文件查看" :visible.sync="filesRecordVisible">
      <merge-table
        ref="crud"
        :page="filesPage"
        :data="filesData"
        :table-option="filesOption"
        :table-loading="filesLoading"
        @refresh-change="handleRefreshChange"
      >
        <template slot="menu" slot-scope="{scope}">
          <file-viewer :file-url="scope.row.fileUrl" btn-text="预览" />
          <el-button
            type="text"
            size="mini"
          >
            下载
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
    </el-dialog>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import FileViewer from '@/components/FileViewer'
import { filesOption } from './table'
import { addItemObj, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj } from '@/api/cmn'

export default {
  name: 'ViewFiles',
  components: {
    MergeTable,
    FileViewer
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      btnText: '查看',
      // 实验记录表格
      filesRecordVisible: false,
      filesOption,
      filesLoading: false,
      filesPage: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      filesData: [{
        name: '文件1',
        type: 'jpg',
        opr_time: 1587277449395,
        fileUrl: 'http://localhost/test.pdf'
      }, {
        name: '文件2',
        type: 'pdf',
        opr_time: 1587277449395,
        fileUrl: 'http://localhost/test.pdf'
      }]
    }
  },
  methods: {
    // 获取列表
    getList() {
      this.filesLoading = true
      fetchList(Object.assign({
        id: this.id,
        current: this.filesPage.page,
        size: this.filesPage.limit
      })).then(response => {
        this.filesData = response.data.records
        this.filesPage.total = response.data.total
      }).finally(() => {
        this.filesLoading = false
      })
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
    }
  }
}
</script>

<style lang="scss">

</style>
