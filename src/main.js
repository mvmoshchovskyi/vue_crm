import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import messagePlugin from "@/utils/message.plugin";
import titlePlugin from "@/utils/title.plugin";
import tooltipDirective from "./directives/tooltip.directive";
import "materialize-css/dist/js/materialize.min";
import Loader from "@/components/app/Loader"
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import Paginate from 'vuejs-paginate'
import VueMeta from "vue-meta"

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin)
Vue.use(Vuelidate);
Vue.use(VueMeta)
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.directive("tooltip",tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey : process.env.VUE_APP_API_KEY,
  authDomain: "vue-crm-87fcd.firebaseapp.com",
  databaseURL: "https://vue-crm-87fcd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-crm-87fcd",
  storageBucket: "vue-crm-87fcd.appspot.com",
  messagingSenderId: "428585768938",
  appId: "1:428585768938:web:198fec7e4f76cc7c0cc493",
  measurementId: "G-R5D66W0EV4"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
