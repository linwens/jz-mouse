<template>
  <div class="mouse__addChild">
    <main-box>
      <div class="mouse__addChild--form mt25 ml15 cl-black fs14">
        <div class="df s-jcfs mb16">
          <p style="margin-right: 44px;">父鼠编号: <span>{{ father.miceInfoId }}</span></p>
          <p>母鼠编号: <span>{{ mother.miceInfoId }}</span></p>
        </div>
        <el-form ref="form" :model="form" size="small" label-width="95px" label-position="left">
          <el-form-item label="品系名称:" class="mb17">
            <el-input
              v-model="varietiesName"
              disabled
              placeholder="请选择品系名称"
              class="w250"
            />
            <choice-variety-btn :variety.sync="curVariety" />
          </el-form-item>
          <div class="mouse__addChild--toggle">
            <div class="df s-jcsb s-aic">
              <el-form-item label="基因型:" label-width="70px" class="mb8">
                <el-select v-model="genesType" placeholder="请选择" class="w96">
                  <el-option label="待定" :value="0" />
                  <el-option label="父" :value="1" />
                  <el-option label="母" :value="2" />
                  <el-option label="父+母" :value="3" />
                  <el-option label="WT" :value="4" />
                  <el-option label="自定义" :value="5" />
                </el-select>
                <add-genes-btn
                  v-if="genesType === 5"
                  :varieties-id="varietiesId"
                  :varieties-name="varietiesName"
                  :genes-data.sync="genes"
                />
                <el-input
                  v-else
                  v-model="currentGene.geneName"
                  disabled
                  placeholder="请输入基因型"
                  class="w150"
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
          <el-form-item label="状态数量:" class="mb9">
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
                clearable
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
                <el-option label="是" :value="0"></el-option>
                <el-option label="否" :value="1"></el-option>
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
          <div>
            <el-form-item label="笼位号:" class="mb8">
              <el-input
                v-model="cage.cageNo"
                placeholder="请输入笼位号"
                class="w250"
              />
            </el-form-item>
            <div class="mouse__addChild--toggle">
              <div class="df s-jcsb s-aic">
                <el-form-item label="笼位号:" label-width="70px" class="mb8">
                  <el-input
                    v-model="cage.cageNo"
                    placeholder="请输入笼位号"
                    disabled
                    class="w250"
                  />
                </el-form-item>
                <el-form-item label="房间号:" label-width="70px" class="mb8">
                  <el-input
                    v-model="cage.roomNo"
                    placeholder="请输入房间号"
                    disabled
                    class="w250"
                  />
                </el-form-item>
              </div>
              <div class="df s-jcsb s-aic">
                <el-form-item label="架号:" label-width="70px" class="mb0">
                  <el-input
                    v-model="cage.shelvesNo"
                    placeholder="请输入架号"
                    disabled
                    class="w250"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <el-form-item label="附件:" class="mb0">
            <div class="df">
              <view-files :cache-list="cacheFilesList" />
              <upload-btn class="dib" @done="fillFilesUrl" />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="mouse__addChild--btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
        <el-button type="primary" size="small" @click="onSubmit()">确定</el-button>
      </div>
    </main-box>
  </div>
</template>

<script>
import ChoiceVarietyBtn from '@/components/Dialogs/choice_variety'
import AddGenesBtn from '@/components/Dialogs/cpt_add_genes'
import ViewFiles from '@/components/Dialogs/ViewFiles'
import UploadBtn from '@/components/Dialogs/cpt_upload'
import { addMouse } from '@/api/mouse'
import { getLisByGeneId, getLisByVariety } from '@/api/genes'

export default {
  name: 'AddChild',
  components: {
    ChoiceVarietyBtn,
    ViewFiles,
    UploadBtn,
    AddGenesBtn
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
        color: '#00CB7C',
        separateCageRemindTime: null,
        separateCageRemindFlag: 0,
        phenotypicIdentificationRemindTime: null,
        phenotypicIdentificationRemindFlag: 0,
        fatherId: 0,
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
      father: {},
      mother: {},
      // 基因型选择
      genesType: 1,
      genes: '',
      // 当前选择的基因型
      currentGene: {
        varietiesName: '',
        geneName: '',
        miceCondition: '',
        status: '',
        color: '',
        area: ''
      },
      // 鼠笼信息
      cage: {}
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
      if (this.genesType === 4) {
        this.getNewGenesByVariety()
      }
    },
    genesType(n, o) {
      if (n === 1 || n === 3) {
        this.currentGene.geneName = this.father.geneName
        this.form.genotypes = this.father.genotypes
        this.varietiesName = this.father.varietiesName
        this.varietiesId = this.father.vid
      }
      if (n === 2) {
        this.currentGene.geneName = this.mother.geneName
        this.form.genotypes = this.mother.genotypes
        this.varietiesName = this.mother.varietiesName
        this.varietiesId = this.mother.vid
      }
      if (n === 4) { // WT
        this.getNewGenesByVariety()
        return
      }
      if (n === 0 || n === 5) {
        this.currentGene.geneName = ''
        this.form.genotypes = 0
      }
      this.getGenesInfo()
    },
    genes(n, o) {
      const newGenes = JSON.parse(n)
      this.form.genotypes = newGenes.id
      this.fillGenes(newGenes)
    }
  },
  created() {
    const cacheChildMouse = this.$store.getters.addingChildMouse
    console.log(cacheChildMouse)
    const parents = cacheChildMouse.parents || []
    const cage = cacheChildMouse.cage || {}
    if (parents.length === 2) {
      this.father = parents.filter((el) => {
        return el.gender === 0
      })[0]
      this.mother = parents.filter((el) => {
        return el.gender === 1
      })[0]
    }
    this.$set(this, 'cage', cage)
    const { vid, varietiesName, genotypes, geneName  } = this.father
    this.varietiesName = varietiesName
    this.varietiesId = vid
    this.form.genotypes = genotypes
    this.currentGene.geneName = geneName
    console.log(this.father, this.mother, this.cage)
    this.getGenesInfo()
  },
  methods: {
    // 根据品系id重新拿基因型列表,填充WT基因型
    getNewGenesByVariety() {
      getLisByVariety({
        id: this.varietiesId
      }).then((res) => {
        const { data } = res
        const WT = data.filter((el) => {
          return el.geneName === 'WT'
        })[0]
        this.fillGenes(WT)
      })
    },
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
    goBack() {
      this.$store.dispatch('app/clearChildMouses')
      this.$router.back()
    },
    goChoose(obj) {
      this.$router.push({ name: 'mouseCage', params: obj })
    },
    // 获取基因型具体信息
    getGenesInfo() {
      getLisByGeneId(this.form.genotypes).then((res) => {
        if (!res.data) {
          this.fillGenes()
        } else {
          this.fillGenes(res.data)
        }
      })
    },
    // 填充基因型信息
    fillGenes(res) {
      if (!res) {
        for (const key in this.currentGene) {
          this.currentGene[key] = ''
        }
      } else {
        const { geneName, miceCondition, status, color, area } = res

        this.currentGene.geneName = geneName
        this.currentGene.miceCondition = miceCondition
        this.currentGene.status = status
        this.currentGene.color = color
        this.currentGene.area = area
      }
    },
    // 提交
    onSubmit() {
      const { id: userId } = this.$store.getters.info
      const params = Object.assign({}, this.form, {
        createTime: Math.floor(+new Date() / 1000),
        birthDate: this.form.birthDate / 1000,
        separateCageRemindTime: this.form.separateCageRemindTime / 1000,
        phenotypicIdentificationRemindTime: this.form.phenotypicIdentificationRemindTime / 1000,
        createUser: userId,
        operator: userId,
        fatherId: this.father.miceInfoId,
        motherId: this.mother.miceInfoId,
        cid: this.father.cid,
        vid: this.varietiesId
      })
      addMouse(params).then(res => {
        this.$message.success('新增子鼠成功')
        this.$store.dispatch('app/clearChildMouses')
        this.goBack()
      })
    }
  }
}
</script>

<style lang="scss">
  .mouse__addChild {
    .w96 {
      width: 96px!important;
    }
    .el-form-item__label {
      color: #333;
      padding-right: 0;
    }
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
  .mouse__varietyDialog {
    min-height: 254px;
    .el-radio--small.is-bordered{
      width: 112px;
      padding: 8px 10px 0;
      text-align: center;
    }
    .el-radio__input{
      display: none;
    }
    .el-radio--small.is-bordered .el-radio__label{
      padding-left: 0;
      font-size: 14px;
    }
  }
</style>
