<template>
  <div class="fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%;width: 13%; background-color: #324057; ">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="manage"><i class="el-icon-menu"></i>今日</el-menu-item>
          <el-menu-item index="outfit_list"><i class="el-icon-document"></i>穿搭记录</el-menu-item>
          <el-menu-item index="add_outfit"><i class="el-icon-plus"></i>增添数据</el-menu-item>
          <el-menu-item index="user_set"><i class="el-icon-warning"></i>说明</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return{

    }
  },
  methods:{

  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '');
    }
  }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';

.fillcontain{
  min-width: 875px; // 设置的最小宽度，小于1024时，会出现滚动条
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>