export interface InputEventTarget {
  value: string
}

export function isInputEventTarget(
  target: EventTarget | null
): target is InputEventTarget & EventTarget {
  return target !== null && 'value' in target
}

export interface ExternalProvider {
  isMetaMask?: boolean
  isStatus?: boolean
  host?: string
  path?: string
  sendAsync?: (
    request: { method: string, params?: any[] },
    callback: (error: any, response: any) => void
  ) => void
  send?: (
    request: { method: string, params?: any[] },
    callback: (error: any, response: any) => void
  ) => void
  request?: (request: { method: string, params?: any[] }) => Promise<any>
}

export type JsonRpcFetchFunc = (method: string, params?: any[]) => Promise<any>

export interface CustomWindow {
  ethereum: ExternalProvider | JsonRpcFetchFunc
}
