import { useState, useEffect } from 'react';
// em desenvolvimento
const useFetchTracks = (codRastreio) => {
    const [encomendas, setEncomendas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tracks/${codRastreio}`);
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
    }, [codRastreio]);

    return { encomendas, error, loading };
};

export default useFetchTracks;