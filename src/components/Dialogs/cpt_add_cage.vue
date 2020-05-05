<template>
  <div class="dib">
    <el-button
      class="w80"
      size="small"
      :disabled="disabled"
      @click="cageDialog = true"
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
            prop="name"
            :rules="[
              { required: true, message: '笼位号不能为空'}
            ]"
          >
            <el-input
              v-model="addCageForm.name"
              placeholder="请输入笼位号"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="房间号:"
            label-width="80px"
            class="mb8"
            prop="room"
          >
            <el-input
              v-model="addCageForm.room"
              placeholder="请输入房间号"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="架号:"
            label-width="80px"
            class="mb8"
            prop="shelf"
          >
            <el-input
              v-model="addCageForm.shelf"
              placeholder="请输入架号"
              class="w250"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cageDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="fillVarity()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addItemObj } from '@/api/variety'

export default {
  name: 'VarietyEdit',
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
        name: ''
      },
      cageDialog: false
    }
  },
  methods: {
    fillVarity() {
      this.$refs['addCageForm'].validate((valid) => {
        if (valid) {
          this.cageDialog = false
          // 提交成功后触发done
          const { id: operator, id: userId } = this.$store.getters.info
          addItemObj({
            varietiesName: this.addCageForm.name,
            operator,
            userId
          }).then((res) => {
            if (res.data) {
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
