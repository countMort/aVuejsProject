export const state = () => ({
    cart : [] ,
    cartLength : 0 ,
    shippingPrice : 0 ,
    shippingEstimatedDelivery : "" ,
    createdTime : "" ,
    deliverTo : "" ,
    navigation : false ,
    popShow : false ,
    popMsg : '' ,
    popType : '' ,
    cartWatched : []
})

export const mutations = {
    navigationToggle(state) {
        state.navigation = !state.navigation
    },
    navigationOn(state) {
        state.navigation = true
    },
    pushProductToCart(state , {product , quantity}) {
        let totalPrice = quantity*product.price
        product.quantity = Number(quantity)
        product.totalPrice = totalPrice
        state.cart.push(product)
    } ,
    changeProductQty(state , {cartProduct , quantity}) {
        let changedTotalPrice = quantity*cartProduct.price
        cartProduct.quantity = Number(quantity)
        let indexOfProduct = state.cart.indexOf(cartProduct)
        cartProduct.totalPrice = changedTotalPrice
        state.cart.splice(indexOfProduct , 1 , cartProduct)
    } ,
    incrementCartLength(state) {
        state.cartLength = 0 ;
        if(state.cart.length > 0) {
            state.cart.map(product => {
                state.cartLength += Number(product.quantity)
            })
        }
    } ,
    removeProduct(state , product) {
        state.cartLength -= product.quantity
        let indexOfProduct = state.cart.indexOf(product)
        state.cart.splice(indexOfProduct , 1)
    } ,
    setShipping(state , {price , estimatedDelivery , createdTime , deliverTo}) {
        state.shippingPrice = price ,
        state.shippingEstimatedDelivery = estimatedDelivery
        state.createdTime = createdTime
        state.deliverTo = deliverTo
    } ,
    clearCart(state) {
        state.cart = [] ;
        state.cartLength = 0 
        state.shippingPrice = 0 
        state.shippingEstimatedDelivery = ""
        state.createdTime = null
        state.deliverTo = null
    } ,
    push (state , {msg , type}) {
        state.popMsg = msg 
        state.popType = type
        state.popShow = true
    } ,
    pushEnd (state) {
        state.popShow = false
        state.popType = null
        state.popMsg = ''
    } ,
    cartWatchedPush (state , product) {
        state.cartWatched = state.cartWatched.filter(prod => prod._id !== product._id )
        state.cartWatched.unshift(product)
    }
}

export const actions = {
    addProductToCart({state , commit} , {product , quantity}) {
        const cartProduct = state.cart.find(prod => prod._id === product._id)
        if(!cartProduct){
            commit("pushProductToCart" , {product , quantity}) ;
        }else {
            commit("changeProductQty" , {cartProduct , quantity})
        }
        commit("incrementCartLength")
    } ,
    notif({commit} , {msg , type}) {
        commit('pushEnd')
        commit('push' , {msg : msg , type : type})
        setTimeout(function() {
            commit('pushEnd')
        }.bind(this), 4000)
    }
}

export const getters = {
    getCartLength(state) {
        return state.cartLength
    } ,
    getCart(state) {
        return state.cart
    } ,
    getCartTotalPrice(state) {
        let total = 0
        state.cart.map(product => {
            total += product.totalPrice
        })
        return total
    } ,
    getCartTotalPriceWithShipping(state) {
        let total = 0
        state.cart.map(product => {
            total =+ product.totalPrice
        })
        return total + state.shippingPrice
    } ,
    getEstimatedDelivery(state) {
        return state.shippingEstimatedDelivery
    } ,
    getNavigation(state) {
        return state.navigation ;
    } ,
    getPopShow(state) {
        return state.popShow
    } ,
    getCartWatched(state) {
        return state.cartWatched
    }
}