<template>
  <div class="mouse__addChild">
    <main-box>
      <div class="mouse__addChild--form mt25 ml15 cl-black fs14">
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
          <div class="mouse__addChild--toggle">
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
          <el-form-item label="状态:" class="mb0">
            <span>闲置</span>
          </el-form-item>
          <el-form-item label="状态数量:" class="mb9">
            <el-input
              v-model="form.name"
              placeholder="0"
              class="w80"
            />
            <span class="ml8">只(雄)</span>
            <el-input
              v-model="form.name"
              placeholder="0"
              class="w80 ml16"
            />
            <span class="ml8">只(雌)</span>
          </el-form-item>
          <el-form-item label="体重:" class="mb9">
            <el-input
              v-model="form.name"
              placeholder="请输入体重"
              class="w250"
            />
            <span class="ml8">g</span>
          </el-form-item>
          <div class="df s-jcfs">
            <el-form-item label="出生日期:" class="mb9 mr62">
              <el-input
                v-model="form.name"
                placeholder="请输入出生日期"
                class="w250"
              />
            </el-form-item>
            <el-form-item label="周龄:" class="mb9">
              <el-input
                v-model="form.name"
                placeholder="0"
                class="w80"
              />
              <span class="ml8">周</span>
              <el-input
                v-model="form.name"
                placeholder="0"
                class="w80"
              />
              <span class="ml8">天</span>
            </el-form-item>
          </div>
          <div class="df s-jcfs">
            <el-form-item label="纯/杂合子" class="mb9 mr62">
              <el-select
                v-model="form.region"
                placeholder="请选择纯/杂合子"
                class="w250"
              >
                <el-option label="纯合子" value="1"></el-option>
                <el-option label="杂合子" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="显示颜色:" class="mb9">
              <el-color-picker v-model="form.defaultColor" size="mini" style="position:  relative;top: 2px;height: 32px;" />
            </el-form-item>
          </div>
          <div class="df s-jcfs">
            <el-form-item label="分笼时间:" class="mb9 mr62">
              <el-date-picker
                v-model="form.cageTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                class="w250"
                placeholder="选择分笼时间"
              />
            </el-form-item>
            <el-form-item label="分笼提醒:" class="mb9 mr62">
              <el-select
                v-model="form.region"
                placeholder="请选择是否分笼提醒"
                class="w250"
              >
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="df s-jcfs">
            <el-form-item label="表型鉴定时间:" class="mb9 mr62">
              <el-date-picker
                v-model="form.cageTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                class="w250"
                placeholder="选择分笼时间"
              />
            </el-form-item>
            <el-form-item label="表型鉴定提醒:" class="mb9 mr62">
              <el-select
                v-model="form.region"
                placeholder="请选择是否表型鉴定提醒"
                class="w250"
              >
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="笼位号:" class="mb8">
              <el-input
                v-model="form.name"
                placeholder="请输入笼位号"
                class="w250"
              />
            </el-form-item>
            <div class="mouse__addChild--toggle">
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
      <div class="mouse__addChild--btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
        <el-button type="primary" size="small" @click="goChoose()">确定</el-button>
      </div>
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
    </main-box>
  </div>
</template>

<script>
export default {
  name: 'AddMouse',
  data() {
    return {
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
        defaultColor: '#00CB7C' // 默认颜色
      },
      // 品系选择
      variety_radio: null,
      varietyDialog: false,
      father: {},
      mother: {}
    }
  },
  created() {
    const params = this.$route.params.parents
    if (params.length === 2) {
      this.father = params.filter((el) => {
        return el.gender === 0
      })[0]
      this.mother = params.filter((el) => {
        return el.gender === 1
      })[0]
    }
    console.log(this.father, this.mother)
  },
  methods: {
    // 选择品系 or 基因型
    chooseVarity() {
      this.varietyDialog = true
    },
    fillVarity() {
      this.varietyDialog = false
      // 填充品系
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
    }
  }
}
</script>

<style lang="scss">
  .mouse__addChild {
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
