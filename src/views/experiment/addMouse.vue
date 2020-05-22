<template>
  <div class="mouse__info">
    <main-box class="bg-gray">
      <div class="df s-jcsb mt16">
        <div class="mouse__info1 bg-white df s-fdc s-jcsb">
          <div>
            <h6 class="mouse__info--h6">品系信息</h6>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">品系:</span><i class="mouse__info--i">{{ mouseInfo.varietiesName }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">毛色:</span><i class="mouse__info--i">{{ mouseInfo.color }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">饲养条件:</span><i class="mouse__info--i">{{ mouseInfo.miceCondition }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">健康状态:</span><i class="mouse__info--i">{{ mouseInfo.status }}</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">基因型:</span><i class="mouse__info--i">{{ mouseInfo.genotypes }}</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p w-100"><span class="mouse__info--span">应用领域:</span><i class="mouse__info--i">{{ mouseInfo.area }}</i></p>
            </div>
          </div>
          <div>
            <h6 class="mouse__info--h6">基本信息</h6>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">系统编号:</span><i class="mouse__info--i">{{ mouseInfo.miceInfoId }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">性别:</span><i class="mouse__info--i">{{ mouseInfo.gender === 0 ? '雌' : '雄' }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">周龄:</span><i class="mouse__info--i">{{ `${weekAge}周${dayAge}天` }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">标记:</span><i class="mouse__info--i">{{ mouseInfo.sign }}</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">出生日期:</span><i class="mouse__info--i">{{ mouseInfo.birthDate * 1000 | timeFormat('yyyy-MM-dd') }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">体重:</span><i class="mouse__info--i">{{ mouseInfo.weight }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">笼位号:</span><i class="mouse__info--i">10-01</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">状态:</span><i class="mouse__info--i">{{ mouseInfo.status }}</i></p>
              <p class="mouse__info--p df">
                <span class="mouse__info--span">显示颜色:</span>
                <i class="mouse__info--i dib" :style="{'width': '16px', 'height': '16px', 'backgroundColor': mouseInfo.miceColor}" />
              </p>
              <p class="mouse__info--p df">
                <span class="mouse__info--span">附件:</span>
                <view-files />
                <upload-btn class="dib" />
              </p>
            </div>

          </div>
          <div>
            <h6 class="mouse__info--h6">遗传信息</h6>
            <div class="df s-jcfs s-aic">
              <p class="mouse__info--p" style="width: 540px;">
                <span class="mouse__info--span">更改位置时间:</span>
                <i class="mouse__info--i">{{ mouseInfo.miceUpdateTime | timeFormat('yyyy年MM月dd日 hh:mm:ss') }}</i>
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
              <p class="mouse__info--p" style="width: 205px;"><span class="mouse__info--span">起止时间:</span><i class="mouse__info--i">{{ mouseExptInfo.startTime * 1000 | timeFormat('yyyy.MM.dd') }}-{{ mouseExptInfo.endTime * 1000 | timeFormat('yyyy.MM.dd') }}</i></p>
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
                <view-files />
                <upload-btn class="dib" />
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
            <div class="pos-r">
              <svg-icon icon-class="loc-green" class="mouse__progrTag mouse__progrTag--g" :style="{'left': handleTimeScale + 'px'}" />
              <svg-icon icon-class="loc-yellow" class="mouse__progrTag mouse__progrTag--y" :style="{'left': testTimeScale + 'px'}" />
              <el-progress :text-inside="true" :stroke-width="24" :percentage="percentage" color="#58A2FB" />
            </div>
            <div class="df s-jcc s-aic mt30">
              <expt-record />
            </div>
          </div>
        </div>
      </div>
      <div class="mouse__info3 bg-white w-100 mt16">
        <div class="df mb16">
          <el-button class="w80" size="small" @click="goBack()">返回</el-button>
          <el-button class="w80" size="small" @click="goAdd()">确认添加</el-button>
        </div>
        <div class="df s-fwwp s-jcsa">
          <mouse-cage
            v-for="(item, index) in cageList"
            :key="index"
            :need-type="needType"
            :all-data="item"
            :is-active="true"
            :choiced-list.sync="curCageMouseList"
            :is-choosing-cage="isChoosingCage"
            :cage-id="item.id"
            :choosed-cage.sync="choosedCage"
            :cur-mouse-id.sync="curMouseId"
            :cur-mouse.sync="mouseInfo"
            :cur-mouse-expt.sync="mouseExptInfo"
          />
        </div>
      </div>
    </main-box>
  </div>
</template>

<script>
import MouseCage from '@/components/MouseCage'
import ViewFiles from '@/components/Dialogs/ViewFiles'
import FileViewer from '@/components/FileViewer'
import ShowFamily from '@/components/Dialogs/cpt_show_family'
import AddCageBtn from '@/components/Dialogs/cpt_add_cage'
import UploadBtn from '@/components/Dialogs/cpt_upload'
import ExptRecord from '@/components/Dialogs/ExptRecord'
import MergeTable from '@/components/MergeTable'
import { recordOption } from './recordTable'
import { transferCage, delItemObj, getMouseExpInfo, delObj, fetchItemList, fetchCageList, putItemObj, putObj, recordList } from '@/api/mouse'

export default {
  name: 'MouseMain',
  components: {
    MergeTable,
    MouseCage,
    AddCageBtn,
    ExptRecord,
    FileViewer,
    ShowFamily,
    UploadBtn,
    ViewFiles
  },
  data() {
    return {
      curMouseId: null, // 当前选中小鼠的id
      mouseInfo: {},
      mouseExptInfo: {},
      activeName: 'first', // 鼠笼tab
      color: '#C4C4CD',
      // 附件
      fileUrl: 'http://localhost/test.pdf',
      // 查看记录
      recordDialog: false,
      recordList: [{
        type: 1,
        checkTime: 1587375335305,
        handleTime: 1587375335305,
        name: '张三'
      }],
      recordOption,
      page: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      tableLoading: false,
      // 鼠笼列表
      cageList: [],
      cagePage: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      isChoosingCage: false, // 正在选鼠笼标识
      curCageMouseList: {}, // 当前鼠笼中选中小鼠列表
      cacheChoicedList: [], // 缓存选中鼠笼中小鼠列表
      choicedList: [], // 当前选中的小鼠列表
      choosedCage: 0, // 当前选中的鼠笼id
      needType: null, // 区分实验组，繁育组
      item_index: null // 实验组的列表项id或者索引值
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
      return Math.floor(days)
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
      const now = +new Date()
      return ((now - start) / duration).toFixed(3) * 100

    },
    // 测试时间进度
    testTimeScale() {
      // 总时间间距
      const start = this.mouseExptInfo.startTime * 1000
      const end = this.mouseExptInfo.endTime * 1000
      const duration = end - start
      const scale = (this.mouseExptInfo.testTime * 1000 - start) / duration
      return scale * 380
    },
    // 处理时间进度
    handleTimeScale() {
      // 总时间间距
      const start = this.mouseExptInfo.startTime * 1000
      const end = this.mouseExptInfo.endTime * 1000
      const duration = end - start
      const scale = (this.mouseExptInfo.handleTime * 1000 - start) / duration
      return scale * 380
    }
  },
  watch: {
    // 监听每个鼠笼选中的小鼠，最后合并所有选中小鼠
    'curCageMouseList.mouses'(n, o) {
      const _self = this
      let list = this.cacheChoicedList
      const hasThis = this.cacheChoicedList.filter((el) => {
        return el.cid === _self.curCageMouseList.cid
      }).length > 0

      if (hasThis) {
        list = this.cacheChoicedList.filter((el) => {
          return el.cid !== _self.curCageMouseList.cid
        })
      }
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
    this.getCageList()
    this.needType = this.$route.params.type
    console.log('this.$route.params.index===', this.$route.params.index)
    if (typeof this.$route.params.index === 'number') { // 实验组会带一个列表项的id或者索引
      this.item_index = this.$route.params.index
    }
  },
  methods: {
    goBack() {
      console.log(this.$route)
      this.$router.back()
    },
    // 确认添加
    goAdd(row) {
      if (this.choicedList.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择小鼠'
        })
        return false
      }
      // 添加到繁育组操作
      if (this.needType === 'noBreed') {
        this.add2breed(this.choicedList)
      }
      // 添加到实验组操作
      if (this.needType === 'noExpt') {
        const { table: cacheExpt, form } = this.$store.getters.addingExpt
        const curExpt = cacheExpt[this.item_index]

        const newIds = this.choicedList.map(el => {
          return el.miceInfoId + ''
        })
        const ids = curExpt.experimentGroupSelectionMiceIds.concat(newIds)
        curExpt.experimentGroupSelectionMiceIds = ids

        cacheExpt[this.item_index] = curExpt
        this.$store.dispatch('app/cacheExpts', {
          form: form,
          table: cacheExpt
        })
        this.doAdd(this.choicedList)
      }
    },
    // 添加到繁育组
    add2breed(curMouses) {
      // 当前选中鼠笼中被选中的小鼠数
      const curCageMouse = curMouses.filter((el) => {
        return el.cid === this.choosedCage
      })
      const curCage = this.cageList.filter((el) => {
        return el.id === this.choosedCage
      })
      console.log('curMouses==', curMouses, 'curCageMouse==', curCageMouse, 'curCage==', curCage)
      // 选中了同一笼内的所有鼠
      if (curCageMouse.length === curCage[0].miceInfoByMiceCageQueryVO.length) {
        this.doAdd(curCageMouse)
        return false
      }
      // 选中同一鼠笼中部分小鼠
      // if (curCageMouse.length === curMouses.length && curCageMouse.length < curCage[0].miceInfoByMiceCageQueryVO.length) {}
      // 选择了不同笼内的小鼠
      this.$confirm('您当前所选的小鼠不符合繁育要求，请将选择空闲鼠笼进行移笼？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          name: 'mouseCage',
          params: {
            mouses: curMouses,
            type: 'breed'
          }
        })
      }).catch(function() {
      })
    },
    // 确认添加
    doAdd(mouseArr) {
      this.$store.dispatch('app/cacheChoosedMouse', mouseArr)
      this.goBack()
    },
    goPage(r, obj) {
      this.$router.push({ name: r, params: obj })
    },
    handleClick(tab, event) {
      console.log(tab, event)
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
    }
  },
  // 路由守卫，复用的页面，判断来源
  beforeRouteEnter(to, from, next) {
    console.log('enter====>', to, from)
    next(vm => {
      // 通过 `vm` 访问组件实例
      console.log('enter===next=>', to, from)
    })
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
      padding: 16px 16px 16px;
    }
    &--h6{
      margin-bottom: 8px;
      font-size: 16px;
      color: #333;
    }
    &--p{
      width: 180px;
      font-size: 14px;
    }
    &--span {
      margin-right: 5px;
      color: #999;
    }
    &--i {
      color: #333;
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
