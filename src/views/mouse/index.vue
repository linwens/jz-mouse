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
              <p class="mouse__info--p"><span class="mouse__info--span">系统编号:</span><i class="mouse__info--i">{{ mouseInfo.id }}</i></p>
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
                <svg-icon icon-class="upload" class="cp" />
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
                <el-button type="text" @click="showFamily()">查看</el-button>
              </p>
            </div>
          </div>
        </div>
        <div class="mouse__info2 bg-white df s-fdc s-jcsb">
          <div>
            <h6 class="mouse__info--h6">实验信息</h6>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">实验组名称:</span><i class="mouse__info--i">{{ mouseExptInfo.experimentName }}</i></p>
              <p class="mouse__info--p" style="width: 205px;"><span class="mouse__info--span">起止时间:</span><i class="mouse__info--i">{{ mouseExptInfo.startTime * 1000 | timeFormat('yyyy年MM月dd日 hh:mm:ss') }} - {{ mouseExptInfo.endTime * 1000 | timeFormat('yyyy年MM月dd日 hh:mm:ss') }}</i></p>
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
                <svg-icon icon-class="upload" />
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
              <svg-icon icon-class="loc-green" class="mouse__progrTag mouse__progrTag--g" :style="{'left': '20px'}" />
              <svg-icon icon-class="loc-yellow" class="mouse__progrTag mouse__progrTag--y" :style="{'left': '50px'}" />
              <el-progress :text-inside="true" :stroke-width="24" :percentage="45" color="#58A2FB" />
            </div>
            <div class="df s-jcc s-aic mt30">
              <el-button size="small" class="w100" @click="setTimeDialog = true">设置时间</el-button>
              <expt-record />
            </div>
          </div>
        </div>
      </div>
      <div class="mouse__info3 bg-white w-100 mt16">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我的鼠笼" name="first">
            <div class="df mb16">
              <add-cage-btn :disabled="isBuilding || isDeling" @done="getCageList" />
              <el-button class="w80 ml10" size="small" :disabled="isBuilding || isDeling" @click="moveCage()">{{ moveBtnText }}</el-button>
              <el-button class="w80" size="small" :disabled="isMoving || isBuilding || isDeling" @click="goAdd()">新建小鼠</el-button>
              <el-button class="w80" size="small" :disabled="isMoving || isDeling" @click="goBuild()">{{ buildBtnText }}</el-button>
              <el-button class="w80" type="primary" :disabled="isMoving || isBuilding" plain size="small" style="margin-right: 46px;" @click="goDel()">{{ delBtnText }}</el-button>
              <el-button class="w80" size="small" :disabled="isMoving || isBuilding || isDeling">编辑</el-button>
              <el-button class="w80" size="small" @click="cancel()">取消</el-button>
            </div>
            <div class="df s-fwwp s-jcsa">
              <mouse-cage
                v-for="(item, index) in cageList"
                :key="index"
                :all-data="item"
                :is-active="isMoving || isBuilding&&(choosedCage === item.id) || isDeling"
                :disabled="isBuilding&&(choosedCage !== item.id)"
                :choiced-list.sync="curCageMouseList"
                :is-choosing-cage="isChoosingCage"
                :cage-id="item.id"
                :choosed-cage.sync="choosedCage"
                :cur-mouse.sync="mouseInfo"
                :cur-mouse-expt.sync="mouseExptInfo"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他鼠笼" name="second">
            其他鼠笼
          </el-tab-pane>
        </el-tabs>
      </div>
    </main-box>
    <!-- 设置时间弹窗 -->
    <el-dialog
      title="设置时间"
      :visible.sync="setTimeDialog"
      width="500px"
    >
      <div>
        <el-form ref="setTimeForm" :model="setTimeForm" label-position="left" size="mini">
          <el-form-item
            label="类型:"
            label-width="80px"
            class="mb8"
            prop="tags"
          >
            <el-select
              v-model="setTimeForm.type"
              placeholder="请选择类型"
              size="small"
              class="w250"
            >
              <el-option label="检测时间" :value="1" />
              <el-option label="处理时间" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="时间:"
            label-width="80px"
            class="w250"
          >
            <div class="df s-jcsb w250">
              <el-form-item prop="handleDate" class="mb0">
                <el-date-picker
                  v-model="setTimeForm.handleDate"
                  class="mb0"
                  style="width: 133px;"
                  size="small"
                  type="date"
                  placeholder="选择日期"
                />
              </el-form-item>
              <el-form-item prop="handleTime" class="mb0">
                <el-time-picker
                  v-model="setTimeForm.handleTime"
                  style="width: 113px;"
                  size="small"
                  placeholder="选择时间"
                />
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="setTimeDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="setTime()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看记录弹窗 -->
    <el-dialog
      title="查看记录"
      :visible.sync="recordDialog"
      width="850px"
    >
      <merge-table
        ref="crud"
        :page="page"
        :data="recordList"
        :table-option="recordOption"
        :table-loading="tableLoading"
      >
        <template slot="menu" slot-scope="{scope}">
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
    </el-dialog>
    <!-- 家谱弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <family-tree />
    </el-dialog>
  </div>
</template>

<script>
import MouseCage from '@/components/MouseCage'
import Guide from '@/components/Guide'
import ViewFiles from '@/components/Dialogs/ViewFiles'
import FileViewer from '@/components/FileViewer'
import FamilyTree from '@/components/Charts/FamilyTree'
import AddCageBtn from '@/components/Dialogs/cpt_add_cage'
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
    Guide,
    FileViewer,
    FamilyTree,
    ViewFiles
  },
  data() {
    return {
      mouseInfo: {},
      mouseExptInfo: {},
      activeName: 'first', // 鼠笼tab
      color: '#C4C4CD',
      // 家谱
      dialogVisible: false,
      // 附件
      fileUrl: 'http://localhost/test.pdf',
      // 设置时间
      setTimeDialog: false,
      setTimeForm: {
        type: 1,
        date: 1587375335305,
        time: 1587375335305
      },
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
      // 移笼相关
      moveBtnText: '移笼',
      isMoving: false, // 正在移笼标识
      isChoosingCage: false, // 正在选鼠笼标识
      curCageMouseList: {}, // 当前鼠笼中选中小鼠列表
      cacheChoicedList: [], // 缓存选中鼠笼中小鼠列表
      choicedList: [], // 当前选中的小鼠列表
      choosedCage: null, // 当前选中的鼠笼id
      // 新建子鼠
      buildBtnText: '新建子鼠',
      isBuilding: false, // 正在新建子鼠标识
      // 删除小鼠
      delBtnText: '移除小鼠',
      isDeling: false // 正在删除小鼠标识

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
  },
  methods: {
    // 展示家谱
    showFamily() {
      this.dialogVisible = true
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
    },
    // 移笼操作
    moveCage() {
      console.log(this.choosedCage)
      // 选中了鼠笼后
      if (this.choosedCage) {
        if (this.choicedList.length === 0) {
          this.$message({
            type: 'error',
            message: '请选择小鼠'
          })
          return false
        }
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
        this.isMoving = true
        this.moveBtnText = '下一步'
        // 当前选中了小鼠
        if (this.choicedList.length > 0) {
          console.log(this.choicedList)
          this.isChoosingCage = true
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
        console.log('移笼成功')
        this.cancel()
        this.getCageList()
      })
    },
    // 取消操作
    cancel() {
      this.moveBtnText = '移笼'
      this.isMoving = false
      this.buildBtnText = '新增子鼠'
      this.isBuilding = false
      this.delBtnText = '移除小鼠'
      this.isDeling = false

      this.isChoosingCage = false
      this.choicedList = []
      this.choosedCage = null
    },
    // 新增子鼠操作
    goBuild(row) {
      // 如果没有选中鼠笼
      if (!this.choosedCage) {
        this.$message({
          type: 'error',
          message: '请先选择鼠笼'
        })
      } else {
        this.buildBtnText = '下一步'
        this.isBuilding = true
        // 当前选中了小鼠
        if (this.choicedList.length > 0) {
          console.log(this.choicedList)
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
          console.log('curCage==', curCage)
          const { cageNo, roomNo, shelvesNo } = curCage[0]
          this.goPage('addChild', {
            parents: this.choicedList,
            cage: {
              cageNo,
              roomNo,
              shelvesNo
            }
          })
        } else {
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
          this.$confirm('是否确认删除小鼠?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log('提交删除')
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
