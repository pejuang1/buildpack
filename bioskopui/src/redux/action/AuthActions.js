export const LoginSuccessAction=(datauser)=>{
    return{
        type:'LOGIN_SUCCESS',
        payload:datauser
    }
}


export const GantiPassword = passwordbaru => {
    return {
      type: "GANTI_PASSWORD",
      payload: passwordbaru
    };
  };