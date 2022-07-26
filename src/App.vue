<template>
  <div id="app">
    <NavBar :srcLogo="navBar.srcLogo" :alt="navBar.alt" :title="navBar.title" />
    <div class="container p-1 my-3 d-flex flex-column min-vh-100">      
      <router-view></router-view>
    </div>    
    <Footer class="mt-auto"/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import Footer from "@/components/Footer.vue"
export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      navBar: {
        srcLogo: "img\logo.png",
        alt: "logo",
        title: "ANC-App",
      },
    }
  },
}
</script>

<style scoped>
  #app {
    background-color: rgba(199,199,199,0.5);
  }
</style>
