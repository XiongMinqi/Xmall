import service from './index'

export default {
    // 获取首页数据
    getdata() {
        return service.req('goods/home')
    },
    // 新增收货地址
    addAddress({
        username,
        phone,
        address,
        isDefault
    }) {
        return service.req('address/addAddress', {
            username,
            phone,
            address,
            isDefault
        })
    },
    // 获取全部地址
    getaddress() {
        return service.req('address/list')
    },
    // 加入购物车
    joincart({ productId }) {
        return service.req('goods/addCart', {
            productId
        })
    },
    // 查询购物车
    checkcart() {
        return service.req('goods/getCart')
    },
    // 修改购物车数量
    editnumber({ productId, count }) {
        return service.req('goods/editCart', {
            productId,
            count
        })
    },
    // 删除购物车
    deleteshaoppingcart({ productId }) {
        return service.req('goods/delCart', {
            productId
        })
    },
    // 登录
    login({ username, password }) {
        return service.req('users/login', {
            username,
            password
        })
    },
    // 注册
    register({ username, password }) {
        return service.req('users/register', {
            username,
            password
        })
    },
    // 获取全部商品
    allGoods({ page, size, sort, priceGt, priceLte }) {
        // 顺序和价格区间都存在
        if (page && size && sort && priceGt && priceLte) {
            console.log(111);
            return service.req(`goods/allGoods?page=${page}&size=${size}}&sort=${sort}&priceGt=${priceGt}&priceLte=${priceLte}`)
        }
        //只存在顺序
        if (page && size && sort) {
            console.log(222);
            return service.req(`goods/allGoods?page=${page}&size=${size}&sort=${sort}`)
        }
        // 只存在价格区间
        else if (page && size && priceGt && priceLte) {
            console.log(333);
            return service.req(`goods/allGoods?page=${page}&size=${size}&priceGt=${priceGt}&priceLte=${priceLte}`)
        }
        // 顺序价格和区间都不存在
        else {
            console.log(444);
            return service.req(`goods/allGoods?page=${page}&size=${size}`)
        }

    }

}