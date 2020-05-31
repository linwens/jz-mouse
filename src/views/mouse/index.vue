<template>
  <div class="mouse__info">
    <main-box class="bg-gray">
      <div class="df s-jcsb mt16">
        <div class="mouse__info1 bg-white df s-fdc s-jcsb">
          <div>
            <h6 class="mouse__info--h6">品系信息</h6>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">品系:</span><i class="mouse__info--i">{{ mouseInfo.varietiesName }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">毛色:</span><i class="mouse__info--i">{{ mouseInfo.geneColor }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">饲养条件:</span><i class="mouse__info--i">{{ mouseInfo.miceCondition }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">健康状态:</span><i class="mouse__info--i">{{ mouseInfo.geneStatus }}</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">基因型:</span><i class="mouse__info--i">{{ mouseInfo.geneName }}</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p w-100"><span class="mouse__info--span">应用领域:</span><i class="mouse__info--i">{{ mouseInfo.area }}</i></p>
            </div>
          </div>
          <div>
            <h6 class="mouse__info--h6">基本信息</h6>
            <div class="df s-aic mb8">
              <p class="mouse__info--p" style="width: 240px;"><span class="mouse__info--span">系统编号:</span><i class="mouse__info--i">{{ mouseInfo.miceNo }}</i></p>
              <p class="mouse__info--p" style="width: 60px;"><span class="mouse__info--span">性别:</span><i class="mouse__info--i">{{ mouseInfo.gender >= 0 ? (mouseInfo.gender === 0 ? '雄' : '雌') : '' }}</i></p>
              <p class="mouse__info--p" style="width: 100px;"><span class="mouse__info--span">周龄:</span><i class="mouse__info--i">{{ mouseInfo.birthDate ? `${weekAge}周${dayAge}天` : '' }}</i></p>
              <p class="mouse__info--p pos-r">
                <span class="mouse__info--span">标记:</span>
                <i v-if="mouseInfo.position === 'custom'" class="mouse__info--i">{{ mouseInfo.sign }}</i>
                <img v-else class="pos-a mouse__info-sign" :src="`http://bllb-animal-test.oss-cn-hangzhou.aliyuncs.com/mice-sign/${mouseInfo.filePrefix}/${mouseInfo.sign}.jpg`" alt="">
              </p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">出生日期:</span><i class="mouse__info--i">{{ mouseInfo.birthDate * 1000 | timeFormat('yyyy-MM-dd') }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">体重:</span><i class="mouse__info--i">{{ mouseInfo.weight }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">笼位号:</span><i class="mouse__info--i">{{ mouseInfo.cageNo }}</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">状态:</span><i class="mouse__info--i">{{ mouseInfo.miceStatusDesc }}</i></p>
              <p class="mouse__info--p df">
                <span class="mouse__info--span">显示颜色:</span>
                <i class="mouse__info--i dib" :style="{'width': '16px', 'height': '16px', 'backgroundColor': mouseInfo.miceColor}" />
              </p>
              <p class="mouse__info--p df">
                <span class="mouse__info--span">附件:</span>
                <view-files v-if="curMouseId" :id="curMouseId" biz-type="mice" />
                <upload-btn v-if="curMouseId && (isAdmin || activeName === 'myCage')" :id="curMouseId" biz-type="mice" class="dib" />
              </p>
            </div>

          </div>
          <div>
            <h6 class="mouse__info--h6">遗传信息</h6>
            <div class="df s-jcfs s-aic">
              <p class="mouse__info--p" style="width: 540px;">
                <span class="mouse__info--span">更改位置时间:</span>
                <i class="mouse__info--i">{{ mouseInfo.miceUpdateTime * 1000 | timeFormat('yyyy年MM月dd日 hh:mm:ss') }}</i>
              </p>
              <p class="mouse__info--p">
                <span class="mouse__info--span">小鼠家谱:</span>
                <show-family v-if="curMouseId" :mice-id="curMouseId" />
              </p>
            </div>
          </div>
        </div>
        <div class="mouse__info2 bg-white df s-fdc s-jcsb">
          <div>
            <h6 class="mouse__info--h6">实验信息</h6>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">实验组名称:</span><i class="mouse__info--i">{{ mouseExptInfo.experimentName }}</i></p>
              <p class="mouse__info--p" style="width: 205px;"><span class="mouse__info--span">起止时间:</span><i class="mouse__info--i">{{ mouseExptInfo.startTime * 1000 | timeFormat('yyyy.M.dd') }}-{{ mouseExptInfo.endTime * 1000 | timeFormat('yyyy.M.dd') }}</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">分组名称:</span><i class="mouse__info--i">{{ mouseExptInfo.sampleGroupName }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">处理:</span><i class="mouse__info--i">{{ mouseExptInfo.eventName }}</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p w-100"><span class="mouse__info--span">检测:</span><i class="mouse__info--i">{{ mouseExptInfo.testName }}</i></p>
            </div>
          </div>
          <div>
            <h6 class="mouse__info--h6">实验进度</h6>
            <div class="df s-jcsb s-aic mb8">
              <p class="mouse__info--p df">
                <span class="mouse__info--span">检测试验结果:</span>
                <view-files v-if="mouseExptInfo.experimentId" :id="mouseExptInfo.experimentId" biz-type="experiment" />
                <upload-btn v-if="mouseExptInfo.experimentId && (isAdmin || activeName === 'myCage')" :id="mouseExptInfo.experimentId" biz-type="experiment" class="dib" />
              </p>
              <p class="mouse__info--p">
                <i class="mouse__info--i mr20">
                  <svg-icon icon-class="circle" class="fs12 cl-green" />
                  处理时间
                </i>
                <i class="mouse__info--i">
                  <svg-icon icon-class="circle" class="fs12 cl-yellow" />
                  检测时间
                </i>
              </p>
            </div>
          </div>
          <div>
            <div v-if="Object.keys(mouseExptInfo).length > 0" class="pos-r">
              <el-tooltip v-for="item in mouseExptInfo.experimentTimes.filter(el=>{ return el.operationType === 1})" :key="item.time+item.operationType" effect="dark" :content="item.time * 1000 | timeFormat('yyyy-MM-dd hh:mm')" placement="top">
                <svg-icon icon-class="loc-green" class="mouse__progrTag mouse__progrTag--g" :style="{'left': setHandleTimeScale(item.time) + 'px'}" />
              </el-tooltip>
              <el-tooltip v-for="item in mouseExptInfo.experimentTimes.filter(el=>{ return el.operationType === 0})" :key="item.time+item.operationType" effect="dark" :content="item.time * 1000 | timeFormat('yyyy-MM-dd hh:mm')" placement="bottom">
                <svg-icon icon-class="loc-yellow" class="mouse__progrTag mouse__progrTag--y" :style="{'left': setTestTimeScale(item.time) + 'px'}" />
              </el-tooltip>
              <el-progress :text-inside="true" :stroke-width="24" :percentage="Number(percentage)" color="#58A2FB" />
            </div>
            <div class="df s-jcc s-aic mt30">
              <set-time v-if="mouseExptInfo.experimentId && (isAdmin || activeName === 'myCage')" :id="mouseExptInfo.experimentId" @done="setProgress" />
              <expt-record v-if="mouseExptInfo.experimentId" :id="mouseExptInfo.experimentId" class="ml16 w100" />
            </div>
          </div>
        </div>
      </div>
      <div class="mouse__info3 bg-white w-100 mt16">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我的鼠笼" name="myCage">
            <div class="df mb16">
              <add-cage-btn :disabled="isBuilding || isDeling" @done="getCageList" />
              <el-button class="w80 ml10" size="small" :disabled="isBuilding || isDeling" @click="moveCage()">{{ moveBtnText }}</el-button>
              <el-button class="w80" size="small" :disabled="isMoving || isBuilding || isDeling" @click="goAdd()">新建小鼠</el-button>
              <el-button class="w80" size="small" :disabled="isMoving || isDeling" @click="goBuild()">{{ buildBtnText }}</el-button>
              <el-button class="w80" type="primary" :disabled="isMoving || isBuilding" plain size="small" style="margin-right: 46px;" @click="goDel()">{{ delBtnText }}</el-button>
              <el-button class="w80" size="small" :disabled="isMoving || isBuilding || isDeling || (!curMouseId && !choosedCage)" @click="goEdit()">编辑</el-button>
              <el-button class="w80" size="small" @click="cancel()">取消</el-button>
            </div>
            <div class="df s-fwwp s-jcsa">
              <mouse-cage
                v-for="(item, index) in cageList"
                :key="index"
                :all-data="item"
                :is-active="isMoving || isBuilding&&(choosedCage === item.id) || isDeling"
                :disabled="(isMoving && transStep < 2 ) || (isBuilding&&(choosedCage !== item.id))"
                :choiced-list.sync="curCageMouseList"
                :is-choosing-cage="isChoosingCage"
                :cage-id="item.id"
                :choosed-cage.sync="choosedCage"
                :cur-mouse-id.sync="curMouseId"
                :cur-mouse.sync="mouseInfo"
                :cur-mouse-expt.sync="mouseExptInfo"
                @refresh="getCageList"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他鼠笼" name="otherCage">
            <div class="df s-fwwp s-jcsa">
              <mouse-cage
                v-for="(item, index) in cageList"
                :key="index"
                :shift="false"
                :all-data="item"
                :is-active="false"
                :disabled="false"
                :choiced-list.sync="curCageMouseList"
                :is-choosing-cage="isChoosingCage"
                :cage-id="item.id"
                :choosed-cage.sync="choosedCage"
                :cur-mouse-id.sync="curMouseId"
                :cur-mouse.sync="mouseInfo"
                :cur-mouse-expt.sync="mouseExptInfo"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </main-box>
    <!-- 编辑鼠笼 -->
    <el-dialog
      title="编辑"
      :visible.sync="cageDialog"
      width="433px"
    >
      <div class="mouse__cageDialog">
        <el-form ref="editCageForm" :model="editCageForm" label-position="left" size="mini">
          <el-form-item
            label="笼位号:"
            label-width="80px"
            class="mb8"
            prop="cageNo"
            :rules="[
              { required: true, message: '笼位号不能为空'}
            ]"
          >
            <el-input
              v-model="editCageForm.cageNo"
              placeholder="请输入笼位号"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="房间号:"
            label-width="80px"
            class="mb8"
            prop="roomNo"
          >
            <el-input
              v-model="editCageForm.roomNo"
              placeholder="请输入房间号"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="架号:"
            label-width="80px"
            class="mb8"
            prop="shelvesNo"
          >
            <el-input
              v-model="editCageForm.shelvesNo"
              placeholder="请输入架号"
              class="w250"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cageDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="editCageSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MouseCage from '@/components/MouseCage'
import Guide from '@/components/Guide'
import ViewFiles from '@/components/Dialogs/ViewFiles'
import ShowFamily from '@/components/Dialogs/cpt_show_family'
import AddCageBtn from '@/components/Dialogs/cpt_add_cage'
import UploadBtn from '@/components/Dialogs/cpt_upload'
import ExptRecord from '@/components/Dialogs/ExptRecord'
import SetTime from '@/components/Dialogs/cpt_set_time'
import { transferCage, editCage, delMiceByMiceId, fetchCageList, getMouseExpInfo } from '@/api/mouse'

export default {
  name: 'MouseMain',
  components: {
    MouseCage,
    AddCageBtn,
    ExptRecord,
    SetTime,
    Guide,
    ShowFamily,
    UploadBtn,
    ViewFiles
  },
  data() {
    return {
      isAdmin: false,
      curMouseId: null, // 当前选中小鼠的id
      mouseInfo: {},
      mouseExptInfo: {},
      testTimeScale: 0, // 测试时间标记
      handleTimeScale: 0, // 处理时间标记
      activeName: 'myCage', // 鼠笼tab
      color: '#C4C4CD',
      // 附件
      fileUrl: 'http://localhost/test.pdf',
      tableLoading: false,
      // 鼠笼列表
      cageList: [],
      cagePage: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      // 移笼相关
      transStep: 0, // 移笼步骤操作节点
      moveBtnText: '移笼',
      isMoving: false, // 正在移笼标识
      isChoosingCage: false, // 正在选鼠笼标识
      curCageMouseList: {}, // 当前鼠笼中选中小鼠列表
      cacheChoicedList: [], // 缓存选中鼠笼中小鼠列表
      choicedList: [], // 当前选中的小鼠列表
      choosedCage: null, // 当前选中的鼠笼id
      // 新建子鼠
      buildStep: 0, // 新建子鼠步骤操作节点
      buildBtnText: '新建子鼠',
      isBuilding: false, // 正在新建子鼠标识
      // 删除小鼠
      delBtnText: '移除小鼠',
      isDeling: false, // 正在删除小鼠标识
      // 编辑鼠笼
      cageDialog: false,
      editCageForm: {
        cageNo: '',
        roomNo: '',
        shelvesNo: ''
      }
    }
  },
  computed: {
    // 周龄，不存数据库
    weekAge() {
      if (!this.mouseInfo.birthDate) return 0
      const duration = +new Date() - this.mouseInfo.birthDate * 1000
      const weeks = duration / 1000 / 60 / 60 / 24 / 7
      return Math.floor(weeks)
    },
    // 天
    dayAge() {
      if (!this.mouseInfo.birthDate) return 0
      const duration = +new Date() - this.mouseInfo.birthDate * 1000
      const days = duration / 1000 / 60 / 60 / 24 % 7
      return Math.floor(days) + 1
    },
    // 实验进度
    percentage() {
      if (!this.mouseExptInfo.startTime || !this.mouseExptInfo.endTime) {
        return 0
      }
      // 总时间间距
      const start = this.mouseExptInfo.startTime * 1000
      const end = this.mouseExptInfo.endTime * 1000
      const duration = end - start
      const now = +new Date() > end ? end : +new Date()
      return (((now - start) / duration) * 100).toFixed(2)
    }
    /* // 测试时间进度
    testTimeScale() {
      console.log('=-#########=====', this.mouseExptInfo)
      // 总时间间距
      const start = this.mouseExptInfo.startTime * 1000
      const end = this.mouseExptInfo.endTime * 1000
      const duration = end - start
      const scale = (this.mouseExptInfo.testTime * 1000 - start) / duration
      return scale * 380
    },
    // 处理时间进度
    handleTimeScale() {
      console.log('=-=-=-=====', this.mouseExptInfo)
      // 总时间间距
      const start = this.mouseExptInfo.startTime * 1000
      const end = this.mouseExptInfo.endTime * 1000
      const duration = end - start
      const scale = (this.mouseExptInfo.handleTime * 1000 - start) / duration
      return scale * 380
    } */
  },
  watch: {
    'mouseExptInfo.experimentId'(n, o) {
      console.log('id变化了', n)
      // this.setTestTimeScale()
      // this.setHandleTimeScale()
    },
    // 监听每个鼠笼选中的小鼠，最后合并所有选中小鼠
    'curCageMouseList.mouses'(n, o) {
      if (!n) return // 如果mouses不存在，说明是清空，则不执行后续逻辑
      const _self = this
      let list = this.cacheChoicedList
      // 当前缓存的鼠笼里包含当前选中的鼠笼，即：有当前鼠笼了
      const hasThis = this.cacheChoicedList.filter((el) => {
        return el.cid === _self.curCageMouseList.cid
      }).length > 0

      if (hasThis) { // 把缓存的鼠笼删掉，后面重新塞入当前选中的鼠笼
        list = this.cacheChoicedList.filter((el) => {
          return el.cid !== _self.curCageMouseList.cid
        })
      }
      // 重新塞入鼠笼
      list.push(this.curCageMouseList)
      this.$set(this, 'cacheChoicedList', list)
      // 降维数组
      const allMouses = list.reduce(function(total, val, idx, arr) {
        return total.concat(val.mouses)
      }, [])
      this.choicedList = allMouses
    }
  },
  created() {
    this.isAdmin = this.$store.getters.info.admin
    this.getCageList()
  },
  methods: {
    setHandleTimeScale(time) {
      const start = this.mouseExptInfo.startTime * 1000
      const end = this.mouseExptInfo.endTime * 1000
      const duration = end - start
      const scale = (time * 1000 - start) / duration
      return (scale * 380).toFixed(2)
    },
    setTestTimeScale(time) {
      const start = this.mouseExptInfo.startTime * 1000
      const end = this.mouseExptInfo.endTime * 1000
      const duration = end - start
      const scale = (time * 1000 - start) / duration
      return (scale * 380).toFixed(2)
    },
    editCageSubmit() {
      this.$refs['editCageForm'].validate((valid) => {
        if (valid) {
          this.cageDialog = false
          // 提交成功后触发done
          const { id: userId } = this.$store.getters.info
          editCage(Object.assign(this.editCageForm, {
            id: this.choosedCage,
            operator: userId
          })).then((res) => {
            this.$message.success('编辑鼠笼成功')
          })
        } else {
          return false
        }
      })
      // 填充品系
    },
    // 编辑查看小鼠
    goEdit() {
      if (!this.curMouseId && this.choosedCage) { // 编辑鼠笼
        console.log(this.choosedCage)
        const curCage = this.cageList.filter((el) => {
          return el.id === this.choosedCage
        })[0]
        console.log(curCage)
        const { cageNo, roomNo, shelvesNo } = curCage
        this.editCageForm.cageNo = cageNo
        this.editCageForm.roomNo = roomNo
        this.editCageForm.shelvesNo = shelvesNo
        this.cageDialog = true
        return
      }
      if (this.curMouseId) { // 跳转小鼠编辑页
        const id = this.curMouseId
        this.$router.push({ name: 'mouseEdit', params: { id, canEdit: 1 }})
      }
    },
    // 新增小鼠
    goAdd(row) {
      this.goPage('addMouse', { id: 1 })
    },
    goPage(r, obj) {
      this.$router.push({ name: r, params: obj })
    },
    handleClick(tab, event) {
      console.log(tab, event)
      this.getCageList()
    },
    // 鼠笼列表
    getCageList() {
      this.tableLoading = true
      fetchCageList(Object.assign({
        operator: this.activeName === 'myCage' ? this.$store.getters.info.id : '',
        // current: this.cagePage.page,
        // size: this.cagePage.limit,
        isMy: this.activeName === 'myCage' ? 0 : 1
      })).then(response => {
        this.cageList = response.data.records
        this.cagePage.total = response.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    // 移笼操作
    moveCage() {
      // 选中了鼠笼后
      if (this.choosedCage && this.choicedList.length > 0) {
        this.$confirm('是否确认移笼?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doChageCage()
        }).catch(function() {
        })
        return
      }

      const noMouse = this.cageList.length === 0
      if (noMouse) { // 当前没老鼠
        this.$message({
          type: 'error',
          message: '系统中没有小鼠，请添加小鼠后进行操作'
        })
      } else {
        if (this.transStep === 0) {
          this.isMoving = true
          this.transStep = 1
          this.moveBtnText = '下一步'
          return
        }
        // 当前选中了小鼠
        if (this.transStep === 1 && this.choicedList.length > 0) {
          this.isChoosingCage = true
          this.transStep = 2
          this.$message({
            type: 'info',
            message: '请选择鼠笼'
          })
        }
        if (this.transStep === 1 && this.choicedList.length === 0) {
          this.$message({
            type: 'error',
            message: '请选择小鼠'
          })
        }
      }
    },
    // 确定移笼
    doChageCage() {
      const ids = this.choicedList.map(el => {
        return el.miceInfoId
      })
      transferCage({
        cageId: this.choosedCage,
        miceId: ids
      }).then((res) => {
        this.$set(this, 'choicedList', [])
        this.$set(this, 'cacheChoicedList', [])
        this.$set(this, 'curCageMouseList', {})

        this.cancel()
        this.getCageList()
      })
    },
    // 取消操作
    cancel() {
      this.moveBtnText = '移笼'
      this.isMoving = false
      this.transStep = 0
      this.buildStep = 0
      this.buildBtnText = '新增子鼠'
      this.isBuilding = false
      this.delBtnText = '移除小鼠'
      this.isDeling = false

      this.isChoosingCage = false
      // this.choicedList = []
      this.$set(this, 'choicedList', [])
      this.choosedCage = null
      this.curMouseId = null
      this.getCageList() // 为了规避多选框勾选没法取消的折中办法
    },
    // 新增子鼠操作
    goBuild(row) {
      // 如果没有选中鼠笼
      console.log(this.choosedCage, this.curCageMouseList, this.cageList, this.cacheChoicedList)
      if (!this.choosedCage) {
        this.$message({
          type: 'error',
          message: '请先选择鼠笼'
        })
      } else {
        // 如果当前鼠笼里没有小鼠(找到当前鼠笼，获取小鼠信息)
        const thisCageNoMouse = this.cageList.filter((el) => {
          return el.id === this.choosedCage
        })[0].miceInfoByMiceCageQueryVO.length === 0
        if (thisCageNoMouse) {
          this.$message({
            type: 'error',
            message: '当前鼠笼中没有小鼠，请添加小鼠后进行操作'
          })
          return
        }
        if (this.buildStep === 0) {
          this.isBuilding = true
          this.buildStep = 1
          this.buildBtnText = '下一步'
          return
        }

        // 当前选中了小鼠
        if (this.buildStep === 1 && this.choicedList.length > 0) {
          const genders = this.choicedList.map(el => {
            return el.gender
          })
          if (genders.length !== 2 || genders[0] === genders[1]) {
            this.$message({
              type: 'error',
              message: '请选择两只不同性别的小鼠'
            })
            return false
          }
          const curCage = this.cageList.filter((el) => {
            return el.id === this.choosedCage
          })
          const { cageNo, roomNo, shelvesNo } = curCage[0]
          this.$store.dispatch('app/cacheChildMouse', {
            parents: this.choicedList,
            cage: {
              cageNo,
              roomNo,
              shelvesNo
            }
          })
          this.goPage('addChild')
        }

        if (this.buildStep === 1 && this.choicedList.length === 0) {
          this.$message({
            type: 'error',
            message: '请选择小鼠'
          })
        }
      }
    },
    // 删除小鼠
    goDel(row) {
      if (this.isDeling) {
        // 当前选中了小鼠
        if (this.choicedList.length > 0) {
          console.log(this.choicedList)
          const miceIds = this.choicedList.map((el) => {
            return el.miceInfoId
          })
          console.log(miceIds)
          this.$confirm('是否确认删除小鼠?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log('提交删除')
            delMiceByMiceId({
              miceId: miceIds
            }).then((res) => {
              this.$message.success('删除小鼠成功')
              this.getCageList()
            })
            this.cancel()
          }).catch(function() {
          })
        } else {
          this.$message({
            type: 'error',
            message: '没有选中小鼠，请添加小鼠后进行操作'
          })
        }
      } else {
        this.delBtnText = '下一步'
        this.isDeling = true
      }
    },
    // 设置时间后修改进度条
    setProgress(obj) {
      getMouseExpInfo(this.curMouseId).then((res) => {
        console.log('getMouseExpInfo', res)
        this.$set(this, 'mouseExptInfo', res.data[0] || {})
      })
    }
  }
}
</script>

<style lang="scss">
  .mouse__info {
    &1{
      width: 680px;
      height: 352px;
      padding: 16px 24px;
    }
    &2{
      width: 428px;
      height: 352px;
      padding: 16px 24px;
    }
    &3{
      padding: 0 16px 16px;
    }
    &--h6{
      margin-bottom: 8px;
      font-size: 16px;
      color: #333;
    }
    &--p{
      width: 180px;
      font-size: 14px;
      // display: inline-block;
    }
    &--span {
      margin-right: 5px;
      color: #999;
    }
    &--i {
      color: #333;
    }
    &-sign {
      right: -20px;
      top: 0;
      width: 143px;
      height: 80px;
      border: 1px solid #F0F0F0;
    }
    .mouse__progrTag {
      position: absolute;
      z-index: 1;
      &--g{
        top: -12px;
      }
      &--y{
        bottom: -12px;
      }
    }
  }
</style>
