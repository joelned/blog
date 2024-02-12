import jwt from "jsonwebtoken"

interface UserPayLoad{
id: Number
}
export const secretkey = "fajslkdhfdjsfahuejkdfshamcx"

export function createjwt(userpayload: UserPayLoad):string{
const expiresIn = '1h'

const token = jwt.sign(userpayload, secretkey, {expiresIn})
return token

}


