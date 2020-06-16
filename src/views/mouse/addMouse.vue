<template>
  <div class="mouse__addNew">
    <main-box>
      <div class="mouse__addNew--form mt25 ml15 cl-black">
        <el-form ref="form" :model="form" size="small" label-width="95px" label-position="left">
          <el-form-item label="品系名称:" class="diy__is-require mb17">
            <el-input
              v-model="varietiesName"
              placeholder="请选择品系名称"
              disabled
              class="w250"
            />
            <choice-variety-btn :variety.sync="curVariety" />
          </el-form-item>
          <div v-if="varietiesName" class="mouse__addNew--toggle">
            <div class="mb13 df">
              <genes-choose :id="varietiesId" btn-text="选择" class="mr16" :genes.sync="genes" />
              <add-genes-btn
                :varieties-id="varietiesId"
                :varieties-name="varietiesName"
                :genes-data.sync="genes"
              />
            </div>
            <div class="df s-jcsb s-aic">
              <el-form-item label="基因型:" label-width="70px" class="diy__is-require mb8">
                <el-input
                  v-model="currentGene.geneName"
                  placeholder="请输入基因型"
                  disabled
                  class="w250"
                />
              </el-form-item>
              <el-form-item label="饲养条件:" label-width="70px" class="mb8">
                <el-input
                  v-model="currentGene.miceCondition"
                  placeholder="请输入饲养条件"
                  disabled
                  class="w250"
                />
              </el-form-item>
            </div>
            <div class="df s-jcsb s-aic">
              <el-form-item label="健康状态:" label-width="70px" class="mb8">
                <el-input
                  v-model="currentGene.status"
                  placeholder="请输入健康状态"
                  disabled
                  class="w250"
                />
              </el-form-item>
              <el-form-item label="毛色:" label-width="70px" class="mb8">
                <el-input
                  v-model="currentGene.color"
                  placeholder="请输入毛色"
                  disabled
                  class="w250"
                />
              </el-form-item>
            </div>
            <el-form-item
              label="应用领域:"
              disabled
              label-width="70px"
              class="mb0"
            >
              <el-input v-model="currentGene.area" type="textarea" disabled />
            </el-form-item>
          </div>
          <el-form-item label="状态:" class="mb0">
            <span>闲置</span>
          </el-form-item>
          <el-form-item label="状态数量:" class="diy__is-require mb9">
            <el-input
              v-model.number="form.femaleMiceNum"
              placeholder="0"
              class="w80"
            />
            <span class="ml8">只(雌)</span>
            <el-input
              v-model.number="form.maleMiceNum"
              placeholder="0"
              class="w80 ml16"
            />
            <span class="ml8">只(雄)</span>
          </el-form-item>
          <el-form-item label="体重:" class="mb9">
            <el-input
              v-model.number="form.weight"
              placeholder="请输入体重"
              class="w250"
            />
            <span class="ml8">g</span>
          </el-form-item>
          <div class="df s-jcfs">
            <el-form-item label="出生日期:" class="mb9 mr62">
              <el-date-picker
                v-model="form.birthDate"
                type="datetime"
                placeholder="请输入出生日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="timestamp"
                class="w250"
              />
            </el-form-item>
            <el-form-item label="周龄:" class="mb9">
              <el-input
                v-model="weekAge"
                placeholder="0"
                disabled
                class="w80"
              />
              <span class="ml8">周</span>
              <el-input
                v-model="dayAge"
                placeholder="0"
                disabled
                class="w80"
              />
              <span class="ml8">天</span>
            </el-form-item>
          </div>
          <div class="df s-jcfs">
            <el-form-item label="纯/杂合子" class="mb9 mr62">
              <el-select
                v-model="form.pureHeterozygote"
                placeholder="请选择纯/杂合子"
                class="w250"
              >
                <el-option label="纯合子" :value="0" />
                <el-option label="杂合子" :value="1" />
                <el-option label="未测试" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="显示颜色:" class="mb9">
              <el-color-picker v-model="form.color" size="mini" style="position:  relative;top: 2px;height: 32px;" />
            </el-form-item>
          </div>
          <div class="df s-jcfs">
            <el-form-item label="分笼时间:" class="mb9 mr62">
              <el-date-picker
                v-model="form.separateCageRemindTime"
                type="datetime"
                default-time="09:00:00"
                format="yyyy-MM-dd HH:mm"
                value-format="timestamp"
                class="w250"
                placeholder="选择分笼时间"
              />
            </el-form-item>
            <el-form-item label="分笼提醒:" class="mb9 mr62">
              <el-select
                v-model="form.separateCageRemindFlag"
                placeholder="请选择是否分笼提醒"
                class="w250"
              >
                <el-option label="是" :value="0" />
                <el-option label="否" :value="1" />
              </el-select>
            </el-form-item>
          </div>
          <div class="df s-jcfs">
            <el-form-item label="表型鉴定时间:" class="mb9 mr62">
              <el-date-picker
                v-model="form.phenotypicIdentificationRemindTime"
                type="datetime"
                default-time="09:00:00"
                format="yyyy-MM-dd HH:mm"
                value-format="timestamp"
                class="w250"
                placeholder="选择分笼时间"
              />
            </el-form-item>
            <el-form-item label="表型鉴定提醒:" class="mb9 mr62">
              <el-select
                v-model="form.phenotypicIdentificationRemindFlag"
                placeholder="请选择是否表型鉴定提醒"
                class="w250"
              >
                <el-option label="是" :value="0" />
                <el-option label="否" :value="1" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="附件:" class="mb0">
            <div class="df">
              <view-files :cache-list="cacheFilesList" />
              <upload-btn class="dib" @done="fillFilesUrl" />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="mouse__addNew--btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
        <el-button type="primary" size="small" @click="goChoose()">下一步(去选笼子)</el-button>
      </div>
    </main-box>
  </div>
</template>

<script>
import ChoiceVarietyBtn from '@/components/Dialogs/choice_variety'
import AddGenesBtn from '@/components/Dialogs/cpt_add_genes'
import GenesChoose from '@/components/Dialogs/GenesChoose'
import ViewFiles from '@/components/Dialogs/ViewFiles'
import UploadBtn from '@/components/Dialogs/cpt_upload'
import { addNewGenes } from '@/api/genes'

export default {
  name: 'AddMouse',
  components: {
    ChoiceVarietyBtn,
    AddGenesBtn,
    GenesChoose,
    ViewFiles,
    UploadBtn
  },
  data() {
    return {
      // 总表单
      form: {
        vid: '',
        genotypes: null,
        maleMiceNum: 0,
        femaleMiceNum: 0,
        weight: null,
        birthDate: null,
        pureHeterozygote: null,
        color: '#58A2FB',
        separateCageRemindTime: null,
        separateCageRemindFlag: 0,
        phenotypicIdentificationRemindTime: null,
        phenotypicIdentificationRemindFlag: 0,
        fatherId: 0,
        files: [],
        motherId: 0,
        deathStatus: 0,
        delFlag: 0,
        miceNo: '',
        sign: '',
        status: 1 // 0:无，1：闲置，2：繁育，3：实验,4:手动处死5,实验处死
      },
      cacheFilesList: [],
      // 品系选择
      curVariety: '',
      varietiesName: '',
      varietiesId: '',
      // 基因型选择
      genes: '',
      // 当前选择的基因型
      currentGene: {
        varietiesName: '',
        geneName: '',
        miceCondition: '',
        status: '',
        color: '',
        area: ''
      }
    }
  },
  computed: {
    // 周龄，不存数据库
    weekAge() {
      if (!this.form.birthDate) return 0
      const duration = +new Date() - this.form.birthDate
      const weeks = duration / 1000 / 60 / 60 / 24 / 7
      return Math.floor(weeks)
    },
    // 天
    dayAge() {
      if (!this.form.birthDate) return 0
      const duration = +new Date() - this.form.birthDate
      const days = duration / 1000 / 60 / 60 / 24 % 7
      return Math.floor(days) + 1
    }
  },
  watch: {
    curVariety(n, o) {
      const newVariety = JSON.parse(n)
      this.varietiesName = newVariety.varietiesName
      this.varietiesId = newVariety.id
    },
    genes(n, o) {
      const newGenes = JSON.parse(n)
      this.form.genotypes = newGenes.id
      this.fillGenes(newGenes)
    }
  },
  created() {
    const cacheMouseInfo = this.$store.getters.cacheMouseInfo
    if (Object.keys(cacheMouseInfo).length !== 0) {
      this.$set(this, 'form', cacheMouseInfo.common)
      this.$set(this, 'cacheFilesList', cacheMouseInfo.files)
      this.$set(this, 'currentGene', cacheMouseInfo.genes)
      this.varietiesName = cacheMouseInfo.varietiesName
      this.varietiesId = cacheMouseInfo.varietiesId
    }
  },
  methods: {
    // 上传成功回填url
    fillFilesUrl(data, fileList) {
      this.$set(this.form, 'files', data)
      // 填充文件查看列表
      const list = []
      for (let i = 0; i < data.length; i++) {
        const { name: fileName, type: bizType } = fileList[i].raw
        list.push({
          fileName,
          bizType,
          path: data[i]
        })
      }
      console.log('list', list)
      this.$set(this, 'cacheFilesList', list)
    },
    // 选择品系 or 基因型
    chooseVarity() {
      this.varietyDialog = true
    },
    fillVarity() {
      this.varietyDialog = false
      // 填充品系
    },
    // 选择基因型
    chooseGenes() {
      this.genesDialog = true
    },
    // 新增基因型
    addGenes() {
      this.addGenesDialog = true
    },
    // 填充基因型信息
    fillGenes(res) {
      const { geneName, miceCondition, status, color, area } = res
      this.currentGene.geneName = geneName
      this.currentGene.miceCondition = miceCondition
      this.currentGene.status = status
      this.currentGene.color = color
      this.currentGene.area = area
    },
    goBack() {
      this.$router.back()
      this.$store.dispatch('app/clearMouseInfo')
    },
    goChoose(obj) {
      this.form.vid = this.varietiesId
      if (this.checkForm()) {
        this.$store.dispatch('app/cacheMouseInfo', {
          varietiesName: this.varietiesName,
          varietiesId: this.varietiesId,
          genes: this.currentGene,
          files: this.cacheFilesList,
          common: this.form
        })
        this.$router.push({ name: 'mouseCage', params: this.form })
      }
    },
    // 校验表单
    checkForm() {
      if (!this.form.vid) {
        this.$message.error('未选择品系')
        return false
      }
      if (!this.form.genotypes) {
        this.$message.error('未选择基因型')
        return false
      }
      if (!this.form.maleMiceNum && !this.form.femaleMiceNum) {
        this.$message.error('小鼠数量不能为0')
        return false
      }
      // if (!this.form.weight) {
      //   this.$message.error('未输入体重')
      //   return false
      // }
      // if (!this.form.birthDate) {
      //   this.$message.error('未选择出生日期')
      //   return false
      // }
      // if (!this.form.pureHeterozygote && this.form.pureHeterozygote !== 0) {
      //   console.log(this.form.pureHeterozygote)
      //   this.$message.error('未确定纯/杂合子')
      //   return false
      // }
      // if (!this.form.color) {
      //   this.$message.error('未选择颜色')
      //   return false
      // }
      // if (!this.form.separateCageRemindTime) {
      //   this.$message.error('未设置分笼时间')
      //   return false
      // }
      // if (!this.form.phenotypicIdentificationRemindTime) {
      //   this.$message.error('未设置表型鉴定时间')
      //   return false
      // }
      return true
    }
  }
}
</script>

<style lang="scss">
  .mouse__addNew {
    &--form{
      margin-bottom: 80px;
    }
    &--toggle{
      width: 750px;
      padding: 16px 25px;
      background-color: #F5F5F5;
    }
    .mr62 {
      margin-right: 62px;
    }
    &--btns {
      bottom: 0;
      left: 0;
      padding-left: 40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(214,214,214,1);
    }
  }
</style>
