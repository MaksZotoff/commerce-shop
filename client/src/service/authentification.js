import axios from "axios";

class Authentification {
    signin(login, password) {
        return axios.post("http://localhost:8080/login", {
                login,
                password
            })
            .then(res => {
                if (res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
                return res
            })
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(name, surname, patronym, login, email, password) {
        return axios.post("http://localhost:8080/signup", {
            name, 
            surname,
            patronym,
            login,
            email,
            password
        })
            .then(res => { return res });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

}

export default new Authentification();