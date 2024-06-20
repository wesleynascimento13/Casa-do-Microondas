import { useEffect, useState } from 'react';
import api from '../api/api.js';

function Slide() {
    const [servicos, setServicos] = useState([]); 

    useEffect(() => {
        api.get('/servicos')
            .then((res) => {
                setServicos(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);
    
// a carga.map será servicos.map