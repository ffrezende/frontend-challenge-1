export const ROUTES = {
  LandingPage: '/',
  UploadPage: '/upload',
  ListFiles: '/list-files',
}

export const SessionManagement = {
  AuthToken: 'auth_token',
}

export const CSVHeaders = [
  'Claim ID',
  'Subscriber ID',
  'Member Sequence',
  'Claim Status',
  'Billed',
  'Allowed',
  'Paid',
  'Payment Status Date',
  'Service Date',
  'Received Date',
  'Entry Date',
  'Processed Date',
  'Paid Date',
  'Payment Status',
  'Group Name',
  'Group ID',
  'Division Name',
  'Division ID',
  'Plan',
  'Plan ID',
  'Place of Service',
  'Claim Type',
  'Procedure Code',
  'Member Gender',
  'Provider ID',
  'Provider Name',
]

export const TableHeader = () => CSVHeaders.map((header) => ({ field: header, sortable: true, filter: true }))
