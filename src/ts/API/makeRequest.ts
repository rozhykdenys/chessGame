export const makeRequest = (url: string, params: any) => {
    return fetch(url, {
        method: params.method,
        body: JSON.stringify(params.body),
        headers: {
            'Content-type': "application/json; charset=UTF-8",
        }
    })
}
