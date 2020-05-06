<template>
  <div>
    <main-box class="mouse__cageChoice fs14 cl-black">
      <div class="mb16">
        <p class="mouse__cageChoice--p">
          剩余小鼠: 
          <span>{{ mouseData.femaleMiceNum }}只 (<i class="cl-purple">雌</i>)</span>
          /
          <span>{{ mouseData.maleMiceNum }}只 (<i class="cl-blue">雄</i>)</span>
        </p>
      </div>
      <div class="mb16">
        <el-button size="small" class="w80" @click="putIn()">放入</el-button>
        <add-cage-btn @done="getCageList" />
      </div>
      <div class="df s-fwwp mb60">
        <mouse-cage
          v-for="(item, index) in cageList"
          :key="index"
          :all-data="item"
          :is-active="choosedCage === item.id"
          :choiced-list.sync="choicedList"
          :is-choosing-cage="isChoosingCage"
          :cage-id="item.id"
          :choosed-cage.sync="choosedCage"
        />
      </div>
      <div class="mouse__cageChoice--btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
      </div>
    </main-box>
    <!-- 放老鼠弹窗 -->
    <el-dialog
      title="放入小鼠"
      :visible.sync="putInVisible"
      width="433px"
    >
      <div class="mouse__put-in">
        <el-form ref="putInForm" :model="putInForm" label-position="left" size="mini">
          <el-form-item
            label="数量:"
            class="mb9"
            :rules="[
              { required: true, message: '总数量必须大于0'}
            ]"
          >
            <span class="ml8">雌</span>
            <el-input
              v-model.number="putInForm.female"
              placeholder="0"
              class="w80"
            />
            <span class="ml8">雄</span>
            <el-input
              v-model.number="putInForm.male"
              placeholder="0"
              class="w80"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="putInVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="putInSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MouseCage from '@/components/MouseCage'
import AddCageBtn from '@/components/Dialogs/cpt_add_cage'
import { fetchCageList, addMouse } from '@/api/mouse'

export default {
  name: 'CageChoice',
  components: {
    AddCageBtn,
    MouseCage
  },
  data() {
    return {
      cageList: [], // 鼠笼列表
      cagePage: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      isChoosingCage: false, // 正在选鼠笼标识
      choicedList: [], // 当前选中的小鼠列表
      choosedCage: 0, // 当前选中的鼠笼id
      putInVisible: false,
      putInForm: {
        male: 0,
        female: 0
      },
      mouseData: {} // 新增小鼠信息
    }
  },
  created() {
    this.getCageList()
    this.$set(this, 'mouseData', this.$route.params)
  },
  methods: {
    goBack() {
      
      this.$confirm(`当前仍有${this.mouseData.femaleMiceNum + this.mouseData.maleMiceNum}只小鼠尚未放入鼠笼，是否继续返回？`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.back()
      }).catch(function() {
      })
    },
    // 鼠笼列表
    getCageList() {
      this.tableLoading = true
      fetchCageList(Object.assign({
        current: this.cagePage.page,
        size: this.cagePage.limit
      })).then(response => {
        this.cageList = response.data.records
        this.cagePage.total = response.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    // 放入操作
    putIn() {
      console.log(this.choosedCage)
      if (!this.choosedCage) {
        this.$message.error('请先选择鼠笼')
      } else {
        this.putInVisible = true
      }
    },
    putInSubmit() {
      if (this.putInForm.male > this.mouseData.maleMiceNum) {
        this.$message.error(`雄鼠数量不得大于${this.mouseData.maleMiceNum}`)
        return false
      }
      if (this.putInForm.female > this.mouseData.femaleMiceNum) {
        this.$message.error(`雌鼠数量不得大于${this.mouseData.femaleMiceNum}`)
        return false
      }
      if (this.putInForm.male === 0 && this.putInForm.female === 0) {
        this.$message.error('总数量必须大于0')
      } else {
        const { id: userId } = this.$store.getters.info
        const params = Object.assign({}, this.mouseData, {
          createTime: Math.floor(+new Date() / 1000),
          birthDate: this.mouseData.birthDate / 1000,
          separateCageRemindTime: this.mouseData.separateCageRemindTime / 1000,
          phenotypicIdentificationRemindTime: this.mouseData.phenotypicIdentificationRemindTime / 1000,
          createUser: userId,
          operator: userId,
          cid: this.choosedCage,
          maleMiceNum: this.putInForm.male,
          femaleMiceNum: this.putInForm.female
        })
        addMouse(params).then(res => {
          // 更新剩余小鼠数量
          this.mouseData.femaleMiceNum -= this.putInForm.female
          this.mouseData.maleMiceNum -= this.putInForm.male
          const { varietiesName, varietiesId, genes } = this.$store.getters.cacheMouseInfo
          console.log(this.$store.getters.cacheMouseInfo)
          this.$store.dispatch('app/cacheMouseInfo', {
            common: this.mouseData,
            varietiesName,
            varietiesId,
            genes
          })
          this.$message.success('新增小鼠成功')
          this.getCageList()
          this.putInVisible = false
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .mouse__cageChoice{
    padding-top: 17px;
    &--p{
      display: inline-block;
      color: #999;
      span{
        color: #333;
      }
    }
    &--btns {
      bottom: 0;
      left: 0;
      padding-left: 40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(214,214,214,1);
    }
    .mb60 {
      margin-bottom: 60px;
    }
  }
</style>
