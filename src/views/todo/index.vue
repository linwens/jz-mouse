<template>
  <div>
    <main-box class="pos-r">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="`未读(${tabsSum[0]})`" name="first">
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
              <template slot="status" slot-scope="scope">
                <svg-icon v-if="scope.scope.row.status === 1" icon-class="noRead" class="fs30" />
                <svg-icon v-else icon-class="isReaded" class="fs30" />
              </template>
              <template slot="menu" slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  class="btn-text--danger"
                  @click="rowItemDel(scope.scope.row)"
                >
                  删除
                </el-button>
                <el-button
                  v-if="scope.scope.row.status === 1"
                  type="text"
                  size="mini"
                  @click="markReaded(scope.scope.row)"
                >
                  标为已读
                </el-button>
              </template>
            </merge-table>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`已读(${tabsSum[1]})`" name="second">
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
              <template slot="status" slot-scope="scope">
                <svg-icon v-if="scope.scope.row.status === 1" icon-class="noRead" class="fs30" />
                <svg-icon v-else icon-class="isReaded" class="fs30" />
              </template>
              <template slot="menu" slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  class="btn-text--danger"
                  @click="rowItemDel(scope.scope.row)"
                >
                  删除
                </el-button>
                <el-button
                  v-if="scope.scope.row.status === 1"
                  type="text"
                  size="mini"
                  @click="markReaded(scope.scope.row)"
                >
                  标为已读
                </el-button>
              </template>
            </merge-table>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`全部(${tabsSum[2]})`" name="third">
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
              <template slot="status" slot-scope="scope">
                <svg-icon v-if="scope.scope.row.status === 1" icon-class="noRead" class="fs30" />
                <svg-icon v-else icon-class="isReaded" class="fs30" />
              </template>
              <template slot="menu" slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  class="btn-text--danger"
                  @click="rowItemDel(scope.scope.row)"
                >
                  删除
                </el-button>
                <el-button
                  v-if="scope.scope.row.status === 1"
                  type="text"
                  size="mini"
                  @click="markReaded(scope.scope.row)"
                >
                  标为已读
                </el-button>
              </template>
            </merge-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="todo__allReaded pos-a">
        <el-button type="success" @click="allReaded">一键已读</el-button>
      </div>
    </main-box>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import { tableOption } from './table'
import { addItemObj, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj } from '@/api/todo'

export default {
  name: 'Todo',
  components: {
    MergeTable
  },
  data() {
    return {
      activeName: 'first',
      tabsSum: [10, 22, 123], // 不同信息条数
      tableOption,
      tableLoading: false,
      page: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      tableData: [{
        status: 0,
        type: '繁育组提醒',
        title: '繁育组XX-XX到了繁育时间',
        tipsTime: 1587277449395,
        sendTime: 1587277449395
      }, {
        status: 1,
        type: '繁育组提醒',
        title: '繁育组XX-XX到了繁育时间',
        tipsTime: 1587277449395,
        sendTime: 1587277449395
      }]
    }
  },
  created() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleRefreshChange() {
      this.getList()
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
    // 标为已读
    markReaded() {

    },
    // 一键已读
    allReaded() {
      this.$confirm('是否确认标记所有信息为已读?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('确认标记')
      }).catch(function() {
      })
    }
  }
}
</script>

<style lang="scss">
  .todo__allReaded {
    top: 9px;
    right: 15px;
  }
  // diy-elementui
  .el-tabs__header {
    margin-top: 9px;
  }
  .el-tabs__nav-wrap::after {
    background: none;
  }
</style>
