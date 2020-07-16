<template>
  <div>
    <main-box class="addExperiment">
      <div class="addExperiment__form">
        <el-form ref="experimentForm" label-position="left" :model="experimentForm" label-width="95px" size="small" class="mt25">
          <el-form-item
            label="实验组名称:"
            prop="experimentName"
            class="mb18"
            :rules="[
              { required: true, message: '实验组名称不能为空'}
            ]"
          >
            <el-input v-model="experimentForm.experimentName" size="small" class="w250" />
          </el-form-item>
          <div class="df s-jcfs s-aic">
            <el-form-item
              label="开始时间:"
              class="mr48 mb18"
              prop="startTime"
              :rules="[
                { required: true, message: '开始时间不能为空'}
              ]"
            >
              <el-date-picker
                v-model="experimentForm.startTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="timestamp"
                class="w250"
                placeholder="选择开始日期"
              />
            </el-form-item>
            <el-form-item
              label="结束时间:"
              class="mb18"
              prop="endTime"
              :rules="[
                { required: true, message: '结束时间不能为空'}
              ]"
            >
              <el-date-picker
                v-model="experimentForm.endTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="timestamp"
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
              >{{ item.label }}</el-tag>
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
                @click="showMouses(scope)"
              >查看</el-button>
              <el-button
                type="text"
                size="mini"
                @click="goAddMouse(scope)"
              >添加</el-button>
            </template>
            <template slot="sum" slot-scope="{scope}">
              {{ scope.row.experimentGroupSelectionMiceIds.length }}
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
                @click="rowItemDel(scope)"
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
            class="mb18"
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
            class="mb18"
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
            prop="testName"
          >
            <el-select v-model="addGroupForm.testName" multiple placeholder="请选择">
              <el-option
                v-for="(item, index) in tags"
                :key="index"
                :label="item.label"
                :value="item.id"
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
        <template slot="birthDate" slot-scope="{scope}">
          <span>{{ calcWeek(scope.row.birthDate) }}</span>
        </template>
        <template slot="menu" slot-scope="{scope}">
          <el-button
            type="text"
            size="mini"
            class="btn-text--danger"
            @click="delMouse(scope)"
          >
            移除
          </el-button>
        </template>
      </merge-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="mousesDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import { tableOption, mouseListOption } from './addTable'
import { addNewExpt, getGroupSampleList } from '@/api/experiment'
import { getMouseInfoByIds } from '@/api/mouse'
import { calcWeek } from '@/components/Mixins/calcWeek'

export default {
  name: 'AddExperiment',
  components: {
    MergeTable
  },
  mixins: [calcWeek],
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
        testName: []
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
      curGroupIndex: null, // 当前实验分组index
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
  watch: {
    addGroupDialog(n, o) {
      if (!n) {
        this.$refs['addGroupForm'].resetFields()
      }
    }
  },
  created() {
    const cacheExpts = this.$store.getters.addingExpt
    if (cacheExpts && cacheExpts.form.experimentId == this.$route.params.id) {
      const addingExpt = this.$store.getters.addingExpt
      this.$set(this, 'experimentForm', addingExpt.form)
      this.$set(this, 'tags', addingExpt.tags)
      this.$set(this, 'tableData', addingExpt.table)
    }
  },
  methods: {
    setStorageInfo(index) { // 更新缓存数据
      this.$store.dispatch('app/cacheExpts', {
        form: this.experimentForm,
        tags: this.tags,
        table: this.tableData,
        $index: index >= 0 ? index : null
      })
    },
    goAddMouse(scope) {
      this.setStorageInfo(scope.$index)
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
    // 删除实验分组
    rowItemDel: function(scope) {
      console.log(scope)
      const _this = this
      this.$confirm('是否确认删除实验分组："' + scope.row.experimentGroupName + '"?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.tableData.splice(scope.$index, 1)
        _this.$message({
          showClose: true,
          message: '删除成功,还需提交保存',
          type: 'success'
        })
      }).catch(function() {
      })
    },
    // 删除小鼠
    delMouse: function(scope) {
      console.log(scope)
      const _this = this
      this.$confirm('是否确认删除小鼠"' + scope.row.miceId + '"的数据?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.mouseList.splice(scope.$index, 1)
        // 删除对应分组的小鼠id
        const curGroupMices = _this.tableData[_this.curGroupIndex].experimentGroupSelectionMiceIds
        const curMiceId = scope.row.miceId
        const index = curGroupMices.indexOf(curMiceId)
        curGroupMices.splice(index, 1)

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
      const exptLabels = scope.row.testName
      console.log(exptLabels)
      data.testName = exptLabels ? exptLabels.split(';') : []
      console.log('goEdit====', data)
      this.addGroupDialog = true
      this.addGroupForm = data
      this.addGroupForm.index = scope.$index
    },
    // 添加标签
    addTag() {
      if (this.tags.findIndex((el) => {
        return el.label === this.tagsForm.name
      }) === -1) {
        const newTags = this.tags
        newTags.push({
          id: this.tagsForm.name,
          label: this.tagsForm.name
        })
        this.$set(this, 'tags', newTags)
        this.setStorageInfo()
      }
      this.tagDialog = false
      this.tagsForm.name = ''
    },
    // 删除标签
    handleClose(tag) {
      this.tags.splice(this.tags.findIndex((el) => {
        return el.label === tag
      }), 1)
      this.setStorageInfo()
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
      this.$refs['addGroupForm'].validate((valid) => {
        if (valid) {
          this.addGroupDialog = false
          // 有编号就是编辑
          if (typeof this.addGroupForm.index === 'number') {
            this.$message.success('编辑实验分组成功')
            this.editListItem(this.addGroupForm)
          } else {
            this.$message.success('新增实验分组成功')
            this.addListItem(this.addGroupForm)
          }
        } else {
          return false
        }
      })
    },
    // 新增列表项
    addListItem(data) {
      const item = JSON.parse(JSON.stringify(data))
      item.testName = data.testName ? data.testName.join(';') : ''
      // 小鼠数量新建时候为0
      item.experimentGroupSelectionMiceIds = []

      const newData = this.tableData
      newData.push(item)
      this.$set(this, 'tableData', newData)
      this.setStorageInfo()
    },
    // 编辑列表项
    editListItem(data) {
      console.log('编辑确定')
      const { index, ...other } = data
      other.testName = other.testName ? other.testName.join(';') : ''

      this.$set(this.tableData, index, other)
      this.setStorageInfo()
    },
    // 查看小鼠列表
    showMouses(scope) {
      this.curGroupIndex = scope.$index
      console.log(scope.row)
      this.getMouseList(scope.row.experimentGroupSelectionMiceIds)
      this.mousesDialog = true
    },
    // 获取小鼠列表
    getMouseList(ids) {
      getMouseInfoByIds(ids).then(res => {
        this.$set(this, 'mouseList', res.data)
      })
    },
    // 新增实验组
    doAddExpt() {
      const { startTime, endTime, handleTime, testTime, ...other } = this.experimentForm
      const { id: userId } = this.$store.getters.info
      // 实验分组数据格式整理
      const cacheTableData = JSON.parse(JSON.stringify(this.tableData))
      const groupInfo = cacheTableData.map(el => {
        el.testName = el.testName ? el.testName.split(';') : []
        el.experimentGroupSelectionMiceIds = el.experimentGroupSelectionMiceIds.join(',')
        return el
      })
      console.log(groupInfo)
      const lables = this.tags.map((el) => {
        return el.label
      })
      if (!startTime) {
        this.$message.error('请选择开始时间')
        return false
      }
      if (!endTime) {
        this.$message.error('请选择结束时间')
        return false
      }
      if ((handleTime && handleTime > endTime) || (testTime && testTime > endTime)) { // 新增时候可以为空
        this.$message.error('检测时间或处理时间不得大于结束时间')
        return false
      }
      if ((handleTime && handleTime < startTime) || (testTime && testTime < startTime)) {
        this.$message.error('检测时间或处理时间不得小于开始时间')
        return false
      }
      addNewExpt(Object.assign({}, {
        createUser: userId,
        startTime: startTime / 1000,
        endTime: endTime / 1000,
        handleTime: handleTime / 1000,
        testTime: testTime / 1000,
        experimentLabels: lables.join(','),
        experimentGroupInfo: groupInfo
      }, other)).then((res) => {
        this.$message.success('新增实验组成功')
        this.$store.dispatch('app/clearExpts')
        this.$store.dispatch('app/clearMouses')
        this.goBack()
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
        vm.$set(vm, 'experimentForm', addingExpt ? addingExpt.form : {})
        vm.$set(vm, 'tags', addingExpt ? addingExpt.tags : [])
        vm.$set(vm, 'tableData', addingExpt ? addingExpt.table : [])
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
