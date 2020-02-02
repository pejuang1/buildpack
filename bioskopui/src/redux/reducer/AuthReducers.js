const INITIAL_STATE={
    id:'',
    username:'',
    password:'',
    login:false,
    role:'',
    cart:0

   
}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return{...state,...action.payload,login:true}
        case 'Tambah_Cart':
            return{...state,cart:action.payload}
        case "GANTI_PASSWORD":
            return { ...state, ...action.payload };
        default:
            return state
    }
}