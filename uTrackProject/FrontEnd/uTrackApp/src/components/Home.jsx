import styles from './Home.module.css'
import { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { FaTrashCan } from "react-icons/fa6";

import Icon from './icons/Icon.jsx';
import IconLarge from './icons/IconLarge.jsx';
import IconBlack from './icons/IconBlack.jsx';

import { useFetchTracks, useCreateTrack, useDeleteTrack } from '../server.jsx';


const Home = () => {
    
    const [selectedTracking, setSelectedTracking] = useState(null); // controla o rastreio selecionado
    const [showFilter, setShowFilter] = useState(false);
    const [showAddSection, setShowAddSection] = useState(false);
    const { user, signOut } = useAuthenticator(context => [context.user, context.signOut]);
    const { encomendas, setEncomendas, error, loading } = useFetchTracks(user.userId);
    const { createTrack } = useCreateTrack();
    const { deleteTrack } = useDeleteTrack();

    const [produto, setProduto] = useState('');
    const [rastreio, setRastreio] = useState('');
    const [entrega, setEntrega] = useState('');

    const toggleFilter = () => {
        setShowFilter(!showFilter);
        setShowAddSection(false);
    };
    const toggleAddSection = () => {
        setShowAddSection(!showAddSection);
        setShowFilter(false);
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error.message}</p>;
    }

    const handleCardClick = (encomenda) => {
        setSelectedTracking(encomenda === selectedTracking ? null : encomenda);
    };

    const handleDeleteTrack = async (encomenda) => {
        try {
            console.log(encomenda);
            const response = await deleteTrack(encomenda); // Espere pela deleção completar
            alert(response); // Exiba um alerta ou faça outra ação de sucesso
        } catch (error) {
            console.log("Erro ao deletar a Track: ", error);
            alert("Erro ao deletar a Track"); // Exiba um alerta ou faça outra ação de erro
        }
    };
    const handleAdd = async (event) => {
        event.preventDefault();
    
        try {
            // Espera a conclusão do createTrack antes de prosseguir
            const response = await createTrack(user.userId, rastreio, entrega, produto);
            const newTrack = await response.json();
            // Depois que o createTrack é concluído, atualiza o estado das encomendas
            setEncomendas(prevEncomendas => [...prevEncomendas, newTrack])
            
            // Limpa os campos do formulário
            setProduto('');
            setRastreio('');
            setEntrega('');
    
            console.log('Nova track adicionada:', newTrack);
            console.log('~enviado');
        } catch (error) {
            console.error('Erro ao enviar track:', error.message);
        }
    
        console.log('~enviado');
    };
    

    return (
        <>
            <header className={styles.header}>
                <div>
                    <img className={styles.logoHome} src="/logo.png" alt="Logotipo uTrack" />
                    <button className={styles.submitBtn} onClick={signOut}>Sair</button>
                </div>
                <div>
                    <p>Utrack</p>
                    <a href=""><IconLarge name="lightMode"/></a>
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.filterSection}>
                    <div className={styles.filterHeader}>
                        <a onClick={toggleFilter} className={styles.filterBtn}>
                            <IconBlack name="filter"/>
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
                        <input type="text" className={styles.textInput} placeholder='texto' id='produto' />
                        <label htmlFor="codRastreio" className={styles.label}>Cod. Rastreio</label>
                        <input type="text" className={styles.textInput} placeholder='texto' id='codRastreio' />
                        <label htmlFor="staus" className={styles.label}>Status</label>
                        <input type="text" className={styles.textInput} placeholder='texto' id='status' />
                        <label htmlFor="deDat" className={styles.label}>De</label>
                        <input type="text" className={styles.textInput} placeholder='texto' id='deDat' />
                        <label htmlFor="ateDat" className={styles.label}>Até</label>
                        <input type="text" className={styles.textInput} placeholder='texto' id='ateDat' />
                        <input type="button" className={styles.submitBtn} value="Pesquisar" />
                    </div>
                    <div className={`${styles.addSection} ${showAddSection ? styles.show : ''}`}>
                        <form onSubmit={handleAdd}>
                            <label htmlFor="produto" className={styles.label}>Produto</label>
                            <input type="text" className={styles.textInput} value={produto} id='produto' onChange={(e) => setProduto(e.target.value)} required />
                            <label htmlFor="codRastreio" className={styles.label}>Cod. Rastreio</label>
                            <input type="text" className={styles.textInput} value={rastreio} id='codRastreio' onChange={(e) => setRastreio(e.target.value)} required />
                            <label htmlFor="prevEntrega" className={styles.label}>Prev. Entrega</label>
                            <input type="text" className={styles.textInput} value={entrega} id='codRastreio' onChange={(e) => setEntrega(e.target.value)} required />
                            <button type="submit" className={styles.submitBtn}>Adicionar</button>                            
                        </form>
                    </div>
                </div>
                <div className={styles.section}>
                    {encomendas.map((encomenda) => (
                        <div className={`${styles.box} ${selectedTracking === encomenda ? styles.expanded : ''}`} key={encomenda.ID}>
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
                                {selectedTracking === encomenda ? "Ver menos" : "Ver mais"}
                            </a>
                            <br /><br />
                            {selectedTracking === encomenda && (
                                <div className={styles.movimentos}>
                                    {encomenda.MOVIMENTOS ? (
                                        
                                        encomenda.MOVIMENTOS.map((movimento, index) => (
                                            <div key={index}>
                                                <p>Data: {new Date(movimento.data).toLocaleString()}</p>
                                                <p>Descrição: {movimento.descricao}</p>
                                                <p>Unidade: {movimento.unidade}</p>
                                                <p>Cidade: {movimento.cidade}</p>
                                                <p>UF: {movimento.uf}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Movimentos não disponíveis</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Home;
