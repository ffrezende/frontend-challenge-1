import { useEffect, useState } from 'react'
import { getClaimByName, getListOfClaimFiles } from '~/service'
import { downloadJsonFile } from '../file'

export default function useClaimFiles() {
  const [files, setFiles] = useState([])

  const getAllFiles = async () => {
    const listOfFiles = await getListOfClaimFiles()
    setFiles(listOfFiles)
  }

  const handleDownloadFile = async (fileName: string) => {
    const claimFile = await getClaimByName(fileName)

    downloadJsonFile(fileName, claimFile)
  }

  useEffect(() => {
    getAllFiles()
  }, [])

  return { files, handleDownloadFile }
}
