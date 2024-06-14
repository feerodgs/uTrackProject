import { useState, useEffect } from 'react';

const useFetchTracks = (userId) => {
    const [encomendas, setEncomendas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tracks/tracks/${userId}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados de rastreamento');
                }
                const data = await response.json();
                setEncomendas(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { encomendas, error, loading, setEncomendas };
};

const useCreateTrack = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const createTrack = async (codigoUsuario, codigoRastreio, dataPrevisao, nomeProduto) => {
        setLoading(true);
        const [dia, mes, ano] = dataPrevisao.split('/');
        const dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
        console.log(dataFormatada, codigoRastreio, codigoUsuario,nomeProduto)
        try {
            const response = await fetch('http://localhost:3000/tracks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    codigoUsuario,
                    codigoRastreio,
                    dataPrevisao: dataFormatada,
                    nomeProduto,
                }),
            });
            if (!response.ok) {
                throw new Error('Erro ao criar nova track');
            }
            setSuccess(true);
            return response;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { success, error, loading, createTrack };
};


const useDeleteTrack = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteTrack = async (codigoRastreio) => {
        setLoading(true);
        
        try {
            const response = await fetch(`http://localhost:3000/tracks/${codigoRastreio}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar track');
            }
            setSuccess(true);
            return response; // Retorna a resposta HTTP
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { success, error, loading, deleteTrack };
};

export{ useFetchTracks, useCreateTrack, useDeleteTrack };
