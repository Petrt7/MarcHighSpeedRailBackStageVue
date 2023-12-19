import httpClient from "@/main";
import router from "./router";


export const view = function (path) {
    return httpClient.get(`/view`, {
        params: {
            name: path
        }
    })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            router.push("/error")
            return err.response.data
        })
};

export const create = function (path) {
    return httpClient.get(`/create`, {
        params: {
            name: path
        }
    })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
};

export const del = function (path) {
    return httpClient.get(`/delete`, {
        params: {
            name: path
        }
    })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
};