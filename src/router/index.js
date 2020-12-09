import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Editor from "../views/Editor.vue";
import CreateNew from "../views/CreateNew.vue";
import ModifyNews from "../views/ModifyNews.vue";
import Newstable from "../views/Newstable.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  {
    path: "/editor",
    name: "editor",
    component: Editor,
  },
  {
    path: "/news/:username",
    component: Newstable,
  },
  {
    path: "/CreateNew",
    name: "CreateNew",
    component: CreateNew,
  },
  {
    path: "/ModifyNews",
    name: "ModifyNews",
    component: ModifyNews,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes,
});

export default router;
