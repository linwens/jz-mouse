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
      <div class="df s-fwwp mb60 s-jcsa">
        <mouse-cage
          v-for="(item, index) in cageList"
          :key="index"
          :all-data="item"
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
              :disabled="optType === 'breed' || optType === 'expt'"
              class="w80"
            />
            <span class="ml8">雄</span>
            <el-input
              v-model.number="putInForm.male"
              placeholder="0"
              :disabled="optType === 'breed' || optType === 'expt'"
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
import { fetchCageList, addMouse, transferCage } from '@/api/mouse'

export default {
  name: 'CageChoice',
  components: {
    AddCageBtn,
    MouseCage
  },
  data() {
    return {
      optType: '', // 操作类型
      cageList: [], // 鼠笼列表
      cagePage: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      isChoosingCage: false, // 正在选鼠笼标识
      choosedCage: 0, // 当前选中的鼠笼id
      putInVisible: false,
      putInForm: {
        male: 0,
        female: 0
      },
      mouseData: {}, // 新增小鼠信息
      mouses: [] // 添加多个小鼠信息
    }
  },
  created() {
    if (!this.$route.params.type) { // 新增小鼠进来选笼放笼
      this.$set(this, 'mouseData', this.$route.params)
    } else { // 繁育组进来选笼放笼
      this.optType = this.$route.params.type
      this.mouses = this.$route.params.mouses
      const male = this.mouses.filter((el) => {
        return el.gender === 0
      }).length
      const female = this.mouses.filter((el) => {
        return el.gender === 1
      }).length
      this.putInForm.female = female
      this.putInForm.male = male
      this.mouseData.femaleMiceNum = female
      this.mouseData.maleMiceNum = male
      // 选中小鼠id
      this.ids = this.mouses.map((el) => {
        return el.miceInfoId
      })
    }
    this.getCageList()
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
      })).then(res => {
        const { records } = res.data
        let list = []
        // 如果是添加繁育组，只展示空笼位
        if (this.optType === 'breed') {
          list = records.filter((el) => {
            return el.miceInfoByMiceCageQueryVO.length === 0
          })
        } else {
          list = records
        }
        this.cageList = list
        this.cagePage.total = res.data.total
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
    // 繁育组添加小鼠
    doTransferCage() {
      transferCage({
        cageId: this.choosedCage,
        miceId: this.ids
      }).then((res) => {
        this.$message.success('放入鼠笼成功')
        this.mouseData.femaleMiceNum -= this.putInForm.female
        this.mouseData.maleMiceNum -= this.putInForm.male
        this.$store.dispatch('app/cacheChoosedMouse', this.mouses)
        this.putInVisible = false
        this.$router.back()
      })
    },
    // 添加小鼠
    doAdd() {
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
        return false
      }

      if (this.optType === 'breed') { // 添加入繁育组
        this.doTransferCage()
        return false
      }
      this.doAdd()
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
