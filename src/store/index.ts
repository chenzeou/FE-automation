
import { createStore } from 'vuex';
import { getAllStoreModules } from '@/utils/Store';

export default createStore({
  modules: getAllStoreModules(),
  getters: {}
})
