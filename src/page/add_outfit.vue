<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">纪录穿搭</header>
    </section>
    <el-row style="margin-top: 20px;">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
        <el-form-item label="记录日期" class="block">
          <el-date-picker
              v-model="formData.time"
              type="date"
              placeholder="选择日期时间">
          </el-date-picker>
          <el>（未选择则默认当下时间）</el>
        </el-form-item>
        <el-form-item label="选择温度">
          <el-slider v-model="formData.t" :min="-30" :max="40" :show-input="true" :step="1"></el-slider>
        </el-form-item>
        <el-form-item label="上衣" prop="up">
          <el-radio v-model="formData.up" label="棉袄">棉袄</el-radio>
          <el-radio v-model="formData.up" label="夹克">夹克</el-radio>
          <el-radio v-model="formData.up" label="卫衣">卫衣</el-radio>
          <el-radio v-model="formData.up" label="短袖">短袖</el-radio>
        </el-form-item>
        <el-form-item label="下衣" prop="down">
          <el-radio v-model="formData.down" label="棉裤">棉裤</el-radio>
          <el-radio v-model="formData.down" label="秋裤">秋裤</el-radio>
          <el-radio v-model="formData.down" label="加绒">加绒</el-radio>
          <el-radio v-model="formData.down" label="单裤">单裤</el-radio>
          <el-radio v-model="formData.down" label="短裤">短裤</el-radio>
        </el-form-item>
        <el-form-item label="鞋子" prop="shoes">
          <el-radio v-model="formData.shoes" label="球鞋">球鞋</el-radio>
          <el-radio v-model="formData.shoes" label="布鞋">布鞋</el-radio>
          <el-radio v-model="formData.shoes" label="皮鞋">皮鞋</el-radio>
        </el-form-item>
        <el-form-item label="手饰" prop="hands">
          <el-radio v-model="formData.hands" label="遮阳帽">遮阳帽</el-radio>
          <el-radio v-model="formData.hands" label="冰袖">冰袖</el-radio>
          <el-radio v-model="formData.hands" label="围巾">围巾</el-radio>
        </el-form-item>
        <el-form-item class="button_submit">
          <el-button type="primary" @click='add_outfit'>立即添加</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import headTop from '@/components/headTop'

export default {
  data() {
    return {
      formData: {
        date: '',
        t: 16,
        up: '棉袄',
        down: '棉裤',
        shoes: '球鞋',
        hands: '遮阳帽',
      },
      sqlData: {
        year: 2023,
        month: 7,
        day: 13,
        t: 16,
        up: '',
        down: '',
        shoes: '',
        hands: '',
      },
    }
  },
  components: {
    headTop,
  },
  methods: {
    add_outfit() {
      if (this.formData.date === '') {
        this.formData.date = new Date();
      }
      this.sqlData.year = this.formData.date.getFullYear();
      this.sqlData.month = this.formData.date.getMonth() + 1;
      this.sqlData.day = this.formData.date.getDate();
      this.sqlData.t = this.formData.t;
      this.sqlData.up = this.formData.up;
      this.sqlData.down = this.formData.down;
      this.sqlData.shoes = this.formData.shoes;
      this.sqlData.hands = this.formData.hands;

      this.$confirm('时间：' + this.sqlData.year + '-' + this.sqlData.month + '-' + this.sqlData.day + ' 温度：' + this.sqlData.t + ' 您选择了' + this.sqlData.up + ',' + this.sqlData.down + ',' + this.sqlData.shoes + ',' + this.sqlData.hands, '新增提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.$axios.post('outfit/add_outfit/', {
          "name": sessionStorage.getItem("login_name"),
          "year": this.formData.year,
          "month": this.formData.month,
          "day": this.formData.day,
          "t": this.formData.t,
          "up": this.formData.up,
          "down": this.formData.down,
          "shoes": this.formData.shoes,
          "hands": this.formData.hands,
        }).then(
            () => {
              this.$message({
                type: 'success',
                message: "添加成功"
              });
            },
            (err) => {
              this.$message({
                type: 'error',
                message: '错误信息：' + err
              });
            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    }
  }
}
</script>

<style lang="less">
@import '../style/mixin';

.table_container {
  padding: 20px;
}

.data_section {
  padding: 20px;
  margin-bottom: 40px;

  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
}
</style>