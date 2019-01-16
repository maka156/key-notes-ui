<template>
  <v-app>
    <v-content>
      <v-layout justify-center>
          <div class="padding-top-50 padding-bottom-30">
            <div class="display-2">key Notes</div>
            <span class="subheading">One place to save your notes</span>
        </div>
      </v-layout>
      <Notes/>
    </v-content>
    <Footer/>
  </v-app>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .padding-top-50 {
    padding-top: 50px;
  }
  .padding-bottom-30 {
    padding-bottom: 30px;
  }
</style>

<script>
import Notes from './components/Notes'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Notes,
    Footer
  },
  data () {
    return {
      //
    }
  }
}
</script>
