// 动态判断域名
// let host = /localhost/.test(window.location.host) ? 'http://baojia-test.chelun.com' : 'https://baojia.chelun.com';
let host = 'https://baojia.chelun.com';
/**
 * 请求数据
 * @param url 地址
 * @param method 请求方式
 * @param data 传递的数据
 */

function sendRequest(url, method = 'GET', data = {}) {
  let params = {
    method
  }
  // 判断如果是一个POST请求,带上请求体信息
  if (method == 'POST') {
    params.body = JSON.stringify(data)
  }
  // 判断请求查询url是否携带query参数
  if (url.indexOf('?') == -1) {
    url += `?_${(+new Date())}`
  } else {
    url += `&_${(+new Date())}`
  }
  return fetch(host + url, params).then(res => res.json()).then(body => body)
}
/**
 * 请求车辆品牌列表数据
 */
export let getBrandList = () => {
  return sendRequest('/v2-car-getMasterBrandList.html');
}

/**
 * 请求车系列表数据
 * @param id MasterID
 */
export let getMakeList = (id) => {
  return sendRequest(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`);
}

/**
 * 请求详情信息
 * @param id SerialID
 */
export let getInfoAndListById = (id) => {
  return sendRequest(`/v2-car-getInfoAndListById.html?SerialID=${id}`);
}

export let getCityInfo = () => {
  return sendRequest(`/location-client.html?_${(+new Date)}`);
}

export let getDealerList = (payload) => {
  return sendRequest(`/v2-dealer-alllist.html?carId=${payload.carId}&cityId=${payload.cityId}&_${(+new Date)}`);
}
/**
 * 获取图片列表的接口
 * @param {*} serialId  车系id
 * @param {*} imgId   图片分类id
 * @param {number} [page=1] 分页页码数
 * @param {number} [pageSize=30] 分页每页数量
 * @param {*} carId  车型id
 * @param {*} colorId 颜色id
 * @returns promise
 */
export let getCategoryImgList = (param) => {
  let search = ``;
  for (let i in param) {
    search += `&${i}=${param[i]}`;
  }
  // 补充page与pageSize
  if (!param['Page']) {
    search += `&Page=1`;
  }
  if (!param['PageSize']) {
    search += `&PageSize=30`;
  }
  return sendRequest(`/v2-car-getCategoryImageList.html?${search.slice(1, search.length)}`);
}

/**
 * 获取图片列表
 * param[0]  SerialID
 * param[1]  ColorID
 * param[2]  SerialID
 */
export let getImgs = (param) => {
  if (param[1]) {
    return sendRequest(`/v2-car-getImageList.html?SerialID=${param[0]}&ColorID=${param[1]}&_${(+new Date)}`)
  } else if (param[2]) {
    return sendRequest(`/v2-car-getImageList.html?SerialID=${param[0]}&CarID=${param[2]}&_${(+new Date)}`)
  } else if (param[1] && param[2]) {
    return sendRequest(`/v2-car-getImageList.html?SerialID=${param[0]}&CarID=${param[2]}&ColorID=${param[1]}&_${(+new Date)}`)
  } else {
    return sendRequest(`/v2-car-getImageList.html?SerialID=${param[0]}&_${(+new Date)}`)
  }
}
/**
 * 获取省份列表
 */
export let getCityList = () => {
  return sendRequest(`/v1-city-alllist.html?_${(+new Date)}`);
}
/**
 * 获取城市列表
 * id  provinceid
 */
export let getProCity = (id) => {
  return sendRequest(`/v1-city-alllist.html?provinceid=${id}&_${(+new Date)}`);
}
/**
 * 获取颜色列表
 * id SerialID
 */
export let getColorList = (id) => {
  return sendRequest(`/v2-car-getModelImageYearColor.html?SerialID=${id}&_${(+new Date)}`);
}
