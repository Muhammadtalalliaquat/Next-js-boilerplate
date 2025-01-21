const DEV_URL = `http://localhost:4000/`
// const PROD_URL = `http://localhost:4000/`

export const BASIC_URL = DEV_URL

export const ApiRoutes = {
    login: BASIC_URL + `user/login`,
    register: BASIC_URL + `user/register`,
    verifyEmail: BASIC_URL + `user/verifyemail`,
    forgotPassword: BASIC_URL + `user/requestPasswordReset`,
    getTask: BASIC_URL + `task`,
    postTask: BASIC_URL + `task`,
    editTask: BASIC_URL + `task`,
    deleteTask: BASIC_URL + `task`,
}
