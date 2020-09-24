const authenticate = async (url, body, onSuccess, onFailure) => {
    try {
        const promise = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const authToken = promise.headers.get("Authorization");
        document.cookie = `x-auth-token=${authToken}`;

        const json = await promise.json();

        if (json.username && authToken) {
            onSuccess({
                username: json.username,
                id: json._id
            })
        } else {
            onFailure()
        }
    } catch(e) {
        onFailure(e)
    }
};

export default authenticate