<template>
  <div class="dib">
    <el-button
      class="w80"
      size="small"
      :disabled="disabled"
      @click="clickGetNum()"
    >{{ btnText }}</el-button>
    <!-- 新增笼位弹窗 -->
    <el-dialog
      :title="btnText"
      :visible.sync="cageDialog"
      width="433px"
    >
      <div class="mouse__cageDialog">
        <el-form ref="addCageForm" :model="addCageForm" label-position="left" size="mini">
          <el-form-item
            label="笼位号:"
            label-width="80px"
            class="mb8"
            prop="cageNo"
            :rules="[
              { required: true, message: '笼位号不能为空'}
            ]"
          >
            <!-- <el-input
              v-model="addCageForm.cageNo"
              placeholder="请输入笼位号"
              class="w250"
            /> -->
            <el-autocomplete
              v-model="addCageForm.cageNo"
              :fetch-suggestions="history('cageNo')"
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
            <!-- <el-input
              v-model="addCageForm.roomNo"
              placeholder="请输入房间号"
              class="w250"
            /> -->
            <el-autocomplete
              v-model="addCageForm.roomNo"
              :fetch-suggestions="history('roomNo')"
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
            <!-- <el-input
              v-model="addCageForm.shelvesNo"
              placeholder="请输入架号"
              class="w250"
            /> -->
            <el-autocomplete
              v-model="addCageForm.shelvesNo"
              :fetch-suggestions="history('shelvesNo')"
              placeholder="请输入架号"
              class="w250"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cageDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="addCageSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addCage, getNewCageNo } from '@/api/mouse'
import { inputRemenber } from '@/components/Mixins/history'

export default {
  name: 'VarietyEdit',
  mixins: [inputRemenber],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    btnText: {
      type: String,
      default: '新增笼位'
    }
  },
  data() {
    return {
      addCageForm: {
        cageNo: '0', // el-autocomplete不是字符串会报类型错
        roomNo: '0',
        shelvesNo: '0'
      },
      cageDialog: false
    }
  },
  created() {
    const iptHistory = JSON.parse(JSON.stringify(this.$store.getters.inputHistory))
    const latestCageNo = iptHistory['cageNo'].pop()
    const latestRoomNo = iptHistory['roomNo'].pop()
    const latestShelvesNo = iptHistory['shelvesNo'].pop()

    this.addCageForm.cageNo = latestCageNo ? latestCageNo.value : '0'
    this.addCageForm.roomNo = latestRoomNo ? latestRoomNo.value : '0'
    this.addCageForm.shelvesNo = latestShelvesNo ? latestShelvesNo.value : '0'
  },
  methods: {
    // 点击获取初始化笼位号
    clickGetNum() {
      getNewCageNo().then((res) => {
        this.addCageForm.cageNo = Number(res.data) + 1 + ''
      })
      this.cageDialog = true
    },
    addCageSubmit() {
      this.$refs['addCageForm'].validate((valid) => {
        if (valid) {
          this.cageDialog = false
          // 提交成功后触发done
          const { id: userId } = this.$store.getters.info
          console.log('userinfo===', this.$store.getters.info)
          addCage(Object.assign(this.addCageForm, {
            operator: userId,
            createUser: userId,
            state: 0
          })).then((res) => {
            if (res.data) {
              // 存储输入过的值
              const { cageNo, roomNo, shelvesNo } = this.addCageForm
              this.$store.dispatch('user/setInputHistory', {
                cageNo,
                roomNo,
                shelvesNo
              })
              this.$emit('done')
            }
          })
        } else {
          return false
        }
      })
      // 填充品系
    }
  }
}
</script>

<style lang="scss">
</style>
