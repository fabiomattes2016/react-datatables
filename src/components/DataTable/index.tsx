import {useMemo, useState} from "react";

interface DataTableProps<T> {
  columns: Array<{header: string, acessor: keyof T}>;
  data: T[];
}

const DataTable = <T extends object>({ columns, data }: DataTableProps<T>) => {
  const [filter, setFilter] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Filtrar os dados
  const filteredData = useMemo(() => {
    return data.filter(
      (row) => Object.values(row).some(
        (value) => value
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase())
      ));
  }, [data, filter]);

  // Ordenar os campos
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if(aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if(aValue > bValue) return sortDirection === 'asc' ? 1 : -1;

      return 0;
    });

    return sorted;
  }, [filteredData, sortColumn, sortDirection]);

  // Paginar os dados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  // Trocar a coluna de ordenação
  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  }

  // Trocar de página
  const handlePageChange = (page: number) => {
    if (page < 1 || page > Math.ceil(sortedData.length / itemsPerPage))
      return;

    setCurrentPage(page);
  }

  return(
    <div>
      {/* Campo de filtro */}
      <input 
        type="text"
        placeholder="Buscar..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{marginBottom: '10px', padding: '5px'}}
      />

      {/* Tabela */}
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.acessor as string}
                style={{padding: '10px', borderBottom: '1px solid black', cursor: 'pointer'}}
                onClick={() => handleSort(column.acessor)}
              >
                {column.header}
                {
                  sortColumn === column.acessor && (sortDirection === 'asc' ?  ' 🔼': ' 🔽')
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  key={column.acessor as string}
                  style={{padding: '10px', borderBottom: '1px solid lightgray'}}
                >
                  {row[column.acessor] as string}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div style={{marginTop: '10px'}}>
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >⬅️</button>
          <span style={{margin: '0 10px'}}>Página {currentPage} de {Math.ceil(sortedData.length / itemsPerPage)} de um total de {sortedData.length} registros.</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(sortedData.length / itemsPerPage)}
          >
            ➡️
          </button>
      </div>
    </div>
  );
}

export default DataTable;