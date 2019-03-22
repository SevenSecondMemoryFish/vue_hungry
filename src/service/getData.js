
import network from './network'

export const  msiterFoodTypes = params =>{
  return network.get('v2/index_entry',{
    'geohash':params
  });
};

export  const shopListNetwork = (page) => {
  return  network.get('/shopping/restaurants',{
    'limit':'20',
    'offset':0,
    'latitude': '32.88901',
    'longitude': '108.50777'
  });
};
/**
 * 获取图片验证码
 * @returns {*}
 */
export const  getcaptchas = ()=>{
  return network.post('/v1/captchas',{})
};

export  const  shopDetails = (shopId) =>{
  return network.get('shopping/restaurant/'+shopId,{
    'latitude': '32.88901',
    'longitude': '108.50777'
  });

};
export  const  shopStoreMenuList = (storeId) =>{
  return network.get("shopping/v2/menu",{
    restaurant_id:storeId
  });
};
/**
 * 分类数据
 * @returns {*}
 */
export  const categoryServiceList = ()=>{
  return network.get("shopping/v2/restaurant/category",{});
};
/**
 * 筛选配送方式
 * @returns {*}
 */
export  const  deliveryModes = ()=>{
  return network.get("shopping/v1/restaurants/delivery_modes",{
    latitude: "40.13095",
    longitude: "116.65905"
  })
};
/**
 * 筛选商家属性
 * @returns {*}
 */
export  const  activityAttributes = ()=>{
  return network.get("shopping/v1/restaurants/activity_attributes",{
    latitude: "40.13095",
    longitude: "116.65905"
  });
};
/**
 * 搜索商家
 * @param keyword
 * @returns {*}
 */
export  const  searchStore = (keyword) =>{
  return network.get("v4/restaurants",{
    geohash: "40.13095,116.65905",
    keyword,
    tyepe:'search',
    extras:"restaurant_activity"

  })
};

