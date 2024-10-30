import { postCsvFile } from '~/service'
import useGlobalStore from '~/stores'

export default function useFileManagement() {
  const {
    app: { fileName },
  } = useGlobalStore()

  const createCSVString = (headers: string[], rows: string[][]) => {
    return [
      headers.join(','),
      ...rows.map((row) => {
        const dataRow = Object.values(row)
        return dataRow.join(',')
      }),
    ].join('\n')
  }

  const formDataCSV = (csvString) => {
    const formData = new FormData()
    formData.append('file', new Blob([csvString], { type: 'text/csv' }), fileName)

    return formData
  }

  const handleSubmitFile = async (headers, rows) => {
    const csvString = createCSVString(headers, rows)
    const csvFile = formDataCSV(csvString)

    const { message } = await postCsvFile(csvFile)
  }

  return { handleSubmitFile }
}
