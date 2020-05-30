<template>
  <div class="mouse__edit fs14">
    <main-box style="padding:0;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="小鼠信息" name="first">
          <div class="mouse__edit--pane">
            <div class="df s-jcfs mb16">
              <p style="margin-right: 44px;">父鼠编号: <span>{{ form.fatherId }}</span></p>
              <p>母鼠编号: <span>{{ form.motherId }}</span></p>
            </div>
            <el-form ref="form" :model="form" size="small" label-width="95px" label-position="left">
              <el-form-item label="品系名称:" class="mb17">
                <el-input
                  v-model="varietiesName"
                  :disabled="!canEdit"
                  placeholder="请选择品系名称"
                  class="w250"
                />
                <choice-variety-btn v-if="canEdit" :variety.sync="curVariety" />
              </el-form-item>
              <div v-if="varietiesName" class="mouse__edit--toggle mb9">
                <div v-if="canEdit" class="mb13 df">
                  <genes-choose :id="varietiesId" btn-text="选择" class="mr16" :genes.sync="genes" />
                  <add-genes-btn
                    :varieties-id="varietiesId"
                    :varieties-name="varietiesName"
                    :genes-data.sync="genes"
                  />
                </div>
                <div class="df s-jcsb s-aic">
                  <el-form-item label="基因型:" label-width="70px" class="mb8">
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
              <div class="df s-jcfs mb16">
                <p style="margin-right: 44px;">编号: <span>{{ form.miceNo }}</span></p>
                <p>状态: <span>{{ statusLable }}</span></p>
              </div>
              <el-form-item label="标记:" class="mb9">
                <el-select
                  v-model="form.position"
                  :disabled="!canEdit"
                  placeholder="部位"
                  class="w100"
                >
                  <el-option label="头部" value="头部" />
                  <el-option label="足部" value="足部" />
                  <el-option label="自定义" value="custom" />
                </el-select>
                <el-input
                  v-if="form.position === 'custom'"
                  v-model="form.sign"
                  placeholder="请输入具体的标记位置"
                  style="width: 170px;"
                />
                <el-input
                  v-else
                  v-model="form.sign"
                  :disabled="!canEdit"
                  placeholder="请输入1-99的数字"
                  style="width: 142px;"
                />
                <div v-show="form.position !== 'custom'" class="mouse__edit--img mt8">
                  <img v-if="form.position !== 'custom'" :src="`http://bllb-animal-test.oss-cn-hangzhou.aliyuncs.com/mice-sign/${form.filePrefix}/${form.sign}.jpg`" alt="">
                  <span class="pl16 pr16">示例：</span>
                  <img src="@/assets/test.jpg" alt="">
                </div>
              </el-form-item>
              <div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">性别:</span><i class="mouse__edit--info--i">{{ form.gender === 1 ? '雌' : '雄' }}</i></p>
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">体重:</span><i class="mouse__edit--info--i">{{ form.weight }}</i></p>
                </div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">基因型:</span><i class="mouse__edit--info--i">{{ form.geneName }}</i></p>
                  <p class="mouse__edit--info--p df">
                    <span class="mouse__edit--info--span">显示颜色:</span>
                    <i class="mouse__edit--info--i dib" :style="{'width': '16px', 'height': '16px', 'backgroundColor': form.miceColor}" />
                  </p>
                </div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">出生日期:</span><i class="mouse__edit--info--i">{{ form.birthDate * 1000 | timeFormat('yyyy-MM-dd') }}</i></p>
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">周龄:</span><i class="mouse__edit--info--i">{{ weekAge + '周' + dayAge + '天' }}</i></p>
                </div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">纯/杂合子:</span><i class="mouse__edit--info--i">{{ pure }}</i></p>
                </div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">分笼时间:</span><i class="mouse__edit--info--i">{{ form.separateCageRemindTime * 1000 | timeFormat('yyyy-MM-dd') }}</i></p>
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">分笼提醒:</span><i class="mouse__edit--info--i">{{ form.separateCageRemindFlag ? '否' : '是' }}</i></p>
                </div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">表型鉴定时间:</span><i class="mouse__edit--info--i">{{ form.phenotypicIdentificationRemindTime * 1000 | timeFormat('yyyy-MM-dd') }}</i></p>
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">表型鉴定提醒:</span><i class="mouse__edit--info--i">{{ form.phenotypicIdentificationRemindFlag ? '否' : '是' }}</i></p>
                </div>
              </div>
              <div>
                <el-form-item label="笼位号:" class="mb8">
                  <el-input
                    v-model="cageInfo.cageNo"
                    :disabled="!canEdit"
                    placeholder="请选择笼位"
                    class="w250"
                  />
                  <el-button v-if="canEdit" type="primary" @click="goCage()">选择笼位</el-button>
                </el-form-item>
                <div class="mouse__edit--toggle">
                  <div class="df s-jcsb s-aic">
                    <el-form-item label="笼位号:" label-width="70px" class="mb8">
                      <el-input
                        v-model="cageInfo.cageNo"
                        placeholder="请输入笼位号"
                        disabled
                        class="w250"
                      />
                    </el-form-item>
                    <el-form-item label="房间号:" label-width="70px" class="mb8">
                      <el-input
                        v-model="cageInfo.roomNo"
                        placeholder="请输入房间号"
                        disabled
                        class="w250"
                      />
                    </el-form-item>
                  </div>
                  <div class="df s-jcsb s-aic">
                    <el-form-item label="架号:" label-width="70px" class="mb0">
                      <el-input
                        v-model="cageInfo.shelvesNo"
                        placeholder="请输入架号"
                        disabled
                        class="w250"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
              <el-form-item label="附件:" class="mb0">
                <div v-if="canEdit" class="df">
                  <view-files :id="curMouseId" biz-type="mice" />
                  <upload-btn :id="curMouseId" biz-type="mice" class="dib" @done="fillFilesUrl" />
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="mouse__edit--btns pos-a w-100 h60 df s-aic">
            <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
            <el-button type="primary" size="small" @click="save()">{{ canEdit ? '确定' : '编辑' }}</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="实验记录" name="second">
          <div class="ml16 mr16 bd-gray">
            <merge-table
              ref="crud"
              :page="page"
              :data="tableData"
              :table-option="tableOption"
              :table-loading="tableLoading"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </main-box>
  </div>
</template>

<script>
import ChoiceVarietyBtn from '@/components/Dialogs/choice_variety'
import AddGenesBtn from '@/components/Dialogs/cpt_add_genes'
import UploadBtn from '@/components/Dialogs/cpt_upload'
import GenesChoose from '@/components/Dialogs/GenesChoose'
import ViewFiles from '@/components/Dialogs/ViewFiles'
import { addNewGenes } from '@/api/genes'

import MergeTable from '@/components/MergeTable'
import { tableOption } from './labTable'
import { getMouseInfo, getMouseExpInfo, getCageInfo, editMouse } from '@/api/mouse'
import { fetchList } from '@/api/experiment'

export default {
  name: 'MouseEdit',
  components: {
    MergeTable,
    ChoiceVarietyBtn,
    AddGenesBtn,
    ViewFiles,
    UploadBtn,
    GenesChoose
  },
  data() {
    return {
      canEdit: false, // 是否可编辑
      activeName: 'first', // 鼠笼tab
      curMouseId: 0,
      // 总表单
      form: {
        vid: '',
        fatherId: null,
        motherId: null,
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
        deathStatus: 0,
        delFlag: 0,
        cageId: 0,
        roomNo: 0,
        shelvesNo: 0,
        miceNo: '',
        position: '',
        sign: '',
        filePrefix: '',
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
      },
      // ------------实验记录
      tableOption,
      tableLoading: false,
      page: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      tableData: [],
      // 笼位号id
      cid: null,
      cageInfo: {
        cageNo: null,
        roomNo: null,
        shelvesNo: null
      }
    }
  },
  computed: {
    // 周龄，不存数据库
    weekAge() {
      if (!this.form.birthDate) return 0
      const duration = +new Date() - this.form.birthDate * 1000
      const weeks = duration / 1000 / 60 / 60 / 24 / 7
      return Math.floor(weeks)
    },
    // 天
    dayAge() {
      if (!this.form.birthDate) return 0
      const duration = +new Date() - this.form.birthDate * 1000
      const days = duration / 1000 / 60 / 60 / 24 % 7
      return Math.floor(days)
    },
    // statusLable
    statusLable() {
      const MAP = {
        0: '无',
        1: '闲置',
        2: '繁育',
        3: '实验',
        4: '手动处死',
        5: '实验处死'
      }
      return MAP[this.form.miceStatus]
    },
    pure(n, o) {
      const MAP = {
        0: '纯合子',
        1: '杂合子',
        2: '未测试'
      }
      return MAP[this.form.pureHeterozygote]
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
    },
    'form.position'(n, o) {
      switch (n) {
        case '头部': this.form.filePrefix = 'ear'
          break
        case '足部': this.form.filePrefix = 'finger'
          break
        default: this.form.filePrefix = ''
      }
    },
    'form.cageId'(n, o) {
      if (!n) {
        this.getMouserInfo()
      }
    }
  },
  created() {
    if (this.$route.params.canEdit) { // 从小鼠管理的首页，点编辑进来，可直接编辑
      this.canEdit = true
    }
    this.curMouseId = Number(this.$route.params.id)
    console.log(this.$route)
    const cacheMouseInfo = this.$store.getters.cacheMouseInfo
    console.log('cacheMouseInfo======', cacheMouseInfo)
    if (Object.keys(cacheMouseInfo).length > 0) {
      const mouseInfo = this.$store.getters.cacheMouseInfo
      const { varietiesName, varietiesId, genes, common, files } = mouseInfo

      this.varietiesName = varietiesName
      this.varietiesId = Number(varietiesId)
      this.$set(this, 'form', common)
      this.$set(this, 'cacheFilesList', files)
      console.log('this.form', this.form)
      this.$set(this, 'currentGene', genes)
    } else {
      this.getMouserInfo()
    }
    getMouseExpInfo(this.curMouseId).then((res) => {
      console.log(res)
      this.$set(this, 'tableData', res.data)
    })
  },
  methods: {
    // 获取小鼠信息
    getMouserInfo() {
      getMouseInfo(this.curMouseId).then((res) => {
        console.log(res)
        const { geneName, varietiesName, miceCondition, area, status, color, varietiesId, ...other } = res.data
        this.varietiesName = varietiesName
        this.varietiesId = Number(varietiesId)
        this.$set(this, 'form', res.data)
        this.form.varietiesId = Number(varietiesId)
        this.$set(this, 'currentGene', {
          varietiesName,
          geneName,
          miceCondition,
          status,
          color,
          area
        })
        // 获取鼠笼信息
        getCageInfo(this.form.cageId).then((res) => {
          this.$set(this, 'cageInfo', res.data)
        })
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
    handleClick(tab, event) {
      console.log(tab, event)
      if (tab === 'second') {
        this.getList()
      }
    },
    doAddGenes() {
      this.addGenesDialog = false
      // 新增基因型
    },
    // 提交
    save() {
      if (!this.canEdit) {
        this.canEdit = true
        return false
      }
      editMouse(this.form).then((res)=> {
        this.$message.success('修改小鼠信息成功')
        this.$store.dispatch('app/clearMouseInfo')
        this.goBack()
      })
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
    },
    // 选笼位
    goCage() {
      this.form.vid = this.varietiesId
      if (this.checkForm()) {
        this.$store.dispatch('app/cacheMouseInfo', {
          varietiesName: this.varietiesName,
          varietiesId: this.varietiesId,
          genes: this.currentGene,
          files: this.cacheFilesList,
          common: this.form
        })
        this.$router.push({
          name: 'mouseCage',
          params: {
            mouses: this.form,
            type: 'mouseEdit'
          }
        })
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
      if ((!this.form.position && !this.form.sign)) {
        this.$message.error('未设置标记位置')
        return false
      }
      return true
    }
    // --------------------- 实验记录
  },
  // 路由守卫，复用的页面，判断来源
  beforeRouteEnter(to, from, next) {
    console.log('enter====>', to, from)
    next(vm => {
      // 选择鼠笼后返回,回填数据(请求也获取了数据...)
      if (from.name === 'mouseCage') {
        const mouseInfo = vm.$store.getters.cacheMouseInfo
        const { varietiesName, varietiesId, genes, common, files } = mouseInfo

        vm.varietiesName = varietiesName
        vm.varietiesId = Number(varietiesId)
        vm.$set(vm, 'form', common)
        vm.$set(vm, 'cacheFilesList', files)
        vm.$set(vm, 'currentGene', genes)
        vm.canEdit = true
      }
    })
  }
}
</script>

<style lang="scss">
  .mouse__edit{
    .el-tabs__header {
      padding: 0 16px;
    }
    &--pane{
      margin-left: 40px;
      margin-bottom: 100px;
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
    &--img{
      >img{
        display: inline-block;
        width: 143px;
        height: 80px;
        border: 1px solid #F0F0F0;
      }
    }
    &--info {
      &--p{
        &:nth-child(1){
          width: 405px;
        }
        font-size: 14px;
      }
      &--span {
        margin-right: 5px;
      }
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
      min-width: 112px;
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
