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
            <el-input v-if="type==='add'" v-model="breedForm.name" size="small" class="breed__input--width" />
            <span v-else>{{ breedForm.name }}</span>
          </el-form-item>
          <el-form-item
            label="繁育时间:"
            label-width="89.56px"
            class="mb10"
            style="padding-left: 9.44px;"
          >
            <div v-if="type==='add'" class="df s-jcsb breed__input--width">
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
                v-model="breedForm.createTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="timestamp"
                placeholder="选择日期时间"
              />
            </div>
            <span v-else>{{ breedForm.createTime | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="df s-jcfe mb15">
        <el-button v-if="type==='add'" type="primary" size="small" class="w100" @click="goAdd()">添加</el-button>
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
          <template slot="preg_time" slot-scope="scope">
            <el-button v-if="scope.scope.row.sex === 0" type="text" @click="setPregTime(scope.scope.row)">{{ scope.scope.row.preg_time | timeFormat('yyyy-MM-dd') }}</el-button>
          </template>
          <template slot="menu" slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="goMouse(scope.scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="text"
              size="mini"
              class="btn-text--danger"
              @click="rowItemDel(scope.scope.row)"
            >
              移除
            </el-button>
          </template>
        </merge-table>
      </div>
      <div class="breed__edit--btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
        <el-button type="primary" size="small" class="w100" @click="submitForm('breedForm')">{{ type==='add' ? '确定' : '编辑/确定' }}</el-button>
      </div>
    </main-box>
    <!-- 设置时间弹窗 -->
    <el-dialog
      title="设置受孕时间"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
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
import { addBreed, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj } from '@/api/breed'

export default {
  name: 'DelList',
  components: {
    MergeTable
  },
  data() {
    return {
      type: '',
      breedForm: {
        name: '',
        breedTime: null,
        createTime: null,
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
  created() {
    this.$route.meta.title = this.$route.params.type === 'add' ? '新增' : '编辑/查看'
    this.type = this.$route.params.type
  },
  methods: {
    // 添加小鼠
    goAdd(row) {
      this.goPage('experimentAddMouse', { type: 'noBreed' })
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
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.breedForm)
          const ids = this.tableData.map((el) => {
            return el.miceInfoId
          })
          const { id: userId } = this.$store.getters.info
          addBreed(Object.assign({}, this.breedForm, {
            breedTime: this.breedForm.breedTime / 1000,
            createTime: +new Date() / 1000,
            createUser: userId,
            miceIds: ids.join(',')
          })).then((res) => {
            this.$message.success('新增繁育组成功')
            this.$store.dispatch('app/clearMouses')
            this.goBack()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 设置受孕时间
    setPregTime(row) {
      console.log(row)
      this.dialogVisible = true
      this.breedTime.date = row.preg_time
    },
    submitPregTime() {

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  // 路由守卫，复用的页面，判断来源
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 是添加小鼠返回的
      if (from.name === 'experimentAddMouse') {
        vm.type = 'add'
        vm.$set(vm, 'tableData', JSON.parse(vm.$store.getters.addingMouses))
        console.log(vm.tableData)
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
