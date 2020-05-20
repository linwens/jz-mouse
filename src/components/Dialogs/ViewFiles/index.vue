<template>
  <div>
    <el-button type="text" @click="showList()">{{ btnText }}</el-button>
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
          <file-viewer :file-url="scope.row.path" btn-text="预览" />
          <el-button
            type="text"
            size="mini"
          >
            <a :href="scope.row.path" :download="scope.row.fileName">下载</a>
          </el-button>
          <el-button
            type="text"
            size="mini"
            class="btn-text--danger"
            @click="rowItemDel(scope)"
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
import { delFile, getFilesList } from '@/api/cmn'

export default {
  name: 'ViewFiles',
  components: {
    MergeTable,
    FileViewer
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    bizType: { // 上传文件对应的业务类型
      type: String,
      default: ''
    },
    cacheList: {
      type: Array,
      default: function() {
        return []
      }
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
      filesData: []
    }
  },
  watch: {
    cacheList(n, o) {
      console.log('更新cachelist')
      this.$set(this, 'filesData', n)
    }
  },
  created() {
    if (this.id) {
      this.getList()
    }
  },
  methods: {
    // 展示列表
    showList() {
      if (this.id) {
        this.getList()
      }
      this.filesRecordVisible = true
    },
    // 获取列表
    getList() {
      this.filesLoading = true
      getFilesList(Object.assign({
        bizId: this.id,
        bizType: this.bizType,
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
    rowItemDel: function(scope) {
      const _this = this
      this.$confirm('是否确认删除数据为"' + scope.row.fileName + '"的文件吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        if (scope.row.fileId) {
          return delFile(scope.row.fileId)
        }
        if (!scope.row.fileId) {
          _this.filesData.splice(scope.$index, 1)
        }
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
