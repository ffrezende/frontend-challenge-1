import { getClaimByName, postCsvFile } from '~/service'
import useGlobalStore from '~/stores'
import { createCSVString, downloadJsonFile, formDataCSV } from '../file'

export default function useFileManagement() {
  const {
    app: { fileName },
  } = useGlobalStore()

  const handleSubmitFile = async (headers, rows) => {
    const csvString = createCSVString(headers, rows)
    const csvFile = formDataCSV(fileName, csvString)

    const { message } = await postCsvFile(csvFile)
  }

  const handleDownloadFile = async (fileName: string) => {
    const claimFile = await getClaimByName(fileName)
    downloadJsonFile(fileName, claimFile)
  }

  return { handleSubmitFile, handleDownloadFile }
}
