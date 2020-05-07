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
              prop="startTime"
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
              prop="endTime"
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
                v-model="experimentForm.handleTimeFlag"
                placeholder="请选择是否处理时间提醒"
                class="w250"
              >
                <el-option label="是" value="0" />
                <el-option label="否" value="1" />
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
                <el-form-item prop="checkDate" class="mb0">
                  <el-date-picker
                    v-model="experimentForm.checkDate"
                    class="mb0"
                    style="width: 135px;"
                    size="small"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
                <el-form-item prop="checkTime" class="mb0">
                  <el-time-picker
                    v-model="experimentForm.checkTime"
                    style="width: 110px;"
                    size="small"
                    placeholder="选择时间"
                  />
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="检测时间提醒:" class="mb9">
              <el-select
                v-model="experimentForm.testTimeFlag"
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
              v-model="experimentForm.endMiceState"
              placeholder="请选择是否处理时间提醒"
              class="w250"
            >
              <el-option label="处死" value="5" />
              <el-option label="闲置" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="监测信息:"
            class="mb0"
            label-width="85.56px"
            style="padding-left: 9.44px;"
          >
            <el-button type="primary" size="small" class="w100" @click="tagDialog = true">添加</el-button>
            <div>
              <el-tag
                v-for="(item, index) in tags"
                :key="index"
                size="small"
                closable
                @close="handleClose(item)"
              >{{ item }}</el-tag>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="addExperiment__table">
        <div class="df s-jcfe s-aic mt8 mb8">
          <el-button type="primary" size="small" class="w100" @click="addGroupDialog = true">新建分组</el-button>
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
            <template slot="mouse" slot-scope="{scope}">
              <el-button
                type="text"
                size="mini"
                @click="showMouses(scope.row)"
              >查看</el-button>
              <el-button
                type="text"
                size="mini"
                @click="goAddMouse(scope.row)"
              >添加</el-button>
            </template>
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
    <!-- 添加标签弹窗 -->
    <el-dialog
      title="增加检测信息"
      :visible.sync="tagDialog"
      width="433px"
    >
      <div>
        <el-form ref="tagsForm" :model="tagsForm" label-position="left" size="mini">
          <el-form-item
            label="检测信息:"
            label-width="80px"
            class="mb8"
            prop="name"
            :rules="[
              { required: true, message: '检测信息不能为空', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="tagsForm.name"
              placeholder="请输入检测信息"
              class="w250"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="tagDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="addTag()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新建分组弹窗 -->
    <el-dialog
      title="分组信息"
      :visible.sync="addGroupDialog"
      width="433px"
    >
      <div>
        <el-form ref="addGroupForm" :model="addGroupForm" label-position="left" size="mini">
          <el-form-item
            label="分组名称:"
            label-width="80px"
            class="mb8"
            prop="name"
            :rules="[
              { required: true, message: '分组名称不能为空', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="addGroupForm.name"
              placeholder="请输入分组名称"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="处理:"
            label-width="80px"
            class="mb8"
            prop="handle"
          >
            <el-input
              v-model="addGroupForm.handle"
              placeholder="请输入处理信息"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="检测信息:"
            label-width="80px"
            class="mb8"
            prop="tags"
          >
            <el-select v-model="addGroupForm.tags" multiple placeholder="请选择">
              <el-option
                v-for="(item, index) in tags"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addGroupDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="addGroup()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看小鼠列表 -->
    <el-dialog
      title="查看小鼠"
      :visible.sync="mousesDialog"
      width="850px"
    >
      <merge-table
        ref="crud"
        :page="page2"
        :data="mouseList"
        :table-option="mouseListOption"
        :table-loading="tableLoading"
      >
        <template slot="menu" slot-scope="{scope}">
          <el-button
            type="text"
            size="mini"
            class="btn-text--danger"
            @click="rowItemDel(scope.row)"
          >
            移除
          </el-button>
        </template>
      </merge-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="tagDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="addTag()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import { tableOption, mouseListOption } from './addTable'
import { addTags, addItemObj, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj } from '@/api/experiment'

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
      tags: [],
      tagsForm: {
        name: ''
      },
      tagDialog: false,
      // 新建分组
      addGroupDialog: false,
      addGroupForm: {
        name: '',
        handle: '',
        tags: []
      },
      tableData: [
        {
          id: 1,
          name: 'erwre',
          handle: 'fsfdsa',
          tags: ''
        }
      ],
      tableOption,
      tableLoading: false,
      page: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      // 查看小鼠列表
      mousesDialog: false,
      mouseList: [],
      mouseListOption,
      page2: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      }
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
    },
    // 编辑分组信息
    goEdit(row) {
      const data = JSON.parse(JSON.stringify(row))
      console.log(data)
      this.addGroupDialog = true
      this.addGroupForm = data
    },
    // 添加标签
    addTag() {
      const newTags = this.tags
      newTags.push(this.tagsForm.name)
      this.$set(this, 'tags', newTags)
      this.tagDialog = false
      this.tagsForm.name = ''
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    // 新建分组
    addGroup() {
      this.addGroupDialog = false
      console.log(this.addGroupForm)
      if (!this.addGroupForm.id) { // 不存在id说明是新增
        this.addListItem(this.addGroupForm)
      } else {
        // 提交修改
      }
    },
    // 新增列表项
    addListItem(data) {
      const item = data
      item.tags = data.tags.join(';')
      const newData = this.tableData
      newData.push(item)
      this.$set(this, 'tableData', newData)
    },
    // 查看小鼠列表
    showMouses(row) {
      console.log(row)
      this.getMouseList(row.id)
      this.mousesDialog = true

    },
    // 获取小鼠列表
    getMouseList(id) {
      console.log(id)
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
    .el-tag + .el-tag {
      margin-left: 10px;
    }
  }
</style>
