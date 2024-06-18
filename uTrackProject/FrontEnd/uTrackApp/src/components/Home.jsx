import styles from './Home.module.css';
import { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { FaTrashCan } from 'react-icons/fa6';
import Icon from './icons/Icon.jsx';
import IconBlack from './icons/IconBlack.jsx';
import { useFetchTracks, useCreateTrack, useDeleteTrack, useFetchTrack } from '../server.jsx';

const Home = () => {
  const [selectedTracking, setSelectedTracking] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const { user, signOut } = useAuthenticator(context => [context.user, context.signOut]);
  const { encomendas, setEncomendas, error, loading } = useFetchTracks(user.userId);
  const { createTrack } = useCreateTrack();
  const { deleteTrack } = useDeleteTrack();
  const { getTrack } = useFetchTrack();

  const [produto, setProduto] = useState('');
  const [rastreio, setRastreio] = useState('');
  const [entrega, setEntrega] = useState('');

  const [filterProduto, setFilterProduto] = useState('');
  const [filterRastreio, setFilterRastreio] = useState('');
  const [filterDeDat, setFilterDeDat] = useState('');
  const [filterAteDat, setFilterAteDat] = useState('');

  const toggleFilter = () => {
    setShowFilter(!showFilter);
    setShowAddSection(false);
  };

  const toggleAddSection = () => {
    setShowAddSection(!showAddSection);
    setShowFilter(false);
  };

  if (loading) {
    return <p className={styles.carregando}>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error.message}</p>;
  }

  const handleCardClick = async (encomenda) => {
    try {
      const trackData = await getTrack(encomenda.CODIGO_RASTREIO); // Corrigir a linha aqui
      setSelectedTracking(selectedTracking?.ID === encomenda.ID ? null : { ...encomenda, track: trackData });
    } catch (error) {
      console.error('Erro ao pegar os dados de rastreamento:', error);
    }
  };
  
  const handleDeleteTrack = async (encomenda) => {
    try {
      const response = await deleteTrack(encomenda);
      location.reload();
    } catch (error) {
      console.log("Erro ao deletar a Track: ", error);
      alert("Erro ao deletar a Track");
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      const [year, month, day] = entrega.split("-");
      const formattedDate = `${day}/${month}/${year}`;

      const response = await createTrack(user.userId, rastreio, formattedDate, produto);
      const newTrack = await response.json();
      setEncomendas(prevEncomendas => [...prevEncomendas, newTrack]);
      setProduto('');
      setRastreio('');
      setEntrega('');
    } catch (error) {
      console.error('Erro ao enviar track:', error.message);
    }
  };

  const applyFilters = (encomendas) => {
    return encomendas.filter((encomenda) => {
      const matchProduto = filterProduto ? encomenda.NOME_PRODUTO.toLowerCase().includes(filterProduto.toLowerCase()) : true;
      const matchRastreio = filterRastreio ? encomenda.CODIGO_RASTREIO.toLowerCase().includes(filterRastreio.toLowerCase()) : true;
      const matchDeDat = filterDeDat ? new Date(encomenda.DATA_PREVISAO) >= new Date(filterDeDat) : true;
      const matchAteDat = filterAteDat ? new Date(encomenda.DATA_PREVISAO) <= new Date(filterAteDat) : true;
      return matchProduto && matchRastreio && matchDeDat && matchAteDat;
    });
  };

  const filteredEncomendas = applyFilters(encomendas);

  return (
    <>
      <header className={styles.header}>
        <div>
          <img className={styles.logoHome} src="/logo.png" alt="Logotipo uTrack" />
        </div>
        <div>
          <button className={styles.closeBtn} onClick={signOut}>Sair</button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.filterSection}>
          <div className={styles.filterHeader}>
            <a onClick={toggleFilter} className={styles.filterBtn}>
              <IconBlack name="filter" />
              Filtros
              <Icon name={showFilter ? "arrowUp" : "arrowDown"} />
            </a>
            <a onClick={toggleAddSection} className={styles.filterBtn}>
              <IconBlack name="add" />
              Adicionar
              <Icon name={showAddSection ? "arrowUp" : "arrowDown"} />
            </a>
          </div>
          <div className={`${styles.filter} ${showFilter ? styles.show : ''}`}>
            <label htmlFor="produto" className={styles.label}>Produto</label>
            <input type="text" className={styles.textInput} placeholder="Geladeira..." id="filterProduto" value={filterProduto} onChange={(e) => setFilterProduto(e.target.value)} />
            <label htmlFor="codRastreio" className={styles.label}>Cod. Rastreio</label>
            <input type="text" className={styles.textInput} placeholder="QQ83077..." id="filterRastreio" value={filterRastreio} onChange={(e) => setFilterRastreio(e.target.value)} />
            <label htmlFor="deDat" className={styles.label}>De</label>
            <input type="date" className={styles.textInput} id="filterDeDat" value={filterDeDat} onChange={(e) => setFilterDeDat(e.target.value)} />
            <label htmlFor="ateDat" className={styles.label}>Até</label>
            <input type="date" className={styles.textInput} id="filterAteDat" value={filterAteDat} onChange={(e) => setFilterAteDat(e.target.value)} />
          </div>
          <div className={`${styles.addSection} ${showAddSection ? styles.show : ''}`}>
            <form onSubmit={handleAdd}>
              <label htmlFor="produto" className={styles.label}>Produto</label>
              <input type="text" className={styles.textInput} value={produto} id="produto" placeholder="Geladeira..." onChange={(e) => setProduto(e.target.value)} required />
              <label htmlFor="codRastreio" className={styles.label}>Cod. Rastreio</label>
              <input type="text" className={styles.textInput} value={rastreio} id="codRastreio" placeholder="QQ83077..." onChange={(e) => setRastreio(e.target.value)} required />
              <label htmlFor="prevEntrega" className={styles.label}>Prev. Entrega</label>
              <input type='date' className={styles.textInput} value={entrega} id="prevEntrega" onChange={(e) => setEntrega(e.target.value)} required />
              <button type="submit" className={styles.submitBtn}>Adicionar</button>
            </form>
          </div>
        </div>
        <div className={styles.section}>
          {filteredEncomendas.map((encomenda) => (
            <div className={`${styles.box} ${selectedTracking?.ID === encomenda.ID ? styles.expanded : ''}`} key={encomenda.ID}>
              <button onClick={() => handleDeleteTrack(encomenda.ID)} className={styles.deleteBtn}>
                <FaTrashCan />
              </button>
              <h3 className={styles.subtitulo}>{encomenda.NOME_PRODUTO}</h3>
              <p>Código de Rastreio:</p>
              <div className={styles.legenda}>
                <p>{encomenda.CODIGO_RASTREIO}</p>
              </div>
              <p>Previsão de Entrega:</p>
              <div className={styles.legenda}>
                <p>{new Date(encomenda.DATA_PREVISAO).toLocaleDateString()}</p>
              </div>
              <a onClick={() => handleCardClick(encomenda)}>
                {selectedTracking?.ID === encomenda.ID ? "Ver menos" : "Ver mais"}
              </a>
              <br /><br />
              {selectedTracking?.ID === encomenda.ID && (
                <div className={styles.trackBox}>
                  <header>
                    <h2>Rastreamento de Encomenda</h2>
                    <a href="#" onClick={() => setSelectedTracking(null)}><IconBlack name="close" /></a>
                  </header>
                  <div className={styles.timeline}>
                    {selectedTracking?.track?.length ? (
                      <table className={styles.timelineTable}>
                        {selectedTracking.track.map((movimento, index) => (
                          <tr key={index} className={styles.timelineRow}>
                            <td className={styles.timelineData}>{new Date(movimento.data).toLocaleString()}</td>
                            <td className={styles.timelineDesc}><b>{movimento.descricao}</b><br />{movimento.unidade}<br />{movimento.cidade}/{movimento.uf}</td>
                          </tr>
                        ))}
                      </table>
                    ) : (
                      <p>Movimentos não disponíveis</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
