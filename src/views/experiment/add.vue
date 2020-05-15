<template>
  <div>
    <main-box class="addExperiment">
      <div class="addExperiment__form">
        <el-form ref="experimentForm" label-position="left" :model="experimentForm" label-width="95px" size="small" class="mt25">
          <el-form-item
            label="实验组名称:"
            prop="experimentName"
            class="mb9"
            :rules="[
              { required: true, message: '实验组名称不能为空'}
            ]"
          >
            <el-input v-model="experimentForm.experimentName" size="small" class="w250" />
          </el-form-item>
          <div class="df s-jcfs s-aic">
            <el-form-item
              label="开始时间:"
              class="mr48 mb9"
              prop="startTime"
              value-format="timestamp"
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
              value-format="timestamp"
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
                <el-date-picker
                  v-model="experimentForm.handleTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="timestamp"
                  placeholder="选择处理时间"
                />
                <!-- <el-form-item prop="handleDate" class="mb0">
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
                </el-form-item> -->
              </div>
            </el-form-item>
            <el-form-item label="处理时间提醒:" class="mb9">
              <el-select
                v-model="experimentForm.handleTimeFlag"
                placeholder="请选择是否处理时间提醒"
                class="w250"
              >
                <el-option label="是" :value="0" />
                <el-option label="否" :value="1" />
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
                <el-date-picker
                  v-model="experimentForm.testTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="timestamp"
                  placeholder="选择检测时间"
                />
                <!-- <el-form-item prop="checkDate" class="mb0">
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
                </el-form-item> -->
              </div>
            </el-form-item>
            <el-form-item label="检测时间提醒:" class="mb9">
              <el-select
                v-model="experimentForm.testTimeFlag"
                placeholder="请选择是否处理时间提醒"
                class="w250"
              >
                <el-option label="是" :value="0" />
                <el-option label="否" :value="1" />
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
              <el-option label="处死" :value="5" />
              <el-option label="闲置" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="检测信息:"
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
          <el-button type="primary" size="small" class="w100" @click="addNewGroup()">新建分组</el-button>
        </div>
        <div class="bd-gray">
          <merge-table
            ref="crud"
            :page="page"
            :data="tableData"
            :table-option="tableOption"
            :table-loading="tableLoading"
            @refresh-change="handleRefreshChange"
          >
            <template slot="experimentGroupSelectionMiceIds" slot-scope="{scope}">
              <el-button
                type="text"
                size="mini"
                @click="showMouses(scope.row)"
              >查看</el-button>
              <el-button
                type="text"
                size="mini"
                @click="goAddMouse(scope)"
              >添加</el-button>
            </template>
            <template slot="sum" slot-scope="{scope}">
              {{ scope.row.experimentGroupSelectionMiceIds ? scope.row.experimentGroupSelectionMiceIds.split(',').length : 0 }}
            </template>
            <template slot="menu" slot-scope="{scope}">
              <el-button
                type="text"
                size="mini"
                @click="goEdit(scope)"
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
        <el-button type="primary" size="small" @click="doAddExpt()">确定</el-button>
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
            prop="experimentGroupName"
            :rules="[
              { required: true, message: '分组名称不能为空', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="addGroupForm.experimentGroupName"
              placeholder="请输入分组名称"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="处理:"
            label-width="80px"
            class="mb8"
            prop="eventName"
          >
            <el-input
              v-model="addGroupForm.eventName"
              placeholder="请输入处理信息"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="检测信息:"
            label-width="80px"
            class="mb8"
            prop="experimentGroupSelectionLabels"
          >
            <el-select v-model="addGroupForm.experimentGroupSelectionLabels" multiple placeholder="请选择">
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
import { addTags, addNewExpt, addNewGroup, delItemObj, delObj, fetchItemList, fetchList, putItemObj, getGroupSampleList } from '@/api/experiment'
import { getMouseInfoByIds } from '@/api/mouse'

export default {
  name: 'AddExperiment',
  components: {
    MergeTable
  },
  data() {
    return {
      experimentForm: {
        experimentName: '',
        startTime: null,
        endTime: null,
        handleTime: null,
        handleTimeFlag: 0,
        testTime: null,
        testTimeFlag: 0,
        endMiceState: 5
      },
      tags: [],
      tagsForm: {
        name: ''
      },
      tagDialog: false,
      // 新建分组
      addGroupDialog: false,
      addGroupForm: {
        experimentGroupName: '',
        eventName: '',
        experimentGroupSelectionLabels: []
      },
      tableData: [],
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
    goAddMouse(scope) {
      this.goPage('experimentAddMouse', { type: 'noExpt', index: scope.$index })
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
      getGroupSampleList(Object.assign({
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
    goEdit(scope) {
      const data = JSON.parse(JSON.stringify(scope.row))
      const exptLabels = scope.row.experimentGroupSelectionLabels
      console.log(exptLabels)
      data.experimentGroupSelectionLabels = exptLabels ? exptLabels.split(';') : []
      console.log('goEdit====', data)
      this.addGroupDialog = true
      this.addGroupForm = data
      this.addGroupForm.index = scope.$index
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
    // 点击新建分组
    addNewGroup() {
      this.addGroupDialog = true
      for (const key in this.addGroupForm) {
        this.addGroupForm[key] = null
      }
    },
    // 新建分组
    addGroup() {
      this.addGroupDialog = false
      // 有编号就是编辑
      if (typeof this.addGroupForm.index === 'number') {
        this.editListItem(this.addGroupForm)
      } else {
        this.addListItem(this.addGroupForm)
      }
      // console.log(this.addGroupForm)
      // if (!this.addGroupForm.id) { // 不存在id说明是新增
      //   const { id: userId } = this.$store.getters.info
      //   addNewGroup(Object.assign({}, this.addGroupForm, {
      //     createTime: Math.floor(+new Date() / 1000),
      //     operator: userId,
      //     createUser: userId,
      //     delFlag: 0,
      //     eid: 0,
      //     miceIds: '', // 新增无小鼠
      //     labels: this.addGroupForm.labels ? this.addGroupForm.labels.join(',') : ''
      //   })).then((res) => {
      //     this.$message.success('新建分组成功')
      //     this.addListItem(this.addGroupForm)
      //   })
      // } else {
      //   // 提交修改

      // }
    },
    // 新增列表项
    addListItem(data) {
      const item = JSON.parse(JSON.stringify(data))
      item.experimentGroupSelectionLabels = data.experimentGroupSelectionLabels ? data.experimentGroupSelectionLabels.join(';') : ''
      // 小鼠数量新建时候为0
      item.experimentGroupSelectionMiceIds = ''

      const newData = this.tableData
      newData.push(item)
      this.$set(this, 'tableData', newData)
      this.$store.dispatch('app/cacheExpts', {
        form: this.experimentForm,
        table: this.tableData
      })
    },
    // 编辑列表项
    editListItem(data) {
      console.log('编辑确定')
      const { index, ...other } = data
      other.experimentGroupSelectionLabels = other.experimentGroupSelectionLabels ? other.experimentGroupSelectionLabels.join(';') : ''

      this.$set(this.tableData, index, other)
      this.$store.dispatch('app/cacheExpts', this.tableData)
    },
    // 查看小鼠列表
    showMouses(row) {
      this.getMouseList(row.experimentGroupSelectionMiceIds)
      this.mousesDialog = true

    },
    // 获取小鼠列表
    getMouseList(ids) {
      const idArr = ids.split(',')
      getMouseInfoByIds(idArr).then(res => {
        this.$set(this, 'mouseList', res.data.records)
      })
    },
    // 新增实验组
    doAddExpt() {
      const { startTime, endTime, handleTime, testTime, ...other } = this.experimentForm
      const { id: userId } = this.$store.getters.info
      // 实验分组数据格式整理
      const cacheTableData = JSON.parse(JSON.stringify(this.tableData))
      const groupInfo = cacheTableData.map(el => {
        el.experimentGroupSelectionLabels = el.experimentGroupSelectionLabels ? el.experimentGroupSelectionLabels.split(';') : []
        return el
      })
      console.log(groupInfo)
      addNewExpt(Object.assign({}, {
        createUser: userId,
        startTime: startTime / 1000,
        endTime: endTime / 1000,
        handleTime: handleTime / 1000,
        testTime: testTime / 1000,
        experimentLabels: this.tags ? this.tags.join(',') : '',
        experimentGroupInfo: groupInfo
      }, other)).then((res) => {
        this.$message.success('新增实验组成功')
      })
    }
  },
  // 路由守卫，复用的页面，判断来源
  beforeRouteEnter(to, from, next) {
    console.log('enter====>', to, from)
    next(vm => {
      // 是添加小鼠返回的,组装列表项数据
      if (from.name === 'experimentAddMouse') {
        const addingExpt = vm.$store.getters.addingExpt
        vm.$set(vm, 'experimentForm', addingExpt ? JSON.parse(addingExpt).form : {})
        vm.$set(vm, 'tableData', addingExpt ? JSON.parse(addingExpt).table : [])
      }
    })
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
