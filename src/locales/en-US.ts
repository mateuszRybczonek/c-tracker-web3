const translations = {
  certificate: {
    add_item: 'Add certificate',
    days_since_issue: 'Days at sea since issue',
    empty: {
      description: 'Get started by adding a new certificate',
      header: 'No certificates'
    },
    expired: 'Expired',
    expiring_list_header: 'Expiring certificates',
    expiry_date: 'Expiry Date',
    issue_date: 'Issue Date',
    date_placeholder: 'yyyy-mm-dd',
    missing_days: 'Missing days',
    name: 'Name',
    number: 'Number',
    remaining_days: 'Remaining days',
    renewed: 'Renewable based on sea service',
    renewable_list_header: 'Certificates renewable based on seaservice',
    required_seaservice: 'Days required to renew'
  },
  common: {
    add_item: 'Add item',
    cancel: 'Cancel',
    categories: 'Categories',
    empty: {
      description: 'Get started by adding a new item',
      header: 'Empty collection'
    },
    got_it: 'Got it',
    overview: 'Overview',
    pinned_items: 'Pinned Items',
    search: 'Search',
    settings: 'Settings',
    submit: 'Submit'
  },
  connect_wallet: {
    button: 'Connect Wallet',
    description: 'Connect your wallet to see your data.',
    heading: 'It looks like your wallet is not connected yet.',
    pending: 'Connecting Wallet...'
  },
  errors: {
    connecting_wallet: {
      description:
        'Something went wrong when we tried to connect your wallet, please try again and if it fails again contact our support.'
    },
    header: 'Oops...',
    no_metamask: {
      description: 'You need to install metamask before connecting your wallet.'
    }
  },
  navigation: {
    certificates: 'Certificates',
    home: 'Home',
    sea_service: 'Sea Service'
  }
} as const

export default translations
