document.addEventListener('DOMContentLoaded', () => {
    load_states();
});

async function load_states() {
    try {
        const states = await fetch('http://servicodados.ibge.gov.br/api/v1/localidades/estados').then(data => data.json());

        states.sort((a, b) => a.nome.localeCompare(b.nome));

        const statesSelect = document.getElementById('states');
        statesSelect.innerHTML = createDefaultOption("Escolha um estado");

        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state.id;
            option.textContent = state.nome;
            statesSelect.appendChild(option);
        });

        statesSelect.addEventListener('change', () => {
            let selectedOpt = statesSelect.options[statesSelect.selectedIndex].value;
            console.log(selectedOpt);
            load_cities(selectedOpt);
        });

    } catch (err) {
        console.error('Erro ao carregar os estados:', err);
    }
}

async function load_cities(select_state) {
    try {
        let cities = await fetch(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${select_state}/municipios`).then(data => data.json());

        const citieSelect = document.getElementById('cities');
        citieSelect.innerHTML = createDefaultOption("Escolha um município");

        cities.forEach(citie => {
            const option = document.createElement('option');
            option.value = citie.nome;
            option.textContent = citie.nome;
            citieSelect.appendChild(option);
        });

        citieSelect.addEventListener('change', () => {
            let selectedOpt =  citieSelect.options[citieSelect.selectedIndex].value;
            load_SVG(select_state, selectedOpt);
        }); 

    } catch (err) {
        console.error('Ocorreu um erro ao carregar os municipios: ', err);
    }
}

async function load_SVG(stateId, cityName) {
    try {
        let response = await fetch(`http://localhost:3000/svg/${stateId}/${cityName}`).then(data => data.json());

        let estado_svg = document.getElementById('path_estado');
        let municipios_svg = document.getElementById('path_municipio');
        let viewBox_svg = document.getElementById('svg');

        viewBox_svg.setAttribute('viewBox', response.viewBoxSVG);
        municipios_svg.setAttribute('d', response.municipiosSVG);
        estado_svg.setAttribute('d', response.estadoSVG);

        console.log(viewBox_svg);

    } catch (err) {
        console.error('Erro ao carregar o SVG:', err);
    }
}

function createDefaultOption(text) {
    const defaultOption = `<option value="" disabled selected>${text}</option>`;
    return defaultOption;
}