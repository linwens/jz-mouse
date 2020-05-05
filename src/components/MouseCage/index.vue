<template>
  <div class="mouse-cage pos-r" :class="{'isChoiced': cageId == choosedCage}" @click="disabled ? null : chooseCage()">
    <div class="mouse-cage__header df s-jcsa s-aic">
      <div class="mouse-cage__number df s-jcc">
        <p>01<i>笼位</i></p>
        <p>25<i>房间</i></p>
        <p>42<i>架号</i></p>
      </div>
      <div class="mouse-cage__man">
        负责人
        <el-button size="mini" @click="shift ? chageMan() : null">
          张三
          <svg-icon v-if="shift" icon-class="shift" class="cl-green" />
        </el-button>
      </div>
      <div class="mouse-cage__status">
        <span class="isIdle">闲置</span>
        <span class="isExpt">实验</span>
        <span class="isBreed">繁育</span>
      </div>
    </div>
    <div class="mouse-cage__list df s-jcfs">
      <div class="list__title df s-fdc s-aic s-jcfs">
        <div class="list__title--female df s-fdc s-aic s-jcc">
          <svg-icon icon-class="female" class="fs40 mb4" />
          <span>15只</span>
        </div>
        <div class="list__title--male df s-fdc s-aic s-jcc">
          <svg-icon icon-class="male" class="fs40 mb4" />
          <span>15只</span>
        </div>
      </div>
      <div class="list__content">
        <el-checkbox-group v-model="checkList" @change="taggleMouse()">
          <div class="list__content--male df s-jcfs s-aic ofh">
            <div
              v-for="item in items"
              :key="item.id"
              class="mouse__item ta-c"
              :class="{'isChoiced': item.id == curId}"
            >
              <div class="pos-r">
                <el-checkbox :disabled="!isActive" class="mouse__checkbox" :label="item.id" />
                <div @click="taggle(item.id)">
                  <svg-icon icon-class="mouse" class="fs50" />
                  <p>AD-01</p>
                  <span>fdafdfs</span>
                  <i class="pos-a mouse__item--female">02</i>
                </div>
              </div>
            </div>
          </div>
          <div class="list__content--female df s-jcfs s-aic ofh">
            <div
              v-for="item in items"
              :key="item.id"
              class="mouse__item pos-r ta-c"
            >
              <div class="pos-r">
                <el-checkbox :disabled="!isActive" class="mouse__checkbox" :label="item.id" />
                <div @click="taggle(item.id)">
                  <svg-icon icon-class="mouse" class="fs50" />
                  <p>AD-01</p>
                  <span>fdafdfs</span>
                  <i class="pos-a mouse__item--male">02</i>
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
        <p class="cl-black fs14 mb10">当前负责人: {{ '张三' }}</p>
        <el-form ref="mansForm" :model="mansForm" label-position="left" size="mini">
          <el-form-item
            label="更换为:"
            label-width="80px"
            class="mb8"
            prop="name"
            :rules="[
              { required: true, message: '新的负责人不能为空', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="mansForm.name"
              placeholder="请输入新的负责人"
              class="w250"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="manDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="addTag()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MouseCage',
  props: {
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
      type: String,
      default: ''
    },
    // 当前选中的鼠笼id
    choosedCage: {
      type: String,
      default: ''
    },
    // 选中的小鼠
    choicedList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      curId: null,
      items: [
        {
          id: 1
        }, {
          id: 2
        }, {
          id: 3
        }, {
          id: 4
        }, {
          id: 5
        }, {
          id: 6
        }, {
          id: 7
        }, {
          id: 8
        }, {
          id: 9
        }, {
          id: 10
        }, {
          id: 11
        }
      ],
      // 更换负责人
      manDialog: false,
      mansForm: {
        name: ''
      },
      // 鼠笼checkbox
      checkList: [],
      // 选择笼位
      choiceCage: false
    }
  },
  methods: {
    taggle(id) {
      if (this.curId === id) { // 再次点击取消选框
        this.curId = null
      } else {
        this.curId = id
      }
      console.log(id, this.curId)
    },
    // 切换负责人
    chageMan() {
      this.manDialog = true
    },
    // 多选框选中小鼠
    taggleMouse() {
      this.$emit('update:choicedList', this.checkList)
    },
    // 选择鼠笼
    chooseCage() {
      if (this.cageId !== this.choosedCage) {
        console.log('this.cageId', this.cageId)
        console.log('this.choosedCage', this.choosedCage)
        this.$emit('update:choosedCage', this.cageId)
      }
    }
  }
}
</script>

<style lang="scss">
  .mouse-cage {
    width: 538px;
    height: 280px;
    border: 1px solid #D6D6D6;

    &.isChoiced {
      border-color: #00CB7C;
    }

    &+&{
      margin-left: 16px;
    }

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
      &--female, &--male {
        width: 470px;
        overflow-x: scroll;
      }
    }

    .mouse__item {
      width: 80px;
      height: 88px;
      padding: 0 13px;
      margin-right: 3px;
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

      span {
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
