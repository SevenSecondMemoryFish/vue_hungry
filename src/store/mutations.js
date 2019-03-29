
import {
  MUTATIONS_SHOP_DETAIL,
  MUTATIONS_ADD_SEARCH_HISTORY,
  MUTATIONS_REMOVE_SEARCH_HISTORY,
  MUTATIONS_REMOVE_ITEM_SEARCH_HISTORY,
  MUTATIONS_SELECTED_SEARCH_ADDRESS
} from './mutation-types'

export  default  {
  [MUTATIONS_SHOP_DETAIL](state,detail){
    console.log("detail",detail);
    state.shop_deatail = detail;
  },
  [MUTATIONS_ADD_SEARCH_HISTORY](state,history){
    state.search_history_list.push(history);
  },
  [MUTATIONS_REMOVE_ITEM_SEARCH_HISTORY](state,index){
    if (index >= state.search_history_list.length)return
    state.search_history_list.splice(index,1);
  },
  [MUTATIONS_REMOVE_SEARCH_HISTORY](state){
    state.search_history_list = [];
  },
  [MUTATIONS_SELECTED_SEARCH_ADDRESS](state,item){
    state.selected_search_address = item;
  }
}
