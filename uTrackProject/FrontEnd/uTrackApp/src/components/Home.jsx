import styles from './Home.module.css'
import { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

import Icon from './icons/Icon.jsx';
import IconLarge from './icons/IconLarge.jsx';
import IconBlack from './icons/IconBlack.jsx';

const Home = () => {
     const mockData = [
        {
            codigoRastreio: "QQ830773725BR",
            produto: "Produto A",
            previsaoEntrega: "2024-03-22",
            atualizacoes: [
                {
                    data: "2024-03-20T12:08:19",
                    descricao: "Objeto entregue ao destinatário",
                    unidade: "Unidade de Distribuição",
                    cidade: "ERECHIM",
                    uf: "RS"
                },
                {
                    data: "2024-03-20T08:52:12",
                    descricao: "Objeto saiu para entrega ao destinatário",
                    unidade: "Unidade de Distribuição",
                    cidade: "ERECHIM",
                    uf: "RS"
                },
                {
                    data: "2024-03-15T14:05:12",
                    descricao: "Objeto em transferência - por favor aguarde",
                    unidade: "Unidade de Tratamento",
                    cidade: "PASSO FUNDO",
                    uf: "RS"
                },
                {
                    data: "2024-03-14T03:30:28",
                    descricao: "Objeto em transferência - por favor aguarde",
                    unidade: "Unidade de Tratamento",
                    cidade: "CAJAMAR",
                    uf: "SP"
                },
                {
                    data: "2024-03-13T00:03:58",
                    descricao: "Objeto em transferência - por favor aguarde",
                    unidade: "Agência dos Correios",
                    cidade: "SANTO ANDRE",
                    uf: "SP"
                },
                {
                    data: "2024-03-12T20:07:50",
                    descricao: "Objeto postado após o horário limite da unidade",
                    unidade: "Agência dos Correios",
                    cidade: "SANTO ANDRE",
                    uf: "SP"
                }
            ]
        },
        {
            codigoRastreio: "AA123456789BR",
            produto: "Produto B",
            previsaoEntrega: "2024-04-10",
            atualizacoes: [
                {
                    data: "2024-04-08T15:30:00",
                    descricao: "Objeto em transferência",
                    unidade: "Unidade de Tratamento",
                    cidade: "PORTO ALEGRE",
                    uf: "RS"
                },
                {
                    data: "2024-04-06T12:45:30",
                    descricao: "Objeto encaminhado",
                    unidade: "Agência dos Correios",
                    cidade: "CAXIAS DO SUL",
                    uf: "RS"
                },
                {
                    data: "2024-04-05T09:20:15",
                    descricao: "Objeto postado",
                    unidade: "Agência dos Correios",
                    cidade: "CAXIAS DO SUL",
                    uf: "RS"
                }
            ]
        },
        {
            codigoRastreio: "AA123456789BG",
            produto: "Produto C",
            previsaoEntrega: "2024-04-12",
            atualizacoes: [
                {
                    data: "2024-04-08T15:30:00",
                    descricao: "Objeto em transferência",
                    unidade: "Unidade de Tratamento",
                    cidade: "PORTO ALEGRE",
                    uf: "RS"
                },
                {
                    data: "2024-04-06T12:45:30",
                    descricao: "Objeto encaminhado",
                    unidade: "Agência dos Correios",
                    cidade: "CAXIAS DO SUL",
                    uf: "RS"
                },
                {
                    data: "2024-04-05T09:20:15",
                    descricao: "Objeto postado",
                    unidade: "Agência dos Correios",
                    cidade: "CAXIAS DO SUL",
                    uf: "RS"
                }
            ]
        },
        {
            codigoRastreio: "AA123456789BH",
            produto: "Produto D",
            previsaoEntrega: "2024-04-10",
            atualizacoes: [
                {
                    data: "2024-04-08T15:30:00",
                    descricao: "Objeto em transferência",
                    unidade: "Unidade de Tratamento",
                    cidade: "PORTO ALEGRE",
                    uf: "RS"
                },
                {
                    data: "2024-04-06T12:45:30",
                    descricao: "Objeto encaminhado",
                    unidade: "Agência dos Correios",
                    cidade: "CAXIAS DO SUL",
                    uf: "RS"
                },
                {
                    data: "2024-04-05T09:20:15",
                    descricao: "Objeto postado",
                    unidade: "Agência dos Correios",
                    cidade: "CAXIAS DO SUL",
                    uf: "RS"
                }
            ]
        },
        {
            codigoRastreio: "AA123456789BA",
            produto: "Produto E",
            previsaoEntrega: "2024-04-10",
            atualizacoes: [
                {
                    data: "2024-04-08T15:30:00",
                    descricao: "Objeto em transferência",
                    unidade: "Unidade de Tratamento",
                    cidade: "PORTO ALEGRE",
                    uf: "RS"
                },
                {
                    data: "2024-04-06T12:45:30",
                    descricao: "Objeto encaminhado",
                    unidade: "Agência dos Correios",
                    cidade: "CAXIAS DO SUL",
                    uf: "RS"
                },
                {
                    data: "2024-04-05T09:20:15",
                    descricao: "Objeto postado",
                    unidade: "Agência dos Correios",
                    cidade: "CAXIAS DO SUL",
                    uf: "RS"
                }
            ]
        }
    ];
    const [encomendas, setEncomendas] = useState(mockData); // Usei estado para armazenar as encomendas, OBS: retirar o mockData com a APi funcionando
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
                            <h3 className={styles.subtitulo}>{encomenda.produto}</h3>
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