import { Group } from '@mantine/core'
import { FileInput } from '../../layout'
import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { TableHeader } from '~/common/constants'

export default function UploadPage() {
  const [rowData, setRowData] = useState([])
  const headers = TableHeader()

  const handleOnChange = (values) => {
    const { rows } = values
    setRowData(rows)
  }

  return (
    <Group align="center" justify="center" w={'100%'}>
      <div className="mt-20 flex-col justify-center text-center items-center w-[300px]">
        <div>Upload CSV File</div>
        <FileInput onChange={handleOnChange} />
      </div>
      <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={headers}
          defaultColDef={{
            sortable: true,
            filter: true,
          }}
        />
      </div>
    </Group>
  )
}
