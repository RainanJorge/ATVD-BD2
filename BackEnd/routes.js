import express from 'express';
import client from './connect.js';

const router = express.Router();

//SVG
router.get('/svg/:estado/:municipios', async (req, res) => {
    try {
        const { estado, municipios } = req.params;

        const estadoNome = await client.query('SELECT nome FROM estado WHERE cd_uf = $1', [estado]);
        const nomeEstado = estadoNome.rows[0].nome;

        const viewBox = await client.query('SELECT getViewBox($1)', [nomeEstado]);
        const viewBoxSVG = viewBox.rows[0]?.getviewbox || null;

        const pathEstado = await client.query('SELECT ST_AsSVG(geom) FROM estado WHERE nome ILIKE $1', [nomeEstado]);
        const estadoSVG = pathEstado.rows[0]?.st_assvg || null;

        const pathMunicipios = await client.query('SELECT ST_AsSVG(geom) FROM municipios WHERE nome ILIKE $1', [municipios]);
        const municipiosSVG = pathMunicipios.rows[0]?.st_assvg || null;

        res.json({
            estadoSVG,
            municipiosSVG,
            viewBoxSVG
        });

    } catch (err) {
        console.log('Erro ao buscar SVG do estado', err);
        res.status(500).json({ error: 'Erro no servidor.' });
    }
});


export default router;