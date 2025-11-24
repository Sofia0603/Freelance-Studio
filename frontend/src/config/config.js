
const host = process.env.HOST;
const config = {
    host: host,
    api: host + '/api',
    freelancersLevels:{
        junior: 'junior',
        middle: 'middle',
        senior: 'senior',
    },
    orderStatuses: {
        new: 'new',
        confirmed: 'confirmed',
        success: 'success',
        canceled: 'canceled',
    },
}

export default config;