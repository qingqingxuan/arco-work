<template>
  <a-card title="密码强度组件" segmented>
    <div class="w-1/3" style="margin: 0 auto">
      <a-input v-model="password1" placeholder="请输入密码" />
      <PasswordStrong :input-value="password1" />
      <a-input v-model="password2" placeholder="请再次输入密码" />
      <div class="mt-5 text-center">
        <a-button size="small" type="primary" round style="width: 100%">确定</a-button>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const password1 = ref('')
  const password2 = ref('')
</script>
