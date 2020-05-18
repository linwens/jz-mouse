<template>
  <div>
    <main-box class="variety__addGenes mt25 cl-black fs14">
      <div>
        <el-form
          ref="addGensForm"
          :model="addGensForm"
          label-position="left"
          label-width="90px"
          size="mini"
        >
          <el-form-item
            label="品系名称:"
            class="mb18"
            prop="varietiesName"
            :rules="[
              { required: true, message: '品系名称不能为空', trigger: 'change' }
            ]"
          >
            <el-input
              v-model="addGensForm.varietiesName"
              disabled
              placeholder="请输入品系名称"
              class="w250"
            />
            <choice-variety-btn :variety.sync="curVariety" />
          </el-form-item>
          <el-form-item
            label="基因型名称:"
            class="mb18"
            prop="geneName"
            :rules="[
              { required: true, message: '基因型名称不能为空', trigger: 'change' }
            ]"
          >
            <!-- <el-input
              v-model="addGensForm.geneName"
              placeholder="请输入基因型名名称"
              class="w250"
            /> -->
            <el-autocomplete
              v-model="addGensForm.geneName"
              :fetch-suggestions="history('geneName')"
              placeholder="请输入基因型名称"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="饲养条件:"
            label-width="80.56px"
            style="padding-left: 9.44px;"
            class="mb18"
          >
            <!-- <el-input
              v-model="addGensForm.miceCondition"
              placeholder="请输入饲养条件"
              class="w250"
            /> -->
            <el-autocomplete
              v-model="addGensForm.miceCondition"
              :fetch-suggestions="history('miceCondition')"
              placeholder="请输入饲养条件"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="健康状态:"
            label-width="80.56px"
            style="padding-left: 9.44px;"
            class="mb18"
          >
            <!-- <el-input
              v-model="addGensForm.status"
              placeholder="请输入健康状态"
              class="w250"
            /> -->
            <el-autocomplete
              v-model="addGensForm.status"
              :fetch-suggestions="history('status')"
              placeholder="请输入健康状态"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="毛色:"
            label-width="80.56px"
            style="padding-left: 9.44px;"
            class="mb18"
          >
            <!-- <el-input
              v-model="addGensForm.color"
              placeholder="请输入毛色"
              class="w250"
            /> -->
            <el-autocomplete
              v-model="addGensForm.color"
              :fetch-suggestions="history('color')"
              placeholder="请输入毛色"
              class="w250"
            />
          </el-form-item>
          <el-form-item
            label="应用领域:"
            label-width="80.56px"
            style="padding-left: 9.44px;"
            class="mb0"
          >
            <!-- <el-input
              v-model="addGensForm.area"
              type="textarea"
              placeholder="请输入应用领域"
              class="w250"
            /> -->
            <el-autocomplete
              v-model="addGensForm.area"
              :fetch-suggestions="history('area')"
              placeholder="请输入应用领域"
              class="w250"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="variety__addGenes--btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
        <el-button type="primary" size="small" class="w100" @click="onSubmit()">确定</el-button>
      </div>
    </main-box>
  </div>
</template>

<script>
import ChoiceVarietyBtn from '@/components/Dialogs/choice_variety'
import { addNewGenes, editGenes } from '@/api/genes'
import { mapGetters } from 'vuex'

export default {
  name: 'VarietyEdit',
  components: {
    ChoiceVarietyBtn
  },
  data() {
    return {
      curVariety: null, // 当前选中的品系
      varietiesId: '',
      optType: 'add', // 操作方式
      addGensForm: {
        varietiesName: '',
        geneName: '',
        miceCondition: '',
        status: '',
        color: '',
        area: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'inputHistory'
    ])
  },
  watch: {
    curVariety(n, o) {
      const newVariety = JSON.parse(n)
      this.varietiesId = newVariety.id
      this.$set(this, 'addGensForm', newVariety)
    }
  },
  created() {
    console.log(this.$route.params)
    if (this.$route.params.miceGeneId) {
      this.optType = 'modify'
      this.curVariety = JSON.stringify(this.$route.params)
    }
  },
  methods: {
    history(key) {
      const rslt = this.inputHistory[key]
      return function(queryString, cb) {
        cb(rslt)
      }
    },
    goBack() {
      this.$router.back()
    },
    // 提交
    onSubmit() {
      console.log('this.optType', this.optType)
      const apiType = this.optType === 'modify' ? editGenes : addNewGenes
      const { miceGeneId: id, source, geneName, miceCondition, status, color, area, state } = this.addGensForm
      this.$refs['addGensForm'].validate((valid) => {
        if (valid) {
          apiType({
            id,
            source,
            varietiesId: this.varietiesId,
            geneName,
            miceCondition,
            status,
            color,
            area,
            state,
            userId: this.$store.getters.info.id
          }).then((res) => {
            this.$message.success('编辑成功')
            // 存储输入过的值
            this.$store.dispatch('user/setInputHistory', {
              geneName,
              miceCondition,
              status,
              color,
              area
            })
            this.goBack()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .variety__addGenes{
    &--btns{
      bottom: 0;
      left: 0;
      padding-left: 40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(214,214,214,1);
    }
  }
</style>
