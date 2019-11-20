import Componenet from '../Component.js';
import Header from '../common/Header.js';
import { loadGraph } from './graph.js';
import { getFavorites, getCandidates, addAFavorite, deleteAFavorite } from '../services/api.js';


class GraphApp extends Componenet {

    async onRender(dom){
        const header = new Header();
        const headerDOM = header.renderDOM();
        dom.prepend(headerDOM);
        const graphSection = dom.querySelector('.graph');
        const graph = loadGraph();
        graphSection.appendChild(graph);
        const favoritesIds = await getFavorites();
        const favoritesIdsObject = favoritesIds.reduce((acc, curr) => {
            acc[curr] = curr; 
            return acc;
        }, {});
        const candidates = await getCandidates();
        const candidateNamesAndIds = candidates.results.map(candidate =>{
            return { name : candidate.candidate_name, id: candidate.candidate_id };
        });
        const candidatesNotFavorites = candidateNamesAndIds.filter(candidate => {
            return candidate.id !== favoritesIdsObject[candidate.id];
        });
        const addCandidateSelect = document.getElementById('add');
        candidatesNotFavorites.forEach(candidate => {
            const option = document.createElement('option');
            option.textContent = candidate.name;
            option.value = candidate.id;
            addCandidateSelect.appendChild(option);
        });
        const candidatesAreFavorites = candidateNamesAndIds.filter(candidate => {
            return candidate.id !== favoritesIdsObject[candidate.id];
        });
        const removeCandidateSelect = document.getElementById('remove');
        candidatesAreFavorites.forEach(candidate => {
            const option = document.createElement('option');
            option.textContent = candidate.name;
            option.value = candidate.id;
            removeCandidateSelect.appendChild(option);
        });

        addCandidateSelect.addEventListener('change', async(event) => {
            const id = event.target.value;
            const thisFavorite = {
                candidate_id: id
            };
            await addAFavorite(thisFavorite);
            loadGraph();
        });
        removeCandidateSelect.addEventListener('change', async(event) => {
            const id = event.target.value;
            const thisFavorite = {
                candidate_id: id
            };
            await deleteAFavorite(thisFavorite);
            loadGraph();
        });

    }

    renderHTML(){
        return /*html*/ `
        <div>
            <!-- <form>
                <label>Add a Candidate</label>
                <select id = 'add'>
                    
                <select>
                <label>Remove a Candidate</label>
                <select id = 'remove'>
                    
                <select>
            </form> -->
        <section class="graph">

        </section>   
        <div>
        `;
    }
}

export default GraphApp;