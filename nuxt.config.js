// import colors from 'vuetify/es5/util/colors'
// const URL = "http://localhost:3000"
const URL = "https://cookarium-apis.herokuapp.com"

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  // mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    // title: process.env.npm_package_name || '',
    title : "Cookarium - کوکاریوم" ,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' } ,
      { name:'theme-color' , content : '#1e76a6'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/font'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {
      src : "~/plugins/localStorage.js" ,
      ssr : false
    }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth' ,
    [
      "nuxt-compress",
      {
        gzip: {
          cache: true
        },
        brotli: {
          threshold: 10240
        }
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy : true ,
    baseURL : URL
  },

  proxy : {
    "/api" : URL
  } ,

  pwa : {
    icon : {
      source : '~/static/icon.png' ,
    } ,
    manifest : {
      short_name : 'CKM' ,
      name : 'Cookarium' ,
      lage : "fa" ,
      start_url : '/' ,
      theme_color : '#1e76a6' ,
      icons : [
        {
          source : '~/static/icon.png' ,
          purpose : 'manifest'
        }
      ]
    } ,
  } ,
  
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  // vuetify: {
  //   customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     // dark: true,
  //     themes: {
  //       dark: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3
  //       }
  //     }
  //   }
  // },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  } ,
  server: {
    port : 9000
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
        }
      }
    }
  }
}
