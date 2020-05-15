<template>
  <div>
    <main-box class="editExperiment">
      <div class="addExperiment__form">
        <el-form ref="experimentForm" label-position="left" :model="experimentForm" label-width="110px" size="small" class="mt25">
          <el-form-item
            label="实验组名称:"
            prop="experimentName"
            class="mb9"
            :rules="[
              { required: true, message: '实验组名称不能为空'}
            ]"
          >
            <el-input :disabled="!canEdit" v-model="experimentForm.experimentName" size="small" class="w250" />
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
                :disabled="!canEdit"
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
                :disabled="!canEdit"
                type="date"
                format="yyyy-MM-dd"
                class="w250"
                placeholder="选择结束日期"
              />
            </el-form-item>
          </div>
          <div class="df s-jcfs s-aic">
            <el-form-item
              label="处理时间提醒:"
              label-width="101.56px"
              class="mb9"
              style="padding-left: 9.44px;"
            >
              <el-select
                v-model="experimentForm.handleTimeFlag"
                :disabled="!canEdit"
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
              label="检测时间提醒:"
              label-width="101.56px"
              class="mb9"
              style="padding-left: 9.44px;"
            >
              <el-select
                v-model="experimentForm.testTimeFlag"
                :disabled="!canEdit"
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
              :disabled="!canEdit"
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
            <el-button v-if="canEdit" type="primary" size="small" class="w100" @click="tagDialog = true">添加</el-button>
            <div>
              <el-tag
                v-for="(item, index) in tags"
                :key="index"
                size="small"
                :closable="canEdit"
                @close="handleClose(item)"
              >{{ item.label }}</el-tag>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="addExperiment__table">
        <div class="df s-jcfe s-aic mt8 mb8">
          <el-button v-if="canEdit" type="primary" size="small" class="w100" @click="addNewGroup()">新建分组</el-button>
        </div>
        <div class="bd-gray">
          <merge-table
            ref="crud"
            :page="page"
            :data="tableData"
            :table-option="tableOption"
            :table-loading="tableLoading"
          >
            <template v-if="canEdit" slot="experimentGroupSelectionMiceIds" slot-scope="{scope}">
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
            <template v-if="canEdit" slot="menu" slot-scope="{scope}">
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
                @click="rowItemDel(scope.row)"
              >
                删除
              </el-button>
            </template>
          </merge-table>
        </div>
      </div>
      <div class="editExperiment__btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
        <el-button type="primary" size="small" @click="saveExptInfo()">{{ canEdit ? '确定' : '编辑' }}</el-button>
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
import { addItemObj, addObj, delItemObj, getExptInfoById, fetchItemList, fetchList, updateExptInfo, putObj } from '@/api/experiment'
import { getMouseInfoByIds } from '@/api/mouse'

export default {
  name: 'EditExperiment',
  components: {
    MergeTable
  },
  data() {
    return {
      canEdit: false, // 是否可编辑
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
      // 新增标签
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
      tableOption,
      tableLoading: false,
      tableData: [],
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
    console.log(this.$route)
    this.getExptInfoById(this.$route.params.id)
  },
  methods: {
    goAddMouse(scope) {
      this.goPage('experimentAddMouse', { type: 'noExpt', index: scope.$index })
    },
    goPage(r, obj) {
      this.$router.push({ name: r, params: obj })
    },
    goBack() {
      console.log(this.$route)
      this.$router.back()
    },
    // 删除
    rowItemDel: function(row) {
      const _this = this
      this.$confirm('是否确认删除实验分组："' + row.name + '"?', '警告', {
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
      newTags.push({ 
        id: 0,
        label: this.tagsForm.name
      })
      this.$set(this, 'tags', newTags)
      this.tagDialog = false
      this.tagsForm.name = ''
    },
    // 删除标签
    handleClose(tag) {
      const index = this.tags.findIndex((el) => {
        return el.label === tag.label
      })
      console.log('tag--index====', index)
      this.tags.splice(index, 1)
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
      this.$store.dispatch('app/cacheExpts', this.tableData)
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
    // 获取实验组信息
    getExptInfoById(id) {
      getExptInfoById({
        experimentId: id
      }).then((res) => {
        const { experimentName, experimentLabelList, experimentGroupInfo, startTime, endTime, handleTimeFlag, testTimeFlag, endMiceState } = res.data
        // 实验组标签信息
        this.$set(this, 'tags', experimentLabelList)
        // 分组列表信息
        this.$set(this, 'tableData', experimentGroupInfo)
        // 实验组基础信息
        this.$set(this, 'experimentForm', {
          experimentName,
          endMiceState,
          handleTimeFlag,
          testTimeFlag,
          startTime: startTime * 1000,
          endTime: endTime * 1000
        })
      })
    },
    // 编辑保存
    saveExptInfo() {
      if (!this.canEdit) {
        this.canEdit = true
        return false
      }
      const { startTime, endTime, handleTime, testTime, ...other } = this.experimentForm
      const { id: userId } = this.$store.getters.info
      // 实验分组数据格式整理
      const cacheTableData = JSON.parse(JSON.stringify(this.tableData))
      const groupInfo = cacheTableData.map(el => {
        el.experimentGroupSelectionLabels = el.experimentGroupSelectionLabels ? el.experimentGroupSelectionLabels.split(';') : []
        return el
      })

      updateExptInfo(Object.assign({}, {
        experimentId: this.$route.params.id,
        createUser: userId,
        startTime: startTime / 1000,
        endTime: endTime / 1000,
        handleTime: handleTime / 1000,
        testTime: testTime / 1000,
        experimentLabels: this.tags ? this.tags.join(',') : '',
        experimentGroupInfo: groupInfo
      }, other)).then((res) => {
        this.$message.success('编辑实验组成功')
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
        vm.$set(vm, 'tableData', addingExpt ? JSON.parse(addingExpt) : [])
      }
    })
  }

}
</script>

<style lang="scss">
  .editExperiment{
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
      z-index: 4;
    }
    .mr48{
      margin-right: 48px;
    }
    .el-tag+.el-tag {
      margin-left: 10px;
    }
  }
</style>
