export const GOOGLE_API_KEY: string = 'AIzaSyCOLDSLmmBjEDIlOmzHOEoAakcZQRlp31Y'
export const GOOGLE_CLIENT_ID: string =
  '352226282642-jokokdl4q6ccrhrfgbhgj6pb4jqupo54.apps.googleusercontent.com'
export const GOOGLE_SECRET_KEY: string = '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'
export const HTTP_STATUS = {
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
    PENDING: 'pending'
}
export const GET_TYPE = (type: string): string => {
    return type.split('/')[2]
}

export const API_BASE_URL: string = 'https://unetwork-api.onrender.com' 