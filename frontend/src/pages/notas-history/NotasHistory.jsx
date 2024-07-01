import React, { useEffect, useState } from 'react'
import UserDashBoardNavBar from '../../components/navbar/UserDashBoardNavBar'
import axios from 'axios'
import { API_BASE_URL } from '../../util/constants';
import ExcelJS from 'exceljs';


const NotasHistory = () => {
  const [notas, setNotas] = useState([]);

  const [ dataEntradaFilter, setDataEntradaFilter ] = useState('')
  const [ fornecedorFilter, setFornecedorFilter ] = useState('')
  const [ valorFilter, setValorFilter ] = useState('');
  const [ parcelasFilter, setParcelasFilter ] = useState('')
  const [ dataVencimentoFilter, setDataVencimentoFilter ] = useState('')
  const [ centroCustoFilter, setCentroCustoFilter ] = useState('')

  const apply_filters = () => {
    return notas.filter(nota => {
      const filteredDataEntrada = !dataEntradaFilter || nota.dataEntrada.includes(dataEntradaFilter);
      const filteredFornecedor = !fornecedorFilter || nota.fornecedor.includes(fornecedorFilter);
      const filteredValor = !valorFilter || nota.valor.toString().includes(valorFilter);
      const filteredParcelas = !parcelasFilter || nota.parcelas.toString().includes(parcelasFilter);
      const filteredDataVencimento = !dataVencimentoFilter || nota.dataVencimento.includes(dataVencimentoFilter);
      const filteredCentroCusto = !centroCustoFilter || nota.centroCusto.includes(centroCustoFilter);

      return filteredDataEntrada && filteredFornecedor && filteredValor && filteredParcelas && filteredDataVencimento && filteredCentroCusto;
    })
  };

  const resetFilters = () => {
    setDataEntradaFilter('');
    setFornecedorFilter('');
    setValorFilter('');
    setParcelasFilter('');
    setDataVencimentoFilter('');
    setCentroCustoFilter('');
  }

  const get_all_notas = async() => {
    const res = await axios.get(`${API_BASE_URL}/notas/`).then(res => {
      setNotas(res.data);
    }).catch(err => {
      console.log(err)
    });
  }
  const export_excel = async() => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Notas');

    worksheet.addRow(['Data de Entrada', 'Fornecedor', 'Valor', 'Parcelas', 'Data de Vencimento', 'Centro de Custo']);
    notas.forEach(nota => {
      worksheet.addRow([nota.dataEntrada, nota.fornecedor, nota.valor, nota.parcelas, nota.dataVencimento, nota.centroCusto]);
    });

    // aumentar a largura das colunas
    worksheet.columns.forEach(column => {
      column.width = 20; // Set width in characters
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'notas.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    get_all_notas()
  }, []);

  return (
    <div>
      <UserDashBoardNavBar />

      <div className='p-6'>
        <h1>Historico de Notas</h1>
        <br />

        <div className=''>
          <h3 className='font-bold'>Filtrar</h3>
          <button onClick={() => resetFilters()} className='btn btn-primary'>Resetar Filtros</button>
        </div>
        <div className='flex justify-between'>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Data de Entrada</span>
            </div>
            <input 
              type="date" 
              value={dataEntradaFilter}
              onChange={e => setDataEntradaFilter(e.target.value)} 
              className="input input-sm input-bordered" 
              />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Fornecedor</span>
            </div>
            <input 
              type="text" 
              className="input input-sm input-bordered"
              value={fornecedorFilter}
              onChange={e => setFornecedorFilter(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Valor:</span>
            </div>
            <input 
              type="number"
              className="input input-sm input-bordered" 
              value={valorFilter}
              onChange={e => setValorFilter(e.target.value)}
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Parcelas:</span>
            </div>
            <select value={parcelasFilter} onChange={e => setParcelasFilter(e.target.value)} className="select select-sm ">
                        <option disabled selected>Selecione o número de parcelas</option>
                        {[...Array(12)].map((_, index) => {
                          return <option key={index + 1} value={index + 1}>
                            {index + 1} parcela(s)
                          </option>
                        })}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Centro de Custo:</span>
            </div>
            <input 
              type="text" 
              value={centroCustoFilter}
              onChange={e => setCentroCustoFilter(e.target.value)}
              className="input input-sm input-bordered" />
          </label>
        </div>

        

        <div className='mt-5 mb-5 overflow-x-auto bg-gray-200 rounded-xl'>
          <table className='table table-zebra'>
            <tr>
              <th>Data de Entrada</th>
              <th>Fornecedor</th>
              <th>Valor</th>
              <th>Parcelas</th>
              <th>Data de Vencimento</th>
              <th>Centro de Custo</th>
            </tr>

            <tbody>
              {apply_filters().map((nota, index) => {
                return (
                  <tr key={index}>
                    <td>{nota.dataEntrada}</td>
                    <td>{nota.fornecedor}</td>
                    <td>R$ {nota.valor}</td>
                    <td>{nota.parcelas}</td>
                    <td>{nota.dataVencimento}</td>
                    <td>{nota.centroCusto}</td>
                  </tr>)
              })}
            </tbody>
          </table>
        </div>
        
        <button onClick={export_excel} className='btn btn-primary'>Gerar Arquivo Excel</button>
        
      </div>
    </div>
  )
}

export default NotasHistory