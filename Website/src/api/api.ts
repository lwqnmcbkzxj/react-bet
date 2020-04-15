import Axios from 'axios';

const instance = Axios.create({
    baseURL: "",
    headers: {
        "Authorization": ""
    }
});

// export const setToken = (token) => {
//     instance.defaults.headers.Authorization = "Bearer " + token;
// }



export const userAPI = { 
    login(email: string, password: string) {
        return instance.post(`login`, { "email": email, "password": password })
            .then((response) => {
                return response.data
            }
        );
    },

    // register(login, email, password) {
    //     return instance.post(`register`, { login, email, password })
    //         .then((response) => {
    //             return response.data
    //         }
    //     );
    // },    
}
