// import UserLogin from "@/views/user/login/UserLogin"
import UserList from "@/views/user/user-list/UserList"
// import UserCreate from "@/views/user/user-create/UserCreate.vue"
// import UserEdit from "@/views/user/user-edit/UserEdit.vue"
// import UserList from "@/views/user/user-list/UserList.vue"

// User Routes
const UserRoute = [
  {
    path: '/user-list',
    name: 'user.list',
    component: UserList
  },
  // {
  //   path: '/user-create',
  //   name: 'user.create',
  //   component: UserCreate
  // },
  // {
  //   path: '/user-edit/:id',
  //   name: 'user.edit',
  //   component: UserEdit,
  // },
  // {
  //   path: '/user-list',
  //   name: 'user.list',
  //   component: UserList,
  // },
]
export default UserRoute