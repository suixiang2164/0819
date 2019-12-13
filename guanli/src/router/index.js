import Vue from 'vue'
import Router from 'vue-router'




// import login from '../pages/login'
// import index from '../pages/index'
const login = () => import('../pages/login')
const index = () => import('../pages/index')
const welcome = () => import('../components/welcome')

const manage = () => import('../components/manage')


const banner = () => import('../components/banner')
const education = () => import('../components/education')
const water = () => import('../components/water')
const housekeeping = () => import('../components/housekeeping')
const repair = () => import('../components/repair')
const changepass = () => import('../components/changepass')



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: '',
          component: welcome
        },
        {
          path: 'manage',
          component: manage,
          name: "管理员管理",
          beforeEnter(to, from, next) {
            // console.log(to);
            // console.log(from);
            if (localStorage.getItem("login_type") == 0) {
              next()
            }
          }
        },
        {
          path: 'banner',
          component: banner,
          name: "banner管理",
          beforeEnter(to, from, next) {
            // console.log(to);
            // console.log(from);
            if (localStorage.getItem("login_type") == 1) {
              next()
            }
          }
        },
        {
          path: 'education',
          component: education,
          name: "家教管理",
          beforeEnter(to, from, next) {
            // console.log(to);
            // console.log(from);
            if (localStorage.getItem("login_type") == 1) {
              next()
            }
          }
        },
        {
          path: 'water',
          component: water,
          name: "水站管理",
          beforeEnter(to, from, next) {
            // console.log(to);
            // console.log(from);
            if (localStorage.getItem("login_type") == 1) {
              next()
            }
          }
        },
        {
          path: 'housekeeping',
          component: housekeeping,
          name: "家政管理",
          beforeEnter(to, from, next) {
            // console.log(to);
            // console.log(from);
            if (localStorage.getItem("login_type") == 1) {
              next()
            }
          }
        },
        {
          path: 'repair',
          component: repair,
          name: "维修管理",
          beforeEnter(to, from, next) {
            // console.log(to);
            // console.log(from);
            if (localStorage.getItem("login_type") == 1) {
              next()
            }
          }
        },
        {
          path: 'changepass',
          component: changepass,
          name: "修改密码",
          beforeEnter(to, from, next) {
            // console.log(to);
            // console.log(from);
            if (localStorage.getItem("login_type") == 1) {
              next()
            }
          }
        }
      ]
    },
    {
      path: '*',
      redirect: 'login'
    },
  ]
})
