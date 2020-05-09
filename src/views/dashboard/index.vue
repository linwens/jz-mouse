<template>
  <div>
    <main-box class="home pos-r p0">
      <div class="home__top-slot df s-jcc s-aic">
        <p class="df s-jcc s-aic"><i style="background-color: #9A68B4;" />雌鼠</p>
        <p class="df s-jcc s-aic mr16"><i style="background-color: #58A2FB;" />雄鼠</p>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的小鼠" name="first">
          <div v-if="activeName === 'first'" class="bg-gray">
            <sum-bar id="1" :show="activeName === 'first'" />
          </div>
          <div class="mt20 mb12 pl16 pr16">
            <el-form ref="myMouseForm" :model="myMouseForm" size="small" label-width="95px" label-position="left">
              <el-button type="primary" size="small" class="w70">重置</el-button>
              <el-select
                v-model="myMouseForm.operator"
                placeholder="负责人"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.varietiesId"
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
                placeholder="性别"
                size="small"
                class="w80"
              >
                <el-option label="雌" :value="1" />
                <el-option label="雄" :value="0" />
              </el-select>
              <el-select
                v-model="myMouseForm.status"
                placeholder="状态"
                size="small"
                class="w80"
              >
                <el-option label="无" :value="0" />
                <el-option label="闲置" :value="1" />
                <el-option label="繁育" :value="2" />
                <el-option label="实验" :value="3" />
                <el-option label="手动处死" :value="4" />
                <el-option label="实验处死" :value="5" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="周龄"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
            </el-form>
            <p class="mt12 fs14 cl-grey-9">总计：<span class="cl-black">{{ 120 }} 条数据</span></p>
          </div>
          <div class="bd-gray ml16 mr16">
            <merge-table
              ref="crud"
              :page="page"
              :data="tableData"
              :table-option="tableOption"
              :table-loading="tableLoading"
              @on-load="getList"
              @refresh-change="handleRefreshChange"
            >
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
              <template slot="rslt" slot-scope="scope">
                <el-button type="text" @click="dialogVisible = true">查看</el-button>
              </template>
              <template slot="menu" slot-scope="scope">
                <file-viewer :file-url="fileUrl" />
              </template>
            </merge-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="实验室小鼠" name="second">
          <div v-if="activeName === 'second'">
            <sum-bar id="2" :show="activeName === 'second'">
              <template slot="posaEle">
                <el-button type="primary" size="mini" class="pos-a home__sum-bar-btn" @click="changeMan()">人员</el-button>
              </template>
            </sum-bar>
          </div>
          <div class="mt20 mb12 pl16 pr16">
            <el-form ref="myMouseForm" :model="myMouseForm" size="small" label-width="95px" label-position="left">
              <el-button type="primary" size="small" class="w70">重置</el-button>
              <el-select
                v-model="myMouseForm.operator"
                placeholder="负责人"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.varietiesId"
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
                placeholder="性别"
                size="small"
                class="w80"
              >
                <el-option label="雌" :value="1" />
                <el-option label="雄" :value="0" />
              </el-select>
              <el-select
                v-model="myMouseForm.status"
                placeholder="状态"
                size="small"
                class="w80"
              >
                <el-option label="无" :value="0" />
                <el-option label="闲置" :value="1" />
                <el-option label="繁育" :value="2" />
                <el-option label="实验" :value="3" />
                <el-option label="手动处死" :value="4" />
                <el-option label="实验处死" :value="5" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="周龄"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
            </el-form>
            <p class="mt12 fs14 cl-grey-9">总计：<span class="cl-black">{{ 120 }} 条数据</span></p>
          </div>
          <div class="bd-gray ml16 mr16">
            <merge-table
              ref="crud"
              :page="page"
              :data="tableData"
              :table-option="tableOption"
              :table-loading="tableLoading"
              @on-load="getList"
              @refresh-change="handleRefreshChange"
            >
              <template slot="status" slot-scope="{scope}">
                <span v-if="scope.row.status === 0" class="isIdle">闲置</span>
                <span v-else-if="scope.row.status === 1" class="isExpt">实验</span>
                <span v-else class="isBreed">繁育</span>
              </template>
              <template slot="rslt" slot-scope="scope">
                <el-button type="text" @click="dialogVisible = true">查看</el-button>
              </template>
              <template slot="menu" slot-scope="scope">
                <file-viewer :file-url="fileUrl" />
              </template>
            </merge-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </main-box>

    <guide :text="'展示引导'" />
    <!-- 家谱弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <family-tree />
    </el-dialog>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import { tableOption } from './table'
import { addItemObj, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj } from '@/api/home'
import { varietiesList } from '@/api/variety'
import { getLisByVariety } from '@/api/genes'

import Guide from '@/components/Guide'
import FileViewer from '@/components/FileViewer'
import FamilyTree from '@/components/Charts/FamilyTree'
import SumBar from '@/components/Charts/SumBar'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    MergeTable,
    Guide,
    FileViewer,
    FamilyTree,
    SumBar
  },
  data() {
    return {
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
        status: 3,
        varietiesId: null,
        operator: null,
        genotypes: null,
        startTime: null,
        endTime: null
      },
      activeName: 'first',
      tabsSum: [10, 22, 123], // 不同信息条数
      tableOption,
      tableLoading: false,
      page: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      tableData: [],
      varietiesOpts: [], // 品系选择项
      genesOpts: [], // 基因型选择项



      dialogVisible: false,
      fileUrl: 'http://localhost/test.pdf'
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
      getLisByVariety({
        id: n
      }).then((res) => {
        this.genesOpts = res.data
      })
    }
  },
  created() {
    this.myMouseForm.operator = this.$store.getters.info.id
    // 获取品系
    varietiesList().then(res => {
      this.$set(this, 'varietiesOpts', res.data.records)
    }).finally(() => {
      this.tableLoading = false
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleRefreshChange() {
      // this.getList()
    },
    // 获取列表
    getList() {
      this.tableLoading = true
      fetchList(Object.assign({}, this.myMouseForm, {
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
    changeMan() {},


    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
