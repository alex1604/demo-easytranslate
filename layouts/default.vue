<template>
  <v-app class="app-container">
    <v-app-bar class="nav-bar" :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
      <small>My Workspace</small>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "MY WORKSPACE",
    };
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  background-color: #f8f9fd;

  .nav-bar {
    background-color: white !important;
    color: #377add;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
    padding: 0 2rem;
  }
}
</style>
