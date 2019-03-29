
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex);

const  state = {
  shop_deatail :null,///商店详情
  search_history_list:[],/// 搜索历史
  selected_search_address:null,/// 选择的搜索的地址

}
export default  new Vuex.Store({
  state,
  mutations
})

