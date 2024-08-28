import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL
const sessionId = import.meta.env.VITE_SESSION_ID

const axiosInstance = axios.create({
    baseURL: apiUrl, // Replace with your API's base URL
    timeout: 10000, // Optional timeout, adjust as needed
    headers: {
        'Content-Type': 'application/json',
        '_SESSIONID ': sessionId
        // Add other headers as needed, e.g., Authorization
    },
});

interface IScoreBody{
    appName: string
    userName: string
    score: number
}

const getAllListChannel = async() => {
    const res = await axiosInstance.get('/ListChannel')
    return res.data
}

const getScoreByAppName = async(appName: string) => {
    const res = await axiosInstance.get(`/GetScores/${appName}`)
    return res.data
}

const submitScore = async(data: IScoreBody) => {
    const res = await axiosInstance.post('/SubmitScore', data)
    return res.data
}

export {
    getAllListChannel,
    getScoreByAppName,
    submitScore
}