
import { jwtDecode } from 'jwt-decode'

export const verificaTokenExpirado =
    (token?: string) => {

        if (token) {
            //tem token
            let decodedToken = jwtDecode(token)

            if (
                !decodedToken.exp
                ||
                decodedToken.exp < new Date().getTime() / 1000
            ) {
                //token expirado
                return true
            }
            //token OK :D
            return false
        }
        //nao tem token
        return true
    }