import { useCallback, useEffect, useState } from 'react'
import { getListOfClaimFiles } from '~/service'

export default function useClaimFiles() {
  const [files, setFiles] = useState([])

  const getAllFiles = useCallback(async () => {
    const listOfFiles = await getListOfClaimFiles()
    setFiles(listOfFiles)
  }, [])

  useEffect(() => {
    getAllFiles()
  }, [])

  return { files }
}
