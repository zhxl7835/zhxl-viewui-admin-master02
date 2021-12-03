import request from '../request'

export function deleteBooks(id) {
    return request({
        url: '/BookMaintenance/deleteBooks',
        method: 'post',
        data:{
            id:id
        }
    })
}

export function deleteAllBooks(ids) {
    return request({
        url:'/BookMaintenance/deleteAllBooks?ids='+ids,
        method: 'post'
    })
}

export function queryBooks(data) {
    return request({
        url: '/BookMaintenance/queryBooks',
        method: 'post',
        data
    })
}

export function insertBooks(data) {
    return request({
        url: '/BookMaintenance/insertBooks',
        method: 'post',
        data
    })
}

export function updateBooks(data) {
    return request({
        url: '/BookMaintenance/updateBooks',
        method: 'post',
        data
    })
}