import axiosInstance from "./instance";

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