import styles from './Home.module.css'
import { useState } from 'react';

const Home = () => {
     // Exemplo de dados simulados (mockData)
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
        }
        // Adicione mais rastreios conforme necessário
    ];
    const [encomendas, setEncomendas] = useState(mockData); // Usei estado para armazenar as encomendas, OBS: retirar o mockData com a APi funcionando
    const [selectedTracking, setSelectedTracking] = useState(null); // controla o rastreio selecionado

    return (
        <>
            <main className={styles.main}>
                <div className={styles.filterSection}>
                    <div className={styles.filterHeader}>
                        <a href="#" className={styles.filterBtn}><i>A</i> Filtros</a>
                        <a href="#" className={styles.filterBtn}><i>A</i> Adicionar</a>
                    </div>
                    <div className={styles.filter}>
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
                            <h3 className={styles.subtitulo}>{selectedTracking.produto}</h3>
                            <a href="#" onClick={() => setSelectedTracking(null)}>Close</a>
                            <p>Código de Rastreio: {selectedTracking.codigoRastreio}</p>
                            <p>Previsão de Entrega: {selectedTracking.previsaoEntrega}</p>
                            {selectedTracking.atualizacoes.map((atualizacao, index) => (
                                <div key={index}>
                                    <tbody>
                                        <th><p>{new Date(atualizacao.data).toLocaleString()}</p></th>
                                        <th><p>{atualizacao.descricao}</p><p>{atualizacao.cidade} - {atualizacao.uf}</p></th>
                                    </tbody>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default Home