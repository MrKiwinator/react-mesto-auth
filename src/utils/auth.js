class Auth {
    constructor(baseUrl) {
        this._url = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(email, password) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then(this._checkResponse)
    };

    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then(this._checkResponse)
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                return data;
            })
            .catch((err) => console.log(err));
    };

    getToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => data)
      } 
}

const auth = new Auth ("https://auth.nomoreparties.co")

export default auth;
