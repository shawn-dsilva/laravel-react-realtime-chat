import Echo from "laravel-echo";

export const echoInit = token => {
    window.Pusher = require("pusher-js");

    window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        wsHost: window.location.hostname,
        wsPort: 6001,
        disableStats: true,
        forceTLS: false
    });

    window.Echo.connector.options.auth.headers["Authorization"] =
        "Bearer " + token;
    window.Echo.options.auth = {
        headers: {
            Authorization: "Bearer " + token
        }
    };

    window.Echo.join("chat");
};

export const sendMessage = ( message, channel_id) => {
    const body = JSON.stringify({ message, channel_id });

    const postHeaders = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("LRC_Token"),
            "Content-Type": "application/json"
        }
    };
    axios
        .post("/api/messages", body, postHeaders)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            const errors = err.response.data.errors;
            console.log(errors);
            Object.values(errors).map(error => {
                console.log(error.toString());
            });
        });
};
