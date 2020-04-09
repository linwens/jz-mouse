<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <guide :text="'展示引导'" />
    <file-viewer />
    <el-button type="text" @click="dialogVisible = true">点击打开 Family-tree</el-button>
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
import Guide from '@/components/Guide'
import FileViewer from '@/components/FileViewer'
import FamilyTree from '@/components/Charts/FamilyTree'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Guide,
    FileViewer,
    FamilyTree
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
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
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
