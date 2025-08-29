declare module 'bcryptjs' {
  export function hash(data: string, saltOrRounds: number): Promise<string>
  export function compare(data: string, encrypted: string): Promise<boolean>
}

declare module 'jsonwebtoken' {
  export interface SignOptions {
    expiresIn?: string | number
  }
  
  export function sign(payload: any, secretOrPrivateKey: string, options?: SignOptions): string
  export function verify(token: string, secretOrPublicKey: string): any
}