const BASE_URL = 'http://127.0.0.1:8080/'

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
