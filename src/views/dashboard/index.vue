<template>
  <div>
    <main-box class="home pos-r p0">
      <!-- <div class="home__top-slot df s-jcc s-aic">
        <p class="df s-jcc s-aic"><i style="background-color: #9A68B4;" />雌鼠</p>
        <p class="df s-jcc s-aic mr16"><i style="background-color: #58A2FB;" />雄鼠</p>
      </div> -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的小鼠" name="mine">
          <div v-if="activeName === 'mine'" class="bg-gray">
            <sum-bar id="1" :show="activeName === 'mine'" :type="barType" />
          </div>
          <div class="mt20 mb12 pl16 pr16">
            <el-form ref="myMouseForm" :model="myMouseForm" size="small" label-width="95px" label-position="left">
              <el-button type="primary" size="small" class="w70" @click="reset">重置</el-button>
              <el-select
                v-model="myMouseForm.operator"
                clearable
                placeholder="负责人"
                size="small"
                class="w104"
              >
                <el-option
                  v-for="item in persons"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                />
              </el-select>
              <el-select
                v-model="myMouseForm.varietiesId"
                clearable
                placeholder="品系"
                size="small"
                class="w104"
              >
                <el-option
                  v-for="item in varietiesOpts"
                  :key="item.id"
                  :label="item.varietiesName"
                  :value="item.id"
                />
              </el-select>
              <el-select
                v-model="myMouseForm.genotypes"
                clearable
                placeholder="基因型"
                size="small"
                class="w104"
              >
                <el-option
                  v-for="item in genesOpts"
                  :key="item.id"
                  :label="item.geneName"
                  :value="item.id"
                />
              </el-select>
              <el-select
                v-model="myMouseForm.pureHeterozygote"
                clearable
                placeholder="纯/杂合子"
                size="small"
                class="w104"
              >
                <el-option label="纯合子" :value="0" />
                <el-option label="杂合子" :value="1" />
                <el-option label="未测试" :value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.gender"
                clearable
                placeholder="性别"
                size="small"
                class="w80"
              >
                <el-option label="雌" :value="1" />
                <el-option label="雄" :value="0" />
              </el-select>
              <el-select
                v-model="myMouseForm.status"
                clearable
                placeholder="状态"
                size="small"
                class="w80"
              >
                <el-option label="闲置" :value="1" />
                <el-option label="繁育" :value="2" />
                <el-option label="实验" :value="3" />
                <el-option label="手动处死" :value="4" />
                <el-option label="实验处死" :value="5" />
              </el-select>
              <el-select
                v-model="weekRange"
                clearable
                placeholder="周龄"
                size="small"
                class="w104"
                @change="selectWeekRange"
              >
                <el-option label="4周以下" :value="JSON.stringify([null, 4])" />
                <el-option label="4-8周" :value="JSON.stringify([4, 8])" />
                <el-option label="8-12周" :value="JSON.stringify([8, 12])" />
                <el-option label="12周以上" :value="JSON.stringify([12, null])" />
                <el-option label="自定义" value="custom" />
              </el-select>
              <span v-if="weekRange === 'custom'" class="fs12">自定义周龄：{{ weekRangeForm.startWeek }}-{{ weekRangeForm.endWeek }}周</span>
            </el-form>
            <p class="mt12 fs14 cl-grey-9">总计：<span class="cl-black">{{ page.total }} 条数据</span></p>
          </div>
          <div class="bd-gray ml16 mr16 mb20">
            <merge-table
              ref="crud"
              :page="page"
              :data="tableData"
              :table-option="tableOption"
              :table-loading="tableLoading"
              @on-load="getList"
              @refresh-change="handleRefreshChange"
            >
              <template slot="operator" slot-scope="{scope}">
                <span>{{ persons.filter(el => {return el.userId === scope.row.operator })[0].userName }}</span>
              </template>
              <template slot="birthDate" slot-scope="{scope}">
                <span>{{ calcWeek(scope.row.birthDate) }}</span>
              </template>
              <template slot="status" slot-scope="{scope}">
                <span v-if="scope.row.status === 1" class="isIdle">闲置</span>
                <span v-else-if="scope.row.status === 2" class="isBreed">繁育</span>
                <span v-else-if="scope.row.status === 3" class="isExpt">实验</span>
                <span v-else-if="scope.row.status === 4">手动处死</span>
                <span v-else-if="scope.row.status === 5">实验处死</span>
                <span v-else>无</span>
              </template>
              <template slot="family" slot-scope="{scope}">
                <show-family :mice-id="scope.row.id" />
              </template>
              <template slot="rslt" slot-scope="scope">
                <view-files />
              </template>
            </merge-table>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`实验室${barTypeBtn === '人员' ? '小鼠' : '人员'}`" name="expt">
          <div v-if="activeName === 'expt'">
            <sum-bar id="2" :show="activeName === 'expt'" :type="barType">
              <template slot="posaEle">
                <el-button type="primary" size="mini" class="pos-a home__sum-bar-btn" @click="changeMan()">{{ barTypeBtn }}</el-button>
              </template>
            </sum-bar>
          </div>
          <div class="mt20 mb12 pl16 pr16">
            <el-form ref="exptMouseForm" :model="exptMouseForm" size="small" label-width="95px" label-position="left">
              <el-button type="primary" size="small" class="w70" @click="reset">重置</el-button>
              <el-select
                v-model="exptMouseForm.operator"
                clearable
                placeholder="负责人"
                size="small"
                class="w104"
              >
                <el-option
                  v-for="item in persons"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                />
              </el-select>
              <el-select
                v-model="exptMouseForm.varietiesId"
                clearable
                placeholder="品系"
                size="small"
                class="w104"
              >
                <el-option
                  v-for="item in varietiesOpts"
                  :key="item.id"
                  :label="item.varietiesName"
                  :value="item.id"
                />
              </el-select>
              <el-select
                v-model="exptMouseForm.genotypes"
                clearable
                placeholder="基因型"
                size="small"
                class="w104"
              >
                <el-option
                  v-for="item in genesOpts"
                  :key="item.id"
                  :label="item.geneName"
                  :value="item.id"
                />
              </el-select>
              <el-select
                v-model="exptMouseForm.pureHeterozygote"
                clearable
                placeholder="纯/杂合子"
                size="small"
                class="w104"
              >
                <el-option label="纯合子" :value="0" />
                <el-option label="杂合子" :value="1" />
                <el-option label="未测试" :value="2" />
              </el-select>
              <el-select
                v-model="exptMouseForm.gender"
                clearable
                placeholder="性别"
                size="small"
                class="w80"
              >
                <el-option label="雌" :value="1" />
                <el-option label="雄" :value="0" />
              </el-select>
              <el-select
                v-model="exptMouseForm.status"
                clearable
                placeholder="状态"
                size="small"
                class="w80"
              >
                <el-option label="闲置" :value="1" />
                <el-option label="繁育" :value="2" />
                <el-option label="实验" :value="3" />
                <el-option label="手动处死" :value="4" />
                <el-option label="实验处死" :value="5" />
              </el-select>
              <el-select
                v-model="weekRange"
                clearable
                placeholder="周龄"
                size="small"
                class="w104"
                @change="selectWeekRange"
              >
                <el-option label="4周以下" :value="JSON.stringify([null, 4])" />
                <el-option label="4-8周" :value="JSON.stringify([4, 8])" />
                <el-option label="8-12周" :value="JSON.stringify([8, 12])" />
                <el-option label="12周以上" :value="JSON.stringify([12, null])" />
                <el-option label="自定义" value="custom" />
              </el-select>
            </el-form>
            <p class="mt12 fs14 cl-grey-9">总计：<span class="cl-black">{{ page.total }} 条数据</span></p>
          </div>
          <div class="bd-gray ml16 mr16 mb20">
            <merge-table
              ref="crud"
              :page="page"
              :data="tableData"
              :table-option="tableOption"
              :table-loading="tableLoading"
              :on-load="getList"
              @refresh-change="handleRefreshChange"
            >
              <template slot="status" slot-scope="{scope}">
                <span v-if="scope.row.status === 0" class="isIdle">闲置</span>
                <span v-else-if="scope.row.status === 1" class="isExpt">实验</span>
                <span v-else class="isBreed">繁育</span>
              </template>
              <template slot="family" slot-scope="{scope}">
                <show-family :mice-id="scope.row.id" />
              </template>
              <template slot="rslt" slot-scope="scope">
                <view-files />
              </template>
            </merge-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </main-box>
    <!-- 自定义周龄 -->
    <el-dialog
      title="选择周龄"
      :visible.sync="weekRangeDialog"
      append-to-body
      width="500px"
    >
      <div>
        <el-form ref="weekRangeForm" :model="weekRangeForm" label-position="left" size="mini">
          <el-form-item label="周龄:" class="mb9">
            <el-input
              v-model="weekRangeForm.startWeek"
              placeholder="0"
              class="w80"
            />周
            <span class="ml8">至</span>
            <el-input
              v-model="weekRangeForm.endWeek"
              placeholder="0"
              class="w80"
            />周
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="weekRangeDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="okRange()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <guide :text="'展示引导'" /> -->
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import ViewFiles from '@/components/Dialogs/ViewFiles'
import { tableOption } from './table'
import { fetchList, getUsers } from '@/api/home'
import { varietiesList } from '@/api/variety'
import { getLisByVariety } from '@/api/genes'

import Guide from '@/components/Guide'
import SumBar from '@/components/Charts/SumBar'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    MergeTable,
    Guide,
    ViewFiles,
    SumBar
  },
  data() {
    return {
      // 关于周龄
      weekRange: [],
      weekRangeDialog: false,
      weekRangeForm: {
        startWeek: 0,
        endWeek: 0
      },
      // 筛选条件
      myMouseForm: { // 我的小鼠
        gender: null,
        pureHeterozygote: null,
        status: null,
        varietiesId: null,
        operator: null,
        genotypes: null,
        startTime: null,
        endTime: null
      },
      exptMouseForm: { // 实验室小鼠
        gender: null,
        pureHeterozygote: null,
        status: null,
        varietiesId: null,
        operator: null,
        genotypes: null,
        startTime: null,
        endTime: null
      },
      activeName: 'mine',
      barType: 'currentVarieties',
      barTypeBtn: '人员',
      tableOption,
      tableLoading: false,
      page: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      tableData: [],
      persons: [], // 负责人选择项
      varietiesOpts: [], // 品系选择项
      genesOpts: [] // 基因型选择项
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    'myMouseForm.varietiesId'(n, o) {
      // 基因型列表
      if (!n) {
        this.genesOpts = []
        this.getList()
        return
      }
      getLisByVariety({
        id: n
      }).then((res) => {
        this.genesOpts = res.data
      })
      this.getList()
    },
    'myMouseForm.genotypes'(n, o) {
      this.getList()
    },
    'myMouseForm.gender'(n, o) {
      this.getList()
    },
    'myMouseForm.pureHeterozygote'(n, o) {
      this.getList()
    },
    'myMouseForm.status'(n, o) {
      this.getList()
    },
    'myMouseForm.operator'(n, o) {
      this.getList()
    },
    'exptMouseForm.varietiesId'(n, o) {
      // 基因型列表
      if (!n) {
        this.genesOpts = []
        this.getList()
        return
      }
      getLisByVariety({
        id: n
      }).then((res) => {
        this.genesOpts = res.data
      })
      this.getList()
    },
    'exptMouseForm.genotypes'(n, o) {
      this.getList()
    },
    'exptMouseForm.gender'(n, o) {
      this.getList()
    },
    'exptMouseForm.pureHeterozygote'(n, o) {
      this.getList()
    },
    'exptMouseForm.status'(n, o) {
      this.getList()
    },
    'exptMouseForm.operator'(n, o) {
      this.getList()
    }
  },
  created() {
    this.getPersons()
    // this.myMouseForm.operator = this.$store.getters.info.id
    // 获取品系
    varietiesList().then(res => {
      this.$set(this, 'varietiesOpts', res.data.records)
    }).finally(() => {
      this.tableLoading = false
    })
  },
  methods: {
    // 重置筛选条件
    reset() {
      const MAP = {
        mine: 'myMouseForm',
        expt: 'exptMouseForm'
      }
      const obj = this[MAP[this.activeName]]
      for (const key of Object.keys(obj)) {
        if (this.activeName === 'mine' && key !== 'operator') {
          obj[key] = null
        }
        if (this.activeName === 'expt' && key !== 'status') {
          obj[key] = null
        }
      }
      // 清空周龄
      this.$set(this, 'weekRange', [])
      this.getList()
    },
    // 选择周龄范围
    selectWeekRange(val) {
      const MAP = {
        mine: 'myMouseForm',
        expt: 'exptMouseForm'
      }
      console.log('========', val)
      if (val === 'custom') {
        this.weekRangeDialog = true
      } else {
        if (!val) {
          this[MAP[this.activeName]].startTime = null
          this[MAP[this.activeName]].endTime = null
          this.getList()
          return
        }
        const parseVal = JSON.parse(val)
        // 注意周龄是到今天算的，所以后面的值算开始时间
        this[MAP[this.activeName]].startTime = parseVal[1] ? parseVal[1] : 0
        this[MAP[this.activeName]].endTime = parseVal[0] ? parseVal[0] : 0
        this.getList()
      }
    },
    // 确定周龄范围
    okRange() {
      const MAP = {
        mine: 'myMouseForm',
        expt: 'exptMouseForm'
      }
      if (!this.weekRangeForm.startWeek && !this.weekRangeForm.endWeek) {
        this.$message.error('至少输入一个值')
      } else if (this.weekRangeForm.startWeek > this.weekRangeForm.endWeek) {
        this.$message.error('起始周龄不得大于结束周龄')
      } else {
        const { startWeek, endWeek } = this.weekRangeForm
        this[MAP[this.activeName]].startTime = endWeek
        this[MAP[this.activeName]].endTime = startWeek
        this.getList()
        this.weekRangeDialog = false
      }
    },
    // 获取负责人列表
    getPersons() {
      getUsers().then((res) => {
        this.$set(this, 'persons', res.data)
      })
    },
    handleClick(tab, event) {
      console.log(tab, this.activeName)
      this.barType = this.activeName === 'mine' ? 'currentVarieties' : 'allVarieties'
      this.getList()
    },
    handleRefreshChange() {
      this.getList()
    },
    // 获取列表
    getList() {
      const params = this.activeName === 'mine' ? this.myMouseForm : this.exptMouseForm
      this.tableLoading = true
      fetchList(Object.assign({}, params, {
        current: this.page.page,
        size: this.page.limit
      })).then(res => {
        this.tableData = res.data.records
        this.page.total = res.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    // 计算周龄
    calcWeek(birthDate) {
      if (!birthDate) {
        return '0周0天'
      }
      const duration = +new Date() - birthDate * 1000
      const weeks = Math.floor(duration / 1000 / 60 / 60 / 24 / 7)
      const days = Math.floor(duration / 1000 / 60 / 60 / 24 % 7)

      return `${weeks}周${days}天`
    },
    // 实验小鼠柱状图，切换负责人
    changeMan() {
      this.barTypeBtn = this.barTypeBtn === '人员' ? '基因型' : '人员'
      this.barType = this.barType === 'operator' ? 'allVarieties' : 'operator'
    }
  }
}
</script>

<style lang="scss">
  .home {
    &__sum-bar-btn {
      left: 22px;
      bottom: 40px;
      z-index: 2;
    }

    &__top-slot {
      position: absolute;
      top: 0;
      right: 0;
      height: 55px;
      line-height: 55px;
      font-size: 14px;

      p:nth-child(1) {
        margin-right: 24px;
      }
      i {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
    }
    .el-tabs__header {
      padding: 0 16px;
    }

    .w104{
      width: 104px;
    }
    .isIdle{
      &::before {
        content: '●';
        color: #F6AC2D
      }
    }
    .isExpt{
      &::before {
        content: '●';
        color: #58A2FB;
      }
    }
    .isBreed{
      &::before {
        content: '●';
        color: #00CB7C;
      }
    }
  }
</style>
