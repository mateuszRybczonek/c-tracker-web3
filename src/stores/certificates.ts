import type { ContractTransaction } from '@ethersproject/contracts/src.ts/index'
import dayjs from 'dayjs'
import type { Contract } from 'ethers'
import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { EContractAddress } from '../../contracts/adresses'
import certificatesContractABI from '../artifacts/contracts/CertificatesContract.sol/CertificatesContract.json'
import type { EButtonType } from '~/constants/ui'
import type { Certificate } from '~/types'
import { EAlertType } from '~/types/alertTypes'
import type { CustomWindow } from '~/types/common'
import { isContract } from '~/types/predicates'
import { ENotification, postNotification } from '~/utils/notifications'

const certificatesContractAddress = EContractAddress.certificates
declare let window: CustomWindow

export const useCertificatesStore = defineStore('certificates', () => {
  const certificates = ref<Certificate[]>([])

  function createContractInstance(): Contract | boolean {
    try {
      const { ethereum } = window

      if (ethereum) {
        // create provider object from ethers library, using ethereum object injected by metamask
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        return new ethers.Contract(certificatesContractAddress, certificatesContractABI.abi, signer)
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
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const contract = createContractInstance()

  async function addCertificate(certificate: Certificate): Promise<void> {
    if (isContract(contract)) {
      // Execute the actual addCertificate from smart contract
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      const certificateTxn: ContractTransaction = await contract.addCertificate(
        certificate.name,
        certificate.number,
        certificate.issueDate,
        certificate.expiryDate,
        certificate.category,
        certificate.isRenewable,
        certificate.daysRequiredToRenew
      )

      console.log('Creating certificate...', certificateTxn.hash)
      await certificateTxn.wait()
      console.log('Certificate created -- ', certificateTxn.hash)
    }
  }

  async function deleteCertificate(certificateToBeRemoved: Certificate): Promise<void> {
    if (isContract(contract)) {
      // Execute the actual addCertificate from smart contract
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
      const certificateTxn: ContractTransaction = await contract.removeCertificate(
        certificateToBeRemoved.timestamp
      )

      console.log('Deleting certificate...', certificateTxn.hash)
      await certificateTxn.wait()
      console.log('Certificate deleted -- ', certificateTxn.hash)

      certificates.value = certificates.value.filter(
        (certificate: Certificate) => certificate.timestamp !== certificateToBeRemoved.timestamp
      )
    }
  }

  function parseCertificate(certificate: Certificate): Certificate {
    const remainingDays = dayjs(certificate.expiryDate).diff(dayjs(), 'day')

    return {
      ...certificate,
      isExpiring: remainingDays < 90,
      remainingDays
    }
  }

  function parseCertificates(certificatesArray: Certificate[]): Certificate[] {
    return certificatesArray.map((certificate: Certificate) => {
      return parseCertificate(certificate)
    })
  }

  async function getCertificates(): Promise<void> {
    if (isContract(contract)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
      const rawCertificates: Certificate[] = await contract.getCertificates()

      certificates.value = parseCertificates(rawCertificates)

      contract.on('NewCertificateCreated', (_receiver, certificate: Certificate) => {
        const {
          name,
          number,
          issueDate,
          expiryDate,
          timestamp,
          category,
          isRenewable,
          daysRequiredToRenew
        } = certificate

        certificates.value = [
          ...certificates.value,
          parseCertificate({
            name,
            number,
            issueDate,
            expiryDate,
            timestamp,
            category,
            isRenewable,
            daysRequiredToRenew
          })
        ]
      })
    }
  }

  return {
    certificates,
    addCertificate,
    deleteCertificate,
    getCertificates
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCertificatesStore, import.meta.hot))
}
