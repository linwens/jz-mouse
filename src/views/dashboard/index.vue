<template>
  <div>
    <main-box class="home pos-r">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的小鼠" name="first">
          <div>
            <sum-bar />
          </div>
          <div class="mt20 mb12">
            <el-form ref="myMouseForm" :model="myMouseForm" size="small" label-width="95px" label-position="left">
              <el-button type="primary" size="small" class="w70">重置</el-button>
              <el-select
                v-model="myMouseForm.man"
                placeholder="负责人"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="品系"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="基因型"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="纯/杂合子"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="性别"
                size="small"
                class="w80"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="状态"
                size="small"
                class="w80"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
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
          <div class="bd-gray">
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
        <el-tab-pane label="实验室小鼠" name="second">
          <div>
            <sum-bar v-if="activeName === 'second'" />
          </div>
          <div class="mt20 mb12">
            <el-form ref="myMouseForm" :model="myMouseForm" size="small" label-width="95px" label-position="left">
              <el-button type="primary" size="small" class="w70">重置</el-button>
              <el-select
                v-model="myMouseForm.man"
                placeholder="负责人"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="品系"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="基因型"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="纯/杂合子"
                size="small"
                class="w104"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="性别"
                size="small"
                class="w80"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
              </el-select>
              <el-select
                v-model="myMouseForm.man"
                placeholder="状态"
                size="small"
                class="w80"
              >
                <el-option label="张三" value="1" />
                <el-option label="李四" value="2" />
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
          <div class="bd-gray">
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
      myMouseForm: {
        name: null
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
      tableData: [{
        numb: 0,
        man: '张三',
        variety: '品系A',
        genes: 'Ddjice-02',
        pure: '纯合子',
        sex: 0,
        week: '2周1天',
        status: 0,
        cage: '03'
      }, {
        numb: 0,
        man: '张三',
        variety: '品系A',
        genes: 'Ddjice-02',
        pure: '纯合子',
        sex: 0,
        week: '2周1天',
        status: 0,
        cage: '03'
      }],



      dialogVisible: false,
      fileUrl: 'http://localhost/test.pdf'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleRefreshChange() {
      this.getList()
    },
    // 获取列表
    getList() {
      this.tableLoading = true
      fetchList(Object.assign({
        current: this.page.page,
        size: this.page.limit
      })).then(response => {
        this.tableData = response.data.records
        this.page.total = response.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },



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

<style lang="scss" scoped>
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
</style>
