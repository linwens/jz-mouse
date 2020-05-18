<template>
  <div>
    <main-box>
      <div>
        <el-form ref="breedForm" label-position="left" :model="breedForm" label-width="98px" class="mt25">
          <el-form-item
            label="繁育组名称:"
            prop="name"
            class="mb10"
            :rules="[
              { required: true, message: '繁育组名称不能为空'}
            ]"
          >
            <el-input v-if="disabled" v-model="breedForm.name" size="small" class="breed__input--width" />
            <span v-else>{{ breedForm.name }}</span>
          </el-form-item>
          <el-form-item
            label="繁育时间:"
            label-width="89.56px"
            class="mb10"
            style="padding-left: 9.44px;"
          >
            <div v-if="disabled" class="df s-jcsb breed__input--width">
              <!-- <el-form-item prop="date">
                <el-date-picker
                  v-model="breedForm.date"
                  class="w140 mr3"
                  size="small"
                  type="date"
                  placeholder="选择日期"
                />
              </el-form-item>
              <el-form-item prop="time">
                <el-time-picker
                  v-model="breedForm.time"
                  class="w120 pr0"
                  size="small"
                  placeholder="选择时间"
                />
              </el-form-item> -->
              <el-date-picker
                v-model="breedForm.breedTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="timestamp"
                placeholder="选择日期时间"
              />
            </div>
            <span v-else>{{ breedForm.breedTime | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="df s-jcfe mb15">
        <el-button v-if="disabled" type="primary" size="small" class="w100" @click="goAdd()">添加</el-button>
      </div>
      <div class="bd-gray">
        <merge-table
          ref="crud"
          :page="page"
          :data="breedForm.miceIds"
          :table-option="tableOption"
          :table-loading="tableLoading"
          @refresh-change="handleRefreshChange"
        >
          <template slot="pregnantTime" slot-scope="{scope}">
            <el-button v-if="scope.row.gender === 1" type="text" @click="setPregTime(scope.row)">{{ scope.row.pregnantTime | timeFormat('yyyy-MM-dd') }}</el-button>
          </template>
          <template v-if="disabled" slot="menu" slot-scope="{scope}">
            <el-button
              type="text"
              size="mini"
              @click="goMouse(scope.row)"
            >
              查看
            </el-button>
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
      </div>
      <div class="breed__edit--btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
        <el-button type="primary" size="small" class="w100" @click="submitForm('breedForm')">{{ disabled ? '确定' : '编辑' }}</el-button>
      </div>
    </main-box>
    <!-- 设置时间弹窗 -->
    <el-dialog
      title="设置受孕时间"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="breedTimeForm" :model="breedTime" class="df s-jcc">
        <el-form-item class="mb0">
          <el-date-picker
            v-model="breedTime.date"
            class="w140 mr3"
            size="small"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPregTime()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import { tableOption } from './editTable'
import { addBreed, getbreedDetail, delItemObj, editBreed, fetchItemList, fetchList, putItemObj, putObj } from '@/api/breed'

export default {
  name: 'DelList',
  components: {
    MergeTable
  },
  data() {
    return {
      canEdit: false, // 可编辑状态
      type: '',
      breedForm: {
        name: '',
        breedTime: null,
        // date: null,
        // time: null,
        miceIds: []
      },
      breedTime: {
        date: 0
      },
      dialogVisible: false,
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
  computed: {
    disabled() {
      return this.type === 'add' || this.canEdit
    }
  },
  created() {
    console.log(this.$route)
    // 不能用 === 0；有时0  有时'0'
    this.type = this.$route.params.id == 0 ? 'add' : 'edit'
    this.$route.meta.title = this.type === 'add' ? '新增' : '编辑/查看'
    // 如果是编辑，获取详情
    const cacheInfo = this.$store.getters.addingBreed
    if (cacheInfo) {
      this.$set(this, 'breedForm', cacheInfo)
    } else {
      if (this.type === 'edit') {
        console.log('请求获取数据')
        const id = this.$route.params.id
        this.getDetail(id)
      }
    }
  },
  methods: {
    // 添加小鼠
    goAdd() {
      this.$store.dispatch('app/cacheBreed', this.breedForm)
      this.goPage('breedAddMouse', { type: 'noBreed' })
    },
    goBack() {
      this.$router.back()
    },
    goMouse(row) {
      this.goPage('mouseEdit', { id: row.id })
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
    // 获取繁育组详情
    getDetail(id) {
      getbreedDetail({
        id
      }).then((res) => {
        const { miceInfoFromMiceBreedVO, breedTime, ...other } = res.data
        this.$set(this, 'breedForm', Object.assign({}, other, {
          miceIds: miceInfoFromMiceBreedVO
        }, {
          breedTime: breedTime * 1000
        }))
        console.log(this.breedForm)
      })
    },
    // 提交
    submitForm(formName) {
      if (!this.canEdit) {
        this.canEdit = true
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.breedForm)
          if (this.breedForm.miceIds.length === 0) {
            this.$message.error('请添加小鼠')
            return false
          }
          const miceArr = this.breedForm.miceIds.map((el) => {
            const { miceInfoId: miceId, pregnantTime } = el
            return { miceId, pregnantTime }
          })
          const { id: userId } = this.$store.getters.info
          const params = Object.assign({}, this.breedForm, {
            breedTime: this.breedForm.breedTime / 1000,
            createTime: Math.floor(+new Date() / 1000),
            createUser: userId,
            miceInfoInAddMiceBreedDTOList: miceArr
          })
          if (this.type === 'add') {
            this.doAdd(params)
          } else {
            this.doEdit(params)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增
    doAdd(params) {
      addBreed(params).then((res) => {
        this.$message.success('新增繁育组成功')
        this.$store.dispatch('app/clearMouses')
        this.$store.dispatch('app/clearBreed')
        this.goBack()
      })
    },
    // 编辑
    doEdit(params) {
      editBreed(params).then((res) => {
        this.$message.success('编辑信息成功')
        this.$store.dispatch('app/clearMouses')
        this.$store.dispatch('app/clearBreed')
        this.goBack()
      })
    },
    // 设置受孕时间
    setPregTime(row) {
      console.log(row)
      this.dialogVisible = true
      this.breedTime.date = row.pregnantTime
    },
    submitPregTime() {

    }
  },
  // 路由守卫，复用的页面，判断来源
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 是添加小鼠返回的
      if (from.name === 'breedAddMouse') {
        /* const addingMouses = vm.$store.getters.addingMouses ? JSON.parse(vm.$store.getters.addingMouses) : [] // 选中小鼠列表
        const cacheBreed = vm.$store.getters.addingBreed ? JSON.parse(vm.$store.getters.addingBreed) : null // 繁育组信息
        console.log('添加小鼠后返回', cacheBreed, addingMouses)
        if (cacheBreed) {
          cacheBreed.miceIds = addingMouses
          // 回填信息
          console.log('vm.breedForm===1======', vm.breedForm)
          vm.$set(vm, 'breedForm', cacheBreed)
          console.log('vm.breedForm===2======', vm.breedForm)
        } */
        vm.canEdit = true
      }
    })
  }
}
</script>

<style lang="scss">
  .breed__input--width{
    width: 268px;
  }
  .breed__edit--btns{
    bottom: 0;
    left: 0;
    padding-left: 40px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(214,214,214,1);
  }
</style>
