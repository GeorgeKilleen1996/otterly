import type { TokenDetails } from '../../../types/auth/TokenDetails'

export default defineEventHandler(async event => {
    const config = useRuntimeConfig();

    const loginDetails = await readBody(event);

    const { token } = await $fetch<{token: TokenDetails}>(config.api.apiUrl + 'auth/token/', {
        method: 'POST',
        body: JSON.stringify({
            email: loginDetails.email,
            password: loginDetails.password,
        }),
    })
    return token;
})