<template>
  <div class="mouse-cage pos-r" :class="{'isChoiced': cageId == choosedCage}" @click="disabled ? null : chooseCage()">
    <div class="mouse-cage__header df s-jcsa s-aic">
      <div class="mouse-cage__number df s-jcc">
        <p>{{ allData.cageNo }}<i>笼位</i></p>
        <p>{{ allData.roomNo }}<i>房间</i></p>
        <p>{{ allData.shelvesNo }}<i>架号</i></p>
      </div>
      <div class="mouse-cage__man">
        负责人
        <el-button size="mini" @click="shift ? chageMan() : null">
          {{ allData.operatorName }}
          <svg-icon v-if="shift" icon-class="shift" class="cl-green" />
        </el-button>
      </div>
      <div class="mouse-cage__status">
        <span :class="{'isIdle': isIdle}">闲置</span>
        <span :class="{'isExpt': isExpt}">实验</span>
        <span :class="{'isBreed': isBreed}">繁育</span>
      </div>
    </div>
    <div class="mouse-cage__list df s-jcfs">
      <div class="list__title df s-fdc s-aic s-jcfs">
        <div class="list__title--female df s-fdc s-aic s-jcc">
          <svg-icon icon-class="female" class="fs40 mb4" />
          <span>{{ femaleSum.length }}只</span>
        </div>
        <div class="list__title--male df s-fdc s-aic s-jcc">
          <svg-icon icon-class="male" class="fs40 mb4" />
          <span>{{ maleSum.length }}只</span>
        </div>
      </div>
      <div class="list__content">
        <el-checkbox-group v-model="checkList" @change="taggleMouse()">
          <div v-if="femaleSum.length > 0" class="list__content--female df s-jcfs s-aic ofh">
            <div
              v-for="item in femaleSum"
              :key="item.miceInfoId"
              class="mouse__item ta-c"
              :class="{'isChoiced': (item.miceInfoId == curMouseId)}"
            >
              <div class="pos-r">
                <el-checkbox :disabled="checkBoxStatus(item.miceStatus, item.miceInfoId)" class="mouse__checkbox" :label="item" />
                <div @click.stop="taggle(item.miceInfoId)">
                  <svg-icon icon-class="mouse" class="fs50" :style="{ 'color': item.color }" />
                  <p>{{ item.geneName }}</p>
                  <span class="item__miceNo dib">{{ item.miceNo }}</span>
                  <i class="pos-a mouse__item--female">{{ item.sign }}</i>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="list__content--female" />
          <div v-if="maleSum.length > 0" class="list__content--male df s-jcfs s-aic ofh">
            <div
              v-for="item in maleSum"
              :key="item.miceInfoId"
              class="mouse__item ta-c"
              :class="{'isChoiced': (item.miceInfoId == curMouseId)}"
            >
              <div class="pos-r">
                <el-checkbox :disabled="checkBoxStatus(item.miceStatus, item.miceInfoId)" class="mouse__checkbox" :label="item" />
                <div @click.stop="taggle(item.miceInfoId)">
                  <svg-icon icon-class="mouse" class="fs50" :style="{ 'color': item.color }" />
                  <p>{{ item.geneName }}</p>
                  <span class="item__miceNo dib">{{ item.miceNo }}</span>
                  <i class="pos-a mouse__item--male">{{ item.sign }}</i>
                </div>
              </div>
            </div>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <!-- 选择笼位时的蒙版 -->
    <div v-if="isChoosingCage" class="mouse-cage__mark pos-a" />
    <!-- 更换负责人弹窗 -->
    <el-dialog
      title="更换负责人"
      :visible.sync="manDialog"
      width="433px"
    >
      <div>
        <p class="cl-black fs14 mb10">当前负责人: {{ allData.operatorName }}</p>
        <el-form ref="mansForm" :model="mansForm" label-position="left" size="mini">
          <el-form-item
            label="更换为:"
            label-width="80px"
            class="mb8"
            prop="userId"
            :rules="[
              { required: true, message: '新的负责人不能为空', trigger: 'blur' }
            ]"
          >
            <el-select
              v-model="mansForm.userId"
              clearable
              placeholder="请输入新的负责人"
              size="small"
              class="w104"
            >
              <el-option
                v-for="item in persons"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="manDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="changeMan()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMouseInfo, getMouseExpInfo } from '@/api/mouse'
import { getUsers } from '@/api/home'
import { changeOperator } from '@/api/cmn'

export default {
  name: 'MouseCage',
  props: {
    // 需要的状态needType
    needType: {
      type: String,
      default: ''
    },
    // 鼠笼所需所有信息
    allData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 鼠笼是否可点击
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否可切换负责人
    shift: {
      type: Boolean,
      default: true
    },
    // 是否在移笼
    isActive: {
      type: Boolean,
      default: false
    },
    // 是否在选择笼位
    isChoosingCage: {
      type: Boolean,
      default: false
    },
    // 鼠笼id
    cageId: {
      type: Number,
      default: 0
    },
    // 当前选中的鼠笼id
    choosedCage: {
      type: Number,
      default: 0
    },
    // 选中的小鼠
    choicedList: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 当前选中小鼠的id
    curMouseId: {
      type: Number,
      default: 0
    },
    // 选中的小鼠信息
    curMouse: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 选中的小鼠实验信息
    curMouseExpt: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 已经被选了的老鼠,不可选
    cantChoiceMouses: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      curId: '',
      // 更换负责人
      manDialog: false,
      mansForm: {
        userId: ''
      },
      persons: [], // 负责人选择项
      // 鼠笼checkbox
      checkList: [],
      // 选择笼位
      choiceCage: false
    }
  },
  computed: {
    isIdle() {
      const mouseArr = this.allData.miceInfoByMiceCageQueryVO
      const isIdle = mouseArr.filter((el) => {
        return el.miceStatus === 1
      })
      return isIdle.length > 0
    },
    isExpt() {
      const mouseArr = this.allData.miceInfoByMiceCageQueryVO
      const isExpt = mouseArr.filter((el) => {
        return el.miceStatus === 3
      })
      return isExpt.length > 0
    },
    isBreed() {
      const mouseArr = this.allData.miceInfoByMiceCageQueryVO
      const isBreed = mouseArr.filter((el) => {
        return el.miceStatus === 2
      })
      return isBreed.length > 0
    },
    maleSum() { // 雄鼠数量
      const mouseArr = this.allData.miceInfoByMiceCageQueryVO
      const males = mouseArr.filter((el) => {
        return el.gender === 0
      })
      return males
    },
    femaleSum() { // 雌鼠数量
      const mouseArr = this.allData.miceInfoByMiceCageQueryVO
      const females = mouseArr.filter((el) => {
        return el.gender === 1
      })
      return females
    }
  },
  watch: {
    'choicedList.mouses'(n, o) {
      console.log('-=---=---[][', n)

      if (!n) { // 选中小鼠项情况，checkList也清空
        this.$set(this, 'checkList', [])
      } else {
        this.$set(this, 'checkList', n)
      }
    }
  },
  methods: {
    // 获取负责人列表
    getPersons() {
      getUsers().then((res) => {
        this.$set(this, 'persons', res.data)
      })
    },
    // 设置当前小鼠是否可选
    checkBoxStatus(status, id) {
      let noWay = false
      if (status === 2 && this.needType === 'noBreed') {
        noWay = true
      }
      if (status === 3 && this.needType === 'noExpt') {
        noWay = true
      }

      return !this.isActive || noWay || this.cantChoiceMouses.indexOf(String(id)) > -1
    },
    taggle(id) {
      this.curId = this.curMouseId
      if (this.curId === id) { // 再次点击取消选框
        this.curId = null
        this.$emit('update:curMouseId', null)
      } else {
        this.curId = id
        this.$emit('update:curMouseId', id)
        let params = {}
        getMouseInfo(this.curId).then((res) => {
          console.log(res)
          this.$emit('update:curMouse', res.data)
        })
        getMouseExpInfo(this.curId).then((res) => {
          console.log('getMouseExpInfo', res)
          this.$emit('update:curMouseExpt', res.data[0] || {}) // 取第一条数据
        })
      }
      console.log(`===22==${id}||||${this.curId}|||${this.curMouseId}`)
    },
    // 切换负责人
    chageMan() {
      this.getPersons()
      this.manDialog = true
    },
    changeMan() {
      changeOperator({
        cageId: this.cageId,
        userId: this.mansForm.userId
      }).then((res) => {
        const newData = JSON.parse(JSON.stringify(this.allData))
        const curOperator = this.persons.filter((el) => {
          return el.userId === this.mansForm.userId
        })
        newData.operatorName = curOperator.userName
        newData.operator = curOperator.userId
        this.$emit('update:allData', newData)
        this.$message.success('切换负责人成功')
        this.manDialog = false
        this.$refs['mansForm'].resetFields()
        this.$emit('refresh')
      })
    },
    // 多选框选中小鼠
    taggleMouse(val) {
      console.log('cage-11---', this.checkList)
      const newOne = this.checkList[this.checkList.length - 1]
      // 如果是添加繁育组时选择实验组小鼠
      if (this.needType === 'noBreed' && newOne && newOne.miceStatus === 3) {
        const _self = this
        this.$confirm('该小鼠处于实验中，添加进繁育列表后将会从实验组中移除，是否继续操作？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        }).catch(function() {
          _self.checkList.pop()
        })
      }
      console.log('cage-22---', this.checkList)
      this.$emit('update:choicedList', {
        cid: this.cageId,
        mouses: this.checkList
      })
    },
    // 选择鼠笼
    chooseCage() {
      if (this.cageId !== this.choosedCage) {
        this.$emit('update:choosedCage', this.cageId)
        // 切换鼠笼的时候，取消别的鼠笼的选中小鼠
        const mouseArr = this.allData.miceInfoByMiceCageQueryVO
        const ids = mouseArr.map((el) => {
          return el.miceInfoId
        })
        console.log(this.curMouseId)
        if (ids.indexOf(this.curMouseId) === -1) {
          this.curId = null
          this.$emit('update:curMouseId', null)
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .mouse-cage {
    width: 520px;
    height: 280px;
    border: 2px solid #D6D6D6;
    margin-bottom: 16px;

    &.isChoiced {
      border-color: #00CB7C;
      border-width: 2px;
    }

    // &+&{
    //   margin-left: 16px;
    // }

    &__header {
      height: 48px;
      background: #F0F0F0;
      border-bottom: 1px solid #D6D6D6;
      font-size: 14px;
      color: #333;
    }
    &__number {
      > p {
        margin-right: 16px;
        font-size: 15px;
      }
      > p > i {
        color: #666;
      }
    }

    &__list {
      height: calc( 100% - 48px );
    }

    &__mark {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: 2;
      border-width: 2px;
      border-style: solid;
      border-color: rgba(0, 0, 0, 0.1);

      &.isChoiced {
        border-color: #00CB7C;
      }
    }

    .list__title, .list__content {
      height: 100%;
      &--female, &--male {
        width: 66px;
        height: 50%;
      }
    }

    .list__content {
      padding: 10px 0;
      .el-checkbox-group {
        height: 100%;
      }
      &--female, &--male {
        width: 450px;
        min-height: 50%;
        overflow-x: auto;
      }
    }

    .mouse__item {
      width: 80px;
      height: 88px;
      padding: 0 13px;
      margin-right: 10px;
      box-sizing: border-box;
      border-width: 2px;
      border-style: solid;
      border-color: #fff;
      border-radius: 4px;
      font-size: 14px;
      color: #333;
      cursor: pointer;

      .mouse__checkbox {
        position: absolute;
        left: -12px;
        top: 0;
      }

      .el-checkbox__label {
        display: none;
      }
      &.isChoiced {
        border-color: #00CB7C;
      }

      &--female {
        background-color: #9A68B4;
      }

      &--male {
        background-color: #58A2FB;
      }

      p {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      span.item__miceNo {
        width: 80px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #999;
      }

      i {
        top: 17px;
        right: -3px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        border-radius: 10px;
        font-size: 12px;
        color: #fff;
      }
    }

    .fs50 {
      font-size: 50px;
    }

    &__status {
      span::before {
        content: '●';
        color: #D6D6D6
      }
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
  }
</style>
