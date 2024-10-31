import { BASE_URL } from '~/common/constants'

export const postCsvFile = async (csvFile: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}upload`, {
      method: 'POST',
      body: csvFile,
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await response.json()
  } catch (error) {}
}

export const getListOfClaimFiles = async () => {
  try {
    const response = await fetch(`${BASE_URL}list-of-claim`)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const { files } = await response.json()

    return files
  } catch (error) {}
}

export const getClaimByName = async (fileName: string) => {
  try {
    const response = await fetch(`${BASE_URL}claim/${fileName}`)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const claimFile = await response.json()

    return claimFile
  } catch (error) {}
}
