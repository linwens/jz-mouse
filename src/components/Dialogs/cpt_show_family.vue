<template>
  <div class="dib">
    <el-button type="text" @click="showFamily()">查看</el-button>
    <!-- 家谱弹窗 -->
    <el-dialog
      title="家谱记录"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <family-tree :mice-id="miceId" />
    </el-dialog>
  </div>
</template>

<script>
import FamilyTree from '@/components/Charts/FamilyTree'

export default {
  name: 'ShowFamily',
  components: {
    FamilyTree
  },
  props: {
    miceId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    // 展示家谱
    showFamily() {
      this.dialogVisible = true
    }
  }
}
</script>

<style>

</style>
