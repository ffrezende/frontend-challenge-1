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

    fetch('http://127.0.0.1:8080/upload', {
      method: 'POST',
      body: csvFile,
    })
      .then((response) => {
        debugger
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        console.log('CSV uploaded successfully:', data)
      })
      .catch((error) => {
        console.error('Error uploading CSV:', error)
      })
  }

  return { handleSubmitFile }
}
