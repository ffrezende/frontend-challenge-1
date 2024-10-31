import { Button, Group, LoadingOverlay } from '@mantine/core'
import { FileInput } from '../../layout'
import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { CSVHeaders, TableHeader } from '~/common/constants'
import useGlobalStore from '~/stores'
import useFileManagement from '~/utils/hooks/useFileManagement'

export default function UploadPage() {
  const [rowData, setRowData] = useState([])
  const [isLoading, setIsloading] = useState(false)

  const { setUploadFile } = useGlobalStore()

  const { handleSubmitFile } = useFileManagement()

  const headers = TableHeader()

  const handleOnChange = (values) => {
    const rows = values
    setRowData(rows)
  }

  const handleSubmit = async () => {
    setIsloading(true)
    await handleSubmitFile(CSVHeaders, rowData)
    setIsloading(false)
    setRowData([])
  }

  const handleCancel = () => {
    setRowData([])
    setUploadFile({ currentfile: null })
  }

  return (
    <Group align="center" justify="center" w={'100%'}>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <div className="md:mt-14  flex-col justify-center text-center items-center w-[300px]">
        <div>Upload CSV File</div>
        <FileInput onChange={handleOnChange} />
      </div>
      <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
        {!!rowData.length && (
          <>
            <AgGridReact
              rowData={rowData}
              columnDefs={headers}
              defaultColDef={{
                sortable: true,
                filter: true,
              }}
            />
            <div className="flex justify-center items-center mt-10 pb-20">
              <div className="mr-8">
                <Button onClick={handleCancel} variant="outline" w={100} color={'red'}>
                  Cancel
                </Button>
              </div>
              <div>
                <Button onClick={handleSubmit} variant="outline" w={160}>
                  Submit
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Group>
  )
}
