<template>
  <!-- <div> -->
  <v-app>
    <v-navigation-drawer bottom style="width : 20rem ;" src="/navigation.jpg" app v-model="navigation" class="primary lighten-1">
          <v-layout column align-center>
            <nuxt-link style="text-decoration : none;" nuxt to="/cart" class="mt-5 white--text">
            <v-btn id="cart" color="transparent" class="mt-2 btns white--text">
              {{getCartLength}}<v-icon>mdi-cart-outline</v-icon>
              سبد خرید
            </v-btn>
            <v-row class="mt-4 justify-center">
                <v-icon class="white--text">mdi-account</v-icon><p v-if="$store.state.auth.loggedIn" class="subheading my-1 text-center">{{$store.state.auth.user.name}}</p> 
            </v-row>
                <!-- <v-avatar v-for="product in getCart" :key="product._id" size="40" >
                      <img :src="product.photo">
                </v-avatar> -->
            </nuxt-link>
          </v-layout>
    </v-navigation-drawer>
    <v-container fluid>
      <v-app-bar
        fixed
        dark
        class="mb-5"
        shrink-on-scroll
        fade-img-on-scroll
        color="rgba(19,84,122,.85)"
      >
      <!-- src="https://picsum.photos/1920/1080?random" -->
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
            src="/nav-bar.jpg"
          ></v-img>
        </template>

        <v-app-bar-nav-icon nuxt to="/home" ><v-icon color=indigo x-large>mdi-cupcake</v-icon></v-app-bar-nav-icon>
        <v-toolbar-title class="pb-2">کوکاریوم</v-toolbar-title>
        <template v-slot:extension>
          <template v-if="!$store.state.auth.loggedIn">
            <v-btn color="transparent" class="mt-2 btns" nuxt to="/Login">
              ورود
              <v-icon>
                mdi-account
              </v-icon>
            </v-btn>
            <v-btn color="transparent" class="mt-2 btns" nuxt to="/Signup">
              عضویت
              <v-icon>
              mdi-account-plus
              </v-icon>
            </v-btn>
          </template>
          <template v-if="$store.state.auth.loggedIn">
            <v-btn nuxt to="/address" color="transparent" class="mt-2 btns">
              <v-icon>mdi-truck-delivery-outline</v-icon>
              &nbsp;{{$store.state.auth.user.address ? $store.state.auth.user.address.fullName : 'به کجا ارسال شود'}}
            </v-btn>
            <v-btn nuxt to="/orders" color="transparent" class="mt-2 btns">
            <v-icon>mdi-newspaper-variant</v-icon>
            &nbsp;سفارشات من
            </v-btn>
          </template>
        </template>
        <v-spacer></v-spacer>
        <!-- <search-box></search-box> -->
        <v-tooltip v-if="$store.state.auth.loggedIn" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              nuxt
              to="/Profile"
              icon
            >
            <v-icon>mdi-account-cog</v-icon>
            </v-btn>
          </template>
          <span>ویرایش پروفایل</span>
        </v-tooltip>
        <v-tooltip v-if="$store.state.auth.loggedIn" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="logout"
              icon
            >
            <v-icon>mdi-door-closed</v-icon>
            </v-btn>
          </template>
          <span>خروج</span>
        </v-tooltip>
        <v-btn @click="$store.commit('navigationToggle')" class="ml-2 px-4" icon v-if="!$store.state.navigation">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-btn @click="$store.commit('navigationToggle')" class="ml-2 px-4" icon v-if="$store.state.navigation">
          <v-icon>mdi-drag-vertical</v-icon>
        </v-btn>
        <!-- <div class="flex-grow-1"></div> -->
      </v-app-bar>
      <app-bar style="margin-top : 13rem ;" />
      <nuxt />
      <snackbar />
    </v-container>
  </v-app>
  <!-- </div> -->
</template>

<script>

// import searchBox from "~/components/search-box"
import {mapGetters} from "vuex"
import appBar from "~/components/app-bar"
import snackbar from '~/components/snackbar';
export default {
  name: 'App',
  components: {
      // searchBox ,
      appBar ,
      snackbar
  },
  data() {
    return {
      navigation : false
    }
  },
  methods: {
    // drawer() {
    //   this.draw = !this.draw
    // } ,
    async logout() {
      await this.$auth.logout()
      location.reload()
      // window.location = "/"
    }
  },
  computed: {

        // be jaye v-model=navigation , $store.state.navigation bood . navigationOff nabood
        // this.$store.commit("navigationOff")
    ...mapGetters(["getCartLength" , "getCart" , "getNavigation"])
  },
  beforeCreate () {
      this.$vuetify.rtl = true;
  },
  watch: {
    getNavigation(newValue, oldValue) {
      this.navigation = newValue
    } ,
    navigation(newValue) {
      if(newValue !== this.getNavigation) {
        this.$store.commit("navigationToggle")
      }
    }
  },
};
</script>

<style scoped>
/* .btns {
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
} */
.v-input__control {
  background-color: whitesmoke !important
}
.v-navigation-drawer {
  margin-top: 3.3rem ;
  border-top-right-radius: 5em;
}
.v-application {
  text-size-adjust: auto;
  text-size-adjust: 80%;
}
* {
  font-family: IRANSans
}

#cart {
  /* animation: buzz 5s 5s 2s 10 0s none; */
  animation-name: buzz;
  animation-duration: 5s;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

@keyframes buzz {
  0% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.2);
  }
  25% {
    transform: rotate(15deg) scale(1.2)
  }
  28% {
    transform: rotate(-25deg) scale(1.2)
  }
  31% {
    transform: rotate(15deg) scale(1.2)
  }
  34% {
    transform: rotate(-8deg) scale(1.2)
  }
  37% {
    transform: rotate(3deg) scale(1.2)
  }
  60% {
    transform: scale(1);
  }
}
</style>
