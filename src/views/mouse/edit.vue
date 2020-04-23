<template>
  <div class="mouse__edit fs14">
    <main-box style="padding:0;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="小鼠信息" name="first">
          <div class="mouse__edit--pane">
            <div class="df s-jcfs mb16">
              <p style="margin-right: 44px;">父鼠编号: <span>XX-11</span></p>
              <p>母鼠编号: <span>XX-45</span></p>
            </div>
            <el-form ref="form" :model="form" size="small" label-width="95px" label-position="left">
              <el-form-item label="品系名称:" class="mb17">
                <el-input
                  v-model="form.name"
                  placeholder="请选择品系名称"
                  class="w250"
                />
                <el-button type="primary" @click="chooseVarity()">选择品系</el-button>
              </el-form-item>
              <div class="mouse__edit--toggle mb9">
                <div class="mb13">
                  <el-button type="primary" size="mini" class="w60" @click="chooseGenes()">选择</el-button>
                  <el-button type="primary" size="mini" class="w60" @click="addGenes()">新增</el-button>
                </div>
                <div class="df s-jcsb s-aic">
                  <el-form-item label="基因型:" label-width="70px" class="mb8">
                    <el-input
                      v-model="form.name"
                      placeholder="请输入基因型"
                      class="w250"
                    />
                  </el-form-item>
                  <el-form-item label="饲养条件:" label-width="70px" class="mb8">
                    <el-input
                      v-model="form.name"
                      placeholder="请输入饲养条件"
                      class="w250"
                    />
                  </el-form-item>
                </div>
                <div class="df s-jcsb s-aic">
                  <el-form-item label="健康状态:" label-width="70px" class="mb8">
                    <el-input
                      v-model="form.name"
                      placeholder="请输入健康状态"
                      class="w250"
                    />
                  </el-form-item>
                  <el-form-item label="毛色:" label-width="70px" class="mb8">
                    <el-input
                      v-model="form.name"
                      placeholder="请输入毛色"
                      class="w250"
                    />
                  </el-form-item>
                </div>
                <el-form-item label="应用领域:" label-width="70px" class="mb0">
                  <el-input v-model="form.desc" type="textarea" />
                </el-form-item>
              </div>
              <div class="df s-jcfs mb16">
                <p style="margin-right: 44px;">编号: <span>XX-11</span></p>
                <p>状态: <span>实验</span></p>
              </div>
              <el-form-item label="标记:" class="mb9">
                <el-select
                  v-model="form.region"
                  placeholder="部位"
                  class="w100"
                >
                  <el-option label="头部" value="1" />
                  <el-option label="爪部" value="2" />
                </el-select>
                <el-input
                  v-model="form.name"
                  placeholder="请输入1-99的数字"
                  style="width: 142px;"
                />
                <div class="mouse__edit--img mt8">
                  <img src="@/assets/test.jpg" alt="">
                  <span class="pl16 pr16">示例：</span>
                  <img src="@/assets/test.jpg" alt="">
                </div>
              </el-form-item>
              <div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">性别:</span><i class="mouse__edit--info--i">雌</i></p>
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">体重:</span><i class="mouse__edit--info--i">10g</i></p>
                </div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">基因型:</span><i class="mouse__edit--info--i">P65-/-</i></p>
                  <p class="mouse__edit--info--p">
                    <span class="mouse__edit--info--span">显示颜色:</span>
                    <i class="mouse__edit--info--i dib" :style="{'width': '16px', 'height': '16px', 'backgroundColor': form.color}" />
                  </p>
                </div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">出生日期:</span><i class="mouse__edit--info--i">{{ form.time | timeFormat('yyyy-MM-dd') }}</i></p>
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">周龄:</span><i class="mouse__edit--info--i">2周2天</i></p>
                </div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">纯/杂合子:</span><i class="mouse__edit--info--i">待定</i></p>
                </div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">分笼时间:</span><i class="mouse__edit--info--i">{{ form.time | timeFormat('yyyy-MM-dd') }}</i></p>
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">分笼提醒:</span><i class="mouse__edit--info--i">是</i></p>
                </div>
                <div class="df s-jcfs s-aic mb16">
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">表型鉴定时间:</span><i class="mouse__edit--info--i">{{ form.time | timeFormat('yyyy-MM-dd') }}</i></p>
                  <p class="mouse__edit--info--p"><span class="mouse__edit--info--span">表型鉴定提醒:</span><i class="mouse__edit--info--i">是</i></p>
                </div>
              </div>
              <div>
                <el-form-item label="笼位号:" class="mb8">
                  <el-input
                    v-model="form.name"
                    placeholder="请选择品系名称"
                    class="w250"
                  />
                  <el-button type="primary" @click="goCage()">选择笼位</el-button>
                </el-form-item>
                <div class="mouse__edit--toggle">
                  <div class="df s-jcsb s-aic">
                    <el-form-item label="笼位号:" label-width="70px" class="mb8">
                      <el-input
                        v-model="form.name"
                        placeholder="请输入笼位号"
                        disabled
                        class="w250"
                      />
                    </el-form-item>
                    <el-form-item label="房间号:" label-width="70px" class="mb8">
                      <el-input
                        v-model="form.name"
                        placeholder="请输入房间号"
                        disabled
                        class="w250"
                      />
                    </el-form-item>
                  </div>
                  <div class="df s-jcsb s-aic">
                    <el-form-item label="架号:" label-width="70px" class="mb0">
                      <el-input
                        v-model="form.name"
                        placeholder="请输入架号"
                        disabled
                        class="w250"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
              <el-form-item label="附件:" class="mb0">
                <el-button type="text">查看</el-button>
                <svg-icon icon-class="upload" class="cp" />
              </el-form-item>
            </el-form>
          </div>
          <div class="mouse__edit--btns pos-a w-100 h60 df s-aic">
            <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
            <el-button type="primary" size="small" @click="goChoose()">编辑/保存</el-button>
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
              @on-load="getList"
              @refresh-change="handleRefreshChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 选择品系弹窗 -->
      <el-dialog
        title="选择品系"
        :visible.sync="varietyDialog"
      >
        <div class="mouse__varietyDialog">
          <el-radio v-model="variety_radio" label="1" class="mr0" size="small" border>品系A</el-radio>
          <el-radio v-model="variety_radio" label="2" class="mr0" size="small" border>品系B</el-radio>
          <el-radio v-model="variety_radio" label="3" class="mr0" size="small" border>品系C</el-radio>
          <el-radio v-model="variety_radio" label="4" class="mr0" size="small" border>品系D</el-radio>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="varietyDialog = false">取 消</el-button>
          <el-button type="primary" size="small" @click="fillVarity()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 选择基因型弹窗 -->
      <el-dialog
        title="选择基因型"
        :visible.sync="genesDialog"
      >
        <div class="mouse__varietyDialog">
          <el-radio v-model="variety_radio" label="1" class="mr0" size="small" border>品系A</el-radio>
          <el-radio v-model="variety_radio" label="2" class="mr0" size="small" border>品系B</el-radio>
          <el-radio v-model="variety_radio" label="3" class="mr0" size="small" border>品系C</el-radio>
          <el-radio v-model="variety_radio" label="4" class="mr0" size="small" border>品系D</el-radio>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="genesDialog = false">取 消</el-button>
          <el-button type="primary" size="small" @click="fillGenes()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增基因型弹窗 -->
      <el-dialog
        title="新增基因型"
        :visible.sync="addGenesDialog"
        width="450px"
      >
        <div>
          <el-form ref="addGensForm" :model="addGensForm" label-position="left" size="mini">
            <el-form-item label="状态:" label-width="80px" class="mb0">
              <span>闲置</span>
            </el-form-item>
            <el-form-item label="基因型名称:" label-width="80px" class="mb8">
              <el-input v-model="addGensForm.name" />
            </el-form-item>
            <el-form-item label="饲养条件:" label-width="80px" class="mb8">
              <el-input v-model="addGensForm.name" />
            </el-form-item>
            <el-form-item label="健康状态:" label-width="80px" class="mb8">
              <el-input v-model="addGensForm.name" />
            </el-form-item>
            <el-form-item label="毛色:" label-width="80px" class="mb8">
              <el-input v-model="addGensForm.name" />
            </el-form-item>
            <el-form-item label="应用领域:" label-width="80px" class="mb0">
              <el-input v-model="addGensForm.desc" type="textarea" />
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="addGenesDialog = false">取 消</el-button>
          <el-button type="primary" size="small" @click="doAddGenes()">确 定</el-button>
        </div>
      </el-dialog>
    </main-box>
  </div>
</template>

<script>
import MergeTable from '@/components/MergeTable'
import { tableOption } from './labTable'
import { addItemObj, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj } from '@/api/mouse'

export default {
  name: 'MouseEdit',
  components: {
    MergeTable
  },
  data() {
    return {
      activeName: 'first', // 鼠笼tab
      // 总表单
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        defaultColor: '#00CB7C', // 默认颜色
        time: 1587375335305,
        color: '#C4C4CD'
      },
      // 品系选择
      variety_radio: null,
      varietyDialog: false,
      // 基因型选择
      genesDialog: false,
      // 新增基因型
      addGenesDialog: false,
      // 新增基因型表单
      addGensForm: {
        name: ''
      },
      // ------------实验记录
      tableOption,
      tableLoading: false,
      page: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      tableData: [{
        group: 0,
        name: '繁育组提醒',
        handle: '繁育组XX-XX到了繁育时间',
        check: '繁育组XX-XX到了繁育时间',
        start: 1587277449395,
        end: 1587277449395
      }, {
        group: 0,
        name: '繁育组提醒',
        handle: '繁育组XX-XX到了繁育时间',
        check: '繁育组XX-XX到了繁育时间',
        start: 1587277449395,
        end: 1587277449395
      }]
    }
  },
  methods: {
    goCage() {
      this.$router.push({ name: 'mouseCage' })
    },
    handleClick(tab, event) {
      console.log(tab, event)
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
    fillGenes() {
      this.genesDialog = false
      // 填充基因型
    },
    // 新增基因型
    addGenes() {
      this.addGenesDialog = true
    },
    doAddGenes() {
      this.addGenesDialog = false
      // 新增基因型
    },
    goBack() {
      this.$router.back()
    },
    goChoose(obj) {
      this.$router.push({ name: 'mouseCage', params: obj })
    },
    // 提交
    onSubmit() {
      console.log('submit!');
    },
    // --------------------- 实验记录
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
    }
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
        display: inline-block;
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
</style>
