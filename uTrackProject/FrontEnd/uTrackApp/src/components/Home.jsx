import styles from './Home.module.css'
import { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

import Icon from './icons/Icon.jsx';
import IconLarge from './icons/IconLarge.jsx';
import IconBlack from './icons/IconBlack.jsx';

import useFetchTracks from '../server.jsx';

const Home = () => {
    const codRastreio = 'QQ830773725BR';
    const { encomendas, error, loading } = useFetchTracks(codRastreio);
    const [selectedTracking, setSelectedTracking] = useState(null); // controla o rastreio selecionado
    const [showFilter, setShowFilter] = useState(false);
    const [showAddSection, setShowAddSection] = useState(false);
    const { signOut } = useAuthenticator(context => [context.signOut]);

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
                    <label htmlFor="produto" className={styles.label}>Produto</label>
                        <input type="text" className={styles.textInput} placeholder='geladeira' id='produto' />
                        <label htmlFor="codRastreio" className={styles.label}>Cod. Rastreio</label>
                        <input type="text" className={styles.textInput} placeholder='texto' id='codRastreio' />
                            <input type="button" className={styles.submitBtn} value="Adicionar" />
                    </div>
                </div>
                {/* gerador dos blocos */}
                <div className={styles.section}>
                    {encomendas.map((encomenda, index) => (
                        <div className={styles.box} key={index}>
                            <h3 className={styles.subtitulo}>{encomenda.descricao}</h3>
                            <p>Código de Rastreio:</p>
                            <div className={styles.legenda}>
                                <p>{encomenda.codigoRastreio}</p>
                            </div>
                            <p>Previsão de Entrega:</p>
                            <div className={styles.legenda}>
                                <p>{encomenda.previsaoEntrega}</p>
                            </div>
                            <a href="#" onClick={() => setSelectedTracking(encomenda)}>Ver mais</a>
                            <br /><br />
                        </div>
                    ))}
                </div>  

                {/* Div com o rastreio completo */}
                {selectedTracking && (
                    <div className={styles.trackBox}>
                    <div>
                        <header>
                            <h3 className={styles.subtitulo}>{selectedTracking.produto}</h3>
                            <a href="#" onClick={() => setSelectedTracking(null)}><IconBlack name="close" /></a>
                        </header>
                        <p>Código de Rastreio: {selectedTracking.codigoRastreio}</p>
                        <p>Previsão de Entrega: {selectedTracking.previsaoEntrega}</p>
                        <div className={styles.timeline}>
                            {selectedTracking.atualizacoes.map((atualizacao, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <div className={styles.timelineDate}>
                                        <p>{new Date(atualizacao.data).toLocaleString()}</p>
                                    </div>
                                    <div className={styles.timelineContent}>
                                        <p>{atualizacao.descricao}</p>
                                        <p>{atualizacao.cidade} - {atualizacao.uf}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                )}
            </main>
        </>
    )
}

export default Home