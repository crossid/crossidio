<template>
  <div>
    <h1>Public Page</h1>
    <router-link to="/protected">Move to protected route</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Unprotected",
});
</script>    
