import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IScoreList } from '../../hooks/useSignalR';
import { useMemo } from 'react';

interface IRows {id: number, playerName: string, score: number}

const columns: GridColDef[] = [
    { field: 'id', hideable: true },
    { field: 'playerName', headerName: 'Player Name', width: 130 },
    { field: 'score', headerName: 'Score', width: 70 },
];

export default function DataTable({
    data
}: {
    data: IScoreList
}) {

    const rows: IRows[] = useMemo(() => {
        return Object.keys(data).sort((a, b) => data[a] > data[b] ? -1 : 1).reduce((acc: IRows[], curr: string, idx: number) => {
            acc.push({ id: idx + 1, playerName: curr, score: data[curr] })
            return acc
        }, [])
    }, [data])


  return (
    <div style={{ height: "auto", width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20]}
      />
    </div>
  );
}