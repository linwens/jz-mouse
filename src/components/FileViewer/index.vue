<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">查看</el-button>
    <div v-if="type === 'pdf'">
      <el-dialog
        title="pdf查看"
        fullscreen
        custom-class="mouse__preview"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <embed
          :src="fileUrl"
          style="width: 100%; height: 100%"
        >
      </el-dialog>
    </div>
    <div v-if="type === 'img'">
      <el-image
        style="width: 100px; height: 100px"
        :src="fileUrl"
        :preview-src-list="[fileUrl]"
      />
    </div>
    <div v-if="type === 'office'">
      <el-dialog
        title="office查看"
        fullscreen
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        custom-class="mouse__preview"
      >
        <iframe
          frameborder="0"
          :src="'https://view.officeapps.live.com/op/view.aspx?src=' + officeUrl"
          width="100%"
          height="100%"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fileUrl: {
      type: String,
      default: 'http://localhost/test.pdf'
    }
  },
  data() {
    return {
      dialogVisible: false,
      type: '',
      officeUrl: ''
    }
  },
  created() {
    this.getType(this.fileUrl)
  },
  methods: {
    // 获取类型
    getType(url) {
      const type = url.match(/\.[^\.]+$/g)[0].slice(1)
      const pattImg = new RegExp(/(jpg|png|jpeg)/g)
      const pattOffice = new RegExp(/(docx|xlsx|pptx)/g)
      if (pattImg.test(type)) {
        this.type = 'img'
      } else if (pattOffice.test(type)) {
        this.type = 'office'
        this.officeUrl = encodeURIComponent(this.fileUrl)
      } else {
        this.type = type
      }
      console.log('type==', this.type)
    }
  }
}
</script>

<style lang="scss">
  .mouse__preview{
    .el-dialog__body{
      height: calc( 100% - 54px);
    }
  }
</style>
