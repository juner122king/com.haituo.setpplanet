import storage from '@system.storage'

// 优化本地存储get方法
export function localStorage(key) {
    return new Promise((resolve, reject) => {
        storage.get({
            key,
            success: function (data) {
                resolve(data)
            },
            fail: function (data, code) {
                reject(data)
            }
        })
    })
}

export function setStorage(key, value = "") {
    return new Promise((resolve, reject) => {
        storage.set({
            key,
            value: JSON.stringify(value),
            success: function (data) {
                resolve(`setStorage success`);
            },
            fail: function (data, code) {
                reject(`setStorage fail, code = ${code}`);
            }
        });
    });
}

export function getStorage(key) {
    return new Promise((resolve, reject) => {
        storage.get({
            key,
            success: function (data) {
                if (data) {
                    const res = JSON.parse(data);
                    return resolve(res);
                }
                resolve(data);
            },
            fail: function (data, code) {
                reject(`getStorage fail, code = ${code}`);
            }
        });
    });
}

export function deleteStorage(key) {
    return new Promise((resolve, reject) => {
        storage.delete({
            key,
            success: function (data) {
                resolve(`deleteStorage success`);
            },
            fail: function (data, code) {
                reject(`deleteStorage fail, code = ${code}`);
            }
        });
    });
}

export function clearStorage() {
    return new Promise((resolve, reject) => {
        storage.clear({
            success: function (data) {
                resolve(`clearStorage success`);
            },
            fail: function (data, code) {
                reject(`clearStorage fail, code = ${code}`);
            }
        });
    });
}

export default {
    getStorage,
    setStorage,
};