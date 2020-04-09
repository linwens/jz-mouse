<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">打开file-viewer</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div v-if="type === 'pdf'">
        <embed
          :src="fileUrl"
          style="width: 100%; height: 100%"
        ></embde>
      </div>
      <div v-if="type === 'img'"></div>
      <div v-if="type === 'doc'">
        <iframe
          frameborder="0"
          :src="'https://view.officeapps.live.com/op/view.aspx?src=' + fileUrl"
          width="100%"
        />
      </div>
      <div v-if="type === 'xls'"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    fileUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      // filesType: ['doc', 'xls', 'pdf', 'jpg', 'png'],
      type: ''
    }
  },
  created() {
    this.getType(this.fileUrl)
  },
  methods: {
    // 获取类型
    getType(url) {
      const type = url.match(/\.(.*)$/g)[0].slice(1)
      const pattImg = new RegExp(/(jpg|png)/g)
      if (pattImg.test(type)) {
        this.type = 'img'
      }
      this.type = type
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

<style lang="scss">

</style>
