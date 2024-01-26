import { Algorithm, sign, verify } from 'jsonwebtoken';

class Auth {
    public static createAccessToken(data: object): string {
        const toEncode = { ...data };

        const expiresDelta = parseFloat(
            (process.env.ACCESS_TOKEN_EXPIRE_MINUTES as string) || '0'
        );
        const expire = expiresDelta
            ? Math.floor(Date.now() / 1000) + expiresDelta * 60
            : undefined;

        const token = sign(toEncode, process.env.ACCESS_TOKEN_SECRET || '', {
            expiresIn: expire,
            algorithm: process.env.ALGORITHM as Algorithm,
        });

        return token;
    }

    public static createRefreshToken(data: object): string {
        const toEncode = { ...data };

        const expiresDelta = parseFloat(
            (process.env.REFRESH_TOKEN_EXPIRE_MINUTES as string) || '0'
        );
        const expire = expiresDelta
            ? Math.floor(Date.now() / 1000) + expiresDelta * 60
            : undefined;

        const token = sign(toEncode, process.env.REFRESH_TOKEN_SECRET || '', {
            expiresIn: expire,
            algorithm: process.env.ALGORITHM as Algorithm,
        });

        return token;
    }

    public static decodeAccessToken(token: string): object {
        try {
            return verify(
                token.replace('Bearer ', ''),
                process.env.ACCESS_TOKEN_SECRET || '',
                {
                    algorithms: [process.env.ALGORITHM as Algorithm],
                }
            ) as object;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public static decodeRefreshToken(token: string): object {
        try {
            return verify(
                token.replace('Bearer ', ''),
                process.env.ACCESS_TOKEN_SECRET || '',
                {
                    algorithms: [process.env.ALGORITHM as Algorithm],
                }
            ) as object;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default Auth;
