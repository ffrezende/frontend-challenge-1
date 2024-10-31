export const downloadJsonFile = (fileName, jsonData) => {
  const jsonStr = JSON.stringify(jsonData, null, 2) // Indented JSON
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}

export const formDataCSV = (fileName, csvString) => {
  const formData = new FormData()
  formData.append('file', new Blob([csvString], { type: 'text/csv' }), fileName)

  return formData
}

export const createCSVString = (headers: string[], rows: string[][]) => {
  return [
    headers.join(','),
    ...rows.map((row) => {
      const dataRow = Object.values(row)
      return dataRow.join(',')
    }),
  ].join('\n')
}
