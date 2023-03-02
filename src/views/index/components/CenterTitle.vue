<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup() {
      return () => (
        <div class="title-container">
          <div class="left">2022-05-40</div>
          <div class="center">ArcoWork平台管理</div>
          <div class="right">当前在线人数：2502</div>
        </div>
      )
    },
  })
</script>
<style lang="less" scoped>
  .title-container {
    padding: 10px;
    display: flex;
    text-align: center;
    .left,
    .right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(var(--primary-1));
      font-size: 16px;
      font-weight: 500;
    }
    .center {
      flex: 1;
      font-size: 18px;
      font-weight: bold;
      background-color: rgb(var(--primary-1));
      color: #fff;
      border-radius: 2px;
      padding: 6px 0;
    }
    .right {
      flex: 1;
    }
  }
</style>
