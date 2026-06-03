import axios from 'axios'

const BASE_URL = 'https://admin.geniusstorerf.ru/api'


export async function getData(endpoint, params = {}) {
    const res = await axios.get(`${BASE_URL}${endpoint}`, { params })

    const raw = res.data

    if (raw && typeof raw === 'object' && 'results' in raw) {
        return {
            data: raw.results,
            pagination: {
                count: raw.count ?? null,
                next: raw.next ?? null,
                previous: raw.previous ?? null,
            },
        }
    }

    return {
        data: raw,
        pagination: null,
    }
}