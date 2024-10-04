import './App.css';
import DataTable from './components/DataTable';

interface Data {
  name: string;
  age: number;
  country: string;
}

function App() {
  const columns = [
    { header: 'Nome', acessor: 'name' as keyof Data },
    { header: 'Idade', acessor: 'age' as keyof Data },
    { header: 'País', acessor: 'country' as keyof Data },
  ];

  const data: Data[] = [
    { name: 'João', age: 38, country: 'Brasil'  },
    { name: 'Maria', age: 19, country: 'Espanha'  },
    { name: 'Pedro', age: 50, country: 'Uruguai'  },
    { name: 'Antonio', age: 70, country: 'Uruguai'  },
    { name: 'Roberto', age: 32, country: 'Argentina'  },
    { name: 'José', age: 40, country: 'Brasil'  },
    { name: 'Tiago', age: 45, country: 'Brasil'  },
    { name: 'Marcos', age: 42, country: 'Brasil'  },
    { name: 'Paulo', age: 40, country: 'Brasil'  },
    { name: 'André', age: 50, country: 'Paraguai'  },
  ];
  
  return (
    <div className="App">
      <div style={{padding: '20px'}}>
        <h1>Tabela estilo DataTables sem uso de bibliotecas</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default App;
