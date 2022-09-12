import { Router, START_LOCATION } from 'vue-router'
import store from './store'



export function requiresAuthGuard(router: Router) {

    router.beforeEach(async (to: any, from: any) => {
      const userSession = store
  
      if (from === START_LOCATION && userSession.getters.isLoggedIn) {
        try {
          // console.log( userSession.state.token)
  
        } catch (err) {
          // delete stored token if it fails
          console.log(userSession.dispatch);
          userSession.dispatch("logoutUser")
          if (to.meta.requiresAuth) {
            // redirect the user somewhere
            return {
              name: 'login',
              // save the location we were at to come back later
              query: { redirect: to.fullPath },
            }
          }
        }
      } else if (to.meta.requiresAuth && !userSession.getters.isLoggedIn) {
        return {
          name: 'login',
          // save the location we were at to come back later
          query: { redirect: to.fullPath },
        }
      }
    })
}