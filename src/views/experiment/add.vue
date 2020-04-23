<template>
  <div>
    <main-box class="addExperiment">
      <div class="addExperiment__form">
        <el-form ref="experimentForm" label-position="left" :model="experimentForm" label-width="95px" size="small" class="mt25">
          <el-form-item
            label="实验组名称:"
            prop="name"
            class="mb9"
            :rules="[
              { required: true, message: '实验组名称不能为空'}
            ]"
          >
            <el-input v-model="experimentForm.name" size="small" class="w250" />
          </el-form-item>
          <div class="df s-jcfs s-aic">
            <el-form-item
              label="开始时间:"
              class="mr48 mb9"
              :rules="[
                { required: true, message: '开始时间不能为空'}
              ]"
            >
              <el-date-picker
                v-model="experimentForm.startTime"
                type="date"
                format="yyyy-MM-dd"
                class="w250"
                placeholder="选择开始日期"
              />
            </el-form-item>
            <el-form-item
              label="结束时间:"
              class="mb9"
              :rules="[
                { required: true, message: '结束时间不能为空'}
              ]"
            >
              <el-date-picker
                v-model="experimentForm.endTime"
                type="date"
                format="yyyy-MM-dd"
                class="w250"
                placeholder="选择结束日期"
              />
            </el-form-item>
          </div>
          <div class="df s-jcfs s-aic">
            <el-form-item
              label="处理时间:"
              label-width="85.56px"
              class="mr48 mb10"
              style="padding-left: 9.44px;"
            >
              <div class="df s-jcsb w250">
                <el-form-item prop="handleDate" class="mb0">
                  <el-date-picker
                    v-model="experimentForm.handleDate"
                    class="mb0"
                    style="width: 135px;"
                    size="small"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
                <el-form-item prop="handleTime" class="mb0">
                  <el-time-picker
                    v-model="experimentForm.handleTime"
                    style="width: 110px;"
                    size="small"
                    placeholder="选择时间"
                  />
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="处理时间提醒:" class="mb9">
              <el-select
                v-model="experimentForm.region"
                placeholder="请选择是否处理时间提醒"
                class="w250"
              >
                <el-option label="是" value="1" />
                <el-option label="否" value="2" />
              </el-select>
            </el-form-item>
          </div>
          <div class="df s-jcfs s-aic">
            <el-form-item
              label="检测时间:"
              class="mr48 mb10"
              label-width="85.56px"
              style="padding-left: 9.44px;"
            >
              <div class="df s-jcsb w250">
                <el-form-item prop="handleDate" class="mb0">
                  <el-date-picker
                    v-model="experimentForm.handleDate"
                    class="mb0"
                    style="width: 135px;"
                    size="small"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
                <el-form-item prop="handleTime" class="mb0">
                  <el-time-picker
                    v-model="experimentForm.handleTime"
                    style="width: 110px;"
                    size="small"
                    placeholder="选择时间"
                  />
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="检测时间提醒:" class="mb9">
              <el-select
                v-model="experimentForm.region"
                placeholder="请选择是否处理时间提醒"
                class="w250"
              >
                <el-option label="是" value="1" />
                <el-option label="否" value="2" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item
            label="实验结束后小鼠状态:"
            label-width="135.56px"
            class="mb9"
            style="padding-left: 9.44px;"
          >
            <el-select
              v-model="experimentForm.region"
              placeholder="请选择是否处理时间提醒"
              class="w250"
            >
              <el-option label="是" value="1" />
              <el-option label="否" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="监测信息:"
            class="mb0"
            label-width="85.56px"
            style="padding-left: 9.44px;"
          >
            <el-button type="primary" size="small" class="w100">添加</el-button>
            <div>
              <el-tag size="small" closable>小型标签</el-tag>
              <el-tag size="small" closable>小型标签</el-tag>
              <el-tag size="small" closable>小型标签</el-tag>
              <el-tag size="small" closable>小型标签</el-tag>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="addExperiment__table">
        <div class="df s-jcfe s-aic mt8 mb8">
          <el-button type="primary" size="small" class="w100" @click="goAdd()">新建分组</el-button>
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
            <template slot="mouse" slot-scope="scope">
              <el-button type="text" @click="setPregTime(scope.scope.row)">查看</el-button>
              <el-button type="text" @click="goAddMouse(scope.scope.row)">添加</el-button>
            </template>
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
      <div class="addExperiment__btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
        <el-button type="primary" size="small" @click="goChoose()">确定</el-button>
      </div>
    </main-box>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import { tableOption } from './addTable'
import { addItemObj, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj } from '@/api/experiment'

export default {
  name: 'MouseEdit',
  components: {
    MergeTable
  },
  data() {
    return {
      experimentForm: {
        name: '繁育组名称',
        date: 0,
        time: 1587375335305
      },
      tableOption,
      tableLoading: false,
      page: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      tableData: [{
        name: 0,
        handle: 1,
        check: 'fdferwerewffsfd',
        sum: '62'
      }, {
        name: 0,
        handle: 1,
        check: 'fdferwerewffsfd',
        sum: '62'
      }]
    }
  },
  created() {

  },
  methods: {
    goAddMouse(row) {
      this.goPage('experimentAddMouse', { id: 1, type: 'add' })
    },
    goPage(r, obj) {
      this.$router.push({ name: r, params: obj })
    },
    goBack() {
      this.$router.back()
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
  .addExperiment{
    &__form{}
    &__table{
      margin-bottom: 100px;
    }
    &__btns{
      bottom: 0;
      left: 0;
      padding-left: 40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(214,214,214,1);
    }
    .mr48{
      margin-right: 48px;
    }
  }
</style>
