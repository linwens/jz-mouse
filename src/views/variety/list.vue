<template>
  <div>
    <main-box>
      <div>
        <div class="df s-jcsb s-aic mt8 mb8">
          <span>品系列表</span>
          <div>
            <add-variety-btn @done="getList" />
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
            <template slot="menu" slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="goEdit()"
              >
                编辑
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
    <!-- 编辑品系弹窗 -->
    <el-dialog
      title="编辑品系"
      :visible.sync="varietyDialog"
      width="433px"
    >
      <div class="mouse__varietyDialog">
        <el-form ref="addVarietyForm" :model="addVarietyForm" label-position="left" size="mini">
          <el-form-item
            label="品系名称:"
            label-width="80px"
            class="mb8"
            prop="name"
            :rules="[
              { required: true, message: '品系名称不能为空'}
            ]"
          >
            <el-input
              v-model="addVarietyForm.name"
              placeholder="请输入品系名称"
              class="w250"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="varietyDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="doEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import AddVarietyBtn from '@/components/Dialogs/cpt_add_variety'
import { tableOption } from './listTable'
import { addItemObj, addObj, delItemObj, delObj, fetchItemList, varietiesList, putItemObj, putObj } from '@/api/variety'

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
      tableData: [{
        name: 'RON-234',
        man: '张三',
        create_time: 1587375335305
      }, {
        name: 'RON-234',
        man: '张三',
        create_time: 1587375335305
      }],
      // 编辑品系
      addVarietyForm: {
        name: ''
      },
      varietyDialog: false
    }
  },
  created() {

  },
  methods: {
    goEdit(row) {
      this.varietyDialog = true
    },
    goPage(obj) {
      this.$router.push({ name: 'varietyEdit', params: obj })
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
      varietiesList(Object.assign({
        current: this.page.page,
        size: this.page.limit
      })).then(response => {
        this.tableData = response.data.records
        this.page.total = response.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    // 编辑品系
    doEdit() {
      this.$refs['addVarietyForm'].validate((valid) => {
        if (valid) {
          this.varietyDialog = false
        } else {
          return false
        }
      })
      // 填充品系
    }
  }
}
</script>

<style lang="scss">

</style>
