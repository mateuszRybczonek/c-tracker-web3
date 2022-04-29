import type { Contract } from 'ethers'
import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { EContractAddress } from '../../contracts/adresses'
import userContractABI from '../artifacts/contracts/UserContract.sol/UserContract.json'
import type { EButtonType } from '~/constants/ui'
import type { User } from '~/types'
import { EAlertType } from '~/types/alertTypes'
import type { CustomWindow } from '~/types/common'
import { isContract } from '~/types/predicates'
import { ENotification, postNotification } from '~/utils/notifications'

const userContractAddress = EContractAddress.user
declare let window: CustomWindow

export const useUserStore = defineStore('user', () => {
  const account = ref<string>('')
  const user = ref<User>({ name: '', position: '' })

  function createContractInstance(): Contract | boolean {
    const { ethereum } = window

    if (ethereum) {
      // create provider object from ethers library, using ethereum object injected by metamask
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()

      return new ethers.Contract(userContractAddress, userContractABI.abi, signer)
    } else {
      postNotification(ENotification.showAlert, {
        type: EAlertType.danger,
        title: { key: 'errors.header' },
        description: { key: 'errors.no_metamask.description' },
        buttons: ['common.got_it'],
        // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
        onDidDismiss: (_action: EButtonType) => {}
      })

      return false
    }
  }

  const contract = createContractInstance()

  async function getUser(): Promise<void> {
    try {
      if (isContract(contract)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
        user.value = await contract.getUser()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function connectWallet(): Promise<void> {
    const { ethereum } = window

    if (!ethereum) {
      postNotification(ENotification.showAlert, {
        type: EAlertType.danger,
        title: { key: 'errors.header' },
        description: { key: 'errors.no_metamask.description' },
        buttons: ['common.got_it'],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onDidDismiss: (_action: EButtonType) => {}
      })

      return
    }

    if ('request' in ethereum) {
      postNotification(ENotification.showBusyState, {
        message: { key: 'connect_wallet.pending' }
      })

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const myAccounts: string[] = await ethereum.request({
        method: 'eth_requestAccounts'
      })

      postNotification(ENotification.hideBusyState)

      if (myAccounts[0]) {
        console.log('Connected: ', myAccounts[0])
        account.value = myAccounts[0]
      } else {
        postNotification(ENotification.showAlert, {
          type: EAlertType.danger,
          title: { key: 'errors.header' },
          description: { key: 'errors.connecting_wallet.description' },
          buttons: ['common.got_it'],
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onDidDismiss: (_action: EButtonType) => {}
        })
      }
    }
  }

  return {
    connectWallet,
    account,
    user,
    getUser
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
