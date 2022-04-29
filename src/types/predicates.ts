import type { Contract } from 'ethers'

export function isContract(contract: Contract | unknown): contract is Contract {
  return contract !== undefined
}
