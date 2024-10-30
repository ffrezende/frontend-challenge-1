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
    formData.append('csv_file', new Blob([csvString], { type: 'text/csv' }), fileName)

    return formData
  }

  return { createCSVString, formDataCSV }
}
